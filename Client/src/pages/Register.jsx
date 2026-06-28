import React, { useState } from "react";
import deliveryboy from "../assets/deliveryboy.png";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [validateError, setValidateError] = useState();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setRegisterData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Register data submitted:", registerData);

    const payload = {
      fullname: registerData.name.toLowerCase(),
      password: registerData.password,
    };
  };

  return (
    <>
      <div className="h-fit bg-cover bg-center bg-[url('/foodTable.webp')]">
        <div className="h-[92vh] grid grid-cols-1 md:grid-cols-2 p-10 items-start">
          <div className="flex justify-center md:justify-start items-start mt-6 md:mt-0">
            <img
              src={deliveryboy}
              alt="delivery"
              className="w-64 md:w-96 rounded-3xl shadow-lg"
            />
          </div>
          

          <div className="w-full md:w-auto bg-(--background) rounded-3xl shadow p-6 md:p-10 mt-5 md:mt-0 self-start">
            <div className="var(text-2xl) font-bold mb-1 text-(--success) flex justify-center items-center text-3xl">
              Create Account
            </div>
            <span className="block text-center">
              Join us as a Customer, Restaurant, or Rider
            </span>
            <div>
              <span>Register as:</span>
              <div className="flex gap-2 mt-2">
                <input
                  type="radio"
                  name="registerAs"
                  value="customer"
                  id="customer"
                />

                <label htmlFor="customer" className="mr-10">
                  Customer
                </label>
                <input
                  type="radio"
                  id="restaurant"
                  value="restaurant"
                  name="registerAs"
                />
                <label htmlFor="restaurant" className="mr-10">
                  Restaurant
                </label>
                <input type="radio" id="rider" name="registerAs" />
                <label htmlFor="rider">Rider</label>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="flex flex-col gap-2">
                <input
                  type="fullname"
                  id="fullname"
                  name="fullname"
                  value={registerData.fullname}
                  onChange={handleChange}
                  className="my-5 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--accent)"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleChange}
                  className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--accent)"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="phone"
                  id="phone"
                  name="phone"
                  value={registerData.phone}
                  onChange={handleChange}
                  className="my-5 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--accent)"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="flex flex-col gap-2">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleChange}
                  className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--accent)"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="confirmPassword"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={handleChange}
                  className="my-5 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--accent)"
                  placeholder="Confirm your password"
                />
              </div>

              <div className=" flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <input type="checkbox" id="terms" />
                  <label htmlFor="terms" className="ms-1">
                    I agree to the
                    <span className="ms-1 hover:underline text-(--accent)">
                      terms and conditions.
                    </span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-(--accent) text-(--primary-text) py-3 px-4 rounded hover:bg-(--accent) transition"
              >
                Register
              </button>
              <div className="my-4 flex justify-center">
                <span>Already registered?</span>
                <a href="./login">
                  <span className="text-(--accent) hover:underline ml-1">
                    Login here
                  </span>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
