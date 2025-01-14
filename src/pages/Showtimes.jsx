import React, { useState, useEffect } from 'react';
import '../App.css';
import Appbar from '../components/Appbar';
import Movie from '../components/Movie';
import axios from 'axios';


function Showtimes() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    // Fetch movies from the backend
    axios.get('http://localhost:8080/pelicula/all')
      .then((response) => {
        setMovies(response.data); // Set movies in state
        setFilteredMovies(response.data); // Initialize filtered movies
      })
      .catch((error) => {
        console.error("Error al obtener películas", error);
      });
  }, []);

  useEffect(() => {
    // Filter movies based on search term
    setFilteredMovies(
      movies.filter((movie) =>
        movie.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, movies]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="App">
      <Appbar />
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar película..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>
      <div className='MovieList'>
        { filteredMovies.map((movie) => (
          <Movie
            key={movie.id}
            imagen={movie.link_portada}
            nombre={movie.titulo}
            duracion={`${movie.duracion} min`}
            genero={movie.genero}
            comentarios={movie.comentarios}
          />
        ))}
      </div>
    </div>
  );
}

export default Showtimes;
