import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const UserData = [
  {
    fullName: "Manager1",
    email: "manager1@gmail.com",
    password: await bcrypt.hash("Manager@123", 10),
    dob: "2000-01-01",
    gender: "other",
    userType: "restaurant",
    phone: "9876543210",
    photo: { url: "https://placehold.co/600x400?text=M", publicId: null },
  },
  {
    fullName: "Customer1",
    email: "Customer1@gmail.com",
    password: await bcrypt.hash("Customer@123", 10),
    dob: "2000-01-01",
    gender: "other",
    userType: "customer",
    phone: "9876543210",
    photo: { url: "https://placehold.co/600x400?text=C", publicId: null },
  },
  {
    fullName: "Rider1",
    email: "Rider1@gmail.com",
    password: await bcrypt.hash("Rider@123", 10),
    dob: "2000-01-01",
    gender: "other",
    userType: "rider",
    phone: "9876543210",
    photo: { url: "https://placehold.co/600x400?text=R", publicId: null },
  },
];

const userSeed = async () => {
  try {
    //Seeding Restaurant
    const preparedUserData = await Promise.all(
      UserData.map(async (user) => {
        const { rawPassword, ...userPayload } = user;

        return {
          ...userPayload,
          password: await bcrypt.hash(rawPassword, 10),
        };
      }),
    );

    for (const user of preparedUserData) {
      const existingUser = await User.findOne({ email: user.email });

      if (existingUser) {
        console.log(`Existing ${user.userType} Found (${user.email})`);
        console.log(`Deleting Existing ${user.userType} (${user.email})`);
        await existingUser.deleteOne();
      }

      console.log(`Creating New ${user.userType} (${user.email})`);
      await User.create(user);
      console.log(`${user.userType} Created Successfully (${user.email})`);
    }
  } catch (error) {
    console.log("User Not Created");
    throw error;
  }
};

export default userSeed;