import mongoose from "mongoose";
import Grid from "gridfs-stream";
import asyncHandler from "express-async-handler";
import Gallery from "../models/Gallery.js";

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
  const { title, desc } = req.body;
  const galleryImage = await Gallery.create({
    image: image.id,
    title,
    desc,
  });

  if (!galleryImage) {
    return res.status(400).json({
      error: "Upload failed",
    });
  }

  res.json(galleryImage);
});

export const getAllImages = asyncHandler(async (req, res) => {
  const galleryImages = await Gallery.find();

  if (!galleryImages) {
    return res.status(400).json({
      error: "No images found",
    });
  }

  res.json(galleryImages);
});

export const getImageById = asyncHandler(async (req, res) => {
  try {
    const readStream = galleryImagesBucket.openDownloadStream(
      mongoose.Types.ObjectId(req.params.id)
    );
    readStream.pipe(res);
  } catch (error) {
    res.json({ error: "No image found" });
  }
});

export const deleteGalleryImage = asyncHandler(async (req, res) => {
  const galleryImage = await Gallery.findByIdAndDelete(req.params.id);

  if (!galleryImage) {
    return res.status(400).json({
      error: "No image found",
    });
  }

  //   await gfs.remove({ _id: galleryImage.image });

  res.json(galleryImage);
});
