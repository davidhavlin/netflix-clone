import React from "react";
import "./SecondNavigation.scss";
import searchIcon from "./search-icon.svg";
import Search from "./Search";

const SecondNavigation = () => {
	return (
		<div className="second-navigation">
			<Search />
			<div className="notification">
				<a href="#">Notification</a>
			</div>
			<div className="profile">
				<a href="#">Profile</a>
			</div>
		</div>
	);
};

export default SecondNavigation;
