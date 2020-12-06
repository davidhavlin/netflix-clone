import React, { useEffect, useState, useContext } from "react";
import "./Header.scss";
import MainNavigation from "./MainNavigation/MainNavigation";
import SecondNavigation from "./SecondNavigation/SecondNavigation";
import { MovieContext } from "../App/MovieContext";

const Header = () => {
	const { upcoming_movies, show_modal } = useContext(MovieContext);
	const [upcomingMovies, setUpcomingMovies] = upcoming_movies;
	const [showModal, setShowModal] = show_modal;
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		window.addEventListener("scroll", howMuchScrolled);
	}, []);

	const howMuchScrolled = () => {
		window.scrollY > 0 ? setScrolled(true) : setScrolled(false);
	};

	return (
		<header className="navigation-header">
			<nav className={scrolled || showModal ? "sticky-nav" : ""}>
				<MainNavigation />
				<SecondNavigation movies={upcomingMovies} />
			</nav>
		</header>
	);
};

export default Header;
