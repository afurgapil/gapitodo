import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, updateDoc, getDoc, getFirestore } from "firebase/firestore";
import { app, db, storage } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import EditIcon from "@mui/icons-material/Edit";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import BadgeIcon from "@mui/icons-material/Badge";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Button } from "@mui/material";
import "./Profile.scss";
import Welcome from "../Welcome/Welcome";
function Profile() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [user, setUser] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const firestore = getFirestore();
  const [isEditOn, setIsEditOn] = useState(false);
  const navigate = useNavigate();
  const editDetails = () => {
    setIsEditOn(!isEditOn);
    window.location.reload();
  };
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
      const userId = user.uid;
      const userRef = doc(firestore, "users", userId);
      getDoc(userRef)
        .then((doc) => {
          if (doc.exists()) {
            const userDisplayName = doc.data().displayName;
            setName(userDisplayName);
            const userDisplayLastName = doc.data().displayLastname;
            setLastname(userDisplayLastName);
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
      //NotFoundUser
    }
  }, [user, firestore]);

  function EditOn() {
    const [displayName, setDisplayName] = useState("");
    const [displayLastName, setDisplayLastName] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);

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
      <div className="profile-form">
        {user && (
          <div className="profile-form-container">
            <div className="input-forms">
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
              <div id="button-container">
                <Button
                  className="edit-button"
                  variant="contained"
                  endIcon={<BadgeIcon />}
                  onClick={handleDisplayName}
                >
                  Save Name
                </Button>
                <Button
                  className="edit-button"
                  variant="contained"
                  endIcon={<AddPhotoAlternateIcon />}
                  onClick={handleProfilePictureUpload}
                >
                  Save Photo
                </Button>
                <Button
                  className="edit-button"
                  variant="contained"
                  endIcon={<SaveAsIcon />}
                  onClick={() => editDetails()}
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  function EditOff() {
    return (
      <div className="profile-details">
        <div className="user-info">
          <p>
            <span className="bold">Your Name:</span>
            {name}
          </p>
          <p>
            <span className="bold">Your Last Name:</span>
            {lastname}
          </p>

          <Button
            className="edit-button"
            variant="contained"
            endIcon={<EditIcon />}
            onClick={() => setIsEditOn(true)}
          >
            Edit
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {user ? (
        <div id="profile-container">
          <div id="pp-container">
            <img src={profilePictureUrl} alt="User Profile Pic" />
          </div>
          <div id="info-container">{isEditOn ? <EditOn /> : <EditOff />}</div>
        </div>
      ) : null}
      {!user ? <Welcome></Welcome> : null}
    </div>
  );
}

export default Profile;
