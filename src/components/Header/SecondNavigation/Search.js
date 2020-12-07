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
	const { searched_movies } = useContext(MovieContext);
	const [searchedMovies, setSearchedMovies] = searched_movies;
	const [openedSearch, setopenedSearch] = useState(false);

	const searchInput = useRef(null);
	const ref = useRef(null);

	useEffect(() => {
		document.addEventListener("click", clickListener);
	}, []);

	const clickListener = useCallback(
		(e) => {
			if (!ref.current.contains(e.target)) {
				closeSearch && closeSearch();
			}
		},
		[ref.current]
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
		if (window.location.pathname !== "/search") {
			history.push("/search");
			console.log("redirect");
		}
		let searchedWord = e.target.value;
		searchMovies(searchedWord);
		console.log(e.target.value, window.location);
		// window.location.assign("/search");

		if (!e.target.value) {
			history.push("/");
		}
	};

	const searchMovies = async (word) => {
		let url = `https://api.themoviedb.org/3/search/multi?api_key=${api}&language=en-US&query=${word}&page=1&include_adult=false`;

		let response = await fetch(url);
		let data = await response.json();

		let items = data.results.filter(
			(movie) => movie.media_type !== "person"
		);
		console.log(items, data.results);
		setSearchedMovies(items);
	};

	const debounceTyping = debounce(handleTyping, 500);

	return (
		<Route
			render={({ history }) => (
				<div
					className={openedSearch ? "search search-open" : "search"}
					onClick={clickOnSearch}
				>
					<div ref={ref} className="search-container">
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
					</div>
				</div>
			)}
		/>
	);
};

export default Search;
