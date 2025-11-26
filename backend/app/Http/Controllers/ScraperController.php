<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Produit;
use Illuminate\Support\Facades\Log;

class ScraperController extends Controller
{
    protected $endpoint;
    protected $headers;

    public function __construct()
    {
        $this->endpoint = config('services.saq.graphql_url');
        $this->headers = [
            'x-api-key' => config('services.saq.api_key'),
            'Magento-Environment-Id' => config('services.saq.env_id'),
            'magento-store-code' => config('services.saq.store_code'),
            'magento-store-view-code' => config('services.saq.store_view'),
            'magento-website-code' => config('services.saq.website_code'),
            'Content-Type' => 'application/json',
            'User-Agent' => 'Laravel-Scraper/1.0',
        ];
    }

    public function scrapePage($taillePage = 12, $pageCourante = 1)
    {
        $query = <<<'GRAPHQL'
query ($pageSize: Int, $currentPage: Int) {
  products(
    search: "",
    filter: {
      couleur: { neq: "" }
    }
    pageSize: $pageSize,
    currentPage: $currentPage
  ) {
    total_count
    items {
      sku
      name
      image { url }
      small_image { url }
      thumbnail { url }
      price_range {
        minimum_price {
          final_price { value }
        }
      }
      custom_attributes {
        code
        value
      }
    }
  }
}
GRAPHQL;

        $response = Http::withHeaders($this->headers)
            ->post($this->endpoint, [
                'query' => $query,
                "variables" => [
                    "pageSize" => $taillePage,
                    "currentPage" => $pageCourante
                ]
            ]);

        return $response->json();
    }



    // GraphQL query
    public function productSearchQuery()
    {
        return <<<'GRAPHQL'
query productSearch($phrase: String!, $pageSize: Int, $currentPage: Int, $filter: [SearchClauseInput!]) {
    productSearch(phrase: $phrase, page_size: $pageSize, current_page: $currentPage, filter: $filter) {
        total_count
        items {
            product {
                sku
                name
                image { url }
                small_image { url }
                thumbnail { url }
                price_range {
                    minimum_price {
                        final_price { value currency }
                    }
                }
                custom_attributes {
                    code
                    value
                }
            }
            productView {
                attributes {
                    name
                    value
                    label
                }
            }
        }
    }
}
GRAPHQL;
    }

    // Scraper d'une page
    public function extrairePage(int $taillePage, int $pageCourante, int $facetId)
    {
        $variables = [
            'phrase' => '',
            'pageSize' => $taillePage,
            'currentPage' => $pageCourante,
            'filters' => [
            "product_filter" => ["eq" => $facetId],  // Vin / Champagne / Mousseux
            "visibility" => ["in" => ["2", "4"]]    ]
        ];

        $attempts = 0;
        do {
            $attempts++;
            $response = Http::withHeaders($this->headers)
                ->timeout(20)
                ->withOptions(['verify' => false])
                ->post($this->endpoint, [
                    'query' => $this->productSearchQuery(),
                    'variables' => $variables
                ]);

            if ($response->status() == 429) {
                $wait = $response->header('Retry-After', 2);
                Log::info("Throttling détecté, attente de {$wait}s");
                sleep(max(1, (int)$wait));
            } else {
                break;
            }
        } while ($attempts < 5);

        if (!$response->successful()) {
            Log::error('Erreur API GraphQL', ['status' => $response->status(), 'body' => $response->body()]);
            return ['items' => [], 'total_count' => 0];
        }
        return $response->json('data.productSearch', ['items' => [], 'total_count' => 0]);
    }

}
