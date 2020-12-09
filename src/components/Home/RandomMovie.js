import React, { useContext } from "react";
import "./RandomMovie.scss";
import { MovieContext } from "../App/MovieContext";

const url = "https://image.tmdb.org/t/p/w1280";

const RandomMovie = () => {
	const { list_functions, trending_movie } = useContext(MovieContext);
	const [addToMyList, removeFromMyList, selectThisItem] = list_functions;
	const [trendingMovie] = trending_movie;

	const shorterOverview = (string) => {
		if (!string) return;
		return string.length > 160 ? string.substring(0, 160) + "..." : string;
	};

	return (
		<div
			className="highlight-movie"
			style={{
				backgroundImage: trendingMovie
					? `url(${url + trendingMovie.backdrop_path})`
					: "",
			}}
		>
			<div className="movie-left-content">
				<h1 className="movie-title">
					{trendingMovie ? trendingMovie.title : "The Movie Title"}
				</h1>
				<h3 className="movie-popularity">
					{trendingMovie
						? "Popularity: " + trendingMovie.vote_average
						: "Popularity"}
				</h3>
				<p className="movie-overview">
					{trendingMovie
						? shorterOverview(trendingMovie.overview)
						: "The Moovie description"}
				</p>
				<div className="movie-buttons">
					<button
						className="play-btn"
						onClick={() => {
							selectThisItem(trendingMovie, "video");
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
							selectThisItem(trendingMovie, "info");
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
