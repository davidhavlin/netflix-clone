import React, { useState } from "react";
import "./SecondNavigation.scss";
import Search from "./Search";
import Notification from "./Notification";
import Profile from "./Profile";

const SecondNavigation = ({ movies }) => {
	const [showProfile, setShowProfile] = useState(null);
	const [showNotify, setShowNotify] = useState(null);

	return (
		<div className="second-navigation">
			<Search />
			<Notification
				showProfile={showProfile}
				setShowNotify={setShowNotify}
				movies={movies}
			/>
			<Profile showNotify={showNotify} setShowProfile={setShowProfile} />
		</div>
	);
};

export default SecondNavigation;
