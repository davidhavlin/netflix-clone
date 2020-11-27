import "./App.css";
import Header from "../Header/Header";
import Main from "./Main";
import Footer from "../Footer/Footer";
import { MovieProvider } from "../App/MovieContext";

function App() {
	return (
		<MovieProvider>
			<div className="App">
				<Header />
				<Main />
				<Footer />
			</div>
		</MovieProvider>
	);
}

export default App;
