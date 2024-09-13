import React from "react";
import './Navbar.css';


function Footer(){
    return(
        <footer>
        <div className="footer">
            {/* <div id="imglogo"></div> */}
            <div className="fd1">
           <p><strong>Contact Us:</strong> <br/><br/>www.La Connecxioncallchat.com <br/>nmr@gmail.ca<br/>+438 258 4589 </p> 
           </div>
           <div className="fd1">
           <p><br/><strong>Follow Us:</strong> <br/><br/><a href="https://www.google.com/">Google</a><br/><a href="https://www.facebook.com/">Facebook</a><br/><a href="https://www.instagram.com/">Instagram</a> </p> 
           </div>
           <div className="fd1">
           <p><strong>Know more:</strong> <br/>Privacy Policy  <br/>Terms Conditions <br/> Guidelines</p> 
           </div>
           
        </div>
        </footer>

    );
}

export default Footer;