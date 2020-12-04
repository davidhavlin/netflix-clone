import Header from "../Header/Header";
import Main from "./Main";
import React, { useContext, useEffect } from "react";
import Footer from "../Footer/Footer";
import { MovieContext } from "../App/MovieContext";
import InfoMoviePage from "../InfoPage/InfoMoviePage";

const ProviderApp = () => {
	const { show_modal, selected_movie, top_height } = useContext(MovieContext);
	const [topHeight, setTopHeight] = top_height;
	const [showModal, setShowModal] = show_modal;
	const [selectedMovie] = selected_movie;

	useEffect(() => {
		console.log("menim sa", topHeight);
		window.scrollTo(0, topHeight);
	}, [topHeight]);

	return (
		<div className="provider-app">
			<div
				className={showModal ? "App show-modal" : "App"}
				style={{ top: `-${topHeight}px` }}
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
					// fromTop={showModal ? window.scrollY : 0}
					topHeight={top_height}
				/>
			)}
			{/* <VideoMoviePage /> */}
		</div>
	);
};

export default ProviderApp;
