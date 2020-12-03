import React from "react";
import { MovieProvider } from "../App/MovieContext";
import ProviderApp from "./ProviderApp";

const App = () => {
	return (
		<MovieProvider>
			<ProviderApp />
		</MovieProvider>
	);
};

export default App;
