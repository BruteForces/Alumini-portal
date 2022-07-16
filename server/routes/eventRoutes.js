import express from "express";
import {
  getEvents,
  getEventById,
  createEvent,
  deleteEvent,
  updateEvent,
} from "../controllers/eventControllers.js";
import { admin, protect } from "../middleware/authMiddlewares.js";

const router = express.Router();

router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/", protect, admin, createEvent);
router.patch("/:id", protect, admin, updateEvent);
router.delete("/:id", protect, admin, deleteEvent);

export default router;
