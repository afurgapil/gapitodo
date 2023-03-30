import { useState, useEffect } from "react";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Profile() {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [newDisplayName, setNewDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState(null);
  const [newPhotoURL, setNewPhotoURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const storage = getStorage(app);
  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, [auth]);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
      setPhotoURL(user.photoURL);
    }
  }, [user]);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await signOut(auth);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisplayNameChange = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const userDoc = doc(db, "users", user.uid);
      await updateDoc(userDoc, {
        displayName: newDisplayName,
      });

      await updateProfile(auth.currentUser, {
        displayName: newDisplayName,
      });

      setDisplayName(newDisplayName);
      setNewDisplayName("");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const handlePhotoURLChange = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const userDoc = doc(db, "users", user.uid);
      await updateDoc(userDoc, {
        photoURL: newPhotoURL,
      });

      await updateProfile(auth.currentUser, {
        photoURL: newPhotoURL,
      });

      setPhotoURL(newPhotoURL);
      setNewPhotoURL("");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };
  const handleFileUpload = async (e) => {
    e.preventDefault();

    try {
      const file = e.target.files[0];

      // Dosya uzantısı kontrolü yapılabilir
      const storageRef = storage.ref(`users/${user.uid}/${file.name}`);
      await uploadBytes(storageRef, file);

      const downloadURL = await storageRef.getDownloadURL();
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        photoURL: downloadURL,
      });

      await updateProfile(auth.currentUser, {
        photoURL: downloadURL,
      });

      setPhotoURL(downloadURL);
      setNewPhotoURL(downloadURL); // update newPhotoURL state
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return (
    <>
      {isLoading && "Loading..."}
      {error && { error }}
      {user && (
        <>
          <h2>Profile</h2>
          <p>Display Name: {displayName}</p>
          <form onSubmit={handleDisplayNameChange}>
            <label>
              Change Display Name:
              <input
                type="text"
                value={newDisplayName}
                onChange={(e) => setNewDisplayName(e.target.value)}
              />
            </label>
            <button type="submit">Save</button>
          </form>

          <form onSubmit={handlePhotoURLChange}>
            <label>
              Change Profile Picture URL:
              <input
                type="text"
                value={newPhotoURL}
                onChange={(e) => setNewPhotoURL(e.target.value)}
              />
            </label>
            <button type="submit">Save</button>
          </form>

          <form>
            <label htmlFor="profilePhoto">Profile Photo:</label>
            <input type="file" id="profilePhoto" onChange={handleFileUpload} />
          </form>

          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </>
  );
}

export default Profile;
