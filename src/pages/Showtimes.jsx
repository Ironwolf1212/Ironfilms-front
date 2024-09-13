import React, { useState, useEffect } from 'react';
import '../App.css';
import Appbar from '../components/Appbar';
import Movie from '../components/Movie';
import axios from 'axios';

function Showtimes() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/pelicula/all')
      .then((response) => {
        setMovies(response.data); // Establecer películas en el estado
      })
      .catch((error) => {
        console.error("Error al obtener películas", error);
      });
  }, []);

  return (
    <div className="App">
      <Appbar />
      <div className='MovieList'>
        {movies.map((movie) => (
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
