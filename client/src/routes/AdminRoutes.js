import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import AdminLogin from "../pages/AdminPages/AdminLogin";
import AdminHosts from "../pages/AdminPages/AdminHosts";
import AdminUsers from "../pages/AdminPages/AdminUsers";
import AdminHome from "../pages/AdminPages/AdminHome";
import AdminProperties from "../pages/AdminPages/AdminProperties";
import AdminPropertyView from "../pages/AdminPages/AdminPropertyView";
import AdminBookings from "../pages/AdminPages/AdminBookings";
import AdminBookingDetails from "../pages/AdminPages/AdminBookingDetails";
import AdminWithdrawRequest from "../pages/AdminPages/AdminWithdrawRequest";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import axiosInstance from "../axios.js";

export default function AdminRoutes() {
  const { admin, refresh } = useSelector((state) => state);
  const dispatch = useDispatch();
  const token = localStorage.getItem('AdminToken'); // Retrieve the token from localStorage

  useEffect(() => {
    axiosInstance("AdminToken")
      .get('/admin/auth', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token as a Bearer Token
        },
      })
      .then((response) => {
        console.log("Adminn:", response.data);
        dispatch({ type: 'admin', payload: { login: response.data.loggedIn, details: response.data.host } });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh, dispatch]);

  return (
    <Routes>
      {admin.login ? (
        <>
          <Route path="/login" element={<Navigate to="/admin" replace />} />
          <Route path="/" element={<AdminHome />} />
          <Route path="/users" element={<AdminUsers />} />
          <Route path="/*" element={<ErrorPage />} />
          <Route path="/hosts" element={<AdminHosts />} />
          <Route path="/withdrawrequest" element={<AdminWithdrawRequest />} />
          <Route path="/bookings" element={<AdminBookings />} />
          <Route path="/bookingdetails/:bookingId" element={<AdminBookingDetails />} />
          <Route path="/properties" element={<AdminProperties />} />
          <Route path="/properties/properties-details/:propertyId" element={<AdminPropertyView />} />
        </>
      ) : (
        <>
          <Route path={"/"} element={<Navigate to='/admin/login' replace />} />
          <Route path="/*" element={<ErrorPage />} />
          <Route path={"/"} element={<Navigate to='/admin/login' replace />} />
          <Route path={"/users"} element={<Navigate to='/admin/login' replace />} />
          <Route path={"/hosts"} element={<Navigate to='/admin/login' replace />} />
          <Route path="/login" element={<AdminLogin />} />
        </>
      )}
    </Routes>
  );
}
