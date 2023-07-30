import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "../components/userComponents/SignUp/SignUp.";
import OTPModal from "../components/userComponents/Otp/Otp";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";
import Home from "../components/userComponents/Home/Home";
import Login from "../components/userComponents/Login/Login";
import UserSignup from "../pages/userPages/UserSignup";
import UserLogin from "../pages/userPages/UserLogin";
import UserHome from "../pages/userPages/UserHome";


export default function UserRoutes() {
  const { user, refresh } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get('/auth')
      .then((response) => {
        console.log("USER:", response.data);
        dispatch({ type: 'user', payload: { login: response.data.loggedIn, details: response.data.user } });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh, dispatch]);

  return (
    <Routes>
     {user.login ? (
        <>
          <Route path="/signup" element={<Navigate to="/" replace />} />
          <Route path="/otp" element={<Navigate to="/" replace />} />
          <Route path="/login" element={<Navigate to="/" replace />} />

          <Route path="/" element={<UserHome />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/otp" element={<OTPModal />} />

          <Route path="/" element={<UserHome />} />
          {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
        </>
      )}
    </Routes>
  );
}
 