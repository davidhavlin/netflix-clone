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

	const pickOneMovie = (movies) => {
		return movies.find((movie) => movie.vote_average > 5);
	};

	return (
		<main>
			<RandomMovie movie={pickOneMovie(topMovies)} />
			<section className="carousel-section">
				<MovieCarousel
					title="Netflix Originals"
					movies={topShows}
					myList={myList}
					// setMyList={setMyList}
					big={true}
				/>
				<MovieCarousel
					title="Trending Now"
					movies={topMovies}
					myList={myList}
					setMyList={setMyList}
					big={false}
				/>
				<MovieCarousel
					title="New"
					movies={nowPlaying}
					myList={myList}
					setMyList={setMyList}
					big={false}
				/>
				<MovieCarousel
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
