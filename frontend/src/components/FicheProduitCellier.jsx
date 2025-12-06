

/**
 * Fonction qui prend en paramètre un produit et les actions de fermer la fiche et de supprimer le produit. En le supprimant, cela veut dire que l'utilisateur boira ce vin. La quantité bue sera déduite.
 * @params {produit, onFerme, onSupprime}
 * @returns Retourne la fiche de la bouteille sélectionnée et la possibilité de boire le vin, donc de supprimer la bouteille et la quantité*/
const FicheProduitCellier = ({ produit, onFerme, onSupprime }) => {
return (
    <div className="fixed inset-0 bg-black/40 flex items-end z-50">
    <div className="bg-white w-full rounded-t-2xl p-5  max-h-[85vh] overflow-y-auto shadow-lg">
        <button className="text-gray-800 mb-3 cursor-pointer hover:text-[var(--couleur-text)] hover:font-bold" onClick={onFerme}>Fermer</button>        
        <h2 className="text-2xl font-bold">{produit.name}</h2>
        <p className="text-[var(--couleur-text)] mt-1 text-lg text-left"><strong>Quantité : </strong>{produit.pivot.quantite}</p>
        <button
        onClick={onSupprime}
        className="w-full mt-3 bouton-vin p-4 text-white py-2 rounded-lg text-sm cursor-pointer"
        >
        Goûter ou boire ce vin ?
        </button>
    </div>
    </div>
);
}

export default FicheProduitCellier;
