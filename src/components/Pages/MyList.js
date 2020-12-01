import React, { useState, useEffect, useContext } from "react";
import MovieCarousel from "../Home/MovieCarousel";
import { MovieContext } from "../App/MovieContext";

const MyList = () => {
	const { my_list } = useContext(MovieContext);
	const [myList, setMyList] = my_list;

	return (
		<section className="carousel-section">
			<h1>MyList stranka</h1>
			<MovieCarousel
				title="My List"
				movies={myList}
				myList={myList}
				setMyList={setMyList}
				big={false}
			/>
		</section>
	);
};

export default MyList;
