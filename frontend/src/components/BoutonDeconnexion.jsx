import axios from "axios";
import { useNavigate } from "react-router-dom";

 export default function BoutonDeconnexion(){
    const token = localStorage.getItem('token');
    const route = useNavigate();

    const deconnexion = async() => {
        try {
            const response = await axios.post("http://localhost:8000/api/deconnexion",
                {},
                { headers: { Authorization: `Bearer ${token}`}}
            );
            localStorage.removeItem('token');

            route('/connexion',{
                state:{deconnexionMsg: response.data.message}
            })
        } catch (error) {
            console.error(error.response.data)    
        }
    };

    return <button type="button" onClick={deconnexion}>Se deconnecter</button>
}  