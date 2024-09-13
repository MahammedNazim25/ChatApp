// Signup.js
import { auth, db } from "../Firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles.css";
import Footer from "./Footer.js";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(user, { displayName: name });

            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: name,
                email: user.email,
            });

            // Navigate to Home with user email
            navigate("/Home", { state: { email: user.email } });
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSignup}>
                <h1>Sign Up</h1>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                <button type="submit" className="signbtn">Sign Up</button>
                {error && <p className="error">{error}</p>}
                <p>Already have an account?</p>
                <button onClick={() => navigate("/signin")} className="link-btn">Login</button>
            </form>
            <Footer />
        </div>
    );
};

export default Signup;
