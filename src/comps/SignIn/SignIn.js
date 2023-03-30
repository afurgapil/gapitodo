import { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { app } from "../../firebase";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
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
  return (
    <div>
      {user ? (
        <div>
          <h2>{user.displayName}</h2>
          {user.displayName && <h2>{user.displayName}</h2>}
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName}
              width="100"
              height="100"
            />
          ) : (
            <div
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "gray",
              }}
            ></div>
          )}
          <button onClick={handleLogout}>Çıkış Yap</button>
        </div>
      ) : (
        <div>
          <h2>Giriş Yap</h2>
          <form onSubmit={handleLogin}>
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
              Giriş Yap
            </button>
          </form>
          {error && <p>{error}</p>}
        </div>
      )}
    </div>
  );
}

export default SignIn;
