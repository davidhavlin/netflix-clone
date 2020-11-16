import React, { useState } from "react";
import notificationBell from "./bell-icon.svg";
import NotificationList from './NotificationList'
import './Notification.scss'

const Notification = () => {
    const [visibleNotifications, setVisibleNotifications] = useState(true);
    const [notifications, setNotifications] = useState([
        {title:'Hala', id:0},
        {title:'bala', id:1},
        {title:'eniky', id:2},
        {title:'beniky', id:3},
        {title:'kliky', id:4},
        {title:'bee', id:5}
    ]);
    let timeout = null;

    const showNotifications = () => {
        setVisibleNotifications(true)
        clearTimeout(timeout)
    }
    const hideNotifications = () => {
        timeout = setTimeout(()=>{
            setVisibleNotifications(false)
        }, 300)
    }

	return (
		<div className="notification" onMouseEnter={showNotifications} onMouseLeave={hideNotifications}>
			<img className="bell" src={notificationBell} alt="notification" />
            <div className="notifications">5</div>
            {visibleNotifications && 
            <div className="notification-dropdown">
                {
                notifications.map(notify => {
                    return  <div className="notify"> 
                                <div className="notify-bg"></div>
                                <h3 className="notify-title">{notify.title}</h3>
                                <p className="notify-text">samting</p>
                            </div>
                })
                }
            </div> 
            }
		</div>
	);
};

export default Notification;
