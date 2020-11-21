import React, { useState, useEffect } from "react";
import Movie from "../Home/Movie";
import RandomMovie from "../Home/RandomMovie";

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const base_url = "https://api.themoviedb.org/3/movie/76341?api_key=";
const top_movies = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;

const Home = () => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		fetch(top_movies)
			.then((res) => res.json())
			.then((data) => {
				setMovies(data.results);
			});
	}, []);

	return (
		<div>
			<RandomMovie movies={movies} />

			{movies.length &&
				movies.map((movie) => <Movie {...movie} key={movie.id} />)}
		</div>
	);
};

export default Home;
