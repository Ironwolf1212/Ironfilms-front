import React, { useState } from 'react';
import axios from 'axios';

const ChangeMovieName = ({ movieId }) => {
    const [isChangeNameVisible, setIsChangeNameVisible] = useState(false);
    const [newName, setNewName] = useState('');

    const handleChange = (e) => {
        setNewName(e.target.value);
    };

    const toggleChangeForm = () => {
        setIsChangeNameVisible(!isChangeNameVisible);
    };

    const handleChangeNameClick = async (e) => {
        e.preventDefault();

        try {
            const response = await axios({
                method: 'PATCH',
                url: `http://localhost:8080/pelicula/${movieId}`,
                data: { titulo: newName },
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            alert('Nombre de película cambiado exitosamente');
        } catch (error) {
            console.error('Error al cambiar nombre de la película', error);
            alert('Error al cambiar nombre de la película');
        }
    };

    return (
        <div>
            <button className='Button' onClick={toggleChangeForm}>Cambiar nombre</button>
            {isChangeNameVisible && (
                <div className="overlay" onClick={toggleChangeForm}>
                    <div className="change-form" onClick={(e) => e.stopPropagation()}>
                        <label className='form-title'>Cambiar nombre de película</label>
                        <input
                            type='text'
                            name='newName'
                            className='input-field'
                            placeholder='Nuevo nombre'
                            onChange={handleChange}
                            required
                        />
                        <button className='Button' onClick={handleChangeNameClick}>Cambiar nombre</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChangeMovieName;
