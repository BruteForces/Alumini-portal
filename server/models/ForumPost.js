import mongoose from "mongoose";

const { Schema, model } = mongoose;

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    images: [
      {
        type: String,
        required: true,
      },
    ],
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        text: {
          type: String,
          required: true,
        },
        replies: [
          {
            user: {
              type: Schema.Types.ObjectId,
              ref: "User",
            },
            text: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
  },
});

const ForumPost = model("ForumPost", postSchema);

export default ForumPost;
