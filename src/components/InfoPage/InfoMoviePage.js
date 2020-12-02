import React, { useState, useEffect } from "react";
import { MovieContext } from "../App/MovieContext";
import "./InfoMoviePage.scss";

const InfoMoviePage = ({ showModal, setShowModal, selectedMovie }) => {
	// const { top_rated_movies, top_rated_shows, my_list } = useContext(
	// 	MovieContext
	// );
	// const [topMovies, setTopMovies] = top_rated_movies;
	const handleClick = () => {
		setShowModal(false);
	};

	console.log("z info modalu", selectedMovie);

	return (
		<div className="info-page-modal">
			<section className="modal-box">
				<div className="box-poster">
					<div className="exit-btn" onClick={handleClick}>
						<i class="far fa-times-circle"></i>
					</div>
					<div className="poster-title">Movie Title</div>
					<div className="poster-buttons"></div>
				</div>
				<div className="box-content">
					<section className="text-content">
						<div className="text-left">
							<p className="info">98% match 2013 16+ 5 seasons</p>
							<p className="overview">
								A high School teacher dying of cancer teams with
								a former student
							</p>
						</div>
						<div className="text-right">
							<p className="genres">Genres: drama</p>
							<p className="country">Country: usa</p>
						</div>
					</section>
					<section className="similiar-movies">
						<h2>More Like This</h2>
						<div className="movies-container">
							<div className="sim-movie"></div>
							<div className="sim-movie"></div>
							<div className="sim-movie"></div>
							<div className="sim-movie"></div>
						</div>
					</section>
					<div>{selectedMovie.length}</div>
				</div>
			</section>
			<div className="modal-bg"></div>
		</div>
	);
};

export default InfoMoviePage;
