import React, { useState, useEffect } from 'react';
import '../styles/UsersTable.css';
import axios from 'axios';

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch users from the API
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/usuario/all');
                setUsers(response.data);
                setFilteredUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        // Filter users based on the search term
        if (searchTerm === '') {
            setFilteredUsers(users);
        } else {
            const lowercasedSearchTerm = searchTerm.toLowerCase();
            const filtered = users.filter(user =>
                user.username.toLowerCase().includes(lowercasedSearchTerm) ||
                user.name.toLowerCase().includes(lowercasedSearchTerm) ||
                user.surname.toLowerCase().includes(lowercasedSearchTerm) ||
                user.email.toLowerCase().includes(lowercasedSearchTerm)
            );
            setFilteredUsers(filtered);
        }
    }, [searchTerm, users]);

    return (
        <div>
            <h1>Users Table</h1>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.name}</td>
                                <td>{user.surname}</td>
                                <td>{user.email}</td>
                                <td><button>Ver compras</button></td>
                                <td><button>Inhabilitar cuenta</button></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
