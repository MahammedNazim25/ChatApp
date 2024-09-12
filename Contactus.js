import React, { useState } from 'react';
import { database, ref, set } from '../Firebase';   
import './Contactus.css';

const Contactus = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

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
    <div className="contactus-container">
     
    
      <main className="contactus-main">
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
            />
          </div>
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
          <p><strong>Email:</strong> <a href="mailto:NMRsupport@gmail.com">NMRsupport@gmail.com</a></p>
          <p><strong>Support Hours:</strong> Monday - Friday, 9 AM - 6 PM</p>
          <p><strong>Live Chat:</strong> Available on our <a href="/">website</a></p>
        </section>
      </main>
      <footer>
        <p>&copy; NMR {new Date().getFullYear()} @ Chat website. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Contactus;
  