import React, { useState, useEffect, useContext } from "react";
import RandomMovie from "../Home/RandomMovie";
import NetflixOriginals from "../Home/NetflixOriginals";
import MovieCarousel from "../Home/MovieCarousel";
import { MovieContext } from "../App/MovieContext";
import "./Home.scss";

// const API_KEY = process.env.REACT_APP_TMDB_KEY;
// const base_url = "https://api.themoviedb.org/3/movie/76341?api_key=";
// const top_movies = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
// const top_shows = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`;

const Home = () => {
	const { top_rated_movies, top_rated_shows } = useContext(MovieContext);
	const [topMovies, setTopMovies] = top_rated_movies;
	const [topShows, setTopShows] = top_rated_shows;

	useEffect(() => {}, []);

	// const randomMovie = (array) => {
	// 	if (!movies) return;
	// 	let randomNumber = Math.floor(Math.random() * array.length);
	// 	setHighlightMovie(array[randomNumber]);
	// };

	return (
		<main>
			<RandomMovie movie={topMovies[5]} />
			{/* <NetflixOriginals shows={topShows} /> */}
			<section className="carousel-section">
				<MovieCarousel
					title="Netflix Originals"
					movies={topShows}
					setMovies={setTopShows}
					big={true}
				/>
				<MovieCarousel
					title="Trending Now"
					movies={topMovies}
					setMovies={setTopMovies}
					big={false}
				/>
				<MovieCarousel
					title="My List"
					movies={topMovies}
					setMovies={setTopMovies}
					big={false}
				/>
			</section>
		</main>
	);
};

export default Home;
