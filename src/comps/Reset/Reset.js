import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { auth } from "../../firebase"; // before
import { sendPasswordResetEmail } from "firebase/auth";
import "./reset.scss";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const handleResetPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSuccessMessage(
          "An email to reset your password has been sent to your email address."
        );
        setErrorMessage("");
        setEmail("");
        setIsVerified(true);
      })
      .catch((error) => {
        const userNotFound = "User not found :/";
        const fberror1 = "Firebase: Error (auth/user-not-found).";
        if (error.message === fberror1) {
          setErrorMessage(userNotFound);
        } else {
          setErrorMessage(error.message);
        }
        setSuccessMessage("");
      });
  };

  return (
    <div id="reset-container">
      <div id="reset-container-items">
        <div id="reset-text">
          <p className="bold">
            Hi! Dont Worry, we can recover your password together!
          </p>
          <p>
            All you have to do for this is to write the e-mail address you used
            while registering in the field below. then the cipher fairies will
            find your password from the dusty shelves and email you
          </p>
        </div>
        <form onSubmit={handleResetPassword}>
          <TextField
            type="email"
            name="email"
            label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <div id="button-container">
            <Button variant="contained" type="submit">
              Reset Password
            </Button>
            {isVerified ? (
              <Link to="/signin">
                <Button
                  className="button"
                  variant="contained"
                  color="secondary"
                  startIcon={<LoginIcon />}
                >
                  Sign In
                </Button>
              </Link>
            ) : null}
          </div>
        </form>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </div>
    </div>
  );
};

export default Reset;
