import React, { useState, useEffect, useRef } from 'react';
import DailyIframe from '@daily-co/daily-js';
import Navbar from './Navbar';

const GroupCall = () => {
  const [callObject, setCallObject] = useState(null);
  const [roomUrl, setRoomUrl] = useState('');
  const [error, setError] = useState('');
  const [participants, setParticipants] = useState([]);
  const roomUrlRef = useRef(null);

  useEffect(() => {
    if (callObject) {
      callObject.on('joined-meeting', () => {
        // Set up event listeners
        callObject.on('participant-joined', (event) => {
          setParticipants((prev) => [...prev, event.participant]);
        });

        callObject.on('participant-left', (event) => {
          setParticipants((prev) => prev.filter(p => p.session_id !== event.participant.session_id));
        });

        // Join the room
        callObject.join({ url: roomUrl });
      });

      return () => {
        if (callObject) {
          callObject.leave();
        }
      };
    }
  }, [callObject, roomUrl]);

  const createRoom = async () => {
    try {
      const response = await fetch('https://api.daily.co/v1/rooms', {
        method: 'POST',
        headers: {
          'Authorization': ` 8f3e009659edfdaf0252f38a93a7377c54ba0c76bdf942491552c5f0882f735a`, // Replace with your API key
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: {
            enable_screenshare: true,
            enable_chat: true,
            enable_participant_audio: true,
            enable_participant_video: true,
            enable_dial_out: false,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}. Response: ${errorText}`);
      }

      const data = await response.json();
      setRoomUrl(data.url);
      roomUrlRef.current = data.url;
      setError(''); // Clear previous errors
    } catch (error) {
      console.error('Error creating room:', error);
      setError(`Failed to create room: ${error.message}`);
    }
  };

  const handleJoinRoom = () => {
    if (roomUrlRef.current) {
      const newCallObject = DailyIframe.createFrame();
      setCallObject(newCallObject);
    } else {
      setError('No room URL available');
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Group Call</h1>
      <button onClick={createRoom}>Create Room</button>
      <button onClick={handleJoinRoom}>Join Room</button>
      {error && <p>{error}</p>}
      <div id="daily-frame" style={{ height: '500px', width: '100%' }}></div>
      <div>
        <h2>Participants:</h2>
        <ul>
          {participants.map(participant => (
            <li key={participant.session_id}>{participant.user_name || "Anonymous"}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GroupCall;
