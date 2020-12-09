import React, { useContext, useEffect } from "react";
import { MovieContext } from "../App/MovieContext";
import MovieContainer from "../App/MovieContainer";

import "./SearchPage.scss";

const SearchPage = () => {
	const { searched_movies, search_functions } = useContext(MovieContext);
	const [searchedMovies, setSearchedMovies] = searched_movies;
	const [searchMovies, searchMoreMovies] = search_functions;

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
			{searchedMovies.length >= 20 && (
				<div className="more-btn">
					<button
						onClick={() => {
							searchMoreMovies();
						}}
					>
						More results
					</button>
				</div>
			)}
		</div>
	);
};

export default SearchPage;
