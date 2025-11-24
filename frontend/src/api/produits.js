import api from "./axios";

export function getproduits(page, limit, couleur) {
  return api.get("/produits", {
    params: {
      page,
      limit,
      ...(couleur && { couleur }),
    },
  });
}

export function getproduit(id) {
  return api.get(`/produits/${id}`);
}