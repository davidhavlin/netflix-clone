import React, { useState, useRef, useEffect, useCallback } from "react";
// import
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

	const skuska = (e) => {
		console.log(e.target.value);
		// window.location.assign("/search");
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
					onChange={skuska}
				/>

				<img src={searchIcon} className="search-icon" alt="logo" />
			</div>
		</div>
	);
};

export default Search;
