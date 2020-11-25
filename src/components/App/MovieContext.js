import React, { useState, useEffect, createContext } from "react";

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const top_movies = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
const top_shows = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`;
const upcoming_movies = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;

export const MovieContext = createContext();

export const MovieProvider = (props) => {
	const [myList, setMyList] = useState([]);

	const [topMovies, setTopMovies] = useState([]);
	useEffect(() => {
		fetch(top_movies)
			.then((res) => res.json())
			.then((data) => {
				setTopMovies(data.results);
				console.log(data.results);
			});
	}, []);

	const [topShows, setTopShows] = useState([]);
	useEffect(() => {
		fetch(top_shows)
			.then((res) => res.json())
			.then((data) => {
				setTopShows(data.results);
			});
	}, []);

	const [upcomingMovies, setUpcomingMovies] = useState([]);
	useEffect(() => {
		fetch(upcoming_movies)
			.then((res) => res.json())
			.then((data) => {
				let num = Math.floor(
					Math.random() * (data.results.length - 4) + 4
				);
				let arr = data.results;
				arr.length = num;
				setUpcomingMovies(arr);
			});
	}, []);

	return (
		<MovieContext.Provider
			value={{
				top_rated_movies: [topMovies, setTopMovies],
				top_rated_shows: [topShows, setTopShows],
				upcoming_movies: [upcomingMovies, setUpcomingMovies],
				my_list: [myList, setMyList],
			}}
		>
			{props.children}
		</MovieContext.Provider>
	);
};
