import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import FicheProduitCellier from "./FicheProduitCellier";

const produitsParPageCellier = 6;

const AfficheCellier = () => {
    const [celliers, setCelliers] = useState([]);
    const [cellierOuvertId, setCellierOuvertId] = useState(null);
    const [produitSelectionne, setProduitSelectionne] = useState(null);
    const [pagination, setPagination] = useState({}); // { [cellierId]: pageIndex }

    useEffect(() => {
        api.get("/celliers")
        .then(res => setCelliers(Array.isArray(res.data) ? res.data : []))
        .catch(err => {
            console.error("Erreur lors de la récupération des celliers :", err);
            setCelliers([]);
        });
    }, []);

    const gestionSupprimer = async (cellierId, produitId, quantiteActuelle) => {
        const nouvelleQuantite = quantiteActuelle - 1;
        try {
        await api.put(`/celliers/${cellierId}/produits/${produitId}`, { quantite: nouvelleQuantite });
        setCelliers(prev =>
            prev.map(cellier => {
            if (cellier.id !== cellierId) return cellier;
            return {
                ...cellier,
                produits: cellier.produits
                .map(p => p.id === produitId ? { ...p, pivot: { ...p.pivot, quantite: nouvelleQuantite } } : p)
                .filter(p => p.pivot.quantite > 0),
            };
            })
        );
        setProduitSelectionne(null); // Ferme la modal après suppression
        } catch (error) {
        console.error(error);
        alert("Erreur lors de la mise à jour du vin !");
        }
    };

    const changerPage = (cellierId, direction) => {
        setPagination(prev => {
        const page = prev[cellierId] || 0;
        return { ...prev, [cellierId]: page + direction };
        });
    };

    const getProduitsPage = (cellier) => {
        const page = pagination[cellier.id] || 0;
        const start = page * produitsParPageCellier;
        const end = start + produitsParPageCellier;
        return cellier.produits.slice(start, end);
    };

    return (
        <div className="flex justify-center px-3 py-4">
        <div className="w-full lg:w-4/5">
            <h1 className="text-2xl font-bold mt-8 mb-8 text-center">Mes Celliers 🍇</h1>

            {celliers.length > 0 ? (
            <ul className="space-y-4 mb-20">
                {celliers.map(cellier => (
                <li key={cellier.id} className="rounded-lg shadow-sm overflow-hidden">
                    <button
                    onClick={() => setCellierOuvertId(cellierOuvertId === cellier.id ? null : cellier.id)}
                    className="w-full text-left p-3 flex justify-between items-center bg-[var(--couleur-form)] hover:bg-[#e5e5e5] rounded-lg cursor-pointer"
                    >
                    <span className="font-semibold">{cellier.nom}</span>
                    <span className="text-md">{cellierOuvertId === cellier.id ? "- Fermer" : "+ Ouvrir"}</span>
                    </button>

                    <div className={`overflow-hidden transition-all duration-300 ${cellierOuvertId === cellier.id ? "max-h-[2000px] opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"}`}>
                    {cellier.produits && cellier.produits.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 bg-[var(--couleur-form)] lg:grid-cols-5 gap-2 p-2">
                        {getProduitsPage(cellier).map(p => (
                            <div
                            key={p.id}
                            className="flex flex-col items-center p-2 bg-white rounded-md shadow cursor-pointer hover:bg-gray-50"
                            onClick={() => setProduitSelectionne({ ...p, cellierId: cellier.id })}
                            >
                            <div className="w-full aspect-square  rounded-md flex items-center justify-center">                                
                                <img className="imageCellier" src={p.image || 'https://cdn.pixabay.com/photo/2012/04/13/11/49/wine-32052_1280.png'}
						        alt={p.name ? `Nom du vin ${p.name}` : 'Nom du vin non disponible'}/>
                            </div>
                            <p className="text-sm font-medium text-[var(--couleur-text)] mt-1 mb-1">{p.name}</p>
                            <p className="text-sm font-bold text-left text-[var(--couleur-text)] ">Quantité : {p.pivot.quantite}</p>
                            </div>
                        ))}

                        {/* Pagination des celliers - 6 par section maximum */}
                        {cellier.produits.length > produitsParPageCellier && (
                            <div className="flex justify-between col-span-full mt-2">
                            <button
                                className="px-3 py-1 bg-white rounded disabled:opacity-50 disabled:cursor-default hover:cursor-pointer"
                                onClick={() => changerPage(cellier.id, -1)}
                                disabled={(pagination[cellier.id] || 0) === 0}
                            >
                                Précédent
                            </button>
                            <button
                                className="px-3 py-1 bg-white rounded disabled:opacity-50 disabled:cursor-default hover:cursor-pointer"
                                onClick={() => changerPage(cellier.id, 1)}
                                disabled={(pagination[cellier.id] || 0) >= Math.floor(cellier.produits.length / produitsParPageCellier)}
                            >
                                Suivant
                            </button>
                            </div>
                        )}
                        </div>
                    ) : (
                        <p className="p-4 text-gray-500">Aucun produit dans ce cellier.</p>
                    )}
                    </div>
                </li>
                ))}
            </ul>
            ) : (
            <p>Aucun cellier trouvé.</p>
            )}
            
            <div className="text-center">
            <h2 className="text-xl font-bold mb-4">Nouveau cellier 🍇</h2>
            <Link
                to="/cellier/creer"
                className="inline-block px-6 py-3 bg-[var(--couleur-text)] hover:bg-[var(--couleur-accent)] text-white rounded-lg"
            >
                Ajouter un cellier
            </Link>
            </div>

            {/* Fiche bouteille cellier mobile */}
            {produitSelectionne && (
            <FicheProduitCellier
                produit={produitSelectionne}
                onFerme={() => setProduitSelectionne(null)}
                onSupprime={() =>
                gestionSupprimer(
                    produitSelectionne.cellierId,
                    produitSelectionne.id,
                    produitSelectionne.pivot.quantite
                )
                }
            />
            )}
        </div>
        </div>
    );
    }

    export default AfficheCellier;