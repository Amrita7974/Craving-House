import express from "express";
import multer from "multer";
import {
  EditUserProfile,
  UpdateUserPassword,
} from "../controllers/user.controller.js";
import { AuthProtect } from "../middlewares/auth.middleware.js";

const upload = multer();

const router = express.Router();

router.put(
  "/edit-profile",
  AuthProtect,
  upload.single("displayPic"),
  EditUserProfile,
);

router.patch("/change-password", AuthProtect, UpdateUserPassword);

export default router;
