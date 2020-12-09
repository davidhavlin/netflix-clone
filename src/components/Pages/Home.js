import React, { useState, useEffect, useContext } from "react";
import RandomMovie from "../Home/RandomMovie";
import MovieCarousel from "../Home/MovieCarousel";
import { MovieContext } from "../App/MovieContext";
import "./Home.scss";
import { debounce } from "lodash-es";

const Home = () => {
	const {
		top_rated_movies,
		top_rated_shows,
		my_list,
		now_playing,
	} = useContext(MovieContext);
	const [topMovies] = top_rated_movies;
	const [topShows] = top_rated_shows;
	const [nowPlaying] = now_playing;
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

	return (
		<main>
			<RandomMovie />
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
