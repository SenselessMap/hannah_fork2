const ModalDeplacerBouteille = (deplacerBouteille) => {
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">Déplacer vers</h2>

            <select
                className="w-full mb-4 p-2 border rounded"
                value={nouveauCellier}
                onChange={(e) => setNouveauCellier(e.target.value)}
            >
                <option value="">-- Choisir un cellier --</option>
                {celliers.map(c => (
                    <option key={c.id} value={c.id}>{c.nom}</option>
                ))}
            </select>

            <button
                className="w-full bg-green-600 text-white p-2 rounded"
                onClick={deplacerBouteille}
            >
                Confirmer
            </button>
        </div>
    </div>
}

export default ModalDeplacerBouteille