import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const { Schema, model } = mongoose;
const { hash, compare } = bcryptjs;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    registerNumber: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    // yearOfPassing: {
    //   type: Date,
    //   required: true,
    // },
    // graduationLevel:
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await hash(this.password, 10);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password);
};

const User = model("User", userSchema);

export default User;
