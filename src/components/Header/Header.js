import React, { useEffect, useState } from "react";
import "./Header.scss";
import MainNavigation from "./MainNavigation/MainNavigation";
import SecondNavigation from "./SecondNavigation/SecondNavigation";

const Header = () => {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			window.scrollY > 0 ? setScrolled(true) : setScrolled(false);
		});
	}, []);

	return (
		<header className="navigation-header">
			<nav className={scrolled ? "sticky-nav" : ""}>
				<MainNavigation />
				<SecondNavigation />
			</nav>
		</header>
	);
};

export default Header;
