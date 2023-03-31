import { useState, useEffect } from "react";
import { storage } from "../firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import "./hooks.scss";
function ProfilePicture() {
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;
  const firestore = getFirestore();

  useEffect(() => {
    if (user) {
      const userId = user.uid;
      const userRef = doc(firestore, "users", userId);
      getDoc(userRef)
        .then((doc) => {
          if (doc.exists()) {
            //displayname cektik
            const userDisplayName = doc.data().displayName;
            setDisplayName(userDisplayName);
            //foto cektik
            const profilePicture = doc.data().profilePicture;
            if (profilePicture) {
              const storageRef = ref(storage, profilePicture);
              getDownloadURL(storageRef).then((url) => {
                setProfilePictureUrl(url);
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // Kullanıcı oturumu açmamış
    }
  }, [user, firestore]);

  return (
    <div>
      {profilePictureUrl ? (
        <div id="profile-picture">
          <img src={profilePictureUrl} alt="User Profile Pic" />
          <h3>{displayName}</h3>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProfilePicture;
