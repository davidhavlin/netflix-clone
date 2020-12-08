import React, { useState, useEffect, useContext } from "react";
import RandomMovie from "../Home/RandomMovie";
import MovieCarousel from "../Home/MovieCarousel";
import { MovieContext } from "../App/MovieContext";
import "./Home.scss";
import { debounce } from "lodash-es";

// const API_KEY = process.env.REACT_APP_TMDB_KEY;
// const base_url = "https://api.themoviedb.org/3/movie/76341?api_key=";
// const top_movies = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
// const top_shows = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`;

const Home = () => {
	const {
		top_rated_movies,
		top_rated_shows,
		my_list,
		now_playing,
		// show_modal,
	} = useContext(MovieContext);
	const [topMovies] = top_rated_movies;
	const [topShows] = top_rated_shows;
	const [nowPlaying] = now_playing;
	// const [showModal, setShowModal] = show_modal;
	const [myList, setMyList] = my_list;
	const [windowWidth, setWindowWidth] = useState(null);

	useEffect(() => {
		// setWindowWidth(window.innerWidth);
		handleResizeEvent();
		window.addEventListener("resize", debounce(handleResizeEvent, 300));

		return () => {
			window.removeEventListener(
				"resize",
				debounce(handleResizeEvent, 300)
			);
		};
	}, []);

	const handleResizeEvent = () => {
		let newWindowWidth = window.innerWidth;
		setWindowWidth(newWindowWidth);
	};

	// const randomMovie = (array) => {
	// 	if (!movies) return;
	// 	let randomNumber = Math.floor(Math.random() * array.length);
	// 	setHighlightMovie(array[randomNumber]);
	// };

	return (
		<main>
			<RandomMovie movie={topMovies[5]} />
			<section className="carousel-section">
				<MovieCarousel
					windowWidth={windowWidth}
					title="Netflix Originals"
					movies={topShows}
					myList={myList}
					// setMyList={setMyList}
					big={true}
				/>
				<MovieCarousel
					windowWidth={windowWidth}
					title="Trending Now"
					movies={topMovies}
					myList={myList}
					setMyList={setMyList}
					big={false}
				/>
				<MovieCarousel
					windowWidth={windowWidth}
					title="New"
					movies={nowPlaying}
					myList={myList}
					setMyList={setMyList}
					big={false}
				/>
				<MovieCarousel
					windowWidth={windowWidth}
					title="My List"
					movies={myList}
					myList={myList}
					setMyList={setMyList}
					big={false}
				/>
			</section>
		</main>
	);
};

export default Home;
