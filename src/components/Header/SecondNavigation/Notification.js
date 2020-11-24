import React, { useState, useContext } from "react";
import notificationBell from "./bell-icon.svg";
import "./Notification.scss";

const imgurl = "https://image.tmdb.org/t/p/w500";

const Notification = ({ movies }) => {
	const [visibleNotifications, setVisibleNotifications] = useState(true);
	let timeout = null;

	const showNotifications = () => {
		setVisibleNotifications(true);
		clearTimeout(timeout);
	};
	const hideNotifications = () => {
		timeout = setTimeout(() => {
			setVisibleNotifications(false);
		}, 300);
	};

	return (
		<div
			className="notification"
			onMouseEnter={showNotifications}
			onMouseLeave={hideNotifications}
		>
			<img className="bell" src={notificationBell} alt="notification" />
			<div className="notifications-count">5</div>
			{visibleNotifications && (
				<div className="notification-dropdown">
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
												{movie.overview}
											</p>
										</section>
									</div>
								);
							})}
					</div>
				</div>
			)}
		</div>
	);
};

export default Notification;
