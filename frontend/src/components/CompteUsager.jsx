// importation des bibliothèques
import axios from "axios";
import { useEffect, useState } from "react";

export default function CompteUsager() {
  const [usager, setUsager] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/api/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => setUsager(res.data))
    .catch(error => console.log(error));
  }, []);

  if (!usager) return <div>Chargement...</div> ;

  return (
    <section className="p-4">
      <div className="contenu">
          <h1 className="text-2xl font-bold">Profil</h1>
          <div className="mb-10 mt-3">
              <p>Nom : <strong>{usager.name}</strong></p>
              <p>Email : <strong>{usager.email}</strong></p>
          </div>
          <div className="flex flex-col gap-2">
              <button className="bouton-edit">Modifier</button>
              <button className="bouton-danger">Supprimer</button>
          </div>
      </div>
    </section>
  );
}
