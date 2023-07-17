import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "../components/hostComponents/Signup/SignUp";
import Home from "../components/hostComponents/Home/Home";
import Login from "../components/hostComponents/Login/Login";
import OTPModal from "../components/userComponents/Otp/Otp";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios.js";
import HostSignup from "../pages/HostPages/HostSignup";
import HostHome from "../pages/HostPages/HostHome";
import HostLogin from "../pages/HostPages/HostLogin";

export default function HostRoutes() {
  const { host, refresh } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get('/host/auth')
      .then((response) => {
        console.log("HOST:", response.data);
        dispatch({ type: 'host', payload: { login: response.data.loggedIn, details: response.data.host } });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh, dispatch]);

  return (
    <Routes>
      {host.login ? (
        <>
          <Route path="/signup" element={<Navigate to="/host" replace />} />
          <Route path="/otp" element={<Navigate to="/host" replace />} />
          <Route path="/login" element={<Navigate to="/host" replace />} />

          <Route path="/" element={<HostHome />} />
        </>
      ) : (
        <>
          <Route path="/signup" element={<HostSignup />} />
          <Route path="/" element={<Navigate to="/host/login"/>}/>
          <Route path="/login" element={<HostLogin />} />
        </>
      )}
    </Routes>
  );
}
