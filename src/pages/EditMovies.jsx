import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChangeMovieName from '../components/ChangeMovieName';

const EditMovies = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        duration: '',
        additionalInfo: ''
    });
    const [movieId, setMovieId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the list of movies
        axios.get('http://localhost:8080/pelicula/all') // Adjust URL based on your backend
            .then(response => {
                console.log('Movies:', response.data);
                setMovies(response.data);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }, []);

    const handleMovieChange = (event) => {
        const movieId = event.target.value;
        const movie = movies.find(m => m.id === parseInt(movieId));
        if (movie) {
            setSelectedMovie(movie);
            setFormData({
                title: movie.titulo,
                genre: movie.genero,
                duration: movie.duracion,
                additionalInfo: movie.comentarios,
                thumbnailUrl: movie.link_portada
            });
            setMovieId(movieId);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleUpdateMovie = () => {
        if (selectedMovie) {
            axios.put(`http://localhost:8080/pelicula/${selectedMovie.id}`, formData)
                .then(response => {
                    alert('Movie updated successfully');
                })
                .catch(error => {
                    console.error('Error updating movie:', error);
                });
        }
    };

    const handleAddMovie = () => {
        navigate('/addMovie');
    };

    const handleDeleteMovie = () => {
        if (selectedMovie) {
            axios.delete(`http://localhost:8080/pelicula/${selectedMovie.id}`)
                .then(response => {
                    alert('Movie deleted successfully');
                    // Remove deleted movie from state
                    setMovies(movies.filter(movie => movie.id !== selectedMovie.id));
                    setSelectedMovie(null); // Clear selection
                    setFormData({
                        title: '',
                        genre: '',
                        duration: '',
                        additionalInfo: ''
                    });
                })
                .catch(error => {
                    console.error('Error deleting movie:', error);
                });
        } else {
            alert('Please select a movie to delete');
        }
    };

    const handleLogoClick = () => {
        navigate('/admin');
    };

    return (
        <div>
            <div className='AppBar'>
                <img onClick={handleLogoClick} className='Solo-Logo' src='https://ironfilms.s3.us-east-2.amazonaws.com/Ironfilms.png' alt="Iron Films Logo" />
            </div>
            <div className='Background'>
                <div className='content-edit'>
                    <div>
                        <h1>Editar Películas</h1>
                    </div>
                    <div className='container-edit'>
                        <form>
                            <div className='left-column'>
                                <label>Seleccione película</label>
                                <select value={selectedMovie ? selectedMovie.id : ''} onChange={handleMovieChange}>
                                    <option value="">Seleccionar una película</option>
                                    {movies.map(movie => (
                                        <option key={movie.id} value={movie.id}>{movie.titulo}</option>
                                    ))}
                                </select>
                                <ChangeMovieName movieId={movieId} />

                                <label>Género</label>
                                <input
                                    type='text'
                                    name='genre'
                                    value={formData.genre}
                                    onChange={handleChange}
                                    placeholder='Género'
                                />
                                <label>Duración</label>
                                <input
                                    type='text'
                                    name='duration'
                                    value={formData.duration}
                                    onChange={handleChange}
                                    placeholder='Duración'
                                />
                                <label>Información adicional</label>
                                <input
                                    type='text'
                                    name='additionalInfo'
                                    value={formData.additionalInfo}
                                    onChange={handleChange}
                                    placeholder='Información adicional'
                                />
                            </div>
                            <div className='right-column'>
                                <img src={formData.thumbnailUrl} alt="Thumbnail" />
                                <button>Cambiar imagen</button>
                            </div>
                        </form>
                        <button type='button' onClick={handleUpdateMovie}>Actualizar película</button>
                        <button type='button' onClick={handleAddMovie}>Agregar nueva película</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditMovies;
