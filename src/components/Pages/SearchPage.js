import React, { useContext } from "react";
import { MovieContext } from "../App/MovieContext";

import "./SearchPage.scss";

const SearchPage = () => {
	const { searched_movies } = useContext(MovieContext);
	const [searchedMovies, setSearchedMovies] = searched_movies;

	return <div className="search-page">search page</div>;
};

export default SearchPage;
