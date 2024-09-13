import React, { useEffect, useState } from 'react';
import { auth, db, storage } from '../Firebase';
import { doc, getDoc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';  
import './Manageprofile.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Manageprofile = () => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [email, setEmail] = useState('');

  const navigate = useNavigate(); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        setEmail(user.email);
        const profileDocRef = doc(db, 'profiles', user.uid);
        const profileDoc = await getDoc(profileDocRef);
        if (profileDoc.exists()) {
          const profile = profileDoc.data();
          setDisplayName(profile.displayName || '');
          setBio(profile.bio || '');
          setProfilePhoto(profile.photoURL || '');
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleProfilePhotoUpload = (e) => {
    const file = e.target.files[0];
    const photoRef = storageRef(storage, `profilePhotos/${user.uid}`);

    uploadBytes(photoRef, file).then(() => {
      getDownloadURL(photoRef).then((url) => {
        setProfilePhoto(url);
        updateDoc(doc(db, 'profiles', user.uid), {
          photoURL: url,
        });
      });
    });
  };

  const deleteAccount = async () => {
    const confirmation = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirmation) {
      try {
        await deleteDoc(doc(db, 'profiles', user.uid));
        await auth.currentUser.delete();
        navigate('/Home');
      } catch (error) {
        if (error.code === 'auth/requires-recent-login') {
          alert('Please log in again and try deleting your account.');
          navigate('/');
        }
      }
    }
  };

  const updateProfileInfo = async () => {
    if (!user) return;

    const profileDocRef = doc(db, 'profiles', user.uid);
    try {
      const profileDoc = await getDoc(profileDocRef);
      if (!profileDoc.exists()) {
        await setDoc(profileDocRef, {
          displayName: displayName || '',
          bio: bio || '',
          photoURL: profilePhoto || ''
        });
      } else {
        await updateDoc(profileDocRef, {
          displayName: displayName || '',
          bio: bio || ''
        });
      }
      alert('Profile updated successfully!');
      navigate('/chat');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const deleteProfilePhoto = () => {
    const confirmation = window.confirm("Are you sure you want to delete your profile photo?");
    if (confirmation) {
      const photoRef = storageRef(storage, `profilePhotos/${user.uid}`);
      deleteObject(photoRef).then(() => {
        setProfilePhoto(null);
        updateDoc(doc(db, 'profiles', user.uid), {
          photoURL: null,
        });
      });
    }
  };

  return user ? (
    
    <div  >
      <Navbar/>
      <div className="manage-profile-container">
      <h2>Manage Profile</h2>
      <div className="input-group">
        <input 
          type="text" 
          value={displayName} 
          onChange={(e) => setDisplayName(e.target.value)} 
          placeholder="name" 
        />
      </div>
      <div className="input-group">
        <input 
          type="email" 
          placeholder="@email.com" 
        />
      </div>

      <div className="input-group">
        <textarea 
          value={bio} 
          onChange={(e) => setBio(e.target.value)} 
          placeholder="Bio" 
        ></textarea>
      </div>

      <div className="profile-photo-section">
        <label>Profile Photo</label>
        {profilePhoto && <img src={profilePhoto} alt="Profile" className="profile-photo" />}
        <input type="file" onChange={handleProfilePhotoUpload} />
        {profilePhoto && <button className="delete-btn" onClick={deleteProfilePhoto}>Delete Photo</button>}
      </div>

      <div className="btn-group">
        <button className="update-btn" onClick={updateProfileInfo}>Update Profile</button>
        <button className="delete-btn" onClick={deleteAccount}>Delete Account</button>
      </div>
    </div>
    <Footer/>
    </div>
  ) : (
    <p>Please sign in</p>
  );
};

export default Manageprofile;
