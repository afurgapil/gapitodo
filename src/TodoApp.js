import React from "react";
import Home from "./comps/Home/Home";
import SignIn from "./comps/SignIn/SignIn";
import SignUp from "./comps/SignUp/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./comps/Profile/Profile";
import Header from "./comps/Header/Header";

function TodoApp() {
  return (
    <div>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default TodoApp;
