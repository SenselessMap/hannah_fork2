import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import ModaleAjouter from "../components/ModalAjouter";
import ModaleErreur from "../components/ModalErreur";
import { useNavigate } from "react-router-dom";

/**
 * Fonction fléchée qui affiche les détails d'un vin et qui affiche le formulaire d'ajout du vin sélectionné et qui permet d'ajouter le vin dans le cellier de l'utilisateur connecté. La quantité ajoutée est enregistrée dans la table pivot cellier_produit dans la colonne "quantite"
 * @param {*} param0 
 * @returns Retourne la fiche de détail d'un vin
 */
 const AjouterProduitCellier = () => {
    const { produitId } = useParams();
    const [produit, setProduit] = useState(null);
    const [celliers, setCelliers] = useState([]);
    const [cellierSelectionne, setCellierSelectionne] = useState('');
    const [quantite, setQuantite] = useState(1); // valeur par défaut 1
    const [quantiteAjoutee, setQuantiteAjoutee] = useState(0);
    const [modalAjouterVisible, setModalAjouterVisible] = useState(false); // affiche la boite modale d'ajout et quantité
    const [modalErreurVisible, setModalErreurVisible] = useState(false);
    const [messageAjout, setMessageAjout] = useState("");
    const [messageErreur, setMessageErreur] = useState("");
    const navigate = useNavigate();
   
    useEffect(() => {
        api.get("/celliers")
            .then(res => {
                const listeCelliers = Array.isArray(res.data) ? res.data : [];
                setCelliers(listeCelliers);

                if (listeCelliers.length > 0) {
                    setCellierSelectionne(listeCelliers[0].id);
                }
            })
            .catch(err => console.error("Erreur celliers:", err));
    }, []);

    useEffect(() => {
        if (!produitId) return;

        api.get(`/produits/${produitId}`)
            .then(res => setProduit(res.data))
            .catch(err => console.error("Erreur produit:", err));
    }, [produitId]);
    
    
   
    /**
     * Fonction qui ajoute un vin dans un cellier à partir d'un formulaire d'ajoute. Possibilité d'incrémenter ou décrémenter la quantité avant de soumettre.
     * @returns retourne le vin ajouté au cellier
     */
    const ajouterProduit = () => {
        if (!produit || !cellierSelectionne) return;

        api.post(`/celliers/${cellierSelectionne}/produits`, {
            produit_id: produit.id,
            quantite: quantite
        })
        .then((res) => {
            setQuantiteAjoutee(quantite);
            setMessageErreur(`<p>Vous avez ajouté <strong>${quantiteAjoutee}</strong> bouteille${quantiteAjoutee > 1 ? "s" : ""}.</p>`);
            setModalAjouterVisible(true);
            setQuantite(1);

            // fermer la modale après 5s et rediriger vers le cellier
            setTimeout(() => {
                setModalAjouterVisible(false);
                navigate(`/celliers/${cellierSelectionne}`);
            }, 5000);

        })
        .catch(err => {
            setMessageErreur("Erreur lors de l'ajout du produit.");
            setModalErreurVisible(true);
        });
    };
    {/* Animations 3 points pour le chargement de la page */}
    if (!produit) return <div className="points"> 
        <span></span><span></span><span></span>
    </div>;
    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center mb-[-50px] px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl mt-10 mb-10">Ajout de bouteilles au cellier</h1>            
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-4 bg-white rounded-lg shadow-md flex flex-col">                
                <div className="carteColonne flex flex-col items-center">
                    <img
                        className="w-full h-50 mb-4 rounded object-cover"
                        src="/public/images/wine-1802763_640.jpg"
                        alt="Image cellier"
                    />
                    <h2 className="text-xl sm:text-2xl font-semibold mb-3 mt-2">Garnir mon cellier</h2>
                    <select
                    className="w-full p-3 mb-4 text-lg sm:text-xl rounded-sm bouton-accent text-white bg-transparent focus:outline-none"
                    
                    onChange={e => setCellierSelectionne(e.target.value)} defaultValue={''}
                    >
                        <option className="" value=""  >Sélectionne ton cellier</option>
                        {Array.isArray(celliers) && celliers.length > 0 ? (
                            celliers.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)
                        ) : (
                            <option disabled>Aucun cellier</option>
                        )}
                    </select>
                    <div className="flex w-full gap-2 ">
                        <button
                        onClick={() => setQuantite(q => Math.max(0, q - 1))}
                        className="text-xl text-center w-40 font-bold px-4 py-2 rounded-lg bouton-raisin cursor-pointer border-white border-[2px]"
                        >
                        -
                        </button>
                        <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={quantite}
                            onChange={e => {
                                const val = e.target.value.replace(/\D/g, "");
                                setQuantite(Math.max(1, Math.min(99, Number(val) || 1)));
                            }}
                            className="text-xl w-full text-lg sm:text-xl rounded-md bouton-raisin text-center border-white border-[2px]"
                            placeholder="0"
                            />
                        <button
                        onClick={() => setQuantite(q => Math.min(99, q + 1))}
                        className="text-xl text-center w-40 text-lg sm:text-xl font-bold px-4 py-2 rounded bouton-raisin cursor-pointer border-white border-[2px]"
                        >
                        +
                        </button>
                    </div>
                    <button
                        onClick={ajouterProduit}
                        className="w-full p-4 bouton-accent text-lg sm:text-xl text-white rounded cursor-pointer border-xs transition-colors"
                    >
                        Ajouter
                    </button>
                </div>
            </div>
            {/* Modal ajouté succès et quantité */}
                <ModaleAjouter
                    visible={modalAjouterVisible}
                    quantite={quantiteAjoutee}
                    message={messageAjout}
                    onFermer={() => setModalAjouterVisible(false)}
                />
                <ModaleErreur
                    visible={modalErreurVisible}
                    message={messageErreur}
                    onFermer={() => setModalErreurVisible(false)}
                />
        </div>
    );
}

export default AjouterProduitCellier