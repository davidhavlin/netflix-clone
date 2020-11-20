import React from "react";

const url = "https://image.tmdb.org/t/p/w1280";

const Movie = ({ backdrop_path, original_title, id }) => {
	// console.log(props);

	return (
		<div>
			<h2>title: {original_title} </h2>
			<img src={url + backdrop_path} />
		</div>
	);
};

export default Movie;
