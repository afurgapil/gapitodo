import React from "react";
import Home from "./comps/Home/Home";
import SignIn from "./comps/SignIn/SignIn";
import SignUp from "./comps/SignUp/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function TodoApp() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default TodoApp;
