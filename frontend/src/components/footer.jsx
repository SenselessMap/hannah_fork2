import { Github } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  return (
    <footer className="mt-20 bg-orange-50 text-red-950">

      {/* SECTION HAUT — TITRE & DESCRIPTION */}
      <div className="text-center px-6 py-12 max-w-3xl mx-auto">

        <h2 className="text-4xl font-serif mb-4">Vino</h2>

        <p className="text-sm leading-relaxed mb-8">
         Découvrez, gérez et savourez vos bouteilles favorites.
          Suivez vos celliers, explorez votre collection et profitez pleinement de l’univers du vin.
        </p>

        {/* Icône GitHub */}
        <div className="flex justify-center mt-6">
          <a
            href="https://github.com/Equipe-MCHNC/graphql-laravel-react"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub du projet"
            className="hover:scale-110 transition"
          >
            <Github className="w-8 h-8" />
          </a>
        </div>

      </div>

      {/* SECTION LIENS NAVIGATION (dynamique selon état de connexion) */}
      <div className="border-t border-red-200 py-8">
        <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium">

          <Link to="/" className="hover:text-red-700">Catalogue</Link>

          {/* === Connecté === */}
          {token && user && (
            <>
              <Link to="/celliers" className="hover:text-red-700">Mes celliers</Link>
              <Link to="/compte" className="hover:text-red-700">Mon compte</Link>

              <button
                className="text-red-950 hover:text-red-700"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  window.location.reload();
                }}
              >
                Déconnexion
              </button>
            </>
          )}

          {/* === Non connecté === */}
          {(!token || !user) && (
            <>
              <Link to="/inscription" className="hover:text-red-700">Inscription</Link>
              <Link to="/connexion" className="hover:text-red-700">Connexion</Link>
            </>
          )}

        </nav>
      </div>

      {/* BAS DE PAGE */}
      <div className="bg-red-950 text-white text-center py-4 text-xs sm:text-sm">
        © 2025 Vino — Tous droits reservés.
      </div>

    </footer>
  );
}
