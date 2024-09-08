import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";


const AboutUs =() => {
  return (
    <div className="about-us_2">
      <Navbar />
      <h2 className="abt">About Us</h2>
      <p className="abt1">
        Welcome to your About Us page!
        We are NMR.
        We are a family-owned business located in Canada that specializes in providing high-quality food.
        We are a team of passionate individuals who are dedicated to providing  high-quality services to our customers and community at NMR.
        Our team of experts is comprised of experienced professionals who are passionate about what they do and are dedicated to helping our customers achieve their goals.
        We are committed to providing our customers with the best possible experience and are always looking for ways to improve our services.
        If you have any questions or feedback, please don't hesitate to contact us.
        We look forward to working with you!<br/> <br/>
        Thank you for choosing M&N.
      </p>
      <Footer/>
    </div>
  );
}

export default AboutUs;