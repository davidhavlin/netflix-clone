import React, { useState } from "react";

const Profile = () => {
	const [visibleMenu, setVisibleMenu] = useState(true);

	const showMenu = () => {
		setVisibleMenu(true);
	};
	const hideMenu = () => {
		setVisibleMenu(false);
	};

	return (
		<div
			className="profile"
			onMouseEnter={showMenu}
			onMouseLeave={hideMenu}
		>
			<div className="profile-picture"></div>
			<div className="profile-arrow"></div>
			{visibleMenu && (
				<div className="profile-dropdown">
					<div className="dropdown-top">
						<div className="kid-section">
							<div className="kid-picture"></div>
							<div className="profile-link">
								<a className="kid-link" href="#">
									Kids
								</a>
							</div>
						</div>
						<div className="profile-link manage">
							<a href="#">Manage profile</a>
						</div>
					</div>
					<div className="profile-link kids">
						<a href="#">Kids</a>
					</div>
					<ul className="dropdown-bottom">
						<li className="profile-link">
							<a href="#">Account</a>
						</li>
						<li className="profile-link">
							<a href="#">Help Center</a>
						</li>
						<li className="profile-link">
							<a href="#">Sign Out of Netflix</a>
						</li>
					</ul>
				</div>
			)}
		</div>
	);
};

export default Profile;
