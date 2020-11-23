import React from "react";

const imgurl = "https://image.tmdb.org/t/p/w1280";

const ShowsCarousel = ({ shows }) => {
	return (
		<div className="originals-carousel">
			{shows &&
				shows.map((show) => (
					<div
						key={show.id}
						className="movie"
						style={{
							backgroundImage: `url(${
								imgurl + show.poster_path
							})`,
						}}
					>
						<div
							className="hovered-show"
							style={{
								backgroundImage: `url(${
									imgurl + show.backdrop_path
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
											<i class="fas fa-plus"></i>
										</button>
									</div>
									<button className="btn-info">
										<i class="fas fa-chevron-down"></i>
									</button>
								</section>
								<section className="text-section">
									<h4>{show.name}</h4>
									<p>
										Popularity: {show.vote_average}
										<span className="age-res">
											16+
										</span>{" "}
										<span>Limited Series</span>
									</p>
								</section>
							</div>
						</div>
					</div>
				))}
		</div>
	);
};

export default ShowsCarousel;
