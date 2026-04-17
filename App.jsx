import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import TrendingSection from "./components/Trending";
import ExplorerSection from "./components/Explore";
import MovieModal from "./components/MovieModal";
import Footer from "./components/Footer";
import useTheme from "./hooks/UseTheme";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookingPage from "./components/BookingPage";

const TMDB_API_KEY = "0141007a23441ef481ee7685fdfdb134";

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [trending, setTrending] = useState([]);
  const [mainMovies, setMainMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`,
    )
      .then((res) => res.json())
      .then((data) =>
        setTrending(data.results ? data.results.slice(0, 10) : []),
      );
  }, []);

  useEffect(() => {
    setLoading(true);
    if (!searchTerm.trim()) {
      fetch(
        `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${TMDB_API_KEY}`,
      )
        .then((res) => res.json())
        .then((data) => setMainMovies(data.results || []))
        .finally(() => {
          setLoading(false);
          setSearching(false);
        });
    } else {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(searchTerm)}`,
      )
        .then((res) => res.json())
        .then((data) => setMainMovies(data.results || []))
        .finally(() => {
          setLoading(false);
          setSearching(true);
        });
    }
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchTerm.trim());
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearching(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <div className={`app ${theme}`}>
              <NavBar
                theme={theme}
                toggleTheme={toggleTheme}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
                searching={searching}
                clearSearch={clearSearch}
              />

              <Header theme={theme} />

              <TrendingSection
                trending={trending}
                theme={theme}
                setSelectedMovie={setSelectedMovie}
              />

              <ExplorerSection
                mainMovies={mainMovies}
                loading={loading}
                searching={searching}
                searchTerm={searchTerm}
                theme={theme}
                setSelectedMovie={setSelectedMovie}
              />

              {selectedMovie && (
                <MovieModal
                  selectedMovie={selectedMovie}
                  setSelectedMovie={setSelectedMovie}
                  theme={theme}
                />
              )}

              <Footer theme={theme} />
            </div>
          }
        />

        {/* Booking Page */}
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
