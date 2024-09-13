import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import axios from 'axios';

const PurchaseHistory = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:8080/boleta/all'); // Replace with your tickets endpoint
        const ticketsData = response.data;
        console.log(ticketsData[0].pelicula.id);

        // Fetch user and movie details for each ticket
        const ticketsWithDetails = await Promise.all(ticketsData.map(async ticket => {
          const [userResponse, movieResponse] = await Promise.all([
            axios.get(`http://localhost:8080/usuario/${ticket.usuario.id}`), // Replace with your user endpoint
            axios.get(`http://localhost:8080/pelicula/${ticket.pelicula.id}`) // Replace with your movie endpoint
          ]);
          console.log(userResponse.data);
          console.log(movieResponse.data);
          return {
            ...ticket,
            user: userResponse.data,
            movie: movieResponse.data
          };
        }));

        setTickets(ticketsWithDetails);
        setFilteredTickets(ticketsWithDetails);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);

    const filtered = tickets.filter(ticket => 
      ticket.user.username.toLowerCase().includes(value.toLowerCase()) || 
      ticket.user.email.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredTickets(filtered);
  };

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearch}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Movie Title</TableCell>
              <TableCell>Purchase Date</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTickets.map(ticket => (
              <TableRow key={ticket.id}>
                <TableCell>{ticket.user.username}</TableCell>
                <TableCell>{ticket.user.email}</TableCell>
                <TableCell>{ticket.movie.titulo}</TableCell>
                <TableCell>{ticket.fechaCompra}</TableCell>
                <TableCell>{ticket.precio}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PurchaseHistory;