import React, { useState, useRef, useEffect } from "react";
import CarouselCounter from "./CarouselCounter";
import { debounce } from "lodash-es";

const imgurl = "https://image.tmdb.org/t/p/w1280";

const MovieCarousel = ({ title, movies, setMovies, big }) => {
	const [clicked, setClicked] = useState(false);
	// const [transformLength, setTransformLength] = useState(-100);
	const carousel = useRef(null);
	const [realCount, setRealCount] = useState(0);
	const [firstTime, setFirstTime] = useState(true);
	const [counter, setCounter] = useState(0);
	const [reRender, setReRender] = useState(false);
	const [teleporting, setTeleporting] = useState(false);

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
		if (window.innerWidth > 1400) {
			setItemsVisible(6);
			set_width_of_item(17);
		} else if (window.innerWidth < 1000) {
			setItemsVisible(5);
			set_width_of_item(20);
		} else if (window.innerWidth < 600) {
			setItemsVisible(2);
			set_width_of_item(50);
		} else if (window.innerWidth < 800) {
			setItemsVisible(3);
			set_width_of_item(33);
		} else if (window.innerWidth < 1000) {
			setItemsVisible(4);
			set_width_of_item(25);
		}
		window.addEventListener("resize", debounce(handleResizeEvent, 300), {
			once: true,
		});
	}, [counter, firstTime]);

	const handleResizeEvent = () => {
		console.log("resize wtf", itemsVisible);
		// 	if (window.innerWidth > 1000) {
		// 		setItemsVisible(5);
		// 		set_width_of_item(20);
		// 		carousel.current.style.transform = `translateX(${
		// 			-100 * (counter + 1) - width_of_item
		// 		}%)`;
		// 	} else if (window.innerWidth < 800) {
		// 		setItemsVisible(3);
		// 		set_width_of_item(33.3);
		// 		carousel.current.style.transform = `translateX(${
		// 			-100 * (counter + 1) - width_of_item
		// 		}%)`;
		// 	} else if (window.innerWidth < 1000) {
		// 		setItemsVisible(4);
		// 		set_width_of_item(25);
		// 		carousel.current.style.transform = `translateX(${
		// 			-100 * (counter + 1) - width_of_item
		// 		}%)`;
		// 	}
		if (window.innerWidth > 1400) {
			doSomething(6, 16.7);
		} else if (window.innerWidth < 1000) {
			doSomething(5, 20);
		} else if (window.innerWidth < 600) {
			doSomething(2, 50);
		} else if (window.innerWidth < 800) {
			doSomething(3, 33);
		} else if (window.innerWidth < 1000) {
			doSomething(4, 25);
		}
	};
	const doSomething = (items, itemWidth) => {
		// carousel.current.style.transform = `translateX(${-100 - itemWidth}%)`;
		if (counter === 0 && firstTime) {
			carousel.current.style.transform = `translateX(${0}%)`;
		} else {
			carousel.current.style.transform = `translateX(${
				-100 * (counter + 1) - width_of_item
			}%)`;
		}
		setReRender(true);
		setItemsVisible(items);
		set_width_of_item(itemWidth);
		movies.length = 20;
		setReRender(false);
	};
	useEffect(() => {
		// console.log("proste nechapem", itemsVisible);
	}, [itemsVisible]);

	useEffect(() => {
		const div = carousel.current;
		// console.log(itemsVisible);
		// prettier-ignore
		if (teleporting) return;
		if (movies.length % itemsVisible === 0) {
			firstTime
				? (div.style.transform = `translateX(${-100 * counter}%)`)
				: (div.style.transform = `translateX(${
						-100 * (counter + 1) - width_of_item
				  }%)`);
		} else {
			let lastItem = Math.floor(movies.length / itemsVisible);

			if (firstTime) {
				div.style.transform = `translateX(${-100 * counter}%)`;
			} else {
				console.log("DOPICE");
				if (counter === lastItem) {
					div.style.transform = `translateX(${
						-100 * (counter + 1) + 1
					}%)`;
				} else if (counter === lastItem + 1) {
					div.style.transform = `translateX(${
						-100 * (counter + 1) + 1
					}%)`;
				} else {
					div.style.transform = `translateX(${
						-100 * (counter + 1) - width_of_item
					}%)`;
				}
			}

			// firstTime
			// ? (div.style.transform = `translateX(${-100 * counter}%)`)
			// : (div.style.transform = `translateX(${
			// 		-100 * (counter + 1) - width_of_item
			//   }%)`);
		}

		if (counter === -1) {
			setRealCount(Math.floor(movies.length / itemsVisible - 1));
		} else if (counter === Math.floor(movies.length / itemsVisible)) {
			setRealCount(0);
		} else {
			setRealCount(counter);
		}
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
				parent.style.transition = "transform 0.6s ease";
			}, 0);
		} else {
			return;
		}
	};

	const handleTransitionEnd = (e) => {
		if (e.target.id !== "carousel") return;
		let lastItem = Math.floor(movies.length / itemsVisible);
		setTransitioning(false);
		carousel.current.style.pointerEvents = "initial";
		if (movies.length % itemsVisible === 0) {
			if (counter === 1) {
				firstSlide();
			} else if (counter === lastItem) {
				teleportTo("start");
			} else if (counter === -1) {
				teleportTo("end");
			}
		} else {
			if (counter === 1) {
				firstSlide();
			} else if (counter === lastItem + 1) {
				teleportTo("start");
			} else if (counter === -1) {
				teleportTo("endOdd");
			}
		}
	};

	const teleportTo = (where) => {
		setTeleporting(true);
		console.log(where);
		const parent = carousel.current;
		// prettier-ignore
		if (where === "start") {
            let c = 0; 
			parent.style.transition = "none";
			parent.style.transform = `translateX(${
				-100 * (c + 1) - width_of_item
            }%)`;
            setCounter(c);
		} else if (where === "end") {
            let c = Math.floor(movies.length / itemsVisible - 1);
			parent.style.transition = "none";
			parent.style.transform = `translateX(${
				-100 * (c + 1) - width_of_item
			}%)`;
			setCounter(c);
		} else if (where === "endOdd") {
            let c = Math.floor(movies.length / itemsVisible - 1);
            parent.style.transition = "none";
            // parent.style.transform = `translateX(${-100 * (c + 1) }%)`;
            parent.style.transform = `translateX(${-100 * (c + 1) - (width_of_item*3)}%)`;
            
			console.log(-100 * (c + 1) - (width_of_item*3)); // musi byt 700
            setCounter(c);
		}
		setTimeout(() => {
			parent.style.transition = "transform 0.6s ease";
			setTeleporting(false);
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

	const makeItEven = (i) => {
		// pokial sa neda cislo delit poctom filmov tak upravim pocet filmov
		return movies.length % itemsVisible !== 0 ? i !== 18 && i !== 19 : true;
	};

	return (
		<section className={`movies-section ${big ? "" : "small-version"}`}>
			<h3 className="section-title">{title}</h3>
			<CarouselCounter
				number={Math.floor(movies.length / itemsVisible)}
				counter={realCount}
			/>

			<div
				className="carousel"
				className={reRender ? "carousel nieco" : "carousel"}
				id="carousel"
				ref={carousel}
				onTransitionEnd={handleTransitionEnd}
			>
				{movies &&
					movies.map((movie, index) => {
						if (makeItEven(index)) {
							return (
								<div
									className={firstOrLastItem(index)}
									key={movie.id}
								>
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
																onClick={
																	addToFavorite
																}
															>
																<span className="icon-tooltip">
																	Add to My
																	List
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
															{movie.name ||
																movie.title}
														</h4>
														<p>
															Rating:{" "}
															{movie.vote_average}
															<span className="age-res">
																{movie.vote_average >
																8
																	? "16+"
																	: "12+"}
															</span>{" "}
															<span>
																Limited Series
															</span>
														</p>
													</section>
												</div>
											</div>
										</div>
									</div>
								</div>
							);
						}
					})}
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
