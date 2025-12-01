import api from "./axios";

export function getproduits(page, limit, filtre, ordre) { 
  const params = { page, limit, ordre }; 

  if (filtre?.type === "identite") {
    return api.get(`/produits/couleur/${filtre.value}`, {
      params,
    });
  }

  if (filtre?.type === "pays") {
    return api.get(`/produits/pays/${filtre.value}`, {
      params,
    });
  }

  return api.get("/produits", {
    params,
  });
}

export function getproduit(id) {
  return api.get(`/produits/${id}`);
}