import asyncHandler from "express-async-handler";
import ForumPost from "../models/ForumPost.js";
import ForumPostLike from "../models/ForumPostLike.js";
import Comment from "../models/ForumComment.js";
import Reply from "../models/ForumCommentReply.js";
import mongoose from "mongoose";
import Grid from "gridfs-stream";

import ForumCommentReply from "../models/ForumCommentReply.js";
import Notification from "../models/Notification.js";
import notificationConstants from "../constants/notification-constants.js";

let gfs, forumImagesBucket;
const conn = mongoose.connection;
conn.once("open", () => {
  forumImagesBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "forum_images",
  });
  gfs = Grid(conn.db, mongoose.mongo);
});

export const createPost = asyncHandler(async (req, res, next) => {
  const { user } = req;
  const { post } = req.body;
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
  if (!NewPost) {
    return res.json({
      error: "Something went wrong. Please try again later.",
    });
  }

  await Notification.create({
    user: user._id,
    message: "Post has been created",
    type: notificationConstants.POST_CREATED,
    post: NewPost._id,
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
  const { offset = 0 } = req.query;
  const pipeline = [];
  const unwantedUserFields = [
    "user.password",
    "user.email",
    "user.createdAt",
    "user.updatedAt",
  ];
  const ForumFeed = await ForumPost.aggregate([
    {
      $sort: { createdAt: -1 },
    },
    {
      $skip: Number(offset),
    },
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
        pipeline: [
          {
            $unwind: "$likes",
          },
        ],
        as: "likes",
      },
    },
    {
      $lookup: {
        from: "forumcomments",
        let: { postId: "$_id" },
        localField: "_id",
        foreignField: "post",
        pipeline: [
          {
            $sort: {
              createdAt: -1,
            },
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
            $unwind: "$user",
          },
          {
            $unset: unwantedUserFields,
          },
          {
            $lookup: {
              from: "forumcommentreplies",
              let: { commentId: "$_id" },
              localField: "_id",
              foreignField: "comment",
              pipeline: [
                {
                  $sort: {
                    createdAt: -1,
                  },
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
                  $unset: unwantedUserFields,
                },
                {
                  $unwind: "$user",
                },
              ],
              as: "replies",
            },
          },
        ],
        as: "comments",
      },
    },
    {
      $unset: unwantedUserFields,
    },
    {
      $unwind: "$user",
    },
  ]);

  if (!ForumFeed) {
    return res.status(400).json({
      error: "No posts found",
    });
  }

  res.json(ForumFeed);
});

export const getPostImageById = asyncHandler(async (req, res) => {
  try {
    const readStream = forumImagesBucket.openDownloadStream(
      mongoose.Types.ObjectId(req.params.id)
    );

    readStream.pipe(res);

    readStream.on("error", () => {
      res.status(404).json({
        error: "File not found",
      });
    });
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

  const author = await ForumPost.findById(post);

  await Notification.create({
    message: `${user.name} commented on your post`,
    type: notificationConstants.COMMENT,
    user: author.id,
  });

  res.json({
    success: true,
    user: NewComment.user,
    comment: NewComment.text,
  });
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

  const { user: author, _id: commentId } = await Comment.findById(comment);

  await Notification.create({
    user: author._id,
    message: `${user.name} replied to your comment`,
    type: notificationConstants.REPLY,
    comment: commentId,
    commentedBy: user._id,
  });

  return res.json({
    success: true,
    user: NewReply.user,
    reply: NewReply.reply,
  });
});

export const likePost = asyncHandler(async (req, res) => {
  const { user } = req;
  const post = req.params.id;

  const { user: author } = await ForumPost.findById(post);

  const likeToUpdate = await ForumPostLike.updateOne(
    { post, "likes.user": { $ne: user } },
    { $push: { likes: { user } } }
  );

  if (!likeToUpdate.modifiedCount) {
    if (!likeToUpdate.acknowledged) {
      return res.status(400).json({
        error: "Can't like post",
      });
    }

    const unlikeToUpdate = await ForumPostLike.updateOne(
      { post, "likes.user": user },
      { $pull: { likes: { user } } }
    );

    if (!unlikeToUpdate.acknowledged) {
      return res.status(400).json({
        error: "Can't unlike post",
      });
    }

    return res.json({
      message: "Post Unliked",
      success: true,
    });
  } else {
    const existingNotification = await Notification.findOne({
      likedBy: user._id,
      type: notificationConstants.LIKE,
    });

    if (existingNotification) {
      return res.json({
        message: "Post Liked",
        success: true,
      });
    }

    if (author._id.toString() !== user._id.toString()) {
      const newNotification = await Notification.create({
        type: notificationConstants.LIKE,
        user: author,
        message: `${user.name} liked your post`,
        likedBy: user,
      });

      if (!newNotification) {
        return res.status(400).json({
          error: "Can't create notification",
        });
      }
    }
    return res.json({ message: "Post liked", success: true });
  }
});

export const unlikePost = asyncHandler(async (req, res) => {
  const { post } = req.params;
  const { user } = req;

  const postToUpdate = await ForumPostLike.updateOne(
    { post, "likes.user": { $ne: user } },
    { $push: { likes: { user } } }
  );

  if (!ForumPostLike) {
    return res.status(400).json({
      error: "Can't unlike post",
    });
  }
  res.json(postToUpdate);
});

export const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { post } = await ForumPost.findById(id);

  post.images.forEach(async (image) => {
    await forumImagesBucket.delete(mongoose.Types.ObjectId(image));
  });

  const postToDelete = await ForumPost.deleteOne({ _id: id });

  if (!postToDelete) {
    return res.status(400).json({
      error: "Can't delete post",
    });
  }

  res.json(postToDelete);
});

export const deleteComment = asyncHandler(async (req, res) => {
  const { id: commentId } = req.params;

  const commentToDelete = await Comment.deleteOne({ _id: commentId });

  if (!commentToDelete) {
    return res.status(400).json({
      error: "Can't delete comment",
    });
  }
  res.json(commentToDelete);
});

export const deleteReply = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const replyToBeDeleted = await ForumCommentReply.deleteOne({ _id: id });

  if (!replyToBeDeleted) {
    return res.status(400).json({
      error: "Can't delete reply",
    });
  }
  res.json(replyToBeDeleted);
});
