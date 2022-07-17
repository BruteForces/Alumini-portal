import asyncHandler from "express-async-handler";
import ForumPost from "../models/ForumPost.js";
import ForumPostLike from "../models/ForumPostLike.js";
import Comment from "../models/ForumComment.js";
import Reply from "../models/ForumCommentReply.js";
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
  await ForumPostLike.create({
    post: NewPost._id,
  });
  res.json({ user: NewPost.user, post: NewPost.post, likes: [] });
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

export const getAllPosts_V2 = asyncHandler(async (req, res) => {
  const { offset } = req.params;
  const pipeline = [];
  const ForumFeed = await ForumPost.aggregate([
    {
      $sort: { createdAt: -1 },
    },
    // {
    //   // $skip: Number(offset),
    // },
    {
      $limit: 5,
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $lookup: {
        from: "forumpostlikes",
        localField: "_id",
        foreignField: "post",
        as: "likes",
      },
    },
    {
      $lookup: {
        from: "forumcomments",
        localField: "_id",
        foreignField: "post",
        as: "comments",
      },
    },
  ]);

  if (!ForumFeed) {
    return res.status(400).json({
      error: "No posts found",
    });
  }

  res.json(ForumFeed);
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

export const createComment = asyncHandler(async (req, res, next) => {
  const { user } = req;
  const post = req.params.id;
  const { comment } = req.body;
  const NewComment = await Comment.create({
    user,
    post,
    text: comment,
  });

  if (!NewComment) {
    return res.status(400).json({
      error: "Can't create comment",
    });
  }

  res.json(NewComment);
});

export const createReply = asyncHandler(async (req, res, next) => {
  const { user } = req;
  const comment = req.params.id;
  const { reply } = req.body;
  const NewReply = await Reply.create({
    user,
    comment,
    reply,
  });

  if (!NewReply) {
    return res.status(400).json({
      error: "Can't create reply",
    });
  }
  res.json(NewReply);
});

export const likePost = asyncHandler(async (req, res) => {
  const { user } = req;
  const post = req.params.id;

  const likeToUpdate = await ForumPostLike.updateOne(
    {
      post,
    },
    {
      $push: {
        likes: {
          user,
        },
      },
    }
  );

  if (!likeToUpdate) {
    return res.status(400).json({
      error: "Can't like post",
    });
  }
  res.json(likeToUpdate);
});
