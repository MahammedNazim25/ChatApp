import { db } from "../Firebase.js";
import { collection, addDoc, serverTimestamp, query, where, onSnapshot, deleteDoc, doc, orderBy } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Chatarea.css";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";

export const Chat = ({ room = "NRM Room", userEmail = "Anonymous" }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [users, setUsers] = useState([]);
  const messagesRef = collection(db, "messages");
  const location = useLocation();
  const callUrl = location.state?.callUrl; 

  useEffect(() => {
    const usersRef = collection(db, "users");
    const unsubscribeUsers = onSnapshot(usersRef, (snapshot) => {
      const usersList = [];
      snapshot.forEach((doc) => {
        const userData = doc.data();
        usersList.push(userData.email);
      });
      setUsers(usersList);
    });

    return () => unsubscribeUsers();
  }, []);

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt") 
    );
    const unsubscribeMessages = onSnapshot(queryMessages, (snapshot) => {
      let messagesList = [];
      snapshot.forEach((doc) => {
        messagesList.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messagesList);
    });

    return () => unsubscribeMessages();
  }, [room]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newMessage.trim() === "") return;

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
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  // Function to render clickable URLs within messages
  const renderMessageWithLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) =>
      urlRegex.test(part) ? (
        <a key={index} href={part} target="_blank" rel="noopener noreferrer">
          {part}
        </a>
      ) : (
        part
      )
    );
  };

  return (
    <div className="chat-app-wrapper">
      <Navbar />
      <div className="chat-container">
        <div className="user-list">
          <h2>Joined Users</h2>
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        </div>
        <div className="chat-app">
          <div className="messages">
            <h1>NRM Chat</h1>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.user === userEmail ? "my-message" : "other-message"}`}
              >
                <span className="user">{message.user}:</span>
                <div>{renderMessageWithLinks(message.text)}</div>
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
      </div>
      <Footer />
    </div>
  );
};

export default Chat;