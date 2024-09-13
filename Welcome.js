import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles.css";

const Welcome = () => {
    const location = useLocation();
    const { email } = location.state || {};
    const navigate = useNavigate();

    const handleChatClick = () => {
        navigate("/chat"); 
    };

    const handleCallClick = () => {
        navigate("/GroupCall"); 
    };

    return (
      <div >
        <Navbar />
        <div className="home-container">
          {email ? (
            <div className="greeting-message">
              <h2>Welcome, {email}!</h2>
              <p>Happy To See You Here. Let's join & Enjoy!</p>
              <div className="button-container">
                <button className="action-button" onClick={handleChatClick}>
                  Go to Chat
                </button>
                <button className="action-button" onClick={handleCallClick}>
                  Go to Call
                </button>
              </div>
            </div>
          ) : (
            <p>Error: No user email found.</p>
          )}
        </div>
        <Footer />
    </div>
  );
};

export default Welcome;
