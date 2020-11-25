import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import "./Profile.scss";

const Profile = ({ showNotify, setShowProfile }) => {
	const [visibleMenu, setVisibleMenu] = useState(true);
	const profile = useRef(null);
	let timeout = null;

	useEffect(() => {
		setVisibleMenu(false);
	}, []);

	useEffect(() => {
		if (showNotify) {
			setShowProfile(false);
			setVisibleMenu(false);
		}
	}, [showNotify, setShowProfile]);

	const showMenu = () => {
		clearTimeout(timeout);
		setVisibleMenu(true);
		setShowProfile(true);
	};
	const hideMenu = () => {
		timeout = setTimeout(() => {
			setVisibleMenu(false);
		}, 300);
	};

	return (
		<div
			className="profile"
			onMouseEnter={showMenu}
			onMouseLeave={hideMenu}
		>
			<div className="profile-picture"></div>
			<div className="profile-arrow"></div>
			<CSSTransition
				classNames="profile"
				in={visibleMenu}
				appear={visibleMenu}
				timeout={200}
				nodeRef={profile}
			>
				<div className="profile-dropdown" ref={profile}>
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
			</CSSTransition>
		</div>
	);
};

export default Profile;
