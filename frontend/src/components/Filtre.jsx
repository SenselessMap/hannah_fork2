import { useEffect, useState, useRef } from "react";
import axiosClient from "../api/axios";

export default function Filtre({ setFilter, filter, setOrder, order }) {
	const [couleurs, setCouleurs] = useState([]);
	const [open, setOpen] = useState(false);
	const [openOrder, setOpenOrder] = useState(false);
	const dropdownRef = useRef(null);
	const orderDropdownRef = useRef(null);

	useEffect(() => {
		axiosClient.get("/couleurs")
			.then(res => setCouleurs(res.data))
			.catch(err => console.error(err));
	}, []);

	// close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setOpen(false);
			}
			if (orderDropdownRef.current && !orderDropdownRef.current.contains(e.target)) {
				setOpenOrder(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const orderOptions = [
		"Par année (jeune - vieux)",
		"Par année (vieux - jeune)",
		"Par prix (bas - haut)",
		"Par prix (haut - bas)"
	];

	return (
		<form className="formulaire_de_filtre" style={{ marginBottom: "1rem" }}>

			{/* Couleur dropdown */}
			<div
				ref={dropdownRef}
				className={`custom-select ${open ? "open" : ""}`}
				onClick={() => setOpen(!open)}
			>
				<div className="selected">{filter || "Filtrez par couleur"}</div>
				{open && (
					<ul className="options">
						{couleurs.map(c => (
							<li
								key={c}
								className="option"
								onClick={() => { setFilter(c); setOpen(false); }}
							>
								{c}
							</li>
						))}
					</ul>
				)}
			</div>

			{/* Order dropdown */}
			<div
				ref={orderDropdownRef}
				className={`custom-select ${openOrder ? "open" : ""}`}
				onClick={() => setOpenOrder(!openOrder)}
				style={{ marginLeft: "1rem" }} // optional spacing between dropdowns
			>
				<div className="selected">{order || "Trier par"}</div>
				{openOrder && (
					<ul className="options">
						{orderOptions.map(o => (
							<li
								key={o}
								className="option"
								onClick={() => { setOrder(o); setOpenOrder(false); }}
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
