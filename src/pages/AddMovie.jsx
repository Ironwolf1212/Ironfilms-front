import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        movie: '',
        genre: '',
        duration: '',
        additionalInfo: '',
        thumbnailUrl: '',
    });
    const handleLogoClick = () => {
        navigate('/');
      }
    const handleSaveMovie = async (e) => {
        e.preventDefault();
        try {
            axios.defaults.withCredentials = true;
            console.log(formData);
            const response = await axios.post('http://localhost:8080/pelicula/add', {
                titulo: formData.movie,
                genero: formData.genre,
                duracion: formData.duration,
                comentarios: formData.additionalInfo,
                link_portada: formData.thumbnailUrl
            });
            if (response.status === 200) {
                alert('Película guardada con éxito');
                navigate('/')
            }
            else {
                alert('Error al guardar la película');
            };
      }catch (error) {
        console.error("There was an error saving movie", error);
        alert("Error al guardar la película");
    }}
      const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <div>
            <div className='AppBar'>
                <img onClick={handleLogoClick} className='Solo-Logo' src='https://ironfilms.s3.us-east-2.amazonaws.com/Ironfilms.png' alt="Iron Films Logo"></img>
            </div>
            <form>
                <h1>Agregar Película</h1>
                <label>Nombre</label>
                <input type='text' name="movie"placeholder='Película'  onChange={handleChange} value={formData.movie}/>
                <label>Género</label>
                <input type='text' name="genre"placeholder='Género'  onChange={handleChange} value={formData.genre}/>
                <label>Duración</label>
                <input type='text' name="duration"placeholder='Duración'  onChange={handleChange} value={formData.duration}/>
                <label>Información adicional</label>
                <input type='text' name="additionalInfo"placeholder='Información adicional'  onChange={handleChange} value={formData.additionalInfo}/>
                <label>Url de la carátula</label>
                <input type='text' name="thumbnailUrl"placeholder='Url de la carátula'  onChange={handleChange} value={formData.thumbnailUrl}/>
            </form>
            <button onClick={handleSaveMovie}>Guardar</button>
            <button>Cancelar</button>
        </div>
    );
}

export default AddMovie;
