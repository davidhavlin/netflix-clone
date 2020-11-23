import React, { useState, useEffect } from "react";
import Movie from "../Home/Movie";
import RandomMovie from "../Home/RandomMovie";
import NetflixOriginals from "../Home/NetflixOriginals";

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const base_url = "https://api.themoviedb.org/3/movie/76341?api_key=";
const top_movies = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
const top_shows = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`;

const Home = () => {
	const [movies, setMovies] = useState([]);
	const [shows, setShows] = useState([]);
	const [highlightMovie, setHighlightMovie] = useState(null);

	useEffect(() => {
		fetch(top_movies)
			.then((res) => res.json())
			.then((data) => {
				setMovies(data.results);
				randomMovie(data.results);
			});
		// fetch(top_shows)
		// 	.then((res) => res.json())
		// 	.then((data) => setShows(data.results));
		// console.log(shows);
		fetchShows();
	}, []);

	const randomMovie = (array) => {
		if (!movies) return;
		let randomNumber = Math.floor(Math.random() * array.length);
		setHighlightMovie(array[randomNumber]);
	};

	const fetchShows = async () => {
		let response = await fetch(top_shows);
		let resultShows = await response.json();
		setShows(resultShows.results);
	};

	return (
		<div>
			<RandomMovie movie={highlightMovie} />
			<NetflixOriginals shows={shows} />
			{/* <TrendingNow />
            <MyList /> */}
		</div>
	);
};

export default Home;
