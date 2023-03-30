import { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { app, db } from "../../firebase";
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const db = getFirestore(app);

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
      setUser(user);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
    }
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    const auth = getAuth(app);
    await signOut(auth);
  };

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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          {user && <p>Merhaba, {user.displayName}!</p>}
          {user.photoURL ? (
            <img src={user.photoURL} alt="Profil Resmi" />
          ) : (
            <p>Profil resmi yok</p>
          )}
          <button onClick={handleLogout}>Çıkış Yap</button>
        </div>
      ) : (
        <form>
          <label>Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Giriş Yap</button>
          {error && <p>{error}</p>}
        </form>
      )}
      {user && (
        <div>
          <label>Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <button onClick={handleDisplayName}>Değiştir</button>
        </div>
      )}
    </div>
  );
}

export default SignIn;
