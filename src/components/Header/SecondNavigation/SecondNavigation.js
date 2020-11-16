import React from "react";
import "./SecondNavigation.scss";
import searchIcon from "./search-icon.svg";
import Search from "./Search";
import Profile from "./Profile";

const SecondNavigation = () => {
	return (
		<div className="second-navigation">
			<Search />
			<div className="notification">
				<a href="#">Notification</a>
			</div>
			<Profile />
		</div>
	);
};

export default SecondNavigation;
