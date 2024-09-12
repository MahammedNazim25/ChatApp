
import React, { useState } from 'react';
import { auth } from '../Firebase'; 

const Forgotpassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    try {
      await auth.sendPasswordResetEmail(email);
      setMessage('Password reset email sent! Please check your inbox.');
      setError('');
    } catch (error) {
      setError('Failed to send password reset email. Please try again.');
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleResetPassword}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Reset Email</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Forgotpassword;
