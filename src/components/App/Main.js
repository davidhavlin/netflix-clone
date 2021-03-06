import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Movies from "../Pages/Movies";
import MyList from "../Pages/MyList";
import SearchPage from "../Pages/SearchPage";
import "./Main.scss";

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
	<main className="main-container">
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/movies" component={Movies} />
			<Route path="/mylist" component={MyList} />
			<Route path="/search" component={SearchPage} />
		</Switch>
	</main>
);

export default Main;
