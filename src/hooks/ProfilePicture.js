import { useState, useEffect } from "react";
import { storage } from "../firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";

function ProfilePicture() {
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
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
        <img
          src={profilePictureUrl}
          alt="Profile Picture"
          style={{ height: "80px" }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProfilePicture;
