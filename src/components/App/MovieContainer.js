import React, { useContext, useEffect, useRef } from "react";
import MovieCarouselButtons from "../Home/MovieCarouselButtons";
import MovieCarouselText from "../Home/MovieCarouselText";
import { MovieContext } from "../App/MovieContext";
import "./MovieContainer.scss";

const imgurl_small = "https://image.tmdb.org/t/p/w342";

const MovieContainer = ({ movies, noItems }) => {
	const { my_list, list_functions, window_width } = useContext(MovieContext);
	const [windowWidth, setWindowWidth] = window_width;
	const [addToMyList, removeFromMyList, selectThisItem] = list_functions;
	const [myList] = my_list;
	const container = useRef(null);

	useEffect(() => {
		let count = 0;
		if (windowWidth > 1400) {
			count = 6;
		} else if (windowWidth < 600) {
			count = 2;
		} else if (windowWidth < 800) {
			count = 3;
		} else if (windowWidth < 1000) {
			count = 4;
		} else if (windowWidth < 1400) {
			count = 5;
		}
		resetClasses(count);
	}, [windowWidth, movies]);

	const resetClasses = (count) => {
		let children = Array.from(container.current.children);
		children.map((child) =>
			child.classList.remove("first-item", "last-item")
		);
		for (let i = 0; i <= children.length; i += count) {
			if (children[i]) children[i].classList.add("first-item");
			if (children[i - 1]) children[i - 1].classList.add("last-item");
		}
	};

	const handleClick = (e, movie) => {
		if (e.target.classList.contains("movie-item")) {
			selectThisItem(movie, "video");
		}
	};

	return (
		<div className="movie-container" ref={container}>
			{movies.length > 0 ? (
				movies.map((movie) => (
					<div
						key={movie.id}
						onClick={(e) => {
							handleClick(e, movie);
						}}
						className="movie-item"
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
