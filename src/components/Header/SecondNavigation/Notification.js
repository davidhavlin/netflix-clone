import React, { useState, useEffect, useRef } from "react";
import notificationBell from "./bell-icon.svg";
import "./Notification.scss";
import { CSSTransition } from "react-transition-group";

const imgurl = "https://image.tmdb.org/t/p/w500";

const Notification = ({ movies, showProfile, setShowNotify }) => {
	const [visibleNotifications, setVisibleNotifications] = useState(true);
	const [notifyVisited, setNotifyVisited] = useState(false);
	const notify = useRef(null);
	let timeout = null;

	useEffect(() => {
		setVisibleNotifications(false);
	}, []);

	useEffect(() => {
		if (showProfile) {
			setShowNotify(false);
			setVisibleNotifications(false);
		}
	}, [showProfile, setShowNotify]);

	const showNotifications = () => {
		setShowNotify(true);
		setNotifyVisited(true);
		setVisibleNotifications(true);
		clearTimeout(timeout);
	};
	const hideNotifications = () => {
		timeout = setTimeout(() => {
			setVisibleNotifications(false);
		}, 300);
	};

	const shorterOverview = (string) => {
		return string.length > 100 ? string.substring(0, 100) + "..." : string;
	};

	return (
		<div
			className="notification"
			onMouseEnter={() => {
				showNotifications();
			}}
			onMouseLeave={() => {
				hideNotifications();
			}}
		>
			<img className="bell" src={notificationBell} alt="notification" />
			{!notifyVisited && (
				<div className="notifications-count">{movies.length}</div>
			)}

			<CSSTransition
				classNames="notify"
				in={visibleNotifications}
				appear={visibleNotifications}
				timeout={200}
				nodeRef={notify}
			>
				<div className="notification-dropdown" ref={notify}>
					<div className="notifications">
						{movies &&
							movies.map((movie) => {
								return (
									<div key={movie.id} className="notify">
										<div
											className="notify-bg"
											style={{
												backgroundImage: `url(${
													imgurl + movie.poster_path
												})`,
											}}
										></div>
										<section className="notify-article">
											<h3 className="notify-title">
												{movie.title}
											</h3>
											<p className="notify-text">
												{shorterOverview(
													movie.overview
												)}
											</p>
										</section>
									</div>
								);
							})}
					</div>
				</div>
			</CSSTransition>
		</div>
	);
};

export default Notification;
