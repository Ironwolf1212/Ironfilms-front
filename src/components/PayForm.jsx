import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

function PayForm({ total, movieName }) {

    const [isPayVisible, setIsPayVisible] = useState(false);
    const {user, setUser} = useContext(UserContext);
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        cardName: '',
        cardExpiration: '',
        cardCvv: ''
    });

    const handleBuyClick = () => {
        setIsPayVisible(!isPayVisible);
    };

    const handleChange = (e) => {
        setCardDetails({
            ...cardDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Obtener IDs de usuario y película
            console.log(new Date());
            const userResponse = await axios.get(`http://localhost:8080/usuario/username/${user}`);
            const movieResponse = await axios.get(`http://localhost:8080/pelicula/title/${movieName}`);

            const userId = userResponse.data.id;
            const movieId = movieResponse.data.id;
          
            console.log(userId, movieId);
            // Crear ticket
            const ticketData = {
                fecha_compra: new Date(),
                precio: total,
                usuarioId: userId,
                peliculaId: movieId
            };

            const response = await axios.post('http://localhost:8080/boleta/add', ticketData);

            if (response.status === 200) {
                alert('Compra exitosa');
            } else {
                alert('Error en la compra');
            }
        } catch (error) {
            console.error('Error al realizar la compra', error);
            alert('Error al realizar la compra');
        }
    };

    return (
        <div className='pay-form' onClick={(e) => e.stopPropagation()}>
            <div className='payment-form'>
              <h1 style={{ fontFamily: "Roboto Mono", fontWeight: "400" }}>Formulario de pago</h1>
              <form className='buy-window-row' onSubmit={handleSubmit}>
                <div>
                  <label>Total a pagar: {total} COP</label>
                </div>
                <div className='price-row'>
                  <label className='label-left' htmlFor="cardNumber">Número de tarjeta:</label>
                  <input className='label-right' type="text" id="cardNumber" name="cardNumber" value={cardDetails.cardNumber} onChange={handleChange} required />
                </div>
                <div className='price-row'>
                  <label className='label-left' htmlFor="cardName">Nombre en la tarjeta:</label>
                  <input className='label-right' type="text" id="cardName" name="cardName" value={cardDetails.cardName} onChange={handleChange} required />
                </div>
                <div className='price-row'>
                  <label className='label-left' htmlFor="cardExpiration">Fecha de expiración:</label>
                  <input className='label-right' type="text" id="cardExpiration" name="cardExpiration" style={{ maxWidth: "100px" }} value={cardDetails.cardExpiration} onChange={handleChange} required />
                </div>
                <div className='price-row'>
                  <label className='label-left' htmlFor="cardCvv">CVV:</label>
                  <input className='label-right' type="text" id="cardCvv" name="cardCvv" style={{ maxWidth: "50px" }} value={cardDetails.cardCvv} onChange={handleChange} required />
                </div>
                <button className="Button" style={{ marginTop: "60px" }} type="submit">Pagar</button>
              </form>
            </div>
        </div>
    );
}

export default PayForm;
