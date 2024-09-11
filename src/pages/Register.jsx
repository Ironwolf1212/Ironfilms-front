import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        surname: '',
        email: '',
        cellphone: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            axios.defaults.withCredentials = true;
            const response = await axios.post('http://localhost:8080/usuario/add', {
                username: formData.username,
                name: formData.name,
                surname: formData.surname,
                email: formData.email,
                cellphone: formData.cellphone,
                password: formData.password,
            });

            if (response.status === 200) {
                alert("User registered successfully");
            } else {
                alert("Failed to register user");
            }
        } catch (error) {
            console.error("There was an error registering the user!", error);
            alert("Error registering user");
        }
    };

    return (
        <div className='BlueBackground App'>
            <div className='AppBar'>
                <img className='Solo-Logo' src='https://ironfilms.s3.us-east-2.amazonaws.com/Ironfilms.png' alt="Iron Films Logo"></img>
            </div>
            <div className='Content'>
                <div className='Register-Form'>
                    <form onSubmit={handleSubmit}>
                        <label>Nombre de usuario</label>
                        <input
                            className="input-field"
                            type="text"
                            name="username"
                            placeholder="Usuario"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        <label>Nombre</label>
                        <input
                            className="input-field"
                            type="text"
                            name="name"
                            placeholder="Nombre"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <label>Apellido</label>
                        <input
                            className="input-field"
                            type="text"
                            name="surname"
                            placeholder="Apellido"
                            value={formData.surname}
                            onChange={handleChange}
                            required
                        />
                        <label>Correo</label>
                        <input
                            className="input-field"
                            type="email"
                            name="email"
                            placeholder="Correo"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <label>Teléfono</label>
                        <input
                            className="input-field"
                            type="text"
                            name="cellphone"
                            placeholder="Teléfono"
                            value={formData.cellphone}
                            onChange={handleChange}
                            required
                        />
                        <label>Contraseña</label>
                        <input
                            className="input-field"
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <label>Confirmar contraseña</label>
                        <input
                            className="input-field"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirmar contraseña"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <button className="Button" type="button" style={{ backgroundColor: "var(--background)", borderRadius: '5px', width: '140px' }}>Cancelar</button>
                        <button className="Button" type="submit" style={{ borderRadius: '5px', width: '140px' }}>Registrarse</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;

