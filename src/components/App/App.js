import "./App.css";
// import Header from "../Header/Header";
// import Main from "./Main";
import React from "react";
// import Footer from "../Footer/Footer";
import { MovieProvider } from "../App/MovieContext";
// import InfoMoviePage from "../InfoPage/InfoMoviePage";
import ProviderApp from "./ProviderApp";

const App = () => {
	// const { show_modal } = useContext(MovieContext);
	// const [showModal, setShowModal] = show_modal;

	// console.log(showModal);
	return (
		<MovieProvider>
			{/* <div className="App">
				<Header />
				<Main />
				<Footer />
			</div>
			<InfoMoviePage /> */}
			<ProviderApp />
		</MovieProvider>
	);
};

export default App;
