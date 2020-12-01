import React from "react";

const MovieCarouselButtons = ({
	movie,
	myList,
	removeFromMyList,
	addToMyList,
}) => {
	const alreadyInMyList = (id) => {
		return myList.find((item) => item.id === id) ? true : false;
	};

	return (
		<section className="buttons-section">
			<div>
				<button className="btn-play">
					<i className="fas fa-play"></i>
				</button>
				{alreadyInMyList(movie.id) ? (
					<button
						className="btn-add"
						id={movie.id}
						onClick={removeFromMyList}
					>
						<span className="icon-tooltip">
							Remove from My List
						</span>
						<i className="fas fa-minus"></i>
					</button>
				) : (
					<button
						className="btn-add"
						id={movie.id}
						onClick={addToMyList}
					>
						<span className="icon-tooltip">Add to My List</span>
						<i className="fas fa-plus"></i>
					</button>
				)}
			</div>
			<button className="btn-info">
				<span className="icon-tooltip">More Info</span>

				<i className="fas fa-chevron-down"></i>
			</button>
		</section>
	);
};

export default MovieCarouselButtons;
