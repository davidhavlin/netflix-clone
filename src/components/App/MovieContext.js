import React, { useState, useEffect, createContext } from "react";

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const top_movies_url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
const top_shows_url = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`;
const upcoming_movies_url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
const now_playing_url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;

export const MovieContext = createContext();

export const MovieProvider = (props) => {
	// const [infoModal, setInfoModal] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [showVideo, setShowVideo] = useState(false);
	const [selectedMovie, setSelectedMovie] = useState({});

	const [myList, setMyList] = useState([]);
	const addToMyList = (item) => {
		setMyList((prevList) => [...prevList, item]);
	};
	const removeFromMyList = (item) => {
		let newArr = myList.filter((movie) => movie.id !== item.id);
		setMyList(newArr);
	};

	const [topMovies, setTopMovies] = useState([]);
	useEffect(() => {
		fetch(top_movies_url)
			.then((res) => res.json())
			.then((data) => {
				setTopMovies(data.results);
				// console.log(data.results);
			});
	}, []);

	const [topShows, setTopShows] = useState([]);
	useEffect(() => {
		fetch(top_shows_url)
			.then((res) => res.json())
			.then((data) => {
				setTopShows(data.results);
			});
	}, []);

	const [upcomingMovies, setUpcomingMovies] = useState([]);
	useEffect(() => {
		fetch(upcoming_movies_url)
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

	const [nowPlaying, setNowPlaying] = useState([]);
	useEffect(() => {
		fetch(now_playing_url)
			.then((res) => res.json())
			.then((data) => {
				setNowPlaying(data.results);
			});
	}, []);

	return (
		<MovieContext.Provider
			value={{
				list_functions: [addToMyList, removeFromMyList],
				show_modal: [showModal, setShowModal],
				selected_movie: [selectedMovie, setSelectedMovie],
				top_rated_movies: [topMovies, setTopMovies],
				top_rated_shows: [topShows, setTopShows],
				upcoming_movies: [upcomingMovies, setUpcomingMovies],
				now_playing: [nowPlaying, setNowPlaying],
				my_list: [myList, setMyList],
			}}
		>
			{props.children}
		</MovieContext.Provider>
	);
};
