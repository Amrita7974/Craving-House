import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const AdminUser = {
  fullName: "Admin",
  email: "Admin@cravingsHouse@123",
  password: await bcrypt.hash("StrongPassword123", 10),
  dob: "2006-01-01",
  gender: "other",
  userType: "admin",
  phone: "967548934",
  photo: { url: "https://placehold.co/600x400?text=Admin", publicId: null },
};

const adminSeed = async () => {
  try {
    const existingAdmin = await User.findOne({ email: AdminUser.email });

    if (existingAdmin) {
      console.log("Existing User Found");
      console.log("Deleting Existing User");
      await existingAdmin.deleteOne();
    }

    console.log("Creating New Admin");

    const newAdmin = await User.create(AdminUser);
    console.log("Admin Create Sucessfully");
  } catch (error) {
    console.log("Admin Not Created");
    throw error;
  }
};

export default adminSeed;