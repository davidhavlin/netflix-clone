import React, { useContext, useEffect } from "react";
import { MovieContext } from "../App/MovieContext";
import MovieContainer from "../App/MovieContainer";

import "./SearchPage.scss";

const SearchPage = () => {
	const { searched_movies } = useContext(MovieContext);
	const [searchedMovies, setSearchedMovies] = searched_movies;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="search-page">
			<h2>Search Results</h2>
			<MovieContainer
				movies={searchedMovies}
				noItems={"No search results"}
			/>
		</div>
	);
};

export default SearchPage;
