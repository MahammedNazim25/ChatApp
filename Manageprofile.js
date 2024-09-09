import React, { useEffect, useState } from 'react';
import { auth, db, storage } from '../Firebase';
import { doc, getDoc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
// import Home from './Home';

const Manageprofile = () => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [background, setBackground] = useState('');

  const navigate = useNavigate();  // Initialize useNavigate

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const profileDocRef = doc(db, 'profiles', user.uid);
        const profileDoc = await getDoc(profileDocRef);
        if (profileDoc.exists()) {
          const profile = profileDoc.data();
          setDisplayName(profile.displayName || '');
          setBio(profile.bio || '');
          setProfilePhoto(profile.photoURL || '');
          setBackground(profile.background || '');
        }
      }
    });

    return () => unsubscribe();
  }, []);
  // <Home />

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

  const handleBackgroundUpload = (e) => {
    const file = e.target.files[0];
    const backgroundRef = storageRef(storage, `backgrounds/${user.uid}`);

    uploadBytes(backgroundRef, file).then(() => {
      getDownloadURL(backgroundRef).then((url) => {
        setBackground(url);
        updateDoc(doc(db, 'profiles', user.uid), {
          background: url,
        });
      });
    });
  };

  const deleteAccount = async () => {
    const confirmation = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirmation) {
      try {
        
        await deleteDoc(doc(db, 'profiles', user.uid));
        console.log("Profile document deleted");
        
        
        await auth.currentUser.delete();
        console.log("Account deleted");
  
        // Redirect to Signup page after successful deletion
        navigate('/Home', { state: { displayName, bio, profilePhoto, background } });
      } catch (error) {
        console.error("Error deleting account:", error);
        if (error.code === 'auth/requires-recent-login') {
          alert('Please log in again and try deleting your account.');
          navigate('/');  // Redirect to login page for re-authentication
        }
      }
    }
  };
  

  const updateProfileInfo = async () => {
    if (!user) {
      console.log('No user found');
      return;
    }
    const profileDocRef = doc(db, 'profiles', user.uid);

    try {
      const profileDoc = await getDoc(profileDocRef);
      if (!profileDoc.exists()) {
        await setDoc(profileDocRef, {
          displayName: displayName || '',
          bio: bio || '',
          photoURL: profilePhoto || '',
          background: background || ''
        });
        console.log("Profile document created");
      } else {
        await updateDoc(profileDocRef, {
          displayName: displayName || '',
          bio: bio || ''
        });
        console.log('Profile updated successfully');
      }
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
      }).catch((error) => {
        console.error("Error deleting photo:", error);
      });
    }
  };

  const resetBackground = () => {
    setBackground('');
    updateDoc(doc(db, 'profiles', user.uid), {
      background: null,
    });
  };

  return user ? (
    <div style={{ backgroundImage: `url(${background})`, padding: '20px', color: '#fff' }}>
      <h2>Profile</h2>
      <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Display Name" />
      <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio"></textarea>

      <div>
        <label>Profile Photo</label>
        {profilePhoto && <img src={profilePhoto} alt="Profile" style={{ width: '100px', height: '100px' }} />}
        <input type="file" onChange={handleProfilePhotoUpload} />
        {profilePhoto && <button onClick={deleteProfilePhoto}>Delete Photo</button>}
      </div>

      <div>
        <label>Background</label>
        <input type="file" onChange={handleBackgroundUpload} />
        {background && <button onClick={resetBackground}>Reset Background</button>}
      </div>

      <button onClick={updateProfileInfo}>Update Profile</button>
      <button onClick={deleteAccount} style={{ color: 'red' }}>Delete Account</button>
    </div>
  ) : (
    <p>Please sign in</p>
  );
};

export default Manageprofile;