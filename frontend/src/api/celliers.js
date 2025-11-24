// api/cellier
import api from "./axios";

/*api.get('/celliers')
   .then(res => console.log(res.data))
   .catch(err => console.error(err));*/

export function getCelliers() {
  return api.get("/celliers");
}

export function ajouteAuCellier(produitId) {
  return api.post(`/celliers/${produitId}`);
}

export function supprimeDuCellier(produitId) {
  return api.delete(`/celliers/${produitId}`);
}