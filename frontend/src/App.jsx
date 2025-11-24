import { Routes, Route } from "react-router-dom";
import Catalogue from "./pages/Catalogue";
import FicheProduit from "./pages/FicheProduit";
import CellierUtilisateur from "./components/cellierUtilisateur";
import Layout from "./components/Layout";
import Auth from "./pages/Auth";
import Inscription from "./pages/Inscription";
import "./App.css";

export default function App() {
  return (
    <Layout>
      <div className="w-full max-w-screen-sm mx-auto px-4">
      <Routes>
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Auth />} />
        <Route path="/" element={<Catalogue />} />         
        <Route path="/produit/:id" element={<FicheProduit />} />
        <Route path="/celliers" element={<CellierUtilisateur />} />
      </Routes>
      </div>
    </Layout>
  );
}