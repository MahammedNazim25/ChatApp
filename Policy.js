import React from "react";
import './Policy.css';


const Policy = () => {
  return (
    
    <div className="privacy-policy-container">
      <h1>Privacy Policy</h1>
      
      <p>
        Welcome to our chatting website. We respect your privacy and are committed to protecting 
        your personal information. This privacy policy explains how we collect, use, and safeguard 
        your data.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        We may collect the following types of information:
      </p>
      <ul>
        <li>Personal information such as name, email address, and profile picture.</li>
        <li>Chat messages, group conversations, and other interactions on the platform.</li>
        <li>Usage data such as IP address, device type, browser type, and location data.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use your information for the following purposes:</p>
      <ul>
        <li>To provide and maintain the chat services.</li>
        <li>To communicate with you about updates, features, and other announcements.</li>
        <li>To improve and personalize your experience on the platform.</li>
      </ul>

      <h2>3. Sharing of Your Information</h2>
      <p>
        We do not share your personal information with third parties except in the following cases:
      </p>
      <ul>
        <li>When required by law or legal processes.</li>
        <li>With service providers who assist in delivering the chat services.</li>
        <li>In the event of a business transaction, such as a merger or acquisition.</li>
      </ul>

      <h2>4. Data Security</h2>
      <p>
        We implement security measures to protect your data from unauthorized access, use, or 
        disclosure. However, no method of transmission over the Internet is 100% secure.
      </p>

      <h2>5. Your Data Rights</h2>
      <p>
        You have the right to access, update, or delete your personal information. If you wish to 
        exercise any of these rights, please contact us.
      </p>

      <h2>6. Changes to This Privacy Policy</h2>
      <p>
        We may update our privacy policy from time to time. We will notify you of any changes by 
        posting the new policy on this page.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about this privacy policy, please contact us at 
        <section className="contact-info">
          <h2>Contact Information</h2>
          <p><strong>Email:</strong> <a href="mailto:NMRsupport@gmail.com">NMRsupport@gmail.com</a></p>
          <p><strong>Support Hours:</strong> Monday - Friday, 9 AM - 6 PM</p>
          <p><strong>Live Chat:</strong> Available on our <a href="/">website</a></p>
        </section>
      
      <footer>
        <p>&copy; La connexion{new Date().getFullYear()} @ Chat website. All rights reserved.</p>
      </footer>
      </p>


    </div>
  );
};

export default Policy;