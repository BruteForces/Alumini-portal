import dotenv from "dotenv";
import express from "express";
import config_db from "./config/dbconfig.js";
import userRouter from "./routes/userRoutes.js";
import eventRouter from "./routes/eventRoutes.js";
import alumniRouter from "./routes/alumniRoutes.js";
import forumRouter from "./routes/forumRoutes.js";
import galleryRouter from "./routes/galleryRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
config_db(process.env.URI);

const app = express();
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/alumni", alumniRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/forum", forumRouter);
app.use("/api/v1/gallery", galleryRouter);

if (process.env.NODE_ENV === "DEVELOPMENT") {
  console.log("Development mode".yellow);
  app.get("/", (req, res) => {
    res.send("ALUMNI PORTAL API");
  });
} else {
  console.log("Production mode".green);
  app.use(express.static(path.resolve(__dirname, "../build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../build/index.html"));
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT}`.black.bgGreen.bold
  );
});
