import React from "react";
import { useLocation, Link } from "react-router-dom";
import LOGO from '../LOGO.png';

function Home() {
    const location = useLocation();
    const { displayName, bio, profilePhoto, background } = location.state || {};
  
    return (
       
        <div className="home" style={{ backgroundImage: `url(${background || ''})`,  color: '#fff' }}>
          
            <div className="logo">
                <img src={LOGO} alt="Logo" className="logo" />
            </div>
          
            {/* Profile Section */}
            <div className="profile-section" style={{  }}>
                {profilePhoto && <img src={profilePhoto} alt="Profile" style={{  }} />}
                <h1>{displayName}</h1>
                <p>{bio}</p>
            </div>

            {/* Navigation Links */}
            <ul>
                <li><Link to="Chat">Chatting</Link></li>
                <li><Link to="/Call">Calls</Link></li>
                <li><Link to="/Videocall">Video Calls</Link></li>  
                <li><Link to="/Manageprofile">Manage Profile</Link></li>
                <li><Link to="/Admin">Admin</Link></li>
                <li><Link to="/Contactus">Help</Link></li>
                <Link to="/group-management">Create New Group</Link>
                
                <li className="buttons">
                    <Link to="/Signout" className="button">Signout</Link>
                </li>
            </ul>
        </div>
    );
}

export default Home;
