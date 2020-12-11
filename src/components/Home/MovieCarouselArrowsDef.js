import React from "react";

const MovieCarouselArrows = ({
	slideLeft,
	slideRight,
	myMovies,
	itemsVisible,
	nextArrow,
	prevArrow,
}) => {
	return (
		<div>
			{prevArrow && (
				<div className="prev-arrow" onClick={slideLeft}>
					<span>
						<i className="fas fa-chevron-left"></i>
					</span>
				</div>
			)}
			{myMovies.length > itemsVisible && nextArrow && (
				<div className="next-arrow" onClick={slideRight}>
					<span>
						<i className="fas fa-chevron-right"></i>
					</span>
				</div>
			)}
		</div>
	);
};

export default MovieCarouselArrows;
