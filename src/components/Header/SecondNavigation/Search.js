import React, {
	useState,
	useRef,
	useEffect,
	useCallback,
	useContext,
} from "react";
import { Route } from "react-router-dom";
import { debounce } from "lodash-es";
import { MovieContext } from "../../App/MovieContext";

import searchIcon from "./search-icon.svg";
const api = process.env.REACT_APP_TMDB_KEY;
// const url = `https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&query=NIECO&page=1&include_adult=false`

const Search = () => {
	const { searched_movies, search_functions } = useContext(MovieContext);
	const [searchedMovies, setSearchedMovies] = searched_movies;
	const [searchMovies, searchMoreMovies] = search_functions;
	const [openedSearch, setopenedSearch] = useState(false);

	const searchInput = useRef(null);
	const container = useRef(null);

	useEffect(() => {
		document.addEventListener("click", clickListener);
	}, []);

	const clickListener = useCallback(
		(e) => {
			if (!container.current.contains(e.target)) {
				closeSearch && closeSearch();
			}
		},
		[container.current]
	);
	const closeSearch = () => {
		setopenedSearch(false);
	};

	const clickOnSearch = () => {
		setopenedSearch(true);
		setTimeout(() => {
			searchInput.current.focus();
		}, 500);
	};

	const handleTyping = (e, history) => {
		if (window.location.pathname !== "/search") history.push("/search");
		let searchedWord = e.target.value;

		if (!searchedWord) {
			history.push("/");
			return;
		}
		searchMovies(searchedWord);
	};

	const clickOnClear = (history) => {
		searchInput.current.value = "";
		history.push("/");
	};

	const debounceTyping = debounce(handleTyping, 500);

	return (
		<Route
			render={({ history }) => (
				<div
					className={openedSearch ? "search search-open" : "search"}
					onClick={clickOnSearch}
				>
					<div ref={container} className="search-container">
						<input
							ref={searchInput}
							type="text"
							placeholder="Shows, Movies, Genres"
							onChange={(e) => {
								debounceTyping(e, history);
							}}
						/>

						<img
							src={searchIcon}
							className="search-icon"
							alt="logo"
						/>
						<div
							className="clear-input-icon"
							className={
								openedSearch && searchInput.current.value
									? "clear-input-icon"
									: "clear-input-icon-hide"
							}
							onClick={() => {
								clickOnClear(history);
							}}
							id="close-search"
						>
							<i className="fas fa-times"></i>
						</div>
					</div>
				</div>
			)}
		/>
	);
};

export default Search;
