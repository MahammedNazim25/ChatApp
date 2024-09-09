import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { db, auth } from '../Firebase';
import { collection, getDoc, doc, updateDoc, getDocs } from 'firebase/firestore';

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch groups from Firestore
  useEffect(() => {
    const fetchGroups = async () => {
      const groupsCollection = collection(db, 'groups');
      const groupsSnapshot = await getDocs(groupsCollection);
      const groupsList = groupsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGroups(groupsList);
    };

    fetchGroups();
  }, []);

  // Join a group and navigate to group chat
  const handleJoinGroup = async (groupId) => {
    try {
      const groupDocRef = doc(db, 'groups', groupId);
      const groupDoc = await getDoc(groupDocRef);
      const groupData = groupDoc.data();

      if (groupData && !groupData.members.includes(auth.currentUser.uid)) {
        await updateDoc(groupDocRef, {
          members: [...groupData.members, auth.currentUser.uid]
        });
      }

      // Navigate to the group chat page after joining the group
      navigate(`/groupchat/${groupId}`);
    } catch (error) {
      console.error("Error joining group: ", error);
    }
  };

  return (
    <div>
      <h2>Available Groups</h2>
      <ul>
        {groups.map(group => (
          <li key={group.id}>
            <h3>{group.name}</h3>
            <p>{group.description}</p>
            <button onClick={() => handleJoinGroup(group.id)}>Join Group</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;
