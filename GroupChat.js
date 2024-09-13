import { db } from "../Firebase.js";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { useState } from "react";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import "./GChat.css";
import { useNavigate } from "react-router-dom";

export const GroupCall = ({ room = "NRM Room", userEmail = "Anonymous" }) => {
  const [callUrl, setCallUrl] = useState("");
  const roomsRef = collection(db, "rooms");
  const messagesRef = collection(db, "messages");
  const DAILY_API_KEY = "02c9433dbbedaf2097f8a935c341b0eb75df1816642c86d68f08f377821c0688"; // Update with your correct API key
  const navigate = useNavigate();

  const createRoom = async () => {
    try {
      console.log("Sending request to create room...");
      const roomResponse = await fetch("https://laconnexion.daily.co/v1/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${DAILY_API_KEY}`,
        },
        body: JSON.stringify({
          properties: {
            enable_screenshare: true,
          },
        }),
      });

      if (!roomResponse.ok) {
        const errorData = await roomResponse.json();
        console.error("Error creating room:", errorData);
        throw new Error(`HTTP error! Status: ${roomResponse.status}`);
      }

      const roomData = await roomResponse.json();
      console.log("Room created successfully:", roomData);
      setCallUrl(roomData.url);

      await addDoc(roomsRef, {
        roomUrl: roomData.url,
        createdAt: serverTimestamp(),
        room,
      });

      await addDoc(messagesRef, {
        text: `A new video call has been created. Join here: ${roomData.url}`,
        createdAt: serverTimestamp(),
        user: userEmail || "Anonymous",
        room,
      });
    } catch (error) {
      console.error("Error in createRoom function:", error);
    }
  };

  const joinExistingRoom = async () => {
    try {
      const roomsSnapshot = await getDocs(query(roomsRef, where("room", "==", room)));
      if (!roomsSnapshot.empty) {
        const existingRoom = roomsSnapshot.docs[0].data();
        console.log("Joining existing room:", existingRoom);
        setCallUrl(existingRoom.roomUrl);

        await addDoc(messagesRef, {
          text: `Join the existing video call here: ${existingRoom.roomUrl}`,
          createdAt: serverTimestamp(),
          user: userEmail || "Anonymous",
          room,
        });
      } else {
        console.error("No room found. You need to create a new room first.");
      }
    } catch (error) {
      console.error("Error in joinExistingRoom function:", error);
    }
  };

  const handleJoinNow = () => {
    if (callUrl) {
      window.open(callUrl, "_blank");
    }
  };

  const handleShareToChat = () => {
    if (callUrl) {
      navigate("/chat", { state: { callUrl } }); 
    }
  };

  return (
    <div className="group-call-wrapper">
      <Navbar />
      <div className="group-call-container">
        <h1>NRM Group Call</h1>
        <div className="video-call-controls">
          <button onClick={createRoom} className="create-room-button">Create Room</button>
          <button onClick={joinExistingRoom} className="join-room-button">Join Existing Room</button>
        </div>
        {callUrl && (
          <div className="call-link">
            <input
              type="text"
              value={callUrl}
              readOnly
              className="call-url-input"
            />
            <button onClick={handleJoinNow} className="join-now-button">Join Now</button>
            <button onClick={handleShareToChat} className="share-chat-button">Share to Chat</button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default GroupCall;