import React, { useState, useEffect } from 'react';
import '../styles/UsersTable.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


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
    const handleViewPurchases = () => {
        alert("Sorry, this feature is not available yet");
    };

    const handleUserStatusChange = async (userId, isEnabled, e) => {
        e.preventDefault();
        try {
            const url = isEnabled 
                ? `http://localhost:8080/usuario/${userId}/disable` 
                : `http://localhost:8080/usuario/${userId}/enable`;
                
            const response = await axios.patch(url, {}, { withCredentials: true });

            if (response.status === 200) {
                const updatedUsers = users.map(user => 
                    user.id === userId ? { ...user, enabled: !isEnabled } : user
                );
                setUsers(updatedUsers);
                setFilteredUsers(updatedUsers);
                alert(isEnabled ? 'Account disabled successfully' : 'Account enabled successfully');
            }
        } catch (error) {
            console.error('Error changing user status:', error);
            alert('Error changing user status');
        }
    };
    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate('/admin');
      }
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
            <div className='AppBar'>
                <img onClick={handleLogoClick} className='Solo-Logo' src='https://ironfilms.s3.us-east-2.amazonaws.com/Ironfilms.png' alt="Iron Films Logo"></img>
            </div>
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
                        <th>Actions</th>
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
                                <td>
                                    <button onClick={handleViewPurchases}>View Purchases</button>
                                    <button
                                        onClick={(e) => handleUserStatusChange(user.id, user.enabled, e)}
                                    >
                                        {user.enabled ? 'Disable Account' : 'Enable Account'}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
