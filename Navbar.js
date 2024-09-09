import React , {useState}from "react";
import { Link,Navigate,useNavigate  } from "react-router-dom";
import './Navbar.css';
import { signOut } from "firebase/auth";
import { auth } from "../Firebase.js";
import Footer from "./Footer.js";



function Navbar() {

    const navigate = useNavigate();
  const [DropmenuView, setDropmenuiew] = useState(false);


  const handleSignout = async () => {
    try {
        await signOut(auth);
        navigate("/")
    } catch (error) {
        console.log(error);
    }
    };

    const handleDropmenu =() =>{
      setDropmenuiew(!DropmenuView);
    };

    return (
        <div className="Navbar">
        {/* <div className="logo">
               <img src={LOGO} alt="Logo" className="logo" />
               </div> */}
       
        <ul>
            <li><Link to ="/Chat">Chatting</Link></li>
            <li><Link to ="/Chatgrp">Groups</Link></li>
            <li><Link to ="/Call">Calls</Link></li>
            <li><Link to ="/Videocall">Video Calls</Link></li>  
            <li><Link to ="/Manageprofile">Manage Profile</Link></li>
            <li><Link to ="/Admin">Admin</Link></li>
            <li><Link to ="/Upload">Upload Files</Link></li>
            <li><Link to ="/Contactus">Help</Link></li>
            <li className="buttons">
            <li><Link onClick={handleSignout} id="signOut">LogOut</Link></li>            </li>
        </ul>
    </div>
    
  
 
    );
}
export default Navbar;