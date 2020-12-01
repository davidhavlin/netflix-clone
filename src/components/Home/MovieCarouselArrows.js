import React, { useState } from "react";

const MovieCarouselArrows = ({
	slideLeft,
	slideRight,
	myMovies,
	itemsVisible,
}) => {
	const [clicked, setClicked] = useState(false);
	const handleClick = () => {
		slideRight();
		setClicked(true);
	};
	return (
		<div>
			{clicked && (
				<div className="prev-arrow" onClick={slideLeft}>
					<span>
						<i className="fas fa-chevron-left"></i>
					</span>
				</div>
			)}
			{myMovies.length > itemsVisible && (
				<div className="next-arrow" onClick={handleClick}>
					<span>
						<i className="fas fa-chevron-right"></i>
					</span>
				</div>
			)}
		</div>
	);
};

export default MovieCarouselArrows;
