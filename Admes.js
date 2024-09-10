import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../Firebase';

const Admes = ({ groupId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const messagesCollection = collection(db, 'groups', groupId, 'messages');
      const messagesSnapshot = await getDocs(messagesCollection);
      const messagesList = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(messagesList);
    };

    fetchMessages();
  }, [groupId]);

  const handleDeleteMessage = async (messageId) => {
    await deleteDoc(doc(db, 'groups', groupId, 'messages', messageId));
    setMessages(messages.filter(message => message.id !== messageId));
  };

  return (
    <div>
      <h2>Manage Messages</h2>
      <ul>
        {messages.map(message => (
          <li key={message.id}>
            {message.text}
            <button onClick={() => handleDeleteMessage(message.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admes;
