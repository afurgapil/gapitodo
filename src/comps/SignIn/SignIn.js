import { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { app, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "./signin.scss";
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const navigate = useNavigate();
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    const auth = getAuth(app);
    await signOut(auth);
    navigate("/home");
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

      setDisplayName(user.displayName);
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
  };

  return (
    <div>
      {user ? (
        <div>
          {user && <p className="mb-0">Merhaba, {user.displayName}!</p>}
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profil Resmi"
              className="img-thumbnail"
            />
          ) : (
            <p>Profil resmi yok</p>
          )}
          <button className="btn btn-primary mt-3" onClick={handleLogout}>
            Çıkış Yap
          </button>
        </div>
      ) : (
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={handleLogin}>
            Giriş Yap
          </button>
          {error && <p>{error}</p>}
        </form>
      )}
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

export default SignIn;
