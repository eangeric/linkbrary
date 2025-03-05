import express from "express";
import {
  createShelf,
  deleteShelf,
  getShelves,
} from "../controllers/shelfController.js";

const router = express.Router();

router.get("/:id", getShelves);
router.post("/", createShelf);
router.delete("/:id", deleteShelf);

export default router;
