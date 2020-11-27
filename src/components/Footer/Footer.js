import React from "react";
import "./Footer.scss";

const Footer = () => {
	return (
		<footer className="netflix-footer">
			<section className="socials">
				<div className="icons">
					<span className="icon fb">
						<i className="fab fa-facebook-square"></i>
					</span>
					<span className="icon ig">
						<i className="fab fa-instagram-square"></i>
					</span>
					<span className="icon yt">
						<i className="fab fa-youtube"></i>
					</span>
				</div>
			</section>
			<section className="lists">
				<ul>
					<li>Audio and Subtitles</li>
					<li>Audio Description</li>
					<li>Help Center</li>
					<li>Something</li>
					<li>Media Center</li>
					<li>Gift Cards</li>
					<li>Jobs</li>
					<li>Terms of Use</li>
					<li>Privacy</li>
					<li>Legal Notices</li>
					<li>Cookies</li>
					<li>Corporate Information</li>
					<li>Contact Us</li>
				</ul>
			</section>
			<section className="bottom">
				<a
					href="https://www.davidhavlin.com/"
					className="signature"
					rel="noreferrer"
					target="_blank"
				>
					Made By David Havlín
				</a>
				<div className="copyright">
					<div className="movies">
						Movie contents are from{" "}
						<a
							href="https://www.themoviedb.org/"
							rel="noreferrer"
							target="_blank"
						>
							themoviedb.org
						</a>{" "}
					</div>
					<div className="netfliks">
						@2020 Netfliks - (Netflix Clone for learning purposes,
						just for example)
					</div>
				</div>
			</section>
		</footer>
	);
};

export default Footer;
