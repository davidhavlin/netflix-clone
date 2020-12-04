import React from "react";

const MovieCarouselButtons = ({
	movie,
	myList,
	removeFromMyList,
	addToMyList,
	selectMovie,
}) => {
	const alreadyInMyList = (id) => {
		return myList.find((item) => item.id === id) ? true : false;
	};

	const nieco = (item) => {
		console.log("hehe", item);
	};

	return (
		<section className="buttons-section">
			<div>
				<button
					className="btn-play"
					onClick={() => {
						nieco(movie);
					}}
				>
					<i className="fas fa-play"></i>
				</button>
				{alreadyInMyList(movie.id) ? (
					<button
						className="btn-add"
						onClick={() => {
							removeFromMyList(movie);
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
							addToMyList(movie);
						}}
					>
						<span className="icon-tooltip">Add to My List</span>
						<i className="fas fa-plus"></i>
					</button>
				)}
			</div>
			<button
				id={movie.id}
				className="btn-info"
				onClick={() => {
					selectMovie(movie);
				}}
			>
				<span className="icon-tooltip">More Info</span>

				<i className="fas fa-chevron-down"></i>
			</button>
		</section>
	);
};

export default MovieCarouselButtons;
