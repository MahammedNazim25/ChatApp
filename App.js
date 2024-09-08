import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './Components/Signin';
import Signup from './Components/Singup';
import Home from './Components/Navbar';
import './App.css';
import { Chat } from './Components/Chat';
import { auth } from './Firebase'; 
import Signout from './Components/Signout';
import Help from './Components/Help';
import AboutUs from './Components/About';

function App() {
  const [userEmail, setUserEmail] = useState("Anonymous"); 
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email || "Anonymous"); 
      } else {
        setUserEmail("Anonymous");
      }
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path='/help' element={<Help/>}/>
        <Route path='/About' element={<AboutUs/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/Navbar" element={<Home />} />
          <Route path="/Chat" element={<Chat room="general" userEmail={userEmail} />} />
          <Route path="/Signout" element={<Signout />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
