import React from "react";
import "./SecondNavigation.scss";
import Search from "./Search";
import Notification from "./Notification";
import Profile from "./Profile";

const SecondNavigation = ({ movies }) => {
	return (
		<div className="second-navigation">
			<Search />
			<Notification movies={movies} />
			<Profile />
		</div>
	);
};

export default SecondNavigation;
