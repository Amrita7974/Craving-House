import React from "react";
import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { LuLoaderCircle } from "react-icons/lu";
import api from "../../config/api.config";
import toast from "react-hot-toast";

const ForgotPasswordModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const handleCloseModal = () => {
    setFormData({
      email: "",
      otp: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    // Reset flags cleanly so the next open doesn't get stuck midway
    setIsOtpSent(false);
    setIsOtpVerified(false);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleResetPassword = async () => {
    // 1. Client-side Validation Check
    if (isOtpSent && isOtpVerified) {
      if (!formData.newPassword || !formData.confirmNewPassword) {
        toast.error("Please fill out all password fields.");
        return;
      }
      if (formData.newPassword !== formData.confirmNewPassword) {
        toast.error("New password and confirm password do not match.");
        return;
      }
    }

    try {
      setIsLoading(true);

      // STEP 1: Send OTP (Executes only if OTP has not been sent yet)
      if (!isOtpSent) {
        const res = await api.post("/auth/send-otp", formData);
        toast.success(res.data.message);
        setIsOtpSent(true);
      } 
      
      // STEP 2: Verify OTP (Executes only if OTP was sent, but not verified yet)
      else if (isOtpSent && !isOtpVerified) {
        if (!formData.otp) {
          toast.error("Please enter the OTP code.");
          setIsLoading(false);
          return;
        }
        const res = await api.post("/auth/verify-otp", formData);
        toast.success(res.data.message);
        setIsOtpVerified(true);
      } 
      
      // STEP 3: Reset Password (Executes only when OTP is verified)
      else if (isOtpSent && isOtpVerified) {
        const res = await api.post("/auth/reset-password", formData);
        toast.success(res.data.message);
        handleCloseModal();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-999">
        <div className="bg-white w-xl rounded shadow max-h-[80vh] overflow-y-auto relative">
          <header className="flex justify-between p-4 border-b border-(--color-secondary)">
            <div className="font-bold text-xl text-(--color-primary)">
              Forgot Password
            </div>
            <button onClick={handleCloseModal}>
              <IoIosCloseCircleOutline className="text-red-400 hover:text-red-700 text-2xl" />
            </button>
          </header>
          <main>
            <div className="p-4 space-y-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-semibold">
                  Your Registered Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-(--color-secondary) rounded px-3 py-2 disabled:bg-(--color-secondary) disabled:text-(--color-secondary-content)"
                  disabled={isLoading || isOtpSent}
                />
              </div>

              {isOtpSent && (
                <div className="flex flex-col gap-2">
                  <label htmlFor="otp" className="font-semibold">
                    Your OTP
                  </label>
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    className="border border-(--color-secondary) rounded px-3 py-2 disabled:bg-(--color-secondary) disabled:text-(--color-secondary-content)"
                    disabled={isLoading || isOtpVerified}
                  />
                </div>
              )}

              {isOtpSent && isOtpVerified && (
                <>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="newPassword" className="font-semibold">
                      Create Your New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="border border-(--color-secondary) rounded px-3 py-2 disabled:bg-(--color-secondary) disabled:text-(--color-secondary-content)"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="confirmNewPassword" className="font-semibold">
                      Confirm Your New Password
                    </label>
                    <input
                      type="password" 
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      value={formData.confirmNewPassword}
                      onChange={handleChange}
                      className="border border-(--color-secondary) rounded px-3 py-2 disabled:bg-(--color-secondary) disabled:text-(--color-secondary-content)"
                      disabled={isLoading}
                    />
                  </div>
                </>
              )}
            </div>
          </main>
          <footer className="w-full p-4 border-t border-(--color-secondary) flex justify-end gap-3">
            <button
              onClick={handleCloseModal}
              className="flex items-center gap-2 bg-(--color-secondary) text-(--color-secondary-content) px-3 py-1 rounded text-sm"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
              onClick={handleResetPassword}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LuLoaderCircle className="animate-spin" /> Loading...
                </>
              ) : isOtpSent ? (
                isOtpVerified ? (
                  "Reset Password"
                ) : (
                  "Verify OTP"
                )
              ) : (
                "Send OTP"
              )}
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordModal;