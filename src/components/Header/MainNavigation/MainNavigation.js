import React, { useState } from "react";
import Netflix from "./Netflix.svg";
import { Link, NavLink } from "react-router-dom";

const MainNavigation = () => {
	const [dropDown, setDropDown] = useState(false);

	const handleClick = (e) => {
		if (dropDown) {
			setDropDown(false);
		} else {
			setDropDown(true);
		}
	};

	// const handleFocus = () => {
	// 	dropdown.current.classList.add("dropdown-show");
	// };

	return (
		<ul className="main-navigation">
			<li id="netfliks" tabIndex="0">
				<Link to="/" className="logo">
					<img src={Netflix} className="netflix-logo" alt="logo" />
				</Link>
			</li>

			<button
				className="browse-link"
				// onFocus={handleFocus}
				// onBlur={handleFocus}
				onClick={handleClick}
				// onBlur={() => {
				// 	handleBlur();
				// }}
			>
				Browse
				<div className="browse-arrow"></div>
				<div
					// className="browse-dropdown"
					className={
						dropDown
							? "browse-dropdown dropdown-show"
							: "browse-dropdown"
					}
					// onClick={handleClick}
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
