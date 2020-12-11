import React, { useContext } from "react";
import "./RandomMovie.scss";
import { MovieContext } from "../App/MovieContext";

const url = "https://image.tmdb.org/t/p/w1280";

const RandomMovie = ({ movie }) => {
	const { list_functions } = useContext(MovieContext);
	const selectThisItem = list_functions[2];

	const shorterOverview = (string) => {
		if (!string) return;
		return string.length > 160 ? string.substring(0, 160) + "..." : string;
	};

	return (
		<div
			className="highlight-movie"
			style={{
				backgroundImage: movie
					? `url(${url + movie.backdrop_path})`
					: "",
			}}
		>
			<div className="movie-left-content">
				<h1 className="movie-title">
					{movie ? movie.title : "The Movie Title"}
				</h1>
				<h3 className="movie-popularity">
					{movie ? "Popularity: " + movie.vote_average : "Popularity"}
				</h3>
				<p className="movie-overview">
					{movie
						? shorterOverview(movie.overview)
						: "The Moovie description"}
				</p>
				<div className="movie-buttons">
					<button
						className="play-btn"
						onClick={() => {
							selectThisItem(movie, "video");
						}}
					>
						<span>
							<i className="fas fa-play"></i>
						</span>
						Play
					</button>
					<button
						className="info-btn"
						onClick={() => {
							selectThisItem(movie, "info");
						}}
					>
						<span>
							<i className="fas fa-info-circle"></i>
						</span>
						More Info
					</button>
				</div>
			</div>
			<div className="age-restriction">16+</div>
		</div>
	);
};

export default RandomMovie;
