import mongoose from "mongoose";

const { Schema, model } = mongoose;

const gallerySchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
});

const Gallery = model("Gallery", gallerySchema);

export default Gallery;
