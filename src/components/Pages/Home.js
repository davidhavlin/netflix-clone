import React, { useState, useEffect } from "react";
import Movie from "../Home/Movie";

const API_KEY = "32b35f39c373fbebf6c7fc5e2338133e";
const base_url = "https://api.themoviedb.org/3/movie/76341?api_key=";
const top_movies = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;

const Home = () => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		// fetch(top_movies)
		// 	.then((res) => res.json())
		// 	.then((data) => {
		// 		console.log(data.results);
		// 		setMovies(data.results);
		// 	});
	}, []);

	return (
		<div>
			<h1>Home stranka</h1>

			{movies.length &&
				movies.map((movie) => <Movie {...movie} key={movie.id} />)}
		</div>
	);
};

export default Home;
