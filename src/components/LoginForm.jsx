import { FormatUnderlined } from '@mui/icons-material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

function LoginForm() {
    const [isLoginVisible, setIsLoginVisible] = useState(false);
    const navigate = useNavigate(); // Create a navigate object using useNavigate
    const toggleLoginForm = () => {
        setIsLoginVisible(!isLoginVisible);
    };

    const handleRegisterClick = () => {
        navigate('/register'); // Use the navigate object to redirect to the register page
    }
    return (
        <div>
            <button className="MenuButton" onClick={toggleLoginForm}>
                {/* <i className="fa fa-user" ></i> Icon for the button */}
                <img  className='MenuIcon' src="/static/menu.png" alt="Icono de usuario" />
            </button>

            {isLoginVisible && (
                <div className="overlay" onClick={toggleLoginForm}>
                    <div className="login-form" onClick={(e) => e.stopPropagation()}>
                        <label className='form-title'>Iniciar sesión</label>
                        <div className='form-container'>
                        <form >
                            <label>Usuario / Correo</label>
                            <input className="input-field" type="text" placeholder="Usuario" required />
                            <label>Contraseña</label>
                            <input className="input-field" type="password" placeholder="Contraseña" required />
                            <button className="Button" type="submit">Ingresar</button>
                        </form>
                        </div>
                        <div className='form-footer'>
                        <a onClick={handleRegisterClick}>¿Todavía no tienes cuenta? </a><a onClick={handleRegisterClick} style={{textDecoration: "underline"}}>Regístrate aquí</a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LoginForm;