import express from "express";
import {
  createPost,
  getAllPosts,
  getPostImageById,
} from "../controllers/ForumController.js";
import dotenv from "dotenv";
import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";
import { protect, alumni } from "../middleware/authMiddlewares.js";
dotenv.config();

const storage = new GridFsStorage({
  url: process.env.URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      if (!["image/png", "image/jpeg", "image/jpg"].includes(file.mimetype)) {
        reject(new Error("Only Images(png, jpg, jpeg) are allowed"));
      }
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "forum_images",
      };
      resolve(fileInfo);
    });
  },
});
const upload = multer({ storage });

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", protect, alumni, upload.array("post_images", 6), createPost);
router.get("/image/:id", getPostImageById);
export default router;
