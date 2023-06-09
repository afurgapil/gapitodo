import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import Home from "../Home/Home";
import Welcome from "../Welcome/Welcome";

function Mainpage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user ? <Home></Home> : null}
      {!user ? <Welcome></Welcome> : null}
    </div>
  );
}

export default Mainpage;
