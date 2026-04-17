import React from "react";
import "./NavBar.css";

export default function NavBar({
  theme,
  toggleTheme,
  searchTerm,
  setSearchTerm,
  handleSearch,
  searching,
  clearSearch,
}) {
  return (
    <nav className={`navbar ${theme}`}>
      <span className="navbar-logo">SWAPNA'S CINEMAS</span>

      <form onSubmit={handleSearch} className="navbar-search-form">
        <div className="search-container">
          <svg
            className="search-icon"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" />
          </svg>
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searching && (
            <button
              type="button"
              onClick={clearSearch}
              className="clear-button"
              title="Clear Search"
            >
              ✕
            </button>
          )}
        </div>
      </form>

      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle dark mode"
      >
        {theme === "dark" ? (
          <span role="img" aria-label="light mode">
            🌞
          </span>
        ) : (
          <span role="img" aria-label="dark mode">
            🌚
          </span>
        )}
      </button>
    </nav>
  );
}
