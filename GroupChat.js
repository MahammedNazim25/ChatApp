import { db } from "../Firebase.js";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { useState } from "react";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import "./GChat.css";
import { useNavigate } from "react-router-dom";

export const GroupCall = ({ room = "NRM Room", userEmail = "Anonymous" }) => {
  const [callUrl, setCallUrl] = useState("");
  const [showLink, setShowLink] = useState(false);
  const roomsRef = collection(db, "rooms");
  const messagesRef = collection(db, "messages");
  const DAILY_API_KEY = "a76e52783e938d74d98dec44743cd5d4141835a38c4b00a2c0e6a85062eb7e00";
  const DAILY_URL = "https://nazim11.daily.co/v1/rooms"; // Your Daily API URL

  const navigate = useNavigate();

  const joinOrCreateRoom = async () => {
    try {
      const roomsSnapshot = await getDocs(query(roomsRef, where("room", "==", room)));
      if (!roomsSnapshot.empty) {
        const existingRoom = roomsSnapshot.docs[0].data();
        setCallUrl(existingRoom.roomUrl);
        setShowLink(true);

        await addDoc(messagesRef, {
          text: `Join the ongoing group call and connect with your team: ${existingRoom.roomUrl}`,
          createdAt: serverTimestamp(),
          user: userEmail || "Anonymous",
          room,
        });
      } else {
        const roomResponse = await fetch(DAILY_URL, {
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

        const roomData = await roomResponse.json();
        setCallUrl(roomData.url);
        setShowLink(true);

        await addDoc(roomsRef, {
          roomUrl: roomData.url,
          createdAt: serverTimestamp(),
          room,
        });

        await addDoc(messagesRef, {
          text: `A fresh new video call is live! Join now and start collaborating: ${roomData.url}`,
          createdAt: serverTimestamp(),
          user: userEmail || "Anonymous",
          room,
        });
      }
    } catch (error) {
      console.error("Error in joinOrCreateRoom function:", error);
    }
  };

  const handleJoinNow = () => {
    if (callUrl) {
      window.open(callUrl, "_blank");
    }
  };

  const handleCopyLink = () => {
    if (callUrl) {
      navigator.clipboard.writeText(callUrl);
      alert("Video call link has been copied! Share it with your team.");
    }
  };

  return (
    <div className="group-call-wrapper">
      <Navbar />
      <div className="group-call-container">
        <h1>Welcome to the NRM Group Call</h1>
        <p>Connect with your team instantly. Whether you're here to brainstorm, collaborate, or just check in, this call is your gateway to real-time communication.</p>
        <p>Click the button below to join the video call and engage with others in the chat. If a call hasn't been created yet, we'll set one up for you!</p>
        <div className="video-call-controls">
          <button onClick={joinOrCreateRoom} className="join-room-button">
            Join the Call Now
          </button>
        </div>
        {showLink && (
          <div className="call-link">
            <input
              type="text"
              value={callUrl}
              readOnly
              className="call-url-input"
            />
            <button onClick={handleJoinNow} className="join-now-button">
              Join Now
            </button>
            <button onClick={handleCopyLink} className="copy-link-button">
              Copy Call Link
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default GroupCall;