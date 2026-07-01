import React, { useState } from "react";
import deliveryboy from "../assets/deliveryboy.png";
import api from "../config/api.config.js";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    accountType: "customer",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Register data submitted:", registerData);
    const payload = {
      fullName: registerData.fullName.trim(),
      email: registerData.email.toLowerCase(),
      phone: registerData.phone,
      password: registerData.password,
      gender: registerData.gender,
      dob: registerData.dob,
    };
    try {
      const res = await api.post("/auth/register", payload);

      toast.success(res.data.message);
      console.log(res.data);
      

      // console.log(res.data);

      // alert(res.data.message);

      // Optional: Store user data
      localStorage.setItem("user", JSON.stringify(res.data.data));

      // Redirect after successful login
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error.response.status + "|" + error?.response?.data?.message);
    }
  
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-[url('/foodTable.webp')]">
      <div className="min-h-screen bg-linear-to-br from-black/70 via-black/55 to-orange-500/20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:grid-cols-2 md:px-8 md:py-12 lg:px-10">
          <div
            className="rounded
          
          -4xl border border-white/20 bg-white/90 p-6 shadow-2xl backdrop-blur md:p-8 lg:p-10"
          >
            <div className="text-center">
              <div className="mb-3 inline-flex rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-600">
                Join Cravings
              </div>
              <h2 className="text-3xl font-black text-(--accent)">
                Create Account
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                type="text"
                id="fullname"
                name="fullName"
                value={registerData.fullName}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your full name"
              />

              <input
                type="email"
                id="email"
                name="email"
                value={registerData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your email"
              />

              <input
                type="tel"
                id="phone"
                name="phone"
                value={registerData.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your phone number"
              />

              <select
                name="gender"
                value={registerData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="other">other</option>
              </select>

              <input
                type="date"
                name="dob"
                value={registerData.dob}
                onChange={handleChange}
              />

              <input
                type="password"
                id="password"
                name="password"
                value={registerData.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your password"
              />

              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={registerData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Confirm your password"
              />

              <div className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor="terms" className="ml-2">
                  I agree to the
                  <span className="ml-1 font-semibold text-orange-500 hover:underline">
                    terms and conditions.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600"
              >
                Register
              </button>

              <div className="pt-2 text-center text-sm text-gray-600">
                <span>Already registered?</span>
                <a
                  href="./login"
                  className="ml-1 font-semibold text-orange-500 hover:underline"
                >
                  Login here
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;