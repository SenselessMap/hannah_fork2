import { Routes, Route } from "react-router-dom";
import Catalogue from "./pages/Catalogue";
import FicheProduit from "./pages/FicheProduit";
import CellierUtilisateur from "./components/CellierUtilisateur";
import Layout from "./components/Layout";
import Auth from "./pages/Auth";
import Inscription from "./pages/Inscription";
import CreerCellier from "./pages/CreerCellier";


import CompteUsager from "./components/CompteUsager";

import "./App.css";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Auth />} />
        <Route path="/compte" element={<CompteUsager />} />
        <Route path="/" element={<Catalogue />} />         

        <Route path="/produit/:id" element={<FicheProduit />} />      
        <Route path="/user/:id/celliers" element={<CellierUtilisateur />} />
        <Route path="/cellier/creer" element={<CreerCellier />} />
        


        <Route path="/produit/:id" element={<FicheProduit />} />
        <Route path="/celliers" element={<CellierUtilisateur />} />

      </Routes>
    </Layout>
  );
}