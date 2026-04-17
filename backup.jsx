import { useEffect, useState } from "react";

const TMDB_API_KEY = "08213b52742d79532a8e43414f1d67a2";

function useTheme() {
  const [theme, setTheme] = useState(
    () =>
      window.localStorage.getItem("theme") ||
      (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"),
  );
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);
  return [theme, () => setTheme(theme === "dark" ? "light" : "dark")];
}

function StarRating({ rating }) {
  const rounded = Math.round(rating ? rating / 2 : 0);
  return (
    <div className="flex items-center mb-1 mt-1">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={
            i < rounded
              ? "text-yellow-400 drop-shadow-lg"
              : "text-gray-300 dark:text-gray-800"
          }
        >
          ★
        </span>
      ))}
      <span className="ml-2 text-pink-700 dark:text-pink-200 font-semibold">
        {(rating || 0).toFixed(1)}/10
      </span>
    </div>
  );
}

const footerLinks = [
  {
    name: "Twitter",
    url: "https://twitter.com/",
    svg: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          fill="currentColor"
          d="M24 4.557a9.828 9.828 0 0 1-2.828.775A4.932 4.932 0 0 0 23.337 3.1a9.864 9.864 0 0 1-3.127 1.195A4.916 4.916 0 0 0 16.616 3c-2.737 0-4.946 2.229-4.946 4.978 0 .39.045.765.128 1.125C7.728 8.935 4.1 6.961 1.67 3.691c-.427.747-.671 1.617-.671 2.545 0 1.757.891 3.302 2.248 4.21a4.902 4.902 0 0 1-2.241-.62c-.053 2.28 1.581 4.415 3.949 4.89-.386.109-.792.17-1.21.17-.297 0-.583-.029-.862-.082.584 1.84 2.279 3.176 4.294 3.212A9.874 9.874 0 0 1 0 20.407 13.925 13.925 0 0 0 7.548 22.5c9.142 0 14.307-7.721 14.307-14.421 0-.219-.004-.438-.015-.655a10.23 10.23 0 0 0 2.511-2.626z"
        />
      </svg>
    ),
    hover: "hover:text-sky-400",
  },
  {
    name: "GitHub",
    url: "https://github.com/",
    svg: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          fill="currentColor"
          d="M12 .297c-6.6 0-12 5.4-12 12.067 0 5.334 3.438 9.849 8.205 11.441.6.111.82-.264.82-.586v-2.173c-3.338.728-4.042-1.644-4.042-1.644-.546-1.406-1.332-1.782-1.332-1.782-1.089-.761.082-.746.082-.746 1.205.086 1.839 1.256 1.839 1.256 1.07 1.858 2.807 1.321 3.492 1.011.107-.783.42-1.323.764-1.626-2.665-.31-5.467-1.349-5.467-6.006 0-1.326.465-2.409 1.235-3.24-.123-.312-.535-1.563.117-3.258 0 0 1.008-.324 3.301 1.23.957-.268 1.983-.402 3.003-.407 1.02.005 2.047.139 3.006.407 2.289-1.554 3.295-1.23 3.295-1.23.653 1.695.241 2.946.118 3.258.77.831 1.233 1.914 1.233 3.24 0 4.669-2.806 5.692-5.479 5.997.427.368.814 1.096.814 2.21v3.277c0 .325.218.703.825.584C20.565 22.208 24 17.694 24 12.364c0-6.667-5.4-12.067-12-12.067z"
        />
      </svg>
    ),
    hover: "hover:text-gray-700 dark:hover:text-white",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/",
    svg: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          fill="currentColor"
          d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.85-3.037-1.851 0-2.132 1.445-2.132 2.939v5.667H9.358V9h3.413v1.561h.048c.476-.9 1.637-1.85 3.369-1.85 3.601 0 4.265 2.371 4.265 5.455v6.286zM5.337 7.433a2.073 2.073 0 1 1 0-4.145 2.073 2.073 0 0 1 0 4.145zm1.778 13.019H3.56V9h3.555v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.549C0 23.23.792 24 1.771 24h20.451C23.2 24 24 23.23 24 22.272V1.723C24 .771 23.2 0 22.225 0z"
        />
      </svg>
    ),
    hover: "hover:text-sky-600",
  },
];

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
    <div
      className={`min-h-screen flex flex-col pb-10 ${theme} ${theme === "dark" ? "bg-gradient-to-b from-black via-purple-950 to-[#170224] text-white" : "bg-gradient-to-b from-white to-pink-50 text-black"}`}
    >
      {/* NAVBAR */}
      <nav
        className={`w-full flex flex-col sm:flex-row items-center justify-between gap-3 px-2 sm:px-8 py-3 border-b border-pink-400/20 sticky top-0 z-20 backdrop-blur-xl transition ${theme === "dark" ? "bg-black/90" : "bg-gray-50/90"}`}
      >
        <span
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.6rem,8vw,2.25rem)",
            letterSpacing: "-.02em",
          }}
        >
          HARSHIT CINEMAS
        </span>
        <form
          onSubmit={handleSearch}
          className="w-full max-w-md flex items-center"
        >
          <div className="flex items-center bg-gray-100 dark:bg-[#22172a] rounded-full px-4 py-2 shadow focus-within:ring-2 ring-pink-400 ring-inset transition w-full">
            <svg
              className="w-5 h-5 text-pink-400 mr-2 opacity-80"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="7" stroke="currentColor" />
              <line
                x1="21"
                y1="21"
                x2="16.65"
                y2="16.65"
                stroke="currentColor"
              />
            </svg>
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent flex-grow outline-none text-md font-semibold text-gray-900 dark:text-white placeholder-pink-400 dark:placeholder-pink-200"
            />
            {searching && (
              <button
                type="button"
                onClick={clearSearch}
                className="ml-2 text-pink-500 hover:text-pink-700 font-bold text-xl"
                title="Clear Search"
              >
                ✕
              </button>
            )}
          </div>
        </form>
        <button
          className="text-2xl p-2 rounded-full border border-pink-200 dark:border-pink-800 bg-pink-50/70 dark:bg-pink-950/30 shadow ml-0 sm:ml-4"
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

      {/* HEADER - VIDEO SECTION */}
      <section
        className="flex flex-col items-center justify-center  px-2 w-full"
        style={{
          backgroundColor: theme === "dark" ? "#0" : "#ffffff",
        }}
      >
        <div className="w-full max-w-4xl">
          <video
            key={theme} // Forces video to reload when theme changes
            className="w-full h-auto  "
            autoPlay
            loop
            muted
            playsInline
          >
            <source
              src={
                theme === "dark"
                  ? "./src/assets/hero_dark_video.mp4"
                  : "./src/assets/hero_light_video.mp4"
              }
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* TRENDING */}
      <section className="mb-8 px-2 w-full">
        <h2 className="font-bold tracking-wide mb-3 ml-3 text-lg md:text-xl uppercase border-b border-gray-300 dark:border-gray-700 pb-1">
          Trending Now
        </h2>
        <div className="flex gap-3 sm:gap-5 md:gap-8 overflow-x-auto py-2 px-2 scrollbar-hide">
          {trending.map((movie, idx) => (
            <div
              key={movie.id}
              className="relative flex-shrink-0 group"
              style={{ minWidth: "120px", maxWidth: "140px" }}
            >
              <div
                className={`absolute -left-6 top-1/2 -translate-y-1/2 font-black text-5xl sm:text-6xl z-10 select-none drop-shadow-[0_6px_10px_#d419b8bb] ${theme === "dark" ? "text-white" : "text-black"}`}
              >
                {idx + 1}
              </div>
              <div
                className="rounded-2xl border-2 border-transparent cursor-pointer transition-all duration-200 overflow-hidden"
                style={{ boxShadow: "none" }}
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                      : "https://img.icons8.com/ios/200/image--v1.png"
                  }
                  alt={movie.title}
                  className="w-[120px] h-[180px] sm:w-[140px] sm:h-[210px] object-cover rounded-2xl transition-all duration-150 group-hover:shadow-lg group-hover:shadow-pink-500/60 group-hover:z-10"
                  style={{ borderRadius: "inherit", boxShadow: "none" }}
                  draggable="false"
                  onMouseEnter={(e) =>
                    (e.currentTarget.parentElement.style.boxShadow =
                      theme === "dark"
                        ? "0 0 20px 5px #d419b8bb"
                        : "0 0 12px 4px #fbbf2488")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.parentElement.style.boxShadow = "none")
                  }
                  onClick={() => setSelectedMovie(movie)}
                  title={movie.title}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPLORER / SEARCH */}
      <section className="w-full max-w-7xl mx-auto pt-0">
        <h2 className="font-bold tracking-wide mb-2 px-3 text-lg md:text-xl uppercase">
          {searching && searchTerm ? (
            <>Search Results {mainMovies.length > 0 && `for "${searchTerm}"`}</>
          ) : (
            "Explore"
          )}
        </h2>
        {loading && (
          <div className="flex justify-center items-center mb-7 pt-10">
            <svg
              className="animate-spin h-10 w-10 text-pink-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4A8 8 0 104 12z"
              />
            </svg>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 px-2 sm:px-2 md:px-1 py-2">
          {!loading && mainMovies.length === 0 && (
            <p className="font-bold text-xl text-gray-600 dark:text-gray-100 col-span-full text-center">
              {searching ? "No results found." : "No movies found."}
            </p>
          )}
          {!loading &&
            mainMovies.map((movie) => (
              <div
                key={movie.id}
                className="group relative min-h-[340px] flex h-[55vw] xs:h-[43vw] sm:h-[294px] md:h-[312px] lg:h-[357px] max-w-full bg-gray-700/10 dark:bg-black/40 rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-105 hover:shadow-pink-400/60 cursor-pointer"
                style={{ aspectRatio: "2/3" }}
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
                  className="absolute inset-0 w-full h-full object-cover object-center z-0 group-hover:scale-[1.04] group-hover:brightness-95 transition"
                  style={{ borderRadius: "inherit" }}
                  draggable="false"
                />
                <div className="absolute bottom-0 left-0 right-0 z-10 p-4 rounded-b-2xl bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col">
                  <h2
                    className={`font-bold text-lg sm:text-xl md:text-2xl mb-1 truncate w-full text-white`}
                    title={movie.title}
                  >
                    {movie.title}
                  </h2>
                  <StarRating rating={movie.vote_average} />
                  <span className="text-xs text-gray-200 mt-1">
                    {movie.release_date}
                  </span>
                </div>
                <div className="absolute inset-0 z-5" />
              </div>
            ))}
        </div>
      </section>

      {/* MODAL */}
      {selectedMovie && (
        <div
          onClick={() => setSelectedMovie(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
        >
          <div
            className="bg-white dark:bg-[#241235] rounded-2xl shadow-2xl p-5 max-w-xs sm:max-w-md w-[90vw] text-left relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-2 right-4 text-3xl text-pink-600 dark:text-pink-100 hover:text-pink-700"
            >
              &times;
            </button>
            <h2
              className={`text-2xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              {selectedMovie.title}
            </h2>
            <img
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
              className="mb-3 rounded-xl w-full max-h-80 object-cover object-top"
            />
            <StarRating rating={selectedMovie.vote_average} />
            <p
              className={`mb-2 ${theme === "dark" ? "text-pink-50" : "text-gray-900/90"}`}
            >
              <span className="font-bold">Release date:</span>{" "}
              {selectedMovie.release_date}
            </p>
            <div
              className={`mb-2 mt-1 rounded-lg px-3 py-2 text-base leading-snug
               ${theme === "dark" ? "bg-black/40 text-pink-50" : "bg-gray-100/70 text-gray-900"}
              `}
            >
              {selectedMovie.overview || "No overview available."}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer
        className={`mt-auto w-full px-4 py-8 pt-10 flex flex-col items-center ${theme === "dark" ? "bg-black/80" : "bg-gray-50/80"} border-t border-gray-200 dark:border-gray-800`}
      >
        <div className="w-full max-w-3xl flex flex-col sm:flex-row justify-between items-center gap-4">
          <span
            className="flex flex-row items-center font-bold text-2xl tracking-tight"
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              letterSpacing: "-.03em",
            }}
          >
            <span className="pr-1.5">🎥 Movie Galaxy</span>
          </span>
          <div className="flex flex-row items-center gap-5 mt-2 sm:mt-0">
            {footerLinks.map(({ name, url, svg, hover }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-400 dark:text-gray-300 hover:scale-110 transition ${hover}`}
                title={name}
              >
                {svg}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center">
          &copy; {new Date().getFullYear()} Movie Galaxy. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
