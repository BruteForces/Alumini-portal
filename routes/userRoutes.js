import express from "express";
import {
  forgotPassword,
  getNotification,
  getUserAvatarImage,
  getUserDetailsById,
  loginUser,
  registerUser,
  resolveNotification,
} from "../controllers/userControllers.js";
import { registerAlumni } from "../controllers/alumniControllers.js";
import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";
import { protect } from "../middleware/authMiddlewares.js";

const router = express.Router();

const userAvatarStorage = new GridFsStorage({
  url: process.env.URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      if (!["image/png", "image/jpeg", "image/jpg"].includes(file.mimetype)) {
        reject(new Error("Only Images(png, jpg, jpeg) are allowed"));
      }
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "user_avatar_images",
      };
      resolve(fileInfo);
    });
  },
});

const upload = multer({ storage: userAvatarStorage });

router.get("/notifications", protect, getNotification);
router.get("/:id", getUserDetailsById);
router.get("/user-avatar/:id", getUserAvatarImage);

router.patch("/forgot-password/:email", forgotPassword);
router.patch(
  "/notifications/resolve/:notificationId",
  protect,
  resolveNotification
);

router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);
router.post("/alumni-register", registerAlumni);

export default router;
