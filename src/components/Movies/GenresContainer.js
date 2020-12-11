import React, { useEffect, useState } from "react";
import MovieCarousel from "../Home/MovieCarousel";

const API_KEY = process.env.REACT_APP_TMDB_KEY;

const GenresContainer = ({ genre, myList, setMyList, setPickMovie }) => {
	const [movies, setMovies] = useState([]);

	const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre.id}`;

	const fetchMoviesByGenre = () => {
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setMovies(data.results);
				if (setPickMovie) setPickMovie(data.results[0]); // vyberie prvy film z vysledkov a da ho do randomMovie componentu
			});
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(fetchMoviesByGenre, []);

	return (
		<MovieCarousel
			key={genre.id}
			title={genre.name}
			movies={movies}
			myList={myList}
			setMyList={setMyList}
			big={false}
		/>
	);
};

export default GenresContainer;
