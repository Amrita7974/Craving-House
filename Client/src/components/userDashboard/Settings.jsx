import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/api.config.js";
import toast from "react-hot-toast";
import { MdOutlineAddAPhoto } from "react-icons/md"; // Added camera icon

const Settings = () => {
  const { user, setUser } = useAuth();

  const [isEditable, setIsEditable] = useState(false);
  const [tempUser, setTempUser] = useState(user);
  
  // File upload state for photo logic
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);

  // Sync state if user context updates externally
  useEffect(() => {
    if (user) {
      setTempUser(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempUser((prev) => ({ ...prev, [name]: value }));
  };

  // Profile picture selection & preview logic
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileURL = URL.createObjectURL(file);
      setProfilePicPreview(fileURL);
    }
  };

  const handleCancel = () => {
    setIsEditable(false);
    setTempUser(user); // Reset text inputs
    setProfilePicPreview(null); // Clear preview image
    setSelectedFile(null); // Clear pending file
  };

  const handleSave = async () => {
    setIsEditable(false);

    // 1. Prepare text data payload
    const payLoad = {
      email: tempUser.email.toLowerCase(),
      fullName: tempUser.fullName,
      phone: tempUser.phone,
    };

    try {
      // NOTE: If your backend expects a single multipart/form-data request to update 
      // both text and files, you will need to append these values to a FormData instance instead.
      if (selectedFile) {
        // Option A: If your backend handles images on an independent route
        // const formData = new FormData();
        // formData.append("photo", selectedFile);
        // const imageRes = await api.put("/user/edit-avatar", formData);
        // payLoad.photo = imageRes.data.data.photo;
      }

      const res = await api.put("/user/edit-profile", payLoad);
      setUser(res.data.data);
      toast.success(res.data.message || "Profile updated successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "An error occurred"
      );
    } finally {
      // Cleanup preview tracking memory
      setProfilePicPreview(null);
      setSelectedFile(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8 ">
      <div className="flex flex-col md:flex-row items-center gap-8">
        
        {/* Profile Picture Container with Camera Button */}
        <div className="relative w-32 h-32">
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
            <img
              src={profilePicPreview || user?.photo || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Camera Upload Overlay Button */}
          <div
            className="absolute cursor-pointer bottom-0 right-0 border-2 border-white p-2 rounded-full w-fit bg-gray-100 hover:bg-gray-200 shadow-md transition"
            title="Change Photo"
          >
            <label htmlFor="profilePic" className="cursor-pointer">
              <MdOutlineAddAPhoto className="text-xl text-gray-700" />
            </label>
            <input
              type="file"
              accept="image/*"
              name="profilePic"
              id="profilePic"
              className="hidden"
              onChange={handleProfilePicChange}
            />
          </div>
        </div>

        {/* User Details */}
        <div className="flex-1 w-full">
          {isEditable ? (
            <div className="space-y-4">
              <div>
                <label className="font-semibold text-gray-600">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={tempUser.fullName || ""}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  value={tempUser.email || ""}
                  disabled
                  className="w-full mt-1 border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-600">Phone</label>
                <input
                  type="text" 
                  name="phone"
                  value={tempUser.phone || ""}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-gray-800">
                {user?.fullName}
              </h2>

              <div className="flex items-center gap-2 text-gray-600">
                <span className="font-semibold">Email:</span>
                <span>{user?.email}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <span className="font-semibold">Phone:</span>
                <span>{user?.phone}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8 justify-end">
        {isEditable ? (
          <>
            <button
              onClick={handleCancel}
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
