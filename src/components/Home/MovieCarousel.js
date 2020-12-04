import React, { useState, useRef, useEffect, useContext } from "react";
import CarouselCounter from "./CarouselCounter";
import MovieCarouselArrows from "./MovieCarouselArrows";
import MovieCarouselButtons from "./MovieCarouselButtons";
import MovieCarouselText from "./MovieCarouselText";
import { MovieContext } from "../App/MovieContext";

const imgurl = "https://image.tmdb.org/t/p/w1280";

const MovieCarousel = ({
	windowWidth,
	title,
	movies,
	setMyList,
	myList,
	big,
}) => {
	const {
		show_modal,
		selected_movie,
		list_functions,
		top_height,
	} = useContext(MovieContext);
	const [showModal, setShowModal] = show_modal;
	const [selectedMovie, setSelectedMovie] = selected_movie;
	const [addToMyList, removeFromMyList] = list_functions;
	const [topHeight, setTopHeight] = top_height;

	const [myMovies, setMyMovies] = useState([]);
	const carousel = useRef(null);
	const [realCount, setRealCount] = useState(0);
	const [firstTime, setFirstTime] = useState(true);
	const [counter, setCounter] = useState(0);

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
	const [oldWidth, setOldWidth] = useState(null);
	useEffect(() => {
		setMyMovies(movies);
		resizeCarousel();
		setOldWidth(window.innerWidth);
	}, [movies]);

	useEffect(() => {
		if (howBigWidth(windowWidth) === howBigWidth(oldWidth)) return;

		resizeCarousel();
		setOldWidth(windowWidth);
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

	const resizeCarousel = () => {
		if (windowWidth > 1400) {
			resetCarousel(6, 17.3);
		} else if (windowWidth < 600) {
			resetCarousel(2, 50);
		} else if (windowWidth < 800) {
			resetCarousel(3, 33);
		} else if (windowWidth < 1000) {
			resetCarousel(4, 25);
		} else if (windowWidth < 1400) {
			resetCarousel(5, 20);
		}
	};
	const resetCarousel = (items, itemWidth) => {
		// prettier-ignore
		if (counter === 0 && firstTime) {
			carousel.current.style.transform = `translateX(${0}%)`;
		} else {
			let num = Math.floor(movies.length / items);
			if (counter > num) {
				// let c = num - 1;
				carousel.current.style.transform = `translateX(${-100 * (num + 1) - width_of_item}%)`;
                setCounter(num);
                setRealCount(0);
			}
			carousel.current.style.transform = `translateX(${-100 * (counter + 1) - itemWidth}%)`;

			let clones = document.querySelectorAll(".clone");
			clones.forEach((el) => {el.remove()});
			setMyMovies(null);
			setTimeout(() => {
				setMyMovies(movies);
				copyElements(items);
			}, 50);
		}

		setItemsVisible(items);
		set_width_of_item(itemWidth);
	};

	useEffect(() => {
		const div = carousel.current;
		if (teleporting) return;
		// prettier-ignore
		firstTime
			? (div.style.transform = `translateX(${-100 * counter}%)`)
			: (div.style.transform = `translateX(${-100 * (counter + 1) - width_of_item}%)`);

		if (counter === -1) {
			setRealCount(Math.floor(movies.length / itemsVisible - 1));
		} else if (counter === Math.floor(movies.length / itemsVisible)) {
			setRealCount(0);
		} else {
			setRealCount(counter);
		}
	}, [counter]);

	const copyElements = (items = itemsVisible) => {
		const parent = carousel.current;
		// if (!parent.children) return;
		console.log(parent);
		let children = [...parent.children];
		let firstItems = children.slice(0, items + 1);
		let lastItems = children.slice(children.length - (items + 1));
		for (let i = 0; i < firstItems.length; i++) {
			let clone = firstItems[i].cloneNode(true);
			clone.classList.add("clone");
			parent.append(clone);
		}
		for (let i = items; i >= 0; i--) {
			let clone = lastItems[i].cloneNode(true);
			clone.classList.add("clone");
			parent.prepend(clone);
		}
	};

	const firstSlide = () => {
		if (!firstTime) return;
		// spustim len ked sa klikne na slide prvy krat a PO transitionu
		setFirstTime(false);
		copyElements();

		carousel.current.style.transition = "none";
		carousel.current.style.transform = `translateX(${
			-100 * 2 - width_of_item
		}%)`;
		setTimeout(() => {
			carousel.current.style.transition = "transform 0.6s ease";
		}, 0);
	};

	const handleTransitionEnd = (e) => {
		if (e.target.id !== "carousel") return;
		let lastItem = Math.floor(movies.length / itemsVisible);
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
		setTeleporting(true);
		carousel.current.style.transition = "none";
		let c = null;
		where === "start"
			? (c = 0)
			: (c = Math.floor(movies.length / itemsVisible - 1));
		// prettier-ignore
		carousel.current.style.transform = `translateX(${-100 * (c + 1) - width_of_item}%)`;
		setCounter(c);

		setTimeout(() => {
			carousel.current.style.transition = "transform 0.6s ease";
			setTeleporting(false);
		}, 50);
	};

	const slideRight = () => {
		if (transitioning) return;
		setCounter(counter + 1);
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

	const makeItEven = (i) => {
		// pokial sa neda cislo delit poctom filmov tak upravim pocet filmov
		return movies.length % itemsVisible !== 0 ? i !== 18 && i !== 19 : true;
	};

	const selectMovie = (selected) => {
		setTopHeight(window.scrollY);
		setSelectedMovie(selected);
		setShowModal(true);
	};

	return (
		<section className={`movies-section ${big ? "" : "small-version"}`}>
			<h3 className="section-title">{title}</h3>
			{myMovies.length > itemsVisible && (
				<CarouselCounter
					number={Math.floor(movies.length / itemsVisible)}
					counter={realCount}
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
						if (makeItEven(index)) {
							return (
								// prettier-ignore
								<div className={firstOrLastItem(index)} key={movie.id} >
									<div className="movie" style={{ backgroundImage: `url(${imgurl + movie.poster_path})`}}>
										<div className="hovered-show" style={{ backgroundImage: `url(${ imgurl + movie.backdrop_path })`}}>
											<div className="content-hovered">
												<div className="content">
													<MovieCarouselButtons movie={movie} myList={myList}	removeFromMyList={removeFromMyList}	addToMyList={addToMyList} selectMovie={selectMovie} setShowModal={setShowModal} />
                                                    <MovieCarouselText movie={movie} />
												</div>
											</div>
										</div>
									</div>
								</div>
							);
						}
					})
				) : (
					<div className="no-content">No items</div>
				)}
			</div>
			<MovieCarouselArrows
				slideLeft={slideLeft}
				slideRight={slideRight}
				myMovies={myMovies}
				itemsVisible={itemsVisible}
			/>
		</section>
	);
};

export default MovieCarousel;
