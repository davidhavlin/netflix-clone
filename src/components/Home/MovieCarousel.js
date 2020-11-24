import React, { useState, useRef, useEffect } from "react";

const imgurl = "https://image.tmdb.org/t/p/w1280";

const MovieCarousel = ({ title, movies, big }) => {
	const [clicked, setClicked] = useState(false);
	const [counter, setCounter] = useState(0);
	const carousel = useRef(null);

	useEffect(() => {
		const div = carousel.current;
		div.style.transform = `translateX(${-100 * counter}%)`;
	}, [counter]);

	const slideRight = () => {
		setCounter(counter + 1);
		setClicked(true);
	};
	const slideLeft = () => {
		setCounter(counter - 1);
	};

	return (
		<section className={`movies-section ${big ? "" : "small-version"}`}>
			<h3 className="section-title">{title}</h3>

			<div className="carousel" ref={carousel}>
				{movies &&
					movies.map((movie) => (
						<div className="slide-item" key={movie.id}>
							<div
								className="movie"
								style={{
									backgroundImage: `url(${
										imgurl + movie.poster_path
									})`,
								}}
							>
								<div
									className="hovered-show"
									style={{
										backgroundImage: `url(${
											imgurl + movie.backdrop_path
										})`,
									}}
								>
									<div className="content-hovered">
										<section className="buttons-section">
											<div>
												<button className="btn-play">
													<i className="fas fa-play"></i>
												</button>
												<button className="btn-add">
													<i className="fas fa-plus"></i>
												</button>
											</div>
											<button className="btn-info">
												<i className="fas fa-chevron-down"></i>
											</button>
										</section>
										<section className="text-section">
											<h4>{movie.name || movie.title}</h4>
											<p>
												Popularity: {movie.vote_average}
												<span className="age-res">
													16+
												</span>{" "}
												<span>Limited Series</span>
											</p>
										</section>
									</div>
								</div>
							</div>
						</div>
					))}
			</div>
			{clicked && (
				<div
					className="prev-arrow"
					onClick={() => {
						slideLeft();
					}}
				>
					<span>
						<i className="fas fa-chevron-left"></i>
					</span>
				</div>
			)}
			<div
				className="next-arrow"
				onClick={() => {
					slideRight();
				}}
			>
				<span>
					<i className="fas fa-chevron-right"></i>
				</span>
			</div>
		</section>
	);
};

export default MovieCarousel;
