import React from "react";
import StarRating from "./StarRating";
import "./Explore.css";

export default function ExplorerSection({
  mainMovies,
  loading,
  searching,
  searchTerm,
  theme,
  setSelectedMovie,
}) {
  return (
    <section className="explorer-section">
      <h2 className="explorer-title">
        {searching && searchTerm ? (
          <>Search Results {mainMovies.length > 0 && `for "${searchTerm}"`}</>
        ) : (
          "Explore"
        )}
      </h2>

      {loading && (
        <div className="loading-container">
          <svg
            className="loading-spinner"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="loading-circle" cx="12" cy="12" r="10" />
            <path
              className="loading-path"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4A8 8 0 104 12z"
            />
          </svg>
        </div>
      )}

      <div className="explorer-grid">
        {!loading && mainMovies.length === 0 && (
          <p className={`no-results ${theme}`}>
            {searching ? "No results found." : "No movies found."}
          </p>
        )}

        {!loading &&
          mainMovies.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => setSelectedMovie(movie)}
              title="Click for details"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://img.icons8.com/ios/200/image--v1.png"
                }
                alt={movie.title}
                className="movie-poster"
                draggable="false"
              />
              <div className="movie-info">
                <h2 className="movie-title" title={movie.title}>
                  {movie.title}
                </h2>
                <StarRating rating={movie.vote_average} />
                <span className="movie-date">{movie.release_date}</span>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
