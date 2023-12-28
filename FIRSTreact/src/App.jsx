import React, { useEffect, useState } from "react";
import "./App.css";
import searchicon from "./search.svg";
import Moviecard from "./Moviecard";

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=81c636db";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchmovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchmovies("batman");
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    searchmovies(searchTerm);
  };

  return (
    <div className="app">
      <h1>Flim Flix</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <img src={searchicon} alt="searchico" onClick={handleSearchClick} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <Moviecard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
