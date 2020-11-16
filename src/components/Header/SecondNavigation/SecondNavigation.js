import React from "react";
import "./SecondNavigation.scss";
import Search from "./Search";
import Notification from "./Notification";
import Profile from "./Profile";

const SecondNavigation = () => {
	return (
		<div className="second-navigation">
			<Search />
			<Notification />
			<Profile />
		</div>
	);
};

export default SecondNavigation;
