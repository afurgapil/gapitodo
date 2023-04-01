import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { app, db, storage } from "../../firebase";
import { useNavigate } from "react-router-dom";
import ProfilePicture from "../../hooks/ProfilePicture";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Profile() {
  const [displayName, setDisplayName] = useState("");
  const [displayLastName, setDisplayLastName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setDisplayName(user.displayName.split(" ")[0]);
        setDisplayLastName(user.displayName.split(" ")[1]);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const handleDisplayName = async () => {
    const auth = getAuth(app);
    const user = auth.currentUser;
    const newDisplayName = displayName;
    const newDisplayLastName = displayLastName;

    try {
      await updateProfile(user, {
        displayName: newDisplayName,
        displayLastname: newDisplayLastName,
      });

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        displayName: newDisplayName,
        displayLastname: newDisplayLastName,
      });

      setDisplayName(displayName);
      setDisplayLastName(displayLastName);
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
  };

  const handleProfilePictureUpload = async () => {
    const user = getAuth(app).currentUser;
    const storage = getStorage(app);
    const storageRef = ref(
      storage,
      `users/${user.uid}/profilePicture/${profilePicture.name}`
    );

    try {
      await uploadBytes(storageRef, profilePicture);
      const downloadURL = await getDownloadURL(storageRef);

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        profilePicture: downloadURL,
      });

      // Update profile picture in auth
      await updateProfile(user, {
        photoURL: downloadURL,
      });
    } catch (error) {
      console.error(error);
    }

    navigate("/profile");
  };
  return (
    <div>
      {user && (
        <div>
          <ProfilePicture />
          <div className="mb-3">
            <label htmlFor="displayName" className="form-label">
              Display Name
            </label>
            <input
              type="text"
              className="form-control"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="displayLastName" className="form-label">
              Display Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="displayLastName"
              value={displayLastName}
              onChange={(e) => setDisplayLastName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="profilePicture" className="form-label">
              Profile Picture
            </label>
            <input
              type="file"
              className="form-control"
              id="profilePicture"
              onChange={handleFileInputChange}
            />
          </div>
          <button onClick={handleDisplayName}>Save Name</button>{" "}
          <button onClick={handleProfilePictureUpload}>Save Photo</button>
        </div>
      )}
    </div>
  );
}
export default Profile;
