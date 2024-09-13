import React , {useState}from "react";
import { Link,Navigate,useNavigate  } from "react-router-dom";
import './Navbar.css';
import { signOut } from "firebase/auth";
import { auth } from "../Firebase.js";
import Footer from "./Footer.js";



function Navbar() {

    const navigate = useNavigate();
    const handleSignout = async () => {
    try {
        await signOut(auth);
        navigate("/")
    } catch (error) {
        console.log(error);
    }
    };

    return (
        <div className="Navbar">
        <ul>
            <li><Link to ="/Chat">Chatting</Link></li>
            <li><Link to ="/GroupCall">GroupCall</Link></li>  
            <li><Link to ="/Manageprofile">Manage Profile</Link></li>
            <li><Link to ="/Admin">Admin</Link></li>
            <li><Link to ="/ContactUs">Contact</Link></li>
            <li className="buttons">
            <li><Link onClick={handleSignout} id="signOut"><strong>LogOut</strong></Link></li></li>
        </ul>
    </div>
    
  
 
    );
}
export default Navbar;