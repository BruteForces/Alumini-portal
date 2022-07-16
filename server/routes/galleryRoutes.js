import express from "express";
import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";
import { protect, admin } from "../middleware/authMiddlewares.js";
import {
  getAllImages,
  uploadImage,
  getImageById,
  deleteGalleryImage,
} from "../controllers/galleryController.js";
import { config } from "dotenv";

config();

const router = express.Router();

const galleryStorage = new GridFsStorage({
  url: process.env.URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      if (!["image/png", "image/jpeg", "image/jpg"].includes(file.mimetype)) {
        reject(new Error("Only Images(png, jpg, jpeg) are allowed"));
      }
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "gallery_images",
      };
      resolve(fileInfo);
    });
  },
});

const upload = multer({ storage: galleryStorage });

router.post("/", protect, admin, upload.single("image"), uploadImage);
router.get("/", getAllImages);
router.get("/:id", getImageById);
router.delete("/:id", protect, admin, deleteGalleryImage);
export default router;
