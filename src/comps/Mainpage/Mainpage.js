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
      {user ? (
        <div id="onLoginHome">
          <Home></Home>
        </div>
      ) : null}
      {!user ? (
        <div id="onNotLogin">
          <Welcome></Welcome>
        </div>
      ) : null}
    </div>
  );
}

export default Mainpage;
