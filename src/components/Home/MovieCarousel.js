import React, { useState, useRef, useEffect } from "react";

const imgurl = "https://image.tmdb.org/t/p/w1280";

const MovieCarousel = ({ title, movies, big }) => {
	const [clicked, setClicked] = useState(false);
	// const [transformLength, setTransformLength] = useState(-100);
	const carousel = useRef(null);

	const [transitioning, setTransitioning] = useState(false);
	useEffect(() => {
		carousel.current.addEventListener("transitionstart", handleTransition);
	}, []);
	const handleTransition = (e) => {
		if (e.target.id !== "carousel") return;
		setTransitioning(true);
		carousel.current.style.pointerEvents = "none";
	};

	const [itemsVisible, setItemsVisible] = useState(5);
	const [width_of_item, set_width_of_item] = useState(20);
	useEffect(() => {
		if (window.innerWidth > 1000) {
			setItemsVisible(5);
			set_width_of_item(20);
		} else if (window.innerWidth < 800) {
			setItemsVisible(3);
			set_width_of_item(33.3);
		} else if (window.innerWidth < 1000) {
			setItemsVisible(4);
			set_width_of_item(25);
		}

		window.addEventListener("resize", () => {
			if (window.innerWidth > 1000) {
				setItemsVisible(5);
				set_width_of_item(20);
				carousel.current.style.transform = `translateX(${
					-100 * (counter + 1) - width_of_item
				}%)`;
			} else if (window.innerWidth < 800) {
				setItemsVisible(3);
				set_width_of_item(33.3);
				carousel.current.style.transform = `translateX(${
					-100 * (counter + 1) - width_of_item
				}%)`;
			} else if (window.innerWidth < 1000) {
				setItemsVisible(4);
				set_width_of_item(25);
				carousel.current.style.transform = `translateX(${
					-100 * (counter + 1) - width_of_item
				}%)`;
			}
		});
	}, []);

	const [counter, setCounter] = useState(0);
	const [firstTime, setFirstTime] = useState(true);
	useEffect(() => {
		const div = carousel.current;
		// prettier-ignore
		firstTime 
            ? div.style.transform = `translateX(${ -100 * counter }%)`
            : div.style.transform = `translateX(${ -100 * (counter + 1) - width_of_item }%)`;
	}, [counter]);

	const firstSlide = () => {
		if (firstTime) {
			// spustim len ked sa klikne na slide prvy krat a PO transitionu
			const parent = carousel.current;
			setFirstTime(false);
			let children = [...parent.children];
			let firstItems = children.slice(0, itemsVisible + 1);
			let lastItems = children.slice(
				children.length - (itemsVisible + 1)
			);
			for (let i = 0; i < firstItems.length; i++) {
				let clone = firstItems[i].cloneNode(true);
				parent.append(clone);
			}
			for (let i = itemsVisible; i >= 0; i--) {
				let clone = lastItems[i].cloneNode(true);
				parent.prepend(clone);
			}

			parent.style.transition = "none";
			parent.style.transform = `translateX(${-100 * 2 - width_of_item}%)`;
			setTimeout(() => {
				parent.style.transition = "transform 1s ease";
			}, 0);
		} else {
			return;
		}
	};

	const handleTransitionEnd = (e) => {
		if (e.target.id !== "carousel") return;
		let lastItem = Math.floor(movies.length / itemsVisible);
		console.log(lastItem);
		setTransitioning(false);
		carousel.current.style.pointerEvents = "initial";

		if (counter === 1) {
			firstSlide();
		} else if (counter === lastItem) {
			teleportTo("start");
		} else if (counter === -1) {
			teleportTo("end");
		}
	};

	const teleportTo = (where) => {
		const parent = carousel.current;
		parent.style.transition = "none";
		if (where === "start") {
			setCounter(0);
			parent.style.transform = `translateX(${
				-100 * (counter + 1) - width_of_item
			}%)`;
		} else {
			parent.style.transform = `translateX(${
				-100 * (counter + 1) - width_of_item
			}%)`;
			setCounter(movies.length / itemsVisible - 1);
		}
		setTimeout(() => {
			parent.style.transition = "transform 1s ease";
		}, 50);
	};

	const slideRight = () => {
		if (transitioning) return;
		setCounter(counter + 1);
		setClicked(true);
	};
	const slideLeft = () => {
		if (transitioning) return;
		setCounter(counter - 1);
	};

	const firstOrLastItem = (index) => {
		let firstItems = [];
		let lastItems = [];
		for (let i = 0; i <= movies.length; i += itemsVisible) {
			firstItems.push(i);
			lastItems.push(i - 1);
		}
		if (firstItems.includes(index)) {
			return "slide-item first-item";
		} else if (lastItems.includes(index)) {
			return "slide-item last-item";
		} else {
			return "slide-item";
		}
	};

	const addToFavorite = (e) => {
		console.log(e.target.id);
	};

	return (
		<section className={`movies-section ${big ? "" : "small-version"}`}>
			<h3 className="section-title">{title}</h3>

			<div
				className="carousel"
				id="carousel"
				ref={carousel}
				onTransitionEnd={handleTransitionEnd}
			>
				{movies &&
					movies.map((movie, index) => (
						<div className={firstOrLastItem(index)} key={movie.id}>
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
										<div className="content">
											<section className="buttons-section">
												<div>
													<button className="btn-play">
														<i className="fas fa-play"></i>
													</button>
													<button
														className="btn-add"
														id={movie.id}
														onClick={addToFavorite}
													>
														<span className="icon-tooltip">
															Add to My List
														</span>
														<i className="fas fa-plus"></i>
													</button>
												</div>
												<button className="btn-info">
													<span className="icon-tooltip">
														More Info
													</span>

													<i className="fas fa-chevron-down"></i>
												</button>
											</section>
											<section className="text-section">
												<h4>
													{movie.name || movie.title}
												</h4>
												<p>
													Rating: {movie.vote_average}
													<span className="age-res">
														{movie.vote_average > 8
															? "16+"
															: "12+"}
													</span>{" "}
													<span>Limited Series</span>
												</p>
											</section>
										</div>
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
