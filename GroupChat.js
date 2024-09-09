import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db, auth } from '../Firebase';
import { doc, getDoc, collection, query, where, onSnapshot, orderBy, addDoc } from 'firebase/firestore';

const GroupChat = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchGroupData = async () => {
      const groupDocRef = doc(db, 'groups', groupId);
      const groupDoc = await getDoc(groupDocRef);
      setGroup(groupDoc.data());
    };

    fetchGroupData();
  }, [groupId]);

  useEffect(() => {
    const messagesCollectionRef = collection(db, 'groups', groupId, 'messages');
    const q = query(messagesCollectionRef, orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(messagesList);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [groupId]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const messagesCollectionRef = collection(db, 'groups', groupId, 'messages');
      await addDoc(messagesCollectionRef, {
        text: newMessage,
        timestamp: new Date(),
        sender: auth.currentUser.uid
      });
      setNewMessage('');
    }
  };

  if (!group) return <div>Loading...</div>;

  return (
    <div>
      <h2>{group.name}</h2>
      <p>{group.description}</p>
      <div>
        <div>
          {messages.map(msg => (
            <div key={msg.id}>
              <strong>{msg.sender}</strong>: {msg.text}
            </div>
          ))}
        </div>
        <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default GroupChat;
