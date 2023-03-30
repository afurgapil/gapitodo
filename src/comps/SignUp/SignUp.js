import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";
import { doc, setDoc, getFirestore } from "firebase/firestore";
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    const handleNameChange = (e) => {
      setName(e.target.value);
    };
    try {
      const auth = getAuth(app);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const db = getFirestore(app);
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        displayName: name,
        photoURL: "",
      });
    } catch (error) {
      setError(error.message);
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
