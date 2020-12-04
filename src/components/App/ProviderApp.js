import Header from "../Header/Header";
import Main from "./Main";
import React, { useContext, useEffect } from "react";
import Footer from "../Footer/Footer";
import { MovieContext } from "../App/MovieContext";
import InfoMoviePage from "../InfoPage/InfoMoviePage";

const ProviderApp = () => {
	const { show_modal, selected_movie } = useContext(MovieContext);
	const [showModal, setShowModal] = show_modal;
	const [selectedMovie] = selected_movie;

	const heightFromTop = () => {
		if (!showModal) return;
		console.log("spustam sa", showModal);
		return `-${window.scrollY}px`; // tu je chyba *******************************************
	};

	return (
		<div className="provider-app">
			<div
				className={showModal ? "App show-modal" : "App"}
				style={{ top: heightFromTop() }}
			>
				<Header />
				<Main />
				<Footer />
			</div>
			{showModal && (
				<InfoMoviePage
					showModal={showModal}
					setShowModal={setShowModal}
					selectedMovie={selectedMovie}
					fromTop={showModal ? window.scrollY : 0}
				/>
			)}
			{/* <VideoMoviePage /> */}
		</div>
	);
};

export default ProviderApp;
