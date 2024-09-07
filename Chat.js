import React, { useState, useEffect } from "react";
import { db } from "../Firebase.js"; 
import { addDoc, serverTimestamp, collection, query, onSnapshot, where, orderBy } from "firebase/firestore";
import { getAuth } from "firebase/auth"; 


export const Chat = ({ room, userName }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  const auth = getAuth(); 
  
  useEffect(() => {
    if (!room) return;

    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, where("room", "==", room), orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let messagesArray = [];
      snapshot.forEach((doc) => {
        messagesArray.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messagesArray);
    });

    return () => unsubscribe();
  }, [room]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    await addDoc(collection(db, "messages"), {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser ? auth.currentUser.displayName : userName, // Use current user's display name or fallback to passed userName prop
      room,
    });

    setNewMessage("");
  };

  return (
    <div className="chat-app">
      <div className="messages">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div key={message.id} className="message">
              <strong>{message.user}:</strong> {message.text}
            </div>
          ))
        ) : (
          <p>No messages yet!</p>
        )}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
