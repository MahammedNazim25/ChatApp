import React, { useState } from 'react';
import { db, storage } from '../Firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useParams } from 'react-router-dom';

const GroupSettings = () => {
  const { groupId } = useParams();  // Retrieve groupId from URL parameters
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const imageRef = storageRef(storage, `groupImages/${groupId}`);
    await uploadBytes(imageRef, file);
    const imageUrl = await getDownloadURL(imageRef);
    setImage(imageUrl);
  };

  const handleUpdateSettings = async () => {
    const groupDocRef = doc(db, 'groups', groupId);
    await updateDoc(groupDocRef, {
      description,
      image
    });
  };

  return (
    <div>
      <h2>Group Settings</h2>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Group Description" />
      <input type="file" onChange={handleImageUpload} />
      {image && <img src={image} alt="Group" style={{ width: '100px', height: '100px' }} />}
      <button onClick={handleUpdateSettings}>Update Settings</button>
    </div>
  );
};

export default GroupSettings;
