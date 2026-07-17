import React from "react";
import {  Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ContactUs from "./pages/ContactUs";
import { Toaster } from "react-hot-toast";
import CustomerDashboard from "./pages/dashboard/CustomerDashboard";
import RestaurantDashboard from "./pages/dashboard/RestaurantDashboard";
import RiderDashboard from "./pages/dashboard/RiderDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";

const App = () => {
  return (
    <>
      <Toaster />

        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/register/:userType" element={<Register />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route
            path="/restaurant-dashboard"
            element={<RestaurantDashboard />}
          />
          <Route path="/rider-dashboard" element={<RiderDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
        <Footer/>

    </>
  );
};

export default App;
