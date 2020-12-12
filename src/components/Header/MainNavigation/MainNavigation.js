import React from "react";
import Netflix from "./Netflix.svg";
import { Link, NavLink } from "react-router-dom";

const MainNavigation = () => {
	const handleClick = (e) => {
		// e.currentTarget.style.opacity = 0;
		// e.currentTarget.style.pointerEvents = "none";
	};

	const handleFocus = (e) => {
		console.log("focus");
		// document.getElementById("dropdown").style.opacity = 1;
		// document.getElementById("dropdown").style.pointerEvents = "initial";
	};

	return (
		<ul className="main-navigation">
			<li id="netfliks" tabIndex="0">
				<Link to="/" className="logo">
					<img src={Netflix} className="netflix-logo" alt="logo" />
				</Link>
			</li>

			<button
				className="browse-link"
				onFocus={handleFocus}
				onBlur={handleFocus}
			>
				Browse
				<div className="browse-arrow"></div>
				<div
					id="dropdown"
					className="browse-dropdown"
					onClick={handleClick}
				>
					<NavLink
						className="browse-nav-link"
						exact
						to="/"
						activeClassName="active-link"
					>
						Home
					</NavLink>
					<NavLink
						className="browse-nav-link"
						exact
						to="/movies"
						activeClassName="active-link"
					>
						Movies
					</NavLink>
					<NavLink
						className="browse-nav-link"
						exact
						to="/mylist"
						activeClassName="active-link"
					>
						My List
					</NavLink>
				</div>
			</button>

			<li className="link-container">
				<NavLink
					className="nav-link"
					exact
					to="/"
					activeClassName="active-link"
				>
					Home
				</NavLink>
			</li>
			<li className="link-container">
				<NavLink
					className="nav-link"
					exact
					to="/movies"
					activeClassName="active-link"
				>
					Movies
				</NavLink>
			</li>
			<li className="link-container">
				<NavLink
					className="nav-link"
					exact
					to="/mylist"
					activeClassName="active-link"
				>
					My List
				</NavLink>
			</li>
		</ul>
	);
};

export default MainNavigation;
