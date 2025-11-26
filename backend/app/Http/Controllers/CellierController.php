<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Cellier;

class CellierController extends Controller
{
    /*public function index($userId)
    {
        $celliers = Cellier::where('user_id', $userId)->get();
        return response()->json($celliers);
    }*/

    public function produits($cellierId)
    {
        $cellier = Cellier::with('produits')->findOrFail($cellierId);
        return response()->json($cellier->produits);
    }

    public function index()
    {
        // ici on retourne les celliers de l’utilisateur 1 TEMPORAIREMENT
        $userId = 1;

        $celliers = Cellier::with('produits')
            ->where('user_id', $userId)
            ->get();

        return response()->json($celliers);
    }

    public function creerCellier(Request $request)
    {
        // Valider les données envoyées par React
        $validated = $request->validate([
            'nom' => 'required|string|max:100',
            'user_id' => 'required|integer'
        ]);

        // Créer le cellier
        $cellier = Cellier::create([
            'nom' => $validated['nom'],
            'user_id' => $validated['user_id']
        ]);

        return response()->json([
            'message' => 'Cellier créé avec succès.',
            'cellier' => $cellier
        ], 201);
    }


    public function afficherProduit($cellierId)
    {
        $cellier = Cellier::with('produits')->findOrFail($cellierId);
        return response()->json($cellier);
    }


    public function ajouterProduit(Request $request, $cellierId)
    {
        $cellier = Cellier::findOrFail($cellierId);
        $produitId = $request->input('produit_id');
        $quantite = $request->input('quantite', 1);

        $item = $cellier->produits()->where('produit_id', $produitId)->first();

        if ($item) {
            $cellier->produits()->updateExistingPivot($produitId, [
                'quantite' => $item->pivot->quantite + $quantite
            ]);
        } else {
            $cellier->produits()->attach($produitId, ['quantite' => $quantite]);
        }

        return response()->json($cellier->produits()->where('produit_id', $produitId)->first());
    }


    public function modifierQuantite(Request $request, $cellierId, $produitId)
    {
        $quantite = $request->input('quantite', 1);
        $cellier = Cellier::findOrFail($cellierId);

        $cellier->produits()->updateExistingPivot($produitId, ['quantite' => $quantite]);

        return response()->json(['message' => 'Quantité mise à jour']);
    }

    public function supprimerProduit(Request $request, $cellierId, $produitId)
    {
        $cellier = Cellier::findOrFail($cellierId);
        $item = $cellier->produits()->where('produit_id', $produitId)->first();

        if (!$item) return response()->json(null, 404);

        if ($item->pivot->quantite <= 1) {
            $cellier->produits()->detach($produitId);
            return response()->json(null);
        } else {
            $cellier->produits()->updateExistingPivot($produitId, [
                'quantite' => $item->pivot->quantite - 1
            ]);
            return response()->json($cellier->produits()->where('produit_id', $produitId)->first());
        }
    }
}
