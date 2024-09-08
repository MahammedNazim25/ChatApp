import { db } from "../Firebase.js";
import { collection, addDoc, where, serverTimestamp, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import "./Chatarea.css";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";

export const Chat = ({ room = "NRM Room", userEmail = "Anonymous" }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, [room]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: userEmail || "Anonymous", 
      room,
    });

    setNewMessage("");
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await deleteDoc(doc(db, "messages", messageId));
      console.log("Message deleted");
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div className="chat-top">
      <Navbar/>
      <div className="chat-app">
      <div className="header">
        <h1>NRM Chat</h1>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <span className="user">{message.user || "Anonymous"}:</span> {message.text}
            <button onClick={() => handleDeleteMessage(message.id)} className="delete-button">
              Delete
            </button>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="new-message-input"
          placeholder="Type your message here..."
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
    <Footer/>
    </div>
  );
};

export default Chat;
