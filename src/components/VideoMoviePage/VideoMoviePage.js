import React, { useState, useEffect } from "react";
import "./VideoMoviePage.scss";

const autoplay = "?autoplay=1";
const api = process.env.REACT_APP_TMDB_KEY;

const VideoMoviePage = ({ selectedMovie, setShowVideo }) => {
	const [ytKey, setYtKey] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const handleClick = () => {
		setShowVideo(false);
	};

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

	return (
		<div className="video-page">
			{ytKey && (
				<iframe
					className="video-player"
					width="420"
					height="315"
					src={`https://www.youtube.com/embed/${ytKey[0].key}?autoplay=1&mute=1`}
				></iframe>
			)}
			{loading && <div className="loading">Loading..</div>}
			{error && (
				<div className="error">
					No video for "{selectedMovie.title || selectedMovie.name}"
				</div>
			)}
			<div className="close-video" onClick={handleClick}>
				<i className="far fa-times-circle"></i>
			</div>
		</div>
	);
};

export default VideoMoviePage;
