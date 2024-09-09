import { auth, db } from "../Firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore"; 
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "../styles.css";
import Footer from "./Footer.js";
import Navbar from "./Navbar.js";


const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const q = query(collection(db, "users"), where("uid", "==", user.uid));
            const querySnapshot = await getDocs(q);
            let name = "";
            querySnapshot.forEach((doc) => {
                name = doc.data().name;
            });

           
            navigate("/Chat", { state: { name: name } });
        } catch (error) {
            setError(error.message);
        }
    };

    return (
         <div className="container">
          {/* <Navbar/> */}
            <ul className="top">
        <li className="list1">
          <Link to="/Help">Help</Link>
        </li>
        <li className="list1">
          <Link to="/Policy">Policy</Link>
        </li>
        <li className="list1">
          <Link to="/About">About</Link>
        </li>
      </ul>
            <h1>Sign In</h1>
            <form onSubmit={handleSignin}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign In</button>
                {error && <p>{error}</p>}
                <p>Don't have an account?</p>
                <button onClick={() => navigate("/signup")} className="link-btn">Sign Up</button>
            </form>
            <Footer/>
        </div>
    );
};

export default Signin;
