import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth'; 
import { auth } from '../Firebase'; 
import './Home.css'; 

const Signout = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {

        signOut(auth)
            .then(() => {
                navigate("/Signin"); 
            })
            .catch((error) => {
                console.error('Sign out error:', error.message);
            });
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to ChatApp</h1>
                <button onClick={handleSignOut} className="signout-btn">Sign Out</button>
            </header>
            </div>
    );
};
export default Signout;