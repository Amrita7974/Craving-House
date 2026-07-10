import React from "react";
import { useAuth } from "../../context/AuthContext";
import {
  MdEmail,
  MdPhone,
  MdPerson,
  MdSettings,
  MdFavorite,
  MdArrowForward,
} from "react-icons/md";

const RestaurantOverview = ({ setActive }) => {
  const { user } = useAuth();

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good Morning";
    if (hours < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Profile Image */}
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
            {user?.photo ? (
              <img
                src={user.photo}
                alt={user.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-white text-orange-500 flex items-center justify-center text-4xl font-bold">
                {user?.fullName?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </div>

          {/* User Info */}
          <div>
            <p className="text-orange-100 font-medium">
              {getGreeting()}
            </p>

            <h1 className="text-3xl font-bold mt-1">
              {user?.fullName || "User"}
            </h1>

            <p className="text-orange-100 mt-2">
              Welcome back to your dashboard
            </p>
          </div>
        </div>
      </div>

      {/* User Information Cards */}
      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl shadow-md p-5 border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-xl">
              <MdPerson className="text-orange-600 text-2xl" />
            </div>

            <div>
              <p className="text-gray-500 text-sm">Full Name</p>
              <h3 className="font-bold text-gray-800">
                {user?.fullName}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <MdEmail className="text-blue-600 text-2xl" />
            </div>

            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <h3 className="font-bold text-gray-800 break-all">
                {user?.email}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <MdPhone className="text-green-600 text-2xl" />
            </div>

            <div>
              <p className="text-gray-500 text-sm">Phone</p>
              <h3 className="font-bold text-gray-800">
                {user?.phone}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold mb-5 text-gray-800">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          <button
            onClick={() => setActive("Settings")}
            className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-xl">
                  <MdSettings className="text-orange-600 text-2xl" />
                </div>

                <div className="text-left">
                  <h3 className="font-bold text-gray-800">
                    Edit Profile
                  </h3>
                  <p className="text-sm text-gray-500">
                    Update your account information
                  </p>
                </div>
              </div>

              <MdArrowForward className="text-gray-400 group-hover:text-orange-600" />
            </div>
          </button>

          <button
            onClick={() => setActive("Wishlist")}
            className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-3 rounded-xl">
                  <MdFavorite className="text-red-600 text-2xl" />
                </div>

                <div className="text-left">
                  <h3 className="font-bold text-gray-800">
                    Wishlist
                  </h3>
                  <p className="text-sm text-gray-500">
                    View your favorite items
                  </p>
                </div>
              </div>

              <MdArrowForward className="text-gray-400 group-hover:text-red-600" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantOverview;