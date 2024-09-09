import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase';

const AdminGroups = () => {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [newGroupName, setNewGroupName] = useState('');

  useEffect(() => {
    // Fetch groups from Firestore when the component loads
    const fetchGroups = async () => {
      const groupsCollection = collection(db, 'groups');
      const groupsSnapshot = await getDocs(groupsCollection);
      const groupsList = groupsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGroups(groupsList);
    };

    fetchGroups();
  }, []);

  const handleCreateGroup = async () => {
    if (groupName.trim()) {
      // Add the new group to Firestore
      await addDoc(collection(db, 'groups'), {
        name: groupName,
        createdAt: new Date(),
      });

      // Fetch the updated list of groups from Firestore
      const groupsSnapshot = await getDocs(collection(db, 'groups'));
      const groupsList = groupsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGroups(groupsList);

      setGroupName('');  // Clear the input field
    }
  };

  const handleDeleteGroup = async (groupId) => {
    // Delete the group from Firestore
    await deleteDoc(doc(db, 'groups', groupId));

    // Fetch the updated list of groups from Firestore
    const groupsSnapshot = await getDocs(collection(db, 'groups'));
    const groupsList = groupsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setGroups(groupsList);
  };

  const handleEditGroup = async (groupId) => {
    if (newGroupName.trim()) {
      // Update the group name in Firestore
      await updateDoc(doc(db, 'groups', groupId), {
        name: newGroupName,
      });

      // Fetch the updated list of groups from Firestore
      const groupsSnapshot = await getDocs(collection(db, 'groups'));
      const groupsList = groupsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGroups(groupsList);

      setEditingGroupId(null);  // Exit edit mode
      setNewGroupName('');  // Clear the input field
    }
  };

  return (
    <div>
      <h2>Manage Groups</h2>
      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="New Group Name"
      />
      <button onClick={handleCreateGroup}>Create Group</button>
      <ul>
        {groups.map(group => (
          <li key={group.id}>
            {editingGroupId === group.id ? (
              <>
                <input
                  type="text"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="Edit Group Name"
                />
                <button onClick={() => handleEditGroup(group.id)}>Save</button>
                <button onClick={() => setEditingGroupId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {group.name}
                <button onClick={() => { setEditingGroupId(group.id); setNewGroupName(group.name); }}>Edit</button>
                <button onClick={() => handleDeleteGroup(group.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminGroups;
