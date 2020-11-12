import React from "react";
import Netflix from "./Netflix.svg";
import { Link, NavLink } from "react-router-dom";

const MainNavigation = () => {
	return (
		<ul className="main-navigation">
			<li>
				<Link to="/">
					<img src={Netflix} className="netflix-logo" alt="logo" />
				</Link>
			</li>
			<li>
				<NavLink exact to="/" activeClassName="active-link">
					Home
				</NavLink>
			</li>
			<li>
				<NavLink exact to="/movies" activeClassName="active-link">
					Movies
				</NavLink>
			</li>
			<li>
				<NavLink exact to="/mylist" activeClassName="active-link">
					My List
				</NavLink>
			</li>
		</ul>
	);
};

export default MainNavigation;
