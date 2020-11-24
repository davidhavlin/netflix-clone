import React, { useEffect } from "react";
import ShowsCarousel from "./ShowsCarousel";
import "./NetflixOriginals.scss";

const NetflixOriginals = ({ shows }) => {
	useEffect(() => {
		// console.log(shows);
	}, [shows]);

	return (
		<section className="netflix-originals">
			<h3 className="originals-title">Netflix Originals</h3>
			<ShowsCarousel shows={shows} />
		</section>
	);
};

export default NetflixOriginals;
