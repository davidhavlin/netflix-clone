import React from "react";
import "./RandomMovie.scss";

const RandomMovie = ({ movies }) => {
	const movie = movies[9];
	console.log(movie);

	return (
		<div>
			<h1>{movie.title}</h1>
			<p>{movie.overview}</p>
		</div>
	);
};

export default RandomMovie;
