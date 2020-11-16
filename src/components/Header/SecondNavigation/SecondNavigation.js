import React from "react";
import "./SecondNavigation.scss";
import Search from "./Search";
import Notification from "./Notification";

const SecondNavigation = () => {
	return (
		<div className="second-navigation">
			<Search />
			<Notification />
			<div className="profile">
				<a href="#">Profile</a>
			</div>
		</div>
	);
};

export default SecondNavigation;
