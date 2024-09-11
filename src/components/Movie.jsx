import { Container } from '@mui/material';
import React, { useState } from 'react';

function Movie({ imagen, nombre, duracion, genero }) {
  const [cantidadBoletos, setCantidadBoletos] = useState(0);

  const handleComprar = () => {
    // Aquí iría la lógica para comprar los boletos
    // Por ejemplo, hacer una petición a un servidor para procesar la compra
    console.log(`Comprar ${cantidadBoletos} boletos para ${nombre}`);
  };

  return (
    <div className="Movie">
      <img className='Thumbnail' src={imagen} alt={nombre} />
      <h2 className='Title'>{nombre}</h2>
      <p className='Text-left'>{genero}</p>
      <p className='Text-left'>{duracion}</p>
      <div>
      </div>
      <button className="Button" onClick={handleComprar}>Ver horarios</button>
    </div>
  );
}

export default Movie;