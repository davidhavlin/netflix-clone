import React from "react";

const MovieCarouselText = ({ movie }) => {
	return (
		<section className="text-section">
			<h4>{movie.name || movie.title}</h4>
			<p>
				Rating: {movie.vote_average}
				<span className="age-res">
					{movie.vote_average > 8 ? "16+" : "12+"}
				</span>{" "}
				<span>Limited Series</span>
			</p>
		</section>
	);
};

export default MovieCarouselText;
