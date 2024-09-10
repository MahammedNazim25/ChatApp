import { db } from "../Firebase.js";
import { collection, addDoc, where, serverTimestamp, onSnapshot, query, orderBy, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import "./Chatarea.css";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";

export const Chat = ({ room = "NRM Room", userEmail = "Anonymous" }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [callUrl, setCallUrl] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const messagesRef = collection(db, "messages");
  const usersRef = collection(db, "users");
  const roomsRef = collection(db, "rooms");
  const DAILY_API_KEY = "a76e52783e938d74d98dec44743cd5d4141835a38c4b00a2c0e6a85062eb7e00";

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

  useEffect(() => {
    const fetchUsers = async () => {
      const usersSnapshot = await getDocs(usersRef);
      const usersList = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  const createRoom = async () => {
    try {
      const roomResponse = await fetch("https://api.daily.co/v1/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${DAILY_API_KEY}`
        },
        body: JSON.stringify({
          properties: {
            enable_screenshare: true,
          },
        }),
      });

      const roomData = await roomResponse.json();
      setCallUrl(roomData.url);

      await addDoc(roomsRef, {
        roomUrl: roomData.url,
        createdAt: serverTimestamp(),
        room,
      });

      await addDoc(messagesRef, {
        text: `Join the video call here: ${roomData.url}`,
        createdAt: serverTimestamp(),
        user: userEmail || "Anonymous",
        room,
      });
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const joinExistingRoom = async () => {
    try {
      const roomsSnapshot = await getDocs(query(roomsRef, where("room", "==", room)));
      if (!roomsSnapshot.empty) {
        const existingRoom = roomsSnapshot.docs[0].data();
        setCallUrl(existingRoom.roomUrl);

        await addDoc(messagesRef, {
          text: `Join the video call here: ${existingRoom.roomUrl}`,
          createdAt: serverTimestamp(),
          user: userEmail || "Anonymous",
          room,
        });
      } else {
        console.error("No room found. You need to create a new room first.");
      }
    } catch (error) {
      console.error("Error joining existing room:", error);
    }
  };

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
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const sendCallUrlToUser = async () => {
    if (selectedUser && callUrl) {
      await addDoc(messagesRef, {
        text: `Join the video call here: ${callUrl}`,
        createdAt: serverTimestamp(),
        user: userEmail || "Anonymous",
        room: room,
        recipient: selectedUser.email,
      });
      setSelectedUser(null);
    }
  };

  const renderMessage = (message) => {
    if (message.text.includes("http")) {
      const url = message.text.split(" ").find((word) => word.startsWith("http"));
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${message.text}</a>`;
    }
    return message.text;
  };

  return (
    <div className="chat-top">
      <Navbar />
      <div className="chat-app">
        <div className="header">
          <h1>NRM Chat</h1>
        </div>
        <div className="messages">
          {messages.map((message) => (
            <div key={message.id} className="message">
              <span className="user">{message.user || "Anonymous"}:</span>
              <span dangerouslySetInnerHTML={{ __html: renderMessage(message) }} />
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
          <button type="submit" className="send-button">Send</button>
        </form>
        <div className="users-list">
          <h3>Users</h3>
          <ul>
            {users.map((user) => (
              <li key={user.id} onClick={() => setSelectedUser(user)}>{user.email}</li>
            ))}
          </ul>
        </div>
        <div className="video-call-controls">
          <button onClick={createRoom} className="create-room-button">Create Room</button>
          <button onClick={joinExistingRoom} className="join-room-button">Join Existing Room</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Chat;