import React from 'react';
import '../App.css';
import  Appbar  from '../components/Appbar';
import Movie from '../components/Movie';
import { useNavigate } from 'react-router-dom';

function ShowtimesAdmin() {
    const navigate = useNavigate();
    const handleEditMovies = () => {
        navigate('/editMovies');
    }
  return (
    <div className="App">
      <Appbar />
      <div className='MovieList'>
      <Movie imagen="https://ironfilms.s3.us-east-2.amazonaws.com/Beetlejuice_Beetlejuice_poster.jpg.png" nombre="Beetlejuice Beetlejuice" duracion="120 min" genero="Comedia, fantasía, teror" comentarios="Recomendado para mayores de 12 años"/>
      <Movie imagen="https://ironfilms.s3.us-east-2.amazonaws.com/Intensamente2.png" nombre="Intensamente 2" duracion="120 min" genero="Acción, aventura, comedia" />
      <Movie imagen="https://ironfilms.s3.us-east-2.amazonaws.com/Mivillanofavorito4.png" nombre="Mi villano favorito 4" duracion="120 min" genero="Animación, aventura, comedia" />
      <Movie imagen="https://ironfilms.s3.us-east-2.amazonaws.com/Beetlejuice_Beetlejuice_poster.jpg.png" nombre="Beetlejuice Beetlejuice" duracion="120 min" genero="Comedia, fantasía, teror" comentarios="Recomendado para mayores de 12 años"/>
      <Movie imagen="https://ironfilms.s3.us-east-2.amazonaws.com/Intensamente2.png" nombre="Intensamente 2" duracion="120 min" genero="Acción, aventura, comedia" />
      <Movie imagen="https://ironfilms.s3.us-east-2.amazonaws.com/Mivillanofavorito4.png" nombre="Mi villano favorito 4" duracion="120 min" genero="Animación, aventura, comedia" />
      <Movie imagen="https://ironfilms.s3.us-east-2.amazonaws.com/Beetlejuice_Beetlejuice_poster.jpg.png" nombre="Beetlejuice Beetlejuice" duracion="120 min" genero="Comedia, fantasía, teror" comentarios="Recomendado para mayores de 12 años"/>
      <Movie imagen="https://ironfilms.s3.us-east-2.amazonaws.com/Intensamente2.png" nombre="Intensamente 2" duracion="120 min" genero="Acción, aventura, comedia" />
      </div>
      <div>
        <button className='Button lower-right' onClick={handleEditMovies}>Gestionar Películas</button>
      </div>
    </div>
  );
}

export default ShowtimesAdmin;