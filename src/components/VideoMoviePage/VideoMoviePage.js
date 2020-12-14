import React, { useState, useEffect } from "react";
import "./VideoMoviePage.scss";

const api = process.env.REACT_APP_TMDB_KEY;

const VideoMoviePage = ({ selectedMovie, setShowVideo }) => {
	const [ytKey, setYtKey] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const handleKeyDown = (e) => {
		if (e.key === "Escape") {
			setShowVideo(false);
		}
	};
	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!selectedMovie) return;
		setLoading(true);

		let type = selectedMovie.name ? "tv" : "movie";
		let url = `https://api.themoviedb.org/3/${type}/${selectedMovie.id}/videos?api_key=${api}&language=en-US`;
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setLoading(false);
				if (!data || data.results.length < 1) {
					throw new Error(data.error);
				} else {
					setYtKey(data.results);
				}
			})
			.catch((err) => setError(true));
	}, [selectedMovie]);

	const handleClick = () => {
		setShowVideo(false);
	};

	return (
		<div className="video-page">
			<div className="close-video">
				<i onClick={handleClick} className="far fa-times-circle"></i>
				<div className="close-bg"></div>
			</div>
			{ytKey && (
				<iframe
					frameborder="0"
					allowfullscreen="1"
					allow="autoplay; encrypted-media"
					title="Movie Trailer"
					className="video-player"
					width="100%"
					height="100%"
					src={`https://www.youtube.com/embed/${ytKey[0].key}?autoplay=1&mute=1`}
				></iframe>
			)}
			{loading && <div className="loading">Loading..</div>}
			{error && (
				<div className="error">
					No video for "{selectedMovie.title || selectedMovie.name}"
				</div>
			)}
		</div>
	);
};

export default VideoMoviePage;
