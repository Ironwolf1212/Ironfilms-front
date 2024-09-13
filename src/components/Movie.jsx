import { Container } from '@mui/material';
import React, { useState } from 'react';
import BuyTicketForm from './BuyTicketForm';

function Movie({ imagen, nombre, duracion, genero , comentarios}) {


  return (
    <div className="Movie">
      <img className='Thumbnail' src={imagen} alt={nombre} />
      <h2 className='Title'>{nombre}</h2>
      <p className='Text-left'>{genero}</p>
      <p className='Text-left'>{duracion}</p>
      <div>
      </div>
      <BuyTicketForm
      imagen={imagen} 
      nombre={nombre} 
      duracion={duracion} 
      genero={genero}
      comentarios={comentarios}/>
    </div>
  );
}

export default Movie;