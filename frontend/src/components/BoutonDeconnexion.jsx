import api from "../api/axios";
import { useNavigate } from "react-router-dom";

// Fonction déconnexion
export default function BoutonDeconnexion(){
    // recupérer le token
    const token = localStorage.getItem('token');
    const route = useNavigate();

    const deconnexion = async() => {
        try {
            const response = await api.post("/deconnexion",
                {},
                { headers: { Authorization: `Bearer ${token}`}}
            );
            // Supprimer du localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            // Redirectionner vers la page de connexion avec message de succès
            route('/connexion',{
                state:{deconnexionMsg: response.data.message}
            })
        } 
        catch (error) {
            console.error(error.response?.data|| error.message)    
        }
    };
    if (!token) return <div className="points">
        <span></span><span></span><span></span>
    </div>;
    return (
        <button className="bg-red-950 text-white text-center p-3 rounded-lg hover:text-red-950 hover:bg-red-100 text-red-950 transition" type="button" onClick={deconnexion}>Se déconnecter</button>
    );
}  