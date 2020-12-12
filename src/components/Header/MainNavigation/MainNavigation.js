import React from "react";
import Netflix from "./Netflix.svg";
import { Link, NavLink } from "react-router-dom";

const MainNavigation = ({ windowWidth }) => {
	return (
		<ul className="main-navigation">
			<li>
				<Link to="/" className="logo">
					<img src={Netflix} className="netflix-logo" alt="logo" />
				</Link>
			</li>
			{/* {windowWidth < 600 ? <MobileNav /> : } */}
			<button className="browse-link">
				Browse
				<div className="browse-arrow"></div>
				<div className="browse-dropdown">
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
