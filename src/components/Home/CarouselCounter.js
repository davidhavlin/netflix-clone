import React from "react";
import "./CarouselCounter.scss";

const CarouselCounter = ({ number, counter }) => {
	return (
		<div className="counter">
			{[...Array(number)].map((value, index) => (
				<div
					className={counter === index ? "cube active" : "cube"}
					id={index + 1}
					key={index}
				></div>
			))}
		</div>
	);
};

export default CarouselCounter;
