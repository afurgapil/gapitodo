import React from "react";
import { auth } from "../firebase";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

function SignOutButton() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigate("/");
    });
  };

  return (
    <Button
      onClick={handleSignOut}
      variant="contained"
      sx={{ bgcolor: red[500], color: "white" }}
    >
      Sign Out
    </Button>
  );
}

export default SignOutButton;
