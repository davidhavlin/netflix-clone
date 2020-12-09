import React, { useState, useEffect, useContext } from "react";
import { MovieContext } from "../App/MovieContext";
import "./InfoMoviePage.scss";

const imgurl = "https://image.tmdb.org/t/p/w1280";
const apiKey = process.env.REACT_APP_TMDB_KEY;

const InfoMoviePage = ({ selectedMovie, setShowModal, topHeight }) => {
	const { my_list, list_functions } = useContext(MovieContext);
	const [addToMyList, removeFromMyList, selectThisItem] = list_functions;
	const [tHeight, setTHeight] = topHeight;
	const [myList, setMyList] = my_list;

	const [similiarMovies, setSimiliarMovies] = useState([]);

	const similiar_movies_url = `https://api.themoviedb.org/3/movie/${selectedMovie.id}/similar?api_key=${apiKey}&language=en-US&page=1`;
	const similiar_shows_url = `https://api.themoviedb.org/3/tv/${selectedMovie.id}/similar?api_key=${apiKey}&language=en-US&page=1`;
	const cast_url = `https://api.themoviedb.org/3/movie/${selectedMovie.id}/credits?api_key=${apiKey}&language=en-US`;

	useEffect(() => {
		let scrollBefore = tHeight;
		// setTHeight(null);
		return () => {
			window.scrollTo(0, scrollBefore);
			setTHeight(scrollBefore);
		};
	}, []);

	const [cast, setCast] = useState([]);

	const getCast = async () => {
		let response = await fetch(cast_url);
		let data = await response.json();
		if (!data.cast) return;
		let newArr = data.cast.slice(0, 5);
		setCast(newArr);
	};

	useEffect(() => {
		if (!selectedMovie.id) return;
		window.scrollTo(0, 0);
		let url = selectedMovie.name ? similiar_shows_url : similiar_movies_url;

		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setSimiliarMovies(data.results);
			});

		getCast();
	}, [selectedMovie]);

	const handleClick = () => {
		setShowModal(false);
	};

	const getYear = (string) => {
		return string ? string.slice(0, 4) : "unknown";
	};

	const whichGenre = (genre) => {
		switch (genre) {
			case 28:
				return "Action";
			case 12:
				return "Adventure";
			case 16:
				return "Animation";
			case 35:
				return "Comedy";
			case 80:
				return "Crime";
			case 99:
				return "Documentary";
			case 18:
				return "Drama";
			case 10751:
				return "Family";
			case 14:
				return "Fantasy";
			case 36:
				return "History";
			case 27:
				return "Horror";
			case 10402:
				return "Music";
			case 9648:
				return "Mystery";
			case 10759:
				return "Action & Adventure";
			case 10765:
				return "Sci-Fi & Fantasy";
			case 10749:
				return "Romance";
			case 878:
				return "Science Fiction";
			case 10770:
				return "TV Movie";
			case 53:
				return "Thriller";
			case 10752:
				return "War";
			case 37:
				return "Western";

			default:
				break;
		}
	};

	const needComma = (index, array) => {
		return array.length > 1 && index !== array.length - 1 ? ", " : " ";
	};

	const alreadyInMyList = (id) => {
		return myList.find((item) => item.id === id) ? true : false;
	};

	const shorterOverview = (string) => {
		return string.length > 160 ? string.substring(0, 160) + "..." : string;
	};

	return (
		<div className="info-page-modal">
			<main className="modal-box">
				<div
					className="box-poster"
					style={{
						backgroundImage: `url(${
							imgurl + selectedMovie.backdrop_path
						})`,
					}}
				>
					<div className="exit-btn" onClick={handleClick}>
						<i className="far fa-times-circle"></i>
					</div>
					<div className="poster-content">
						<div className="poster-title">
							{selectedMovie.title || selectedMovie.name}
						</div>
						<div className="poster-buttons">
							<button
								className="btn-play"
								onClick={() => {
									selectThisItem(selectedMovie, "video");
								}}
							>
								<span>
									<i className="fas fa-play"></i>
								</span>
								Play
							</button>
							{alreadyInMyList(selectedMovie.id) ? (
								<button
									className="btn-add"
									onClick={() => {
										removeFromMyList(selectedMovie);
									}}
								>
									<span className="icon-tooltip">
										Remove from My List
									</span>
									<i className="fas fa-minus"></i>
								</button>
							) : (
								<button
									className="btn-add"
									onClick={() => {
										addToMyList(selectedMovie);
									}}
								>
									<span className="icon-tooltip">
										Add to My List
									</span>
									<i className="fas fa-plus"></i>
								</button>
							)}
						</div>
					</div>
				</div>
				<div className="box-content">
					<section className="text-content">
						<div className="text-left">
							<p className="info">
								{" "}
								<span className="rating">
									Rating: {selectedMovie.vote_average}
								</span>{" "}
								<span className="date">
									{getYear(
										selectedMovie.first_air_date ||
											selectedMovie.release_date
									)}
								</span>{" "}
								<span className="age-res">
									{selectedMovie.vote_average > 8
										? "16+"
										: "12+"}
								</span>{" "}
							</p>
							<p className="overview">{selectedMovie.overview}</p>
						</div>
						<div className="text-right">
							<p className="genres">
								Genres:{" "}
								{selectedMovie.genre_ids &&
									selectedMovie.genre_ids.map(
										(genre, index, array) => (
											<span key={genre}>
												{whichGenre(genre)}
												{needComma(index, array)}
											</span>
										)
									)}{" "}
							</p>
							<p className="country">
								Country:
								<span>
									{selectedMovie.origin_country
										? selectedMovie.origin_country[0]
										: "unknown"}
								</span>
							</p>
							<p className="cast">
								Cast:
								{cast.length > 0 ? (
									cast.map((actor, index, array) => (
										<span key={actor.id}>
											{actor.name}
											{needComma(index, array)}
										</span>
									))
								) : (
									<span>unknown</span>
								)}
								{/* <span>
									{selectedMovie.origin_country
										? selectedMovie.origin_country[0]
										: "unknown"}
								</span> */}
							</p>
						</div>
					</section>
					<section className="similiar-movies">
						<hr></hr>
						<h2>More Like This</h2>
						<div className="movies-container">
							{similiarMovies.length !== 0 ? (
								similiarMovies.map((movie) => (
									<div
										key={movie.id}
										className="sim-movie"
										onClick={() => {
											selectThisItem(movie, "video");
										}}
									>
										<div
											style={{
												backgroundImage: `url(${
													imgurl + movie.poster_path
												}`,
											}}
											className="poster"
										>
											{!movie.poster_path && "No image"}
											<div className="poster-play-icon">
												<i className="far fa-play-circle"></i>
											</div>
										</div>
										<div className="text">
											<p className="info">
												<span className="rating">
													Rating: {movie.vote_average}
												</span>
												<span className="age-res">
													{movie.vote_average > 8
														? "16+"
														: "12+"}
												</span>
												<span className="date">
													{getYear(
														movie.first_air_date ||
															movie.release_date
													)}
												</span>
											</p>
											<p>
												<span className="title">
													{movie.name || movie.title}
												</span>
												{shorterOverview(
													movie.overview
												)}
											</p>
										</div>
									</div>
								))
							) : (
								<div className="empty">No items</div>
							)}
						</div>
					</section>
					<div>{selectedMovie.length}</div>
				</div>
			</main>
			<div onClick={handleClick} className="modal-bg"></div>
		</div>
	);
};

export default InfoMoviePage;
