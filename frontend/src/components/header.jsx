import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import BoutonDeconnexion from "./boutonDeconnexion";

export default function Header({deconnexion}) {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [compteOuvert, setCompteOuvert] = useState(false);
 

  return (
    <>
      {/* ===== HEADER DESKTOP ===== */}
      <header className="bg-orange-50 border-b border- py-4 px-6 shadow flex justify-between items-center">

        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-medium tracking-tight text-red-950"
        >
          Vino
        </Link>

        {/* BARRE DE RECHERCHE */}
        <div className="hidden md:flex items-center w-1/4 bg-white rounded-full px-4 py-2 border border-red-950">
          <Search className="text-red-950 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher un vin..."
            className="ml-2 w-full bg-transparent focus:outline-none text-red-950"
          />
        </div>

        {/* NAVIGATION DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 text-lg font-medium">

          <Link to="/" className="hover:text-red-950 transition">
            Catalogue
          </Link>

          {/* Sous-menu Mon compte */}
          <div className="relative group">
            <button className="flex items-center gap-2 hover:text-red-950">
              Mon compte 
            </button>

            <div className="absolute hidden group-hover:flex flex-col bg-white border border-orange-50 shadow rounded mt-2 w-50 p-3 z-40">
              <Link to="/compte" className="hover:text-red-950">
                Gérer mon compte
              </Link>
              <Link to="/celliers" className="hover:text-red-950">
                Mon cellier
              </Link>
              <Link to="/cellier/creer" className="hover:text-red-950">
                Ajouter un cellier
              </Link> 
            </div>
          </div>

          <Link to="/inscription" className="hover:text-red-950">
            Inscription
          </Link>

          {/* Connexion */}
          <Link
            to="/connexion"
            className="bg-red-950 text-white px-4 py-2 rounded-lg hover:bg-red-200 hover:text-red-950 transition"
          >
            Connexion
          </Link>
          <BoutonDeconnexion deconnexion={deconnexion} />
        </nav>


        {/* Icônes Mobile */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setMenuOuvert(true)}>
            <Menu className="w-7 h-7 text-red-950" />
          </button>
        </div>
      </header>

     {/* ===== MENU MOBILE ===== */}
  <aside
    className={`fixed top-0 left-0 h-full w-72 bg-orange-50 shadow-2xl p-6 z-50 transform transition-transform duration-300 md:hidden
      ${menuOuvert ? "translate-x-0" : "-translate-x-full"}`}
  >
    {/* En-tête mobile */}
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl font-serif text-red-950">Vino</h2>
      <button onClick={() => setMenuOuvert(false)}>
        <X className="w-8 h-8 text-red-950" />
      </button>
    </div>

    {/* Barre recherche mobile */}
    <div className="bg-white rounded-full px-4 py-2 flex items-center mb-8 border border-vino-sable">
      <Search className="text-red-950 w-5 h-5" />
      <input
        type="text"
        placeholder="Rechercher..."
        className="ml-2 w-full bg-transparent focus:outline-none text-vred-950"
      />
    </div>

    {/* MENU MOBILE */}
    <nav className="flex flex-col gap-4 text-lg font-medium">

      <Link
        to="/"
        className="hover:text-red-950"
        onClick={() => setMenuOuvert(false)}   //  Ferme le menu
      >
        Catalogue
      </Link>

      {/* Sous-menu Mon compte */}
      <button
        onClick={() => setCompteOuvert(!compteOuvert)}
        className="flex justify-between w-full text-left hover:text-red-950"
      >
        Mon compte
        {compteOuvert ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>

      {compteOuvert && (
        <div className="ml-4 flex flex-col gap-2">
          <Link
            to="/compte"
            className="hover:text-red-950"
            onClick={() => setMenuOuvert(false)}   //  Ferme le menu
          >
            Gérer mon compte
          </Link>
          <Link
            to="/cellier"
            className="hover:text-red-950"
            onClick={() => setMenuOuvert(false)}   // Ferme le menu
          >
            Mes celliers
          </Link>
          <Link
            to="/cellier/creer"
            className="hover:text-red-950"
            onClick={() => setMenuOuvert(false)}   // Ferme le menu
          >
            Ajouter un cellier
          </Link>
        </div>
      )}

      <Link
        to="/inscription"
        className="hover:text-red-950"
        onClick={() => setMenuOuvert(false)}  
      >
        Inscription
      </Link>

      <Link
        to="/connexion"
        className="mt-6 bg-red-950 text-white text-center py-3 rounded-lg hover:text-red-950 hover:bg-red-100 transition"
        onClick={() => setMenuOuvert(false)}   
      >
        Connexion
      </Link>
      <BoutonDeconnexion deconnexion={deconnexion} />
    </nav>
  </aside>

  </>
  );
}
