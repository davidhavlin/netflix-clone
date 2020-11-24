import "./App.css";
import Header from "../Header/Header";
import Main from "./Main";
import { MovieProvider } from "../App/MovieContext";

function App() {
	return (
		<MovieProvider>
			<div className="App">
				<Header />
				<Main />
			</div>
		</MovieProvider>
	);
}

export default App;
