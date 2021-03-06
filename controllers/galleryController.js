import mongoose from "mongoose";
import Grid from "gridfs-stream";
import asyncHandler from "express-async-handler";
import Gallery from "../models/Gallery.js";
import { getGalleryType } from "../utils/controller-utils.js";

let gfs, galleryImagesBucket;
const conn = mongoose.connection;
conn.once("open", () => {
  galleryImagesBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "gallery_images",
  });
  gfs = Grid(conn.db, mongoose.mongo);
});

export const uploadImage = asyncHandler(async (req, res) => {
  const image = req.file;
  const { title, desc, type } = req.body;
  const galleryImage = await Gallery.create({
    image: image.id,
    title,
    type,
    desc,
  });

  if (!galleryImage) {
    return res.status(400).json({
      message: "Upload failed",
    });
  }

  res.json(galleryImage);
});

export const getGalleryImages = asyncHandler(async (req, res) => {
  const { type = 0 } = req.query;

  let galleryImages;

  if (Number(type) === 0) {
    galleryImages = await Gallery.find({});
  } else {
    galleryImages = await Gallery.find({ type: getGalleryType(type) });
  }

  if (!galleryImages) {
    return res.status(400).json({
      message: "No images found",
    });
  }

  res.json(galleryImages);
});

export const getImageById = asyncHandler(async (req, res) => {
  try {
    const imageId = req.params.id;

    const image = await galleryImagesBucket.find({ _id: imageId });

    if (!image) {
      return res.status(400).json({
        error: "Image not found",
      });
    }
    const readStream = await galleryImagesBucket.openDownloadStream(
      mongoose.Types.ObjectId(req.params.id)
    );
    readStream.pipe(res);

    readStream.on("error", (err) => {
      res.status(400).json({ message: err.message || "No image found" });
    });
  } catch (error) {
    res.status(400).json({ message: error.message || "No image found" });
  }
});

export const deleteGalleryImage = asyncHandler(async (req, res) => {
  const galleryImage = await Gallery.findById(req.params.id);
  const { image } = galleryImage;

  if (!galleryImage) {
    return res.status(400).json({
      message: "No image found",
    });
  }

  await galleryImagesBucket.delete(mongoose.Types.ObjectId(image));

  await galleryImage.delete();

  res.json(galleryImage);
});
