import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Home from './Components/Home'; 
import Signout from './Components/Signout';
import Chatgrp from './Components/Chatgrp';
import Makegrp from './Components/Makegrp';
import Chatwindow from './Components/Chatwindow';
import Contactus from './Components/Contactus';
import ManageProfile from './Components/Manageprofile';
import Forgotpassword from './Components/Forgotpassword';
import './App.css';
import Chatting from './Components/Chatting';

function App() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (newMessage) => {
    setMessages([...messages, newMessage]);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} /> 
          <Route path="/signout" element={<Signout />} />
          <Route path='/Chatting' element={<Chatting />} />
          {/* <Route path="/Chatgrp" element={<Chatgrp />} /> */}
          <Route path="/makegrp" element={<Makegrp />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/manageprofile" element={<ManageProfile />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;