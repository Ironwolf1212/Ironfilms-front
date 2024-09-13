import { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import PayForm from './PayForm.jsx';

function BuyTicketForm({ imagen, nombre, duracion, genero, comentarios }) {
    const [isBuyVisible, setIsBuyVisible] = useState(false);
    //const [movieName, setMovieName] = useState(nombre);
    const movieName = nombre;
    const {user, setUser} = useContext(UserContext)
    const {role, setRole} = useContext(UserContext)
    const [tickets, setTickets] = useState(0);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const [isPayVisible, setIsPayVisible] = useState(false);
    const handleBuyClick = () => {
        setIsPayVisible(!isPayVisible);
    };
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
    // useEffect((tickets) => {
    //     setTickets(tickets);
    // }, [tickets]);

    const toggleLoginForm = () => {
        if(!user){
            alert("Debes iniciar sesión para comprar boletas")
        }
        else{
            setIsBuyVisible(!isBuyVisible);
        }
        
    };

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleRegisterClick = () => {
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setTickets(e.target.value);
    };

    // const handleLoginClick = async (e) => {
    //     console.log("Entered login")
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('http://localhost:8080/usuario/login', {
    //             username: formData.username,
    //             password: formData.password,
    //             withCredentials: true
    //         });

    //         if (response.status === 200) {
    //             const token = response.data.token;
    //             const username = response.data.username;
    //             const roles = response.data.roles;
    //             localStorage.setItem('user', JSON.stringify({ username, roles }));
    //             Cookies.set('token', token, { expires: 1 });
    //             console.log("Devuelve nombre de usuario:",username)
    //             setUser(username); // Set the username after successful login
    //         } else {
    //             alert("Login failed");
    //         }
    //     } catch (error) {
    //         console.error("There was an error logging in!", error);
    //         alert("Error logging in");
    //     }
    // };

    // const handleLogoutClick = async () => {
    //     try {
    //         await axios.post('http://localhost:8080/usuario/logout', {}, { withCredentials: true });
    //         Cookies.remove('token');
    //         setUser(null);
    //         setRole(null);
    //         localStorage.removeItem('user');
    //     } catch (error) {
    //         console.error("There was an error logging out!", error);
    //     }
    // };


    return (
        <div>
                <>
                    <button className="Button" onClick={toggleLoginForm}>Comprar boletas</button>

                    {isBuyVisible && (
                        <div className="overlay" onClick={toggleLoginForm}>
                            <div className="buy-form" onClick={(e) => e.stopPropagation()}>
                                <label className='form-title'>Comprar Boletos</label>
                                <div className='form-container'>
                                    <div className='movie-description'>
                                        <div className='buy-movie-thumbnail-container'>
                                            <img className='buy-movie-thumbnail' src={imagen} alt='movie-thumbnail' />
                                        </div>
                                        <div className='buy-movie-info'>
                                        <div className='separator-description'>
                                            <label className='movie-title'>{nombre}</label>
                                            
                                            <label className='normal-text'>{genero}</label>
                                            <label className='normal-text'>{duracion}</label>
                                            </div>
                                            <label className='normal-text footer'>{comentarios}</label>
                                        </div>
                                    </div>
                                    <div className='buy-window-form'>
                                        <form><div className='price-row'>
                                        <label className='label-left'>Número de boletas:</label>
                                        <input type='number' name='ticket-number' style={{width: "16%"}}className='number-input label-right' onChange={handleChange} />
                                        </div>
                                        <div className='price-row'>
                                        <label className='label-left'>Precio unitario: </label>
                                        <label className='label-right'>$10.000</label>
                                        </div>
                                        <div className='price-row'>
                                        <label className='label-left'>Precio total: </label>
                                        <label className='label-right'>${tickets*10}.000</label>
                                        </div>
                                    </form>
                                    <button className="Button" onClick={handleBuyClick} style={{ marginTop: "30px" }}>
              Comprar
            </button>
                                    
                                    </div>
                                </div>
                            </div>
                            {isPayVisible && <PayForm 
                            total = {tickets*10000} 
                            movieName = {nombre} 
                            />}
                        </div>
                    )}
                    
                </>
        </div>
    );
}

export default BuyTicketForm;
