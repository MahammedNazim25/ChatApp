import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import './Style.css';

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSignin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
            navigate("/home", { state: { email: userCredential.user.email } }); 
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="container">
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
                <div className="got">
                <a href="/Forgotpassword">Forgot Password?</a>
                </div>
                <p>Don't have an account?</p>
                <button onClick={() => navigate("/signup")} className="link-btn">Sign Up</button>
            </form>
        </div>
    );
};

export default Signin;
