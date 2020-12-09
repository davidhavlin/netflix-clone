import React, { useContext } from "react";
import MovieCarouselButtons from "../Home/MovieCarouselButtons";
import MovieCarouselText from "../Home/MovieCarouselText";
import { MovieContext } from "../App/MovieContext";
import "./MovieContainer.scss";

const imgurl_small = "https://image.tmdb.org/t/p/w342";

const MovieContainer = ({ movies, noItems }) => {
	const { my_list, list_functions } = useContext(MovieContext);
	const [addToMyList, removeFromMyList, selectThisItem] = list_functions;
	const [myList, setMyList] = my_list;

	const handleClick = (e, movie) => {
		if (e.target.classList.contains("movie-item")) {
			selectThisItem(movie, "video");
		}
	};

	const needsClass = (index) => {
		let itemsCount = 4;

		let firstItems = [];
		let lastItems = [];
		for (let i = 0; i <= movies.length; i += itemsCount) {
			firstItems.push(i);
			lastItems.push(i - 1);
		}
		if (firstItems.includes(index)) {
			return "movie-item first-item";
		} else if (lastItems.includes(index)) {
			return "movie-item last-item";
		} else {
			return "movie-item";
		}
	};

	return (
		<div className="movie-container">
			{movies.length > 0 ? (
				movies.map((movie, index) => (
					<div
						key={movie.id}
						className="movie-item"
						onClick={(e) => {
							handleClick(e, movie);
						}}
						className={needsClass(index)}
						style={{
							backgroundImage: `url(${
								imgurl_small + movie.poster_path
							})`,
						}}
					>
						{!movie.poster_path && (
							<div className="no-image">No image</div>
						)}
						<div className="item-title">
							{movie.name || movie.title}
						</div>

						<div className="hovered-show">
							<div className="content-hovered">
								<div className="content">
									<MovieCarouselButtons
										movie={movie}
										myList={myList}
										removeFromMyList={removeFromMyList}
										addToMyList={addToMyList}
										selectThisItem={selectThisItem}
									/>
									<MovieCarouselText movie={movie} />
								</div>
							</div>
						</div>
					</div>
				))
			) : (
				<div className="no-movie-items">{noItems}..</div>
			)}
		</div>
	);
};

export default MovieContainer;
