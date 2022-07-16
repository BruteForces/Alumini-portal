import mongoose from "mongoose";

const { Schema, model } = mongoose;

const alumniSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isEntrepreneur: {
    type: Boolean,
    default: false,
  },
  isInHigherStudies: {
    type: Boolean,
    default: false,
  },
  designation: { type: String },
  companyName: { type: String },
  companyEmail: { type: String },
  organization: { type: String },
  secondaryCollegeName: { type: String },
  domain: { type: String },
  courseName: { type: String },
  social: {
    facebook: { type: String },
    twitter: { type: String },
    linkedin: { type: String },
    github: { type: String },
  },
  isOfficeBearer: {
    type: Boolean,
    default: false,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  approvedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  profileDescription: { type: String },
});

const Alumni = model("Alumni", alumniSchema);

export default Alumni;
