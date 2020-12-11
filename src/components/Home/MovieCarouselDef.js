import React, { useState, useRef, useEffect, useContext } from "react";
import CarouselCounter from "./CarouselCounter";
import MovieCarouselArrowsDef from "./MovieCarouselArrowsDef";
import MovieCarouselButtons from "./MovieCarouselButtons";
import MovieCarouselText from "./MovieCarouselText";
import { MovieContext } from "../App/MovieContext";

const imgurl = "https://image.tmdb.org/t/p/w1280";

const MovieCarousel = ({ title, movies, myList, big }) => {
	const { list_functions, window_width } = useContext(MovieContext);
	const [addToMyList, removeFromMyList, selectThisItem] = list_functions;
	const [windowWidth] = window_width;

	const [myMovies, setMyMovies] = useState([]);
	const carousel = useRef(null);
	// const [firstTime, setFirstTime] = useState(true);
	const [counter, setCounter] = useState(0);

	const [transitioning, setTransitioning] = useState(false);
	useEffect(() => {
		// nieco ako kontrolka toho ci sa prave hybe slider a zakaze na neho pocas pohybu klikat
		carousel.current.addEventListener("transitionstart", handleTransition);
	}, []);
	const handleTransition = (e) => {
		if (e.target.id !== "carousel") return;
		setTransitioning(true);
		carousel.current.style.pointerEvents = "none";
	};

	const [itemsVisible, setItemsVisible] = useState(5);
	const [width_of_item, set_width_of_item] = useState(20);
	const [oldWidth, setOldWidth] = useState(null);
	useEffect(() => {
		setNumberOfMovies(movies.length);
		setMyMovies(movies);
		resizeCarousel(window.innerWidth);
		setOldWidth(window.innerWidth);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [movies]);

	useEffect(() => {
		// resizovanie sa spusti len ak je novy rozmer v inej kategorii ako stary rozmer
		if (howBigWidth(windowWidth) === howBigWidth(oldWidth)) return;
		resizeCarousel(window.innerWidth);
		setOldWidth(windowWidth); // a nastavi novy width
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [windowWidth]);

	const howBigWidth = (width) => {
		if (width > 1400) {
			return "six";
		} else if (width < 600) {
			return "two";
		} else if (width < 800) {
			return "three";
		} else if (width < 1000) {
			return "for";
		} else if (width < 1400) {
			return "five";
		}
	};
	const resizeCarousel = (width) => {
		if (width > 1400) {
			resetCarousel(6, 17.3);
		} else if (width < 600) {
			resetCarousel(2, 50);
		} else if (width < 800) {
			resetCarousel(3, 33);
		} else if (width < 1000) {
			resetCarousel(4, 25);
		} else if (width < 1400) {
			resetCarousel(5, 20);
		}
	};
	const resetCarousel = (items, itemWidth) => {
		carousel.current.style.transform = `translateX(${0}%)`;
		setCounter(0);
		setNextArrow(true);
		setPrevArrow(false);
		setItemsVisible(items);
		set_width_of_item(itemWidth);
	};

	const [numberOfMovies, setNumberOfMovies] = useState(movies.length);
	useEffect(() => {
		const div = carousel.current;

		if (numberOfMovies % itemsVisible === 0) {
			// ked ziadny film "nevycnieva" staci klasicky pridavat po 100
			div.style.transform = `translateX(${-100 * counter}%)`;
		} else {
			let num = Math.floor(numberOfMovies / itemsVisible); // kolko celkov itemsVisible sa zmesti do poctu filmov
			if (counter === num) {
				// ked sme na poslednej strane kde je celok filmov, uz su len vycnivajuce, spusti sa toto:
				let difference = numberOfMovies % itemsVisible; // zistim kolko filmov "vycnieva"
				// prettier-ignore
				div.style.transform = `translateX(${-100 * counter + (100 - (width_of_item * difference))}%)`;
				// vlastne k 200ke napr odcitam sirku filmov ktore vycnivaju
			} else {
				div.style.transform = `translateX(${-100 * counter}%)`;
			}
		}
	}, [counter, numberOfMovies, itemsVisible, width_of_item]);

	const handleTransitionEnd = (e) => {
		if (e.target.id !== "carousel") return;
		setTransitioning(false);
		carousel.current.style.pointerEvents = "initial";
	};

	const [nextArrow, setNextArrow] = useState(true);
	const [prevArrow, setPrevArrow] = useState(false);
	const slideRight = () => {
		if (transitioning) return;
		setPrevArrow(true);

		let num = Math.ceil(numberOfMovies / itemsVisible);
		if (counter === num - 2) setNextArrow(false);
		if (counter === num - 1) return;
		setCounter(counter + 1);
	};
	const slideLeft = () => {
		if (transitioning) return;
		setNextArrow(true);
		if (counter === 1) {
			setPrevArrow(false);
		}
		if (counter === 0) return;
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

	const handleClick = (e, movie) => {
		if (e.target.classList.contains("hovered-show")) {
			selectThisItem(movie, "video");
		}
	};

	return (
		<section className={`movies-section ${big ? "" : "small-version"}`}>
			<h3 className="section-title">{title}</h3>
			{myMovies.length > itemsVisible && (
				<CarouselCounter
					number={Math.ceil(movies.length / itemsVisible)}
					counter={counter}
				/>
			)}

			<div
				className="carousel"
				id="carousel"
				ref={carousel}
				onTransitionEnd={handleTransitionEnd}
			>
				{myMovies.length !== 0 ? (
					myMovies.map((movie, index) => {
						return (
							// prettier-ignore
							<div className={firstOrLastItem(index)} key={movie.id} >
									<div className="movie" style={{ backgroundImage: `url(${imgurl + movie.poster_path})`}}>
										<div className="hovered-show" onClick={(e)=>{handleClick(e, movie);}} style={{ backgroundImage: `url(${ imgurl + movie.backdrop_path })`}}>
											<div className="content-hovered">
												<div className="content">
													<MovieCarouselButtons movie={movie} myList={myList}	removeFromMyList={removeFromMyList}	addToMyList={addToMyList} selectThisItem={selectThisItem} />
                                                    <MovieCarouselText movie={movie} />
												</div>
											</div>
										</div>
									</div>
								</div>
						);
					})
				) : (
					<div className="no-content">No items</div>
				)}
			</div>
			<MovieCarouselArrowsDef
				slideLeft={slideLeft}
				slideRight={slideRight}
				myMovies={myMovies}
				itemsVisible={itemsVisible}
				nextArrow={nextArrow}
				prevArrow={prevArrow}
			/>
		</section>
	);
};

export default MovieCarousel;
