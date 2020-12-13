import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";

import "./Profile.scss";

const Profile = ({ showNotify, setShowProfile }) => {
	const [visibleMenu, setVisibleMenu] = useState(true);
	const profile = useRef(null);
	let timeout = null;

	useEffect(() => {
		setVisibleMenu(false);
		setTimeout(() => {
			profile.current.classList.remove("profile-hidden");
		}, 200);
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
		}, 150);
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
				<div className="profile-dropdown profile-hidden" ref={profile}>
					<div className="dropdown-top">
						<div className="kid-section">
							<div className="kid-picture"></div>
							<div className="profile-link">
								<Link className="kid-link" to="/">
									Kids
								</Link>
							</div>
						</div>
						<div className="profile-link manage">
							<Link to="/">Manage profile</Link>
						</div>
					</div>
					<div className="profile-link kids">
						<Link to="/">Kids</Link>
					</div>
					<ul className="dropdown-bottom">
						<li className="profile-link">
							<Link to="/">Account</Link>
						</li>
						<li className="profile-link">
							<Link to="/">Help Center</Link>
						</li>
						<li className="profile-link">
							<Link to="/">Sign Out of Netflix</Link>
						</li>
					</ul>
				</div>
			</CSSTransition>
		</div>
	);
};

export default Profile;
