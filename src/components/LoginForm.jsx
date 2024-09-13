import { useContext, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

function LoginForm() {
    const [isLoginVisible, setIsLoginVisible] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const { role, setRole } = useContext(UserContext);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

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

    const checkIfUserIsEnabled = async (username) => {
        try {
            const response = await axios.get(`http://localhost:8080/usuario/username/${username}`);
            return {
                isEnabled: response.data.enabled,
                roles: response.data.roles // Adjust according to your response structure
            };
        } catch (error) {
            console.error("Error fetching user details:", error);
            return { isEnabled: false, roles: [] };
        }
    };

    const handleLoginClick = async (e) => {
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
                const { isEnabled, roles } = await checkIfUserIsEnabled(username);


                if (isEnabled) {
                    localStorage.setItem('user', JSON.stringify({ username, roles }));
                    Cookies.set('token', token, { expires: 1 });
                    setUser(username); // Set the username after successful login
                    setRole(roles); // Set the role
                    if (roles.includes("ROLE_ADMIN")) {
                        navigate('/admin');
                    }
                    else{
                        navigate('/');
                    }
                } else {
                    alert("Your account is disabled, please contact support");
                }
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
            navigate('/');
        } catch (error) {
            console.error("There was an error logging out!", error);
        }
    };

    return (
        <div>
            {!user ? (
                <>
                    <button className="MenuButton" onClick={toggleLoginForm}>
                        <img className='MenuIcon' src="https://ironfilms.s3.us-east-2.amazonaws.com/user.png" alt="Icono de usuario" />
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
                    <p className='normal-text p' style={{fontSize:'20px', marginBottom:'10px', marginTop:'10px', fontWeight:'350'}}>Bienvenido, {user}!</p>
                    <button className='Button'onClick={handleLogoutClick}style={{maxWidth: '150px', maxHeight:'100px', backgroundColor:'var(--background)', fontSize:'14px'}}>Logout</button>
                </div>
            )}
        </div>
    );
}

export default LoginForm;
