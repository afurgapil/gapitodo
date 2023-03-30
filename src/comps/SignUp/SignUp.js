import React, { useState } from "react";
import { auth } from "../../firebase";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Yeni kullanıcı başarıyla kaydedildi
        console.log(userCredential.user);
      })
      .catch((error) => {
        // Hataları burada yönetebilirsiniz
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleSignup}>
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
    </div>
  );
}

export default Signup;
