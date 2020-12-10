import Header from "../Header/Header";
import Main from "./Main";
import React, { useContext, useEffect, useRef } from "react";
import Footer from "../Footer/Footer";
import { MovieContext } from "../App/MovieContext";
import InfoMoviePage from "../InfoPage/InfoMoviePage";
import VideoMoviePage from "../VideoMoviePage/VideoMoviePage";

const ProviderApp = () => {
	const { show_modal, show_video, selected_movie, top_height } = useContext(
		MovieContext
	);
	const [showVideo, setShowVideo] = show_video;
	const [topHeight, setTopHeight] = top_height;
	const [showModal, setShowModal] = show_modal;
	const [selectedMovie] = selected_movie;

	const elApp = useRef(null);

	// useEffect(() => {
	// 	window.scrollTo(0, topHeight);
	// }, [topHeight]);

	useEffect(() => {
		if (!showModal) {
			setTimeout(() => {
				elApp.current.classList.remove("show-modal");
				window.scrollTo(0, topHeight);
			}, 0);
		} else {
			elApp.current.classList.add("show-modal");
		}
	}, [showModal]);

	return (
		<div className="provider-app">
			<div ref={elApp} className="App" style={{ top: `-${topHeight}px` }}>
				<Header />
				<Main />
				<Footer />
			</div>
			{showModal && (
				<InfoMoviePage
					selectedMovie={selectedMovie}
					showModal={showModal}
					setShowModal={setShowModal}
					topHeight={top_height}
				/>
			)}
			{showVideo && (
				<VideoMoviePage
					selectedMovie={selectedMovie}
					setShowVideo={setShowVideo}
				/>
			)}
		</div>
	);
};

export default ProviderApp;
