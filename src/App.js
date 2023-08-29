import React from "react";
import { Route, Routes } from "react-router";
import Home from "./componnets/Home/Home";
import Auth from "./componnets/Auth/Auth";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default App;
