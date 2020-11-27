import React, { useState, useEffect, useContext } from "react";
import MovieCarousel from "../Home/MovieCarousel";
import { MovieContext } from "../App/MovieContext";

const MyList = () => {
	const { top_rated_shows } = useContext(MovieContext);
	const [topShows, setTopShows] = top_rated_shows;

	return (
		<section className="carousel-section">
			<h1>MyList stranka</h1>
			<MovieCarousel
				title="My List"
				movies={topShows}
				setMovies={setTopShows}
				big={false}
			/>
		</section>
	);
};

export default MyList;
