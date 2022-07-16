import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

dotenv.config();

async function connectDB(URI) {
  try {
    const connect = await mongoose.connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Connected to Database`.green.bgWhite.bold);
  } catch (err) {
    console.log(`Error ${err}`.red.bold);
    process.exit(1);
  }
}

export default connectDB;
