import React from "react";
import { auth } from "../firebase";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";

function SignOutButton() {
  return (
    <Button
      onClick={() => auth.signOut()}
      variant="contained"
      sx={{ bgcolor: red[500], color: "white" }}
    >
      Sign Out
    </Button>
  );
}

export default SignOutButton;
