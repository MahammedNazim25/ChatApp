
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import './Style.css';
import { Link } from "react-router-dom";

const Signup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
            navigate("/", { state: { email: userCredential.user.email } });

        } catch (error) {
            setError(error.message);
        }

    }

    return (
        <div className="container">

            <h1>Sign Up</h1>
            <form onSubmit={handleSignup}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />

                <button type="submit">Sign Up</button>

z
                {error && <p className="error">{error}</p>}
                <p>Already have an account?</p>
                <button onClick={() => navigate("/Signin")} className="link-btn">Login</button>

            </form>
        </div>
    )
}

export default Signup;