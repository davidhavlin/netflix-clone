import React, { useState, useEffect, createContext } from "react";

const API_KEY = process.env.REACT_APP_TMDB_KEY;
// const top_movies_url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
const top_shows_url = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`;
const upcoming_movies_url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
const now_playing_url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
const trending_daily_url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;

export const MovieContext = createContext();

export const MovieProvider = (props) => {
	const [showModal, setShowModal] = useState(false);
	const [showVideo, setShowVideo] = useState(false);
	const [selectedMovie, setSelectedMovie] = useState({});
	const [searchedMovies, setSearchedMovies] = useState([]);
	const [topHeight, setTopHeight] = useState(0);

	const selectThisItem = (movie, type) => {
		setSelectedMovie(movie);
		if (type === "info") {
			setTopHeight(window.scrollY);
			setShowModal(true);
		} else {
			setShowVideo(true);
		}
	};

	const [myList, setMyList] = useState([]);
	useEffect(() => {
		let stored = localStorage.getItem("myList");
		if (!stored) return;
		setMyList(JSON.parse(stored));
	}, []);
	const addToMyList = (item) => {
		setMyList((prevList) => {
			const newArr = [...prevList, item];
			localStorage.setItem("myList", JSON.stringify(newArr));
			return newArr;
		});
	};
	const removeFromMyList = (item) => {
		let newArr = myList.filter((movie) => movie.id !== item.id);
		localStorage.setItem("myList", JSON.stringify(newArr));
		setMyList(newArr);
	};

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

	const [searchWord, setSearchWord] = useState("");
	const searchMovies = async (word) => {
		setSearchWord(word);
		let url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${word}&page=1&include_adult=false`;

		let response = await fetch(url);
		let data = await response.json();

		let items = data.results.filter(
			(movie) => movie.media_type !== "person"
		);
		setSearchedMovies(items);
	};

	const [pageCount, setPageCount] = useState(2);
	const searchMoreMovies = async () => {
		let url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${searchWord}&page=${pageCount}&include_adult=false`;

		let response = await fetch(url);
		let data = await response.json();
		setPageCount(pageCount + 1);

		let items = data.results.filter(
			(movie) => movie.media_type !== "person"
		);
		setSearchedMovies((prevItems) => [...prevItems, ...items]);
	};

	const [trendingMovie, setTrendingMovie] = useState({});
	const [topMovies, setTopMovies] = useState([]);
	useEffect(() => {
		fetch(trending_daily_url)
			.then((res) => res.json())
			.then((data) => {
				setTopMovies(data.results);
				setTrendingMovie(data.results[0]);
			});
	}, []);

	return (
		<MovieContext.Provider
			value={{
				trending_movie: [trendingMovie, setTrendingMovie],
				show_video: [showVideo, setShowVideo],
				list_functions: [addToMyList, removeFromMyList, selectThisItem],
				search_functions: [searchMovies, searchMoreMovies],
				show_modal: [showModal, setShowModal],
				selected_movie: [selectedMovie, setSelectedMovie],
				top_rated_movies: [topMovies, setTopMovies],
				top_rated_shows: [topShows, setTopShows],
				upcoming_movies: [upcomingMovies, setUpcomingMovies],
				now_playing: [nowPlaying, setNowPlaying],
				my_list: [myList, setMyList],
				top_height: [topHeight, setTopHeight],
				searched_movies: [searchedMovies, setSearchedMovies],
			}}
		>
			{props.children}
		</MovieContext.Provider>
	);
};
