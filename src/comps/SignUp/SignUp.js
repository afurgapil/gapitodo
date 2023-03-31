import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { app, auth, db, storage } from "../../firebase";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        displayName: name,
        photoURL: "",
      });

      setDefaultProfilePicture(user.uid);
      navigate("/todo");
    } catch (error) {
      setError(error.message);
    }
  };

  const setDefaultProfilePicture = async (userId) => {
    const storageRef = ref(storage, "user.png");
    let downloadURL = null;

    try {
      downloadURL = await getDownloadURL(storageRef);
    } catch (error) {
      console.log(error);
    }

    const userRef = doc(db, "users", userId);

    try {
      await setDoc(userRef, { profilePicture: downloadURL }, { merge: true });
      console.log("Profil resmi varsayılan olarak ayarlandı");
    } catch (error) {
      console.error("Profil resmi varsayılan olarak ayarlanamadı:", error);
    }
  };

  return (
    <div>
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="exampleInputName1">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName1"
            aria-describedby="Name1"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Kayıt Ol
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Signup;
