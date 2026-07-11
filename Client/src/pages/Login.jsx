import React, { useState } from "react";
import deliveryboy from "../assets/deliveryboy.png";
import api from "../config/api.config.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";


const Login = () => {
  const {setUser,setIsLogin,isLogin} = useAuth();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [validateError, setValidateError] = useState();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here, e.g., send loginData to the server
    //Validate loginData

    console.log("Login data submitted:", loginData);

    const payload = {
      email: loginData.email.toLowerCase(),
      password: loginData.password,
    };

    
    try {
      const res = await api.post("/auth/login", payload);
      toast.success(res.data.message);
      sessionStorage.setItem("cravingUser", JSON.stringify(res.data.data));
      setUser(res.data.data);
      const userType = res.data.data.userType;
      const dashboardPath = userType === "customer" ? "/customer-dashboard" : 
                           userType === "restaurant" ? "/restaurant-dashboard" :
                           userType === "rider" ? "/rider-dashboard" :
                           userType === "admin" ? "/admin-dashboard" : "/";
      navigate(dashboardPath);
    } catch (error) {
      toast.error(
        error.response.status + " | " + error.response?.data?.message ||
          error.message,
      );
    }
  };

  const inputClass =
    "border p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--accent)";

  return (
    <>
       <div className="h-[90vh] bg-linear-to-r from-(--secondary) to-(--primary) grid grid-cols-2 p-10 ">
        <div className="hidden md:block">
          <img src={deliveryboy} alt="" className="rotate-y-180" />
        </div>
        <div className="w-md bg-(--background) rounded shadow p-10 flex flex-col justify-center">
          <div>Welocome Back!</div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--accent)"
              />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--accent)"
              />
            </div>
            <button
              type="submit"
              className="mt-6 bg-(--primary) text-white py-2 px-4 rounded hover:bg-(--accent)"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;