import asyncHandler from "express-async-handler";
import ForumPost from "../models/ForumPost.js";
import mongoose from "mongoose";
import Grid from "gridfs-stream";

export const createPost = asyncHandler(async (req, res, next) => {
  const { user, post } = req.body;
  const { title, desc } = post;
  const images = req.files.map((file) => file.id);
  const NewPost = await ForumPost.create({
    user,
    post: {
      title,
      images,
      desc,
    },
  });
  res.json(NewPost);
});

export const getAllPosts = asyncHandler(async (req, res, next) => {
  const ForumPostData = await ForumPost.find();

  if (!ForumPostData) {
    return res.status(400).json({
      error: "No posts found",
    });
  }

  res.json(ForumPostData);
});

let gfs, forumImagesBucket;
const conn = mongoose.connection;
conn.once("open", () => {
  forumImagesBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "forum_images",
  });
  gfs = Grid(conn.db, mongoose.mongo);
});

export const getPostImageById = asyncHandler(async (req, res) => {
  try {
    const readStream = forumImagesBucket.openDownloadStream(
      mongoose.Types.ObjectId(req.params.id)
    );
    readStream.pipe(res);
  } catch (error) {
    res.json({ error: "No image found" });
  }
});
