import { useState, useEffect } from "react";
import axios from "axios";


function AjouterProduitCellier({ produitId, userId }) {
  const [celliers, setCelliers] = useState([]);
  const [cellierSelectionne, setCellierSelectionne] = useState(null);
  const [quantite, setQuantite] = useState(1);

  // Récupérer les celliers de l'utilisateur
  useEffect(() => {
    axios.get(`/api/users/${userId}/celliers`)
      .then(res => {
        setCelliers(res.data);
        if(res.data.length > 0) setCellierSelectionne(res.data[0].id);
      });
  }, [userId]);

  const ajouterProduit = () => {
    if (!cellierSelectionne) return;

    axios.post(`/api/celliers/${cellierSelectionne}/produits`, {
      produit_id: produitId,
      quantite
    })
    .then(() => {
      alert(`Ajouté ${quantite} bouteille(s) au cellier !`);
    })
    .catch(err => {
      console.error(err);
      alert("Erreur lors de l'ajout du produit.");
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '200px' }}>
      <label>Choisir un cellier :</label>
      <select value={cellierSelectionne || ''} onChange={e => setCellierSelectionne(e.target.value)}>
        {celliers.map(c => (
          <option key={c.id} value={c.id}>{c.nom}</option>
        ))}
      </select>

      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <button onClick={() => setQuantite(q => Math.max(1, q - 1))}>-</button>
        <input
          type="number"
          value={quantite}
          onChange={e => setQuantite(Math.max(1, Math.min(99, Number(e.target.value))))}
          style={{ width: '50px', textAlign: 'center' }}
        />
        <button onClick={() => setQuantite(q => Math.min(99, q + 1))}>+</button>
      </div>

      <button onClick={ajouterProduit} style={{ marginTop: '10px' }}>Ajouter au cellier</button>
    </div>
  );
}

export default AjouterProduitCellier;