import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../Firebase"; // Import the Firestore instance
import Navbar from './Navbar';
import Footer from './Footer';
import './ContactUs.css';

const ContactUs = () => {
  const [email, setEmail] = useState('');
  const [query, setQuery] = useState('');  // New state for query
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (email && query && message) {
      try {
        await addDoc(collection(db, "contactMessages"), {
          email,
          query,
          message,
          createdAt: serverTimestamp(),
        });
        setIsSubmitted(true);
        setEmail('');
        setQuery('');  // Reset query field
        setMessage('');
        setIsError(false);
      } catch (error) {
        console.error("Error submitting message:", error);
        setIsError(true);
      }
    } else {
      setIsError(true); 
    }
  };

  return (
    <div className="contact-us-page">
      <Navbar />
      <div className="contact-us-container">
        <h2>Contact Us</h2>

        {isSubmitted && (
          <p className="success-message">Your message has been sent successfully. We will get back to you shortly!</p>
        )}

        {isError && (
          <p className="error-message">Please fill out all fields.</p>
        )}

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="input-group">
            <label htmlFor="email">Write Email:</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Your email" 
              required 
            />
          </div>

          <div className="input-group">
            <label htmlFor="query">What's Your Query:</label>
            <input 
              type="text" 
              id="query" 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              placeholder="What would you like to know?" 
              required 
            />
          </div>

          <div className="input-group">
            <label htmlFor="message">Message:</label>
            <textarea 
              id="message" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              placeholder="Your message" 
              required 
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
