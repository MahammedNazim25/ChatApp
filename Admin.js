import React, { useState, useEffect } from 'react';
import { db } from '../Firebase';
import { collection, query, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import './Admin.css'; // Ensure you create this CSS file for styling
import Navbar from './Navbar';
import Footer from './Footer';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [inviteStatus, setInviteStatus] = useState('');

  const usersRef = collection(db, "users");

  useEffect(() => {
    const unsubscribe = onSnapshot(usersRef, (snapshot) => {
      const usersList = [];
      snapshot.forEach((doc) => {
        usersList.push({ id: doc.id, ...doc.data() });
      });
      setUsers(usersList);
    });

    return () => unsubscribe();
  }, []);

  const handleInviteUser = async (event) => {
    event.preventDefault();
    if (!email || !name) {
      alert('Please provide both name and email.');
      return;
    }

    try {
      await addDoc(usersRef, { email, name });
      setInviteStatus('User invited successfully!');
      setEmail('');
      setName('');
    } catch (error) {
      console.error("Error inviting user:", error);
      setInviteStatus('Failed to invite user.');
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmation = window.confirm("Are you sure you want to delete this user?");
    if (confirmation) {
      try {
        await deleteDoc(doc(db, "users", userId));
        console.log("User deleted");
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div>
    <Navbar/>

    <div className="admin-container">
      <div className="invite-user">
        <h1>Invite User</h1>
        <form onSubmit={handleInviteUser} className="invite-form">
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Name" 
            required 
          />
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            required 
          />
          <button type="submit" className="invite-button">Invite</button>
          {inviteStatus && <p className="invite-status">{inviteStatus}</p>}
        </form>
      </div>
      
      <div className="manage-users">
        <h2>Manage Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email})
              <button onClick={() => handleDeleteUser(user.id)} className="delete-user-button">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Admin;
