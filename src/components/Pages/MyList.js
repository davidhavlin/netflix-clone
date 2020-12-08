import React, { useEffect, useContext } from "react";
import MovieContainer from "../App/MovieContainer";
import { MovieContext } from "../App/MovieContext";
import "./MyList.scss";

const MyList = () => {
	const { my_list } = useContext(MovieContext);
	const [myList, setMyList] = my_list;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<section className="mylist-page">
			<h2>My List</h2>
			<MovieContainer movies={myList} noItems={"Your list is empty"} />
		</section>
	);
};

export default MyList;
