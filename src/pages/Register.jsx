import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { UserContext } from '../UserContext';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        surname: '',
        email: '',
        cellphone: '',
        password: '',
        confirmPassword: '',
        registerAdmin: false
    });
    const navigate = useNavigate();
    const {user, setUser } = useContext(UserContext);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleLogoClick = () => {
        navigate('/');
      }

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
                roles: "ROLE_USER"
            });

            if (response.status === 200) {
                try {
                    const response = await axios.post('http://localhost:8080/usuario/login', {
                        username: formData.username,
                        password: formData.password,
                        withCredentials: true
                    });
        
                    if (response.status === 200) {
                        const token = response.data.token;
                        const username = response.data.username;
                        const roles = response.data.roles;
                        localStorage.setItem('user', JSON.stringify({ username, roles }));
                        Cookies.set('token', token, { expires: 1 });
                        console.log("Devuelve nombre de usuario:",username)
                        setUser(username); // Set the username after successful login
                    } else {
                        alert("Login failed");
                    }
                } catch (error) {
                    console.error("There was an error logging in!", error);
                    alert("Error logging in");
                }
                alert("User registered successfully");
                const userResponse = await axios.get(`http://localhost:8080/usuario/username/${formData.username}`);
                if (userResponse.data.roles === "ROLE_ADMIN") {
                    navigate('/admin');
                    
                } else {
                navigate('/');
                }
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
                <img onClick={handleLogoClick} className='Solo-Logo' src='https://ironfilms.s3.us-east-2.amazonaws.com/Ironfilms.png' alt="Iron Films Logo"></img>
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
                        <input type='checkbox' name='registerAdmin' value = {true}/>
                        <button className="Button" type="button" style={{ backgroundColor: "var(--background)", borderRadius: '5px', width: '140px' }}>Cancelar</button>
                        <button className="Button" type="submit" style={{ borderRadius: '5px', width: '140px' }}>Registrarse</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;

