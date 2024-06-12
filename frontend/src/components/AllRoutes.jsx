import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />}></Route>
      <Route path="/Login" element={<Login />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
    </Routes>
  );
};

export default AllRoutes;