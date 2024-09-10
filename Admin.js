import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Admin.css';

function Admin() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('user');
    const [users, setUsers] = useState([
        { username: 'Rachna', email: 'rachnaaulakh@gmail.com', role: 'user' },
        { username: 'Navneet', email: 'Navneet@gmail.com', role: 'admin' }
    ]);

    const handleAddUser = (e) => {
        e.preventDefault();
        const newUser = { username, email, role };
        setUsers([...users, newUser]);
        setUsername('');
        setEmail('');
        setRole('user');
        alert('new User is added');
    };

    const handleDeleteUser = (index) => {
        const updatedUsers = users.filter((_, i) => i !== index);
        setUsers(updatedUsers);
        alert('User is successfully deleted');
    };

    return (
        <div className="admin">
            <h1>Admin Form</h1>

            <section className="section">
                <h2>Add New User</h2>
                <form onSubmit={handleAddUser}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Role:</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit">Add User</button>
                </form>
            </section>

            <section className="admin-section">
                <h2>Manage Users History</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button onClick={() => handleDeleteUser(index)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <Link to="/admin/groups">Manage Groups</Link>
        </div>
    );
}

export default Admin;
