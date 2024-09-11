import React from 'react';
import '../App.css';
import  Appbar  from '../components/Appbar';
import Movie from '../components/Movie';

function Greeting(props) {
  return (
    <div className="App">
      <Appbar />
      <div className='MovieList'>
      <Movie imagen="https://ironfilms.s3.us-east-2.amazonaws.com/Beetlejuice_Beetlejuice_poster.jpg.png" nombre="Beetlejuice Beetlejuice" duracion="120 min" genero="Comedia, fantasía, teror" />
      <Movie imagen="https://ironfilms.s3.us-east-2.amazonaws.com/Intensamente2.png" nombre="Intensamente 2" duracion="120 min" genero="Acción, aventura, comedia" />
      <Movie imagen="https://ironfilms.s3.us-east-2.amazonaws.com/Mivillanofavorito4.png" nombre="Mi villano favorito 4" duracion="120 min" genero="Animación, aventura, comedia" />
      <Movie imagen="https://ironfilms.s3.us-east-2.amazonaws.com/Beetlejuice_Beetlejuice_poster.jpg.png" nombre="Beetlejuice Beetlejuice" duracion="120 min" genero="Comedia, fantasía, teror" />
      <Movie imagen="https://ironfilms.s3.us-east-2.amazonaws.com/Intensamente2.png" nombre="Intensamente 2" duracion="120 min" genero="Acción, aventura, comedia" />
      <Movie imagen="https://ironfilms.s3.us-east-2.amazonaws.com/Mivillanofavorito4.png" nombre="Mi villano favorito 4" duracion="120 min" genero="Animación, aventura, comedia" />
      <Movie imagen="https://ironfilms.s3.us-east-2.amazonaws.com/Beetlejuice_Beetlejuice_poster.jpg.png" nombre="Beetlejuice Beetlejuice" duracion="120 min" genero="Comedia, fantasía, teror" />
      <Movie imagen="https://ironfilms.s3.us-east-2.amazonaws.com/Intensamente2.png" nombre="Intensamente 2" duracion="120 min" genero="Acción, aventura, comedia" />
      </div>
      
    </div>
  );
}

export default Greeting;