import { useEffect, useState, useRef } from "react";
import axiosClient from "../api/axios";

export default function Filtre({ filtre, setFiltre, ordre, setOrdre, setproduits }) {
	const [couleurs, setCouleurs] = useState([]);
	const [open, setOuvert] = useState(false);
	const [openOrder, setOuvertOrdre] = useState(false);
	const dropdownRef = useRef(null);
	const orderDropdownRef = useRef(null);

	const lesFiltresOrdre = [
		"Par année (Jeune-Vieux)",
		"Par année (Vieux-Jeune)",
		"Par prix (Bas-Haut)",
		"Par prix (Haut-Bas)"
	];
	const ordreMap = {
		"Par année (Jeune-Vieux)": "anneeJeuneVieux",
		"Par année (Vieux-Jeune)": "anneeVieuxJeune",
		"Par prix (Bas-Haut)": "prixBasHaut",
		"Par prix (Haut-Bas)": "prixHautBas"
	};

	useEffect(() => {
		axiosClient.get("/couleurs")
			.then(res => setCouleurs(res.data))
			.catch(err => console.error(err));
	}, []);


	useEffect(() => {
		if (!ordre) return;

		const key = ordreMap[ordre]; // Permet de sécuritairement changer le texte sans détruire les variables

		setproduits(prev => {
			const sorted = [...prev];
			if (key === "anneeJeuneVieux") sorted.sort((a,b) => a.annee - b.annee);
			else if (key === "anneeVieuxJeune") sorted.sort((a,b) => b.annee - a.annee);
			else if (key === "prixBasHaut") sorted.sort((a,b) => a.price - b.price);
			else if (key === "prixHautBas") sorted.sort((a,b) => b.price - a.price);
			return sorted;
		});
	}, [ordre]);

	// Detection de click hors du dropdown
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setOuvert(false);
			}
			else if (orderDropdownRef.current && !orderDropdownRef.current.contains(e.target)) {
				setOuvertOrdre(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<form className="formulaire_de_filtre" style={{ marginBottom: "1rem" }}>
			<div
				ref={dropdownRef}
				className={`custom-select ${open ? "open" : ""}`}
				onClick={() => setOuvert(!open)}
			>
				<div className="selected">{filtre || "Filtrez par couleur"}</div>
				{open && (
					<ul className="options">
						{couleurs.map(c => (
							<li
								key={c}
								className="option"
								onClick={() => { setFiltre(c); setOuvert(false); }}
							>
								{c}
							</li>
						))} 
					</ul>
				)}
			</div>

			<div
				ref={orderDropdownRef}
				className={`custom-select ${openOrder ? "open" : ""}`}
				onClick={() => setOuvertOrdre(!openOrder)}
				style={{ marginLeft: "1rem" }} // optional spacing between dropdowns
			>
				<div className="selected">{ordre || "Trier par"}</div>
				{openOrder && (
					<ul className="options">
						{lesFiltresOrdre.map(o => (
							<li
								key={o}
								className="option"
								onClick={() => { setOrdre(o); setOuvertOrdre(false); }}
							>
								{o}
							</li>
						))}
					</ul>
				)}
			</div>

		</form>
	);
}