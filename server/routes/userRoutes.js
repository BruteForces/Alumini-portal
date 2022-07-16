import express from "express";
import { loginUser, registerUser } from "../controllers/userControllers.js";
import { registerAlumni } from "../controllers/alumniControllers.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/alumni-register", registerAlumni);

export default router;
