import React, { useState } from 'react';
import { database, ref, set } from '../Firebase';   
import './Help.css';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for back button

const Help = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();  // Hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setError('All fields are required.');
      return;
    }

    try {
      const messageId = new Date().getTime().toString();
      await set(ref(database, 'messages/' + messageId), formData);

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setError('');
    } catch (err) {
      setError('Failed to submit this form. Please try again.');
      console.error('Error saving message to Firebase:', err);
    }
  };

  return (
    <div className="Help
    -container">
      <button className="back-button" onClick={() => navigate(-1)}>Go Back</button> {/* Back Button */}
      
      <main className="Help
      -main">
        <h1>Help</h1>
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit} className="contact-form">
          <p>
          online chatting is a good source of communication among people as it allows users from different areas of the world to interact with each other, share any kind of information any time. This project aims to develop a user-friendly and interactive web chatting application built in React. The app will utilise Firebase for backend services, including a database to manage chatting app information, user accounts, and potentially app functionalities. 
          </p>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
            ></textarea>
          </div>
          {error && <p className="error">{error}</p>}
          {submitted && !error && <p className="success">Thank you for your message! We will get back to you very soon.</p>}
          <button type="submit">Send Message</button>
        </form>
        <section className="contact-info">
          <h2>Contact Information</h2>
          <p><strong>Email:</strong> <a href="mailto:NMRsupport@gmail.com">laconnexion/support@gmail.com</a></p>
          <p><strong>Support Hours:</strong> Monday - Friday, 9 AM - 6 PM</p>
          <p><strong>Live Chat:</strong> Available on our <a href="/">website</a></p>
        </section>
      </main>
      <Footer/>
    </div>
  );
};

export default Help;
