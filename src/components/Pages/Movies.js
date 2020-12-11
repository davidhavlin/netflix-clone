import React, { useState, useContext, useEffect } from "react";
import { MovieContext } from "../App/MovieContext";
import "./Movies.scss";
import GenresContainer from "../Movies/GenresContainer";
import RandomMovie from "../Home/RandomMovie";
import MoviesNavigation from "../Movies/MoviesNavigation";

const Movies = () => {
	const { my_list } = useContext(MovieContext);
	const [myList, setMyList] = my_list;
	const [pickMovie, setPickMovie] = useState({});
	const [genres, setGenres] = useState([
		{ name: "Horrors", id: 27 },
		{ name: "Comedy", id: 35 },
		{ name: "Adventure", id: 12 },
		{ name: "Science Fiction", id: 878 },
		{ name: "Mystery", id: 9648 },
	]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<section className="movies-page">
			<MoviesNavigation setGenres={setGenres} genres={genres} />
			<RandomMovie movie={pickMovie} />
			<section className="carousel-section">
				{genres.map((genre, index) => {
					return (
						<GenresContainer
							key={genre.name}
							genre={genre}
							myList={myList}
							setMyList={setMyList}
							setPickMovie={index === 0 && setPickMovie}
						/>
					);
				})}
			</section>
		</section>
	);
};

export default Movies;
