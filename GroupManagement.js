import React, { useState, useEffect } from 'react';
import { db, auth } from '../Firebase';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import{ useNavigate } from 'react-router-dom';
const GroupManagement = () => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
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

  // Create a new group
  const handleCreateGroup = async () => {
    try {
      const groupDocRef =await addDoc(collection(db, 'groups'), {
        name: groupName,
        description: groupDescription,
        members: [auth.currentUser.uid], // Add the current user as the first member
      });
      const newGroupId = groupDocRef.id;
      setGroupName('');
      setGroupDescription('');
      navigate(`/invite/${newGroupId}`); // Redirect to invite users after group creation
    } catch (error) {
      console.error("Error creating group: ", error);
    }
  };

  // Update group details
  const handleUpdateGroup = async (groupId, updatedData) => {
    try {
      const groupDocRef = doc(db, 'groups', groupId);
      await updateDoc(groupDocRef, updatedData);
    } catch (error) {
      console.error("Error updating group: ", error);
    }
  };

  return (
    <div>
      <h2>Group Management</h2>
      <div>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Group Name"
        />
        <input
          type="text"
          value={groupDescription}
          onChange={(e) => setGroupDescription(e.target.value)}
          placeholder="Group Description"
        />
        <button onClick={handleCreateGroup}>Create Group</button>
      </div>

      <h3>Existing Groups</h3>
      <ul>
        {groups.map(group => (
          <li key={group.id}>
            <h4>{group.name}</h4>
            <p>{group.description}</p>
            <Link to={`/group-settings/${group.id}`}>Edit Group</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupManagement;
