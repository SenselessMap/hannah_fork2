import { useEffect, useState, useRef } from "react";
import axiosClient from "../api/axios";

export default function Filtre({ filtre, setFiltre, ordre, setOrdre }) {
	const [identites, setIdentites] = useState([]);
	const [open, setOuvert] = useState(false);
	const [openOrder, setOuvertOrdre] = useState(false);
	const dropdownRef = useRef(null);
	const orderDropdownRef = useRef(null);
	const paysDropdownRef = useRef(null);
	const [pays, setPays] = useState([]);
	const [openPays, setOpenPays] = useState(false);

	const lesFiltresOrdre = [
		"Millésime (Croissant)",
		"Millésime (Décroissant)",
		"Prix (Croissant)",
		"Prix (Décroissant)"
	];

	useEffect(() => {
		axiosClient.get("/identite_produit") 
			.then(res => setIdentites(res.data))
			.catch(err => console.error(err));
	}, []);
	useEffect(() => {
		axiosClient.get("/pays").then(res => setPays(res.data));
	}, []);

	return (
        <form className="formulaire_de_filtre" style={{ marginBottom: "1rem" }}>
            
            <div
                ref={dropdownRef}
                className={`custom-select ${open ? "open" : ""}`}
                onClick={() => setOuvert(!open)}
            >
                <div className="selected">{filtre.identite || "Filtrez par identité"}</div>

                {open && (
                <ul className="options">
                    {identites.map(i => (
                    <li 
                        key={i} 
                        className="option" 
                        onClick={(e) => { 
                        e.stopPropagation(); 
                        setFiltre(prev => ({ ...prev, identite: i }));
                        setOuvert(false); 
                        }}
                    >
                        {i}
                    </li>
                    ))}
                </ul>
                )}
            </div>

            <div
                ref={orderDropdownRef}
                className={`custom-select ${openOrder ? "open" : ""}`}
                onClick={() => setOuvertOrdre(!openOrder)}
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

            <div
                ref={paysDropdownRef}
                className={`custom-select ${openPays ? "open" : ""}`}
                onClick={() => setOpenPays(!openPays)}
            >
                <div className="selected">
                    {filtre.pays || "Filtrer par pays"}
                </div>

                {openPays && (
                    <ul className="options">
                        {pays.map(p => (
                            <li
                                key={p}
                                className="option"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setFiltre(prev => ({ ...prev, pays: p }));
                                    setOpenPays(false);
                                }}
                            >
                                {p}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </form>
    );
}