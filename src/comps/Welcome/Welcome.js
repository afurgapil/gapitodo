import React from "react";
import { Link } from "react-router-dom";
import "./welcome.scss";
import cat from "../../assets/cat.png";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";
import { Button } from "@mui/material";
function Welcome() {
  return (
    <div id="welcome-container">
      <img src={cat} alt="HolderCat!"></img>
      <div className="textContainer">
        <div className="text-container_items">
          <h2 className="title">Welcome to GaPiToDo</h2>
          <p className="text">
            This app is designed to help you manage your daily tasks
            effectively. Sign up now to start using the app and manage your
            tasks more efficiently.
          </p>
          <div className="buttonsContainer">
            <Link to="/signup">
              <Button
                className="button"
                variant="contained"
                color="primary"
                startIcon={<HowToRegIcon />}
              >
                Sign Up
              </Button>
            </Link>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
