import { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

function LoginForm() {
    const [isLoginVisible, setIsLoginVisible] = useState(false);
    const {user, setUser} = useContext(UserContext)
    const {role, setRole} = useContext(UserContext)
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    // useEffect(() => {
    //     console.log("Checking if user is logged in...");
    //     // Check if the user is logged in by sending a request to the backend
    //     const fetchUser = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:8080/auth/user', { withCredentials: true });
    //             if (response.status === 200) {
    //                 setUser(response.data);
    //             }
    //         } catch (error) {
    //             // Handle error or set user to null
    //             setUser(null);
    //         }
    //     };

    //     fetchUser();
    // }, []);
    // useEffect(() => {
    //     const token = Cookies.get('token');
    //     if (token) {
    //         // Hacer la solicitud al backend para obtener el nombre de usuario
    //         console.log("Solicitando info de ",token)
    //         fetch('http://localhost:8080/usuario/info', {
    //             method: 'GET',
    //             headers: {
    //                 'Authorization': `Bearer ${token}`
    //             }
    //         })
    //             .then(response => response.json())
    //             .then(data => {
    //                 if (data.username) {
    //                     setUserContext(data.username);
    //                 }
    //             })
    //             .catch(err => console.error("Error fetching user: ", err));
    //     }
    // }, []);

    const toggleLoginForm = () => {
        setIsLoginVisible(!isLoginVisible);
    };

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLoginClick = async (e) => {
        console.log("Entered login")
        e.preventDefault();
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
    };

    const handleLogoutClick = async () => {
        try {
            await axios.post('http://localhost:8080/usuario/logout', {}, { withCredentials: true });
            Cookies.remove('token');
            setUser(null);
            setRole(null);
            localStorage.removeItem('user');
        } catch (error) {
            console.error("There was an error logging out!", error);
        }
    };
    return (
        <div>
            {!user ? (
                <>
                    <button className="MenuButton" onClick={toggleLoginForm}>
                        <img className='MenuIcon' src="/static/menu.png" alt="Icono de usuario" />
                    </button>

                    {isLoginVisible && (
                        <div className="overlay" onClick={toggleLoginForm}>
                            <div className="login-form" onClick={(e) => e.stopPropagation()}>
                                <label className='form-title'>Iniciar sesión</label>
                                <div className='form-container'>
                                    <form>
                                        <label>Usuario / Correo</label>
                                        <input name="username" className="input-field" type="text" placeholder="Usuario" onChange={handleChange} required />
                                        <label>Contraseña</label>
                                        <input name="password" className="input-field" type="password" placeholder="Contraseña" onChange={handleChange} required />
                                        <button className="Button" type="submit" onClick={handleLoginClick}>Ingresar</button>
                                    </form>
                                </div>
                                <div className='form-footer'>
                                    <a onClick={handleRegisterClick}>¿Todavía no tienes cuenta? </a><a onClick={handleRegisterClick} style={{ textDecoration: "underline" }}>Regístrate aquí</a>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div>
                    <p>Welcome, {user}!</p>
                    <button onClick={handleLogoutClick}>Logout</button>
                </div>
            )}
        </div>
    );
}

export default LoginForm;
