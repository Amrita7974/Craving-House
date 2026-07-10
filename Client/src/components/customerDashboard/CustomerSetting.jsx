import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../config/api.config.js";
import toast from "react-hot-toast";
import { MdOutlineAddAPhoto } from "react-icons/md";

const CustomerSetting = () => {
 const { user, setUser } = useAuth();

  const [isEditable, setIsEditable] = useState(false);
  const [tempUser, setTempUser] = useState(user);
  const [isLoading, setIsLoading] = useState(false); // Added missing loading state
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);

  useEffect(() => {
    if (user) {
      setTempUser(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempUser((prev) => ({ ...prev, [name]: value }));
  };

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
    setTempUser(user); 
    setProfilePicPreview(null); 
    setSelectedFile(null); 
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);

      // Convert your payload to FormData to allow file uploading
      const payLoad = new FormData();
      payLoad.append("fullName", tempUser.fullName || "");
      payLoad.append("email", (tempUser.email || "").toLowerCase());
      payLoad.append("phone", tempUser.phone || "");

      // Append file if a new one was selected
      if (selectedFile) {
        // Double check if your backend expects "displayPic" or "photo"
        payLoad.append("displayPic", selectedFile); 
      }

      const res = await api.put("/user/edit-profile", payLoad, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUser(res.data.data);
      // Optional: update session storage if you are tracking user persistence there
      sessionStorage.setItem("cravingUser", JSON.stringify(res.data.data));
      
      toast.success(res.data.message || "Profile updated successfully!");
      setIsEditable(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "An error occurred"
      );
    } finally {
      setIsLoading(false);
      setProfilePicPreview(null);
      setSelectedFile(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8 ">
      <div className="flex flex-col md:flex-row items-center gap-8">
        
        {/* Profile Picture Container */}
        <div className="relative w-32 h-32">
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
            <img
              // Note: fall back to your correct object structure (e.g., user?.photo?.url)
              src={profilePicPreview || user?.photo?.url || user?.photo || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Camera Overlay Button - Only responsive when editable */}
          {isEditable && (
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
          )}
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
                  value={tempUser?.fullName || ""}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full mt-1 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  value={tempUser?.email || ""}
                  disabled
                  className="w-full mt-1 border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-600">Phone</label>
                <input
                  type="text" 
                  name="phone"
                  value={tempUser?.phone || ""}
                  onChange={handleChange}
                  disabled={isLoading}
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
              disabled={isLoading}
              className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Changes"}
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

export default CustomerSetting;