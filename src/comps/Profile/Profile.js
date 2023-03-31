import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { app, db } from "../../firebase";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [displayName, setDisplayName] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
    }
  }, [user]);
  const handleDisplayName = async () => {
    const auth = getAuth(app);
    const user = auth.currentUser;

    try {
      await updateProfile(user, {
        displayName: displayName,
      });

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        displayName: displayName,
      });

      setDisplayName(user.displayName);
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
  };
  return (
    <div>
      {user && (
        <div>
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
          <button className="btn btn-primary" onClick={handleDisplayName}>
            Değiştir
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
