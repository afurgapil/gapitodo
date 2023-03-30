import { useState, useEffect } from "react";
import { getAuth, getUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from "../../firebase";

function Profile() {
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [updating, setUpdating] = useState(false);

  const getUserProfile = async () => {
    const auth = getAuth(app);
    const { user } = auth.currentUser;

    const db = getFirestore(app);
    const profileRef = doc(db, "users", user.uid);
    const profileSnap = await getDoc(profileRef);

    if (profileSnap.exists()) {
      const { displayName, photoURL } = profileSnap.data();
      setDisplayName(displayName);
      setPhotoURL(photoURL);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const auth = getAuth(app);
    const { user } = auth.currentUser;

    const db = getFirestore(app);
    await setDoc(doc(db, "users", user.uid), {
      displayName,
      photoURL,
    });

    setUpdating(false);
  };

  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={handleProfileUpdate}>
        <label>
          Display Name:
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Photo URL:
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" disabled={updating}>
          {updating ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
