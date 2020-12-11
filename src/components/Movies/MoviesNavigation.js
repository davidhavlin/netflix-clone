import React, { useEffect, useState } from "react";
import "./MoviesNavigation.scss";

const apikey = process.env.REACT_APP_TMDB_KEY;
const genres_url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}&language=en-US`;

const MoviesNavigation = ({ genres, setGenres }) => {
	const [allGenres, setAllGenres] = useState([]);

	const fetchGenres = () => {
		fetch(genres_url)
			.then((res) => res.json())
			.then((data) => {
				let items = data.genres;
				genres.forEach((item) => {
					let index = items.findIndex((el) => el.id === item.id);
					if (index !== -1) items[index].disabled = true;
				});
				setAllGenres(items);
			});
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(fetchGenres, []);

	const handleChange = (e) => {
		let id = +e.target.value;
		let genre = allGenres.find((genre) => genre.id === id);
		let copyGenres = [...allGenres];
		let index = allGenres.findIndex((item) => item === genre);
		copyGenres[index].disabled = true;
		setAllGenres(copyGenres);
		setGenres((prevItems) => [genre, ...prevItems]);
	};

	return (
		<div className="movies-navigation">
			<div className="left-side">
				<h1>Movies</h1>
				<select name="genres" id="genres" onChange={handleChange}>
					{allGenres.map((genre) => (
						<option
							key={genre.id}
							value={genre.id}
							disabled={genre.disabled}
						>
							{genre.name}
						</option>
					))}
				</select>
			</div>
			<div className="right-side"></div>
		</div>
	);
};

export default MoviesNavigation;
