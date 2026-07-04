import  React, {useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/api.config.js";
import toast from "react-hot-toast";

const Settings = () => {
  //  const { user } = useAuth();

  const { user, setUser } = useAuth();

  const [isEditable, setIsEditable] = useState(false);
  const [tempUser, setTempUser] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTempUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsEditable(false);

    const payLoad = {
      email: tempUser.email.toLowerCase(),
      fullName: tempUser.fullName,
      phone: tempUser.phone,
    };

    console.log(payLoad);

    try {
      const res = await api.put("/user/edit-profile", payLoad);
      setUser(res.data.data);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(
        error.response.status + " | " + error.response?.data?.message ||
          error.message,
      );
    }
  };
 return (
  <div className="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8 ">
    
    <div className="flex flex-col md:flex-row items-center gap-8">
      
    
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
        <img
          src={user.photo}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* User Details */}
      <div className="flex-1 w-full">
        {isEditable ? (
          <div className="space-y-4">
            <div>
              <label className="font-semibold text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={tempUser.fullName}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-600">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={tempUser.email}
                disabled
                className="w-full mt-1 border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-600">
                Phone
              </label>
              <input
                type="number"
                name="phone"
                value={tempUser.phone}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-gray-800">
              {user.fullName}

            </h2>

            <div className="flex items-center gap-2 text-gray-600">
              <span className="font-semibold">Email:</span>
              <span>{user.email}</span>

            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <span className="font-semibold">Phone:</span>
              <span>{user.phone}</span>

            </div>
          </div>
        )}
      </div>
    </div>

    {/* Buttons */}
    <div className="flex gap-4 mt-8 justify-end">
      {isEditable ? (
        <>
          <button
            onClick={() => setIsEditable(false)}
            className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </>
      ) : (
        <button
          onClick={() => setIsEditable(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Edit Profile
        </button>
      )}
    </div>
  </div>
);
};

export default Settings;
