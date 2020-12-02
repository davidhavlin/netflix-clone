import Header from "../Header/Header";
import Main from "./Main";
import React, { useContext } from "react";
import Footer from "../Footer/Footer";
import { MovieContext } from "../App/MovieContext";
import InfoMoviePage from "../InfoPage/InfoMoviePage";

const ProviderApp = () => {
	const { show_modal, selected_movie } = useContext(MovieContext);
	const [showModal, setShowModal] = show_modal;
	const [selectedMovie, setSelectedMovie] = selected_movie;

	return (
		<div className="provider-app">
			<div
				className="App"
				className={showModal ? "App show-modal" : "App"}
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
				/>
			)}
		</div>
	);
};

export default ProviderApp;
