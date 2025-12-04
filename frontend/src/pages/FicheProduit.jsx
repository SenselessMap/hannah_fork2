import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../api/axios";

/**
 * Fonction fléchée qui affiche les détails d'un vin et qui affiche le formulaire d'ajout du vin sélectionné et qui permet d'ajouter le vin dans le cellier de l'utilisateur connecté. La quantité ajoutée est enregistrée dans la table pivot cellier_produit dans la colonne "quantite"
 * @param {*} param0 
 * @returns Retourne la fiche de détail d'un vin
 */
 const FicheProduit = () => {
    const { id } = useParams();
    const [produit, setProduit] = useState(null);  
    const [user, setUser] = useState(null);

    // Récupérer l'utilisateur'
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
        setUser(JSON.parse(storedUser));
        }
    }, []);

    // Récupérer le produit
    useEffect(() => {
        api.get(`/produits/${id}`)
            .then(res => setProduit(res.data))
            .catch(err => console.error(err));
    }, [id]);
    if (!produit) return <div className="points">
        <span></span><span></span><span></span>
    </div>;
    return (
        
<div class="container mx-auto p-4">
    <h1 className="text-center mt-20 text-4xl lg:text-5xl">Fiche de détails</h1>
    <h1 className="text-center text-3xl md:text-4xl  lg:text-5xl mt-4 mb-10"><strong>{produit.name}</strong></h1>
    <hr className="border-t-1 border-dashed bouton-[var(--couleur-texte)] mt-15 mb-15 my-4" />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div class="flex justify-center">            
            <img
                    className="w-full h-auto max-w-sm sm:max-w-md lg:max-w-lg object-cover"
                    src={produit.image}
                    alt={produit.name}
                />
        </div>               
        <div class="flex flex-col mt-5 gap-4 h-full">
            <ul class="space-y-2">
                <li class="text-sm md:text-xl lg:text-3lg "><strong>Prix - </strong> {Number(produit.price).toFixed(2)} $</li>
                <li class="text-sm md:text-xl lg:text-3lg "><strong>Catégorie - </strong> {produit.identite_produit}</li>
                <li class="text-sm md:text-xl lg:text-3lg "><strong>Millésime - </strong> {produit.millesime_produit}</li>
                <li class="text-sm md:text-xl lg:text-3lg "><strong>Origine - </strong> {produit.pays_origine}</li>
            </ul>
            <div className="flex gap-5 items-center ">
                <Link className="block w-full" to={`/user/${user ? user.id : ''}/celliers/produits/${produit.id}`}>
                    <button class="mt-6 px-6 py-3 border-2 hover:border-[var(--couleur-text)] hover:text-[var(--couleur-text)] hover:bg-white rounded-lg bg-[var(--couleur-text)] text-white transition duration-300 cursor-pointer text-sm md:text-md lg:text-lg">Ajouter au cellier</button>
                </Link>
                <Link>
                <button class="mt-6 px-6 py-3 border-2 hover:border-[var(--couleur-text)] hover:text-[var(--couleur-text)] hover:bg-white rounded-lg bg-[var(--couleur-text)] text-white transition duration-300 cursor-pointer text-sm md:text-md lg:text-lg">Ajouter à ma liste</button>
                </Link>
            </div>
        </div>
        
    </div>
</div>
        
    );
}

export default FicheProduit