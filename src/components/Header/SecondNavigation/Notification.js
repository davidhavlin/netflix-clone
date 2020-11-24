import React, { useState, useEffect } from "react";
import notificationBell from "./bell-icon.svg";
import "./Notification.scss";
import { CSSTransition } from 'react-transition-group';


const imgurl = "https://image.tmdb.org/t/p/w500";


const Notification = ({ movies }) => {
    const [visibleNotifications, setVisibleNotifications] = useState(false);
    let timeout = null;
    useEffect(() => {
        setVisibleNotifications(false)
    }, [])
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
			onMouseEnter={()=>{showNotifications()}}
            onMouseLeave={()=>{hideNotifications()}}
		>
			<img className="bell" src={notificationBell} alt="notification" />
			<div className="notifications-count">5</div>
            
            <CSSTransition classNames="notify" in={visibleNotifications} appear={visibleNotifications} timeout={200} >
				<div className="notification-dropdown" >
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
            </CSSTransition>
		</div>
	);
};

export default Notification;
