import React, { useState, useRef, useEffect, useCallback } from "react";
import searchIcon from "./search-icon.svg";

const Search = () => {
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
	return (
		<div
			className={openedSearch ? "search search-open" : "search"}
			onClick={clickOnSearch}
		>
			<div ref={ref} className="search-container">
				<input
					ref={searchInput}
					type="text"
					placeholder="Shows, Movies, Genres"
				/>

				<img src={searchIcon} className="search-icon" alt="logo" />
			</div>
		</div>
	);
};

export default Search;
