import express from "express";
import {
  addLink,
  deleteLink,
  updateLink,
} from "../controllers/linkController.js";

const router = express.Router();

router.post("/", addLink);
router.put("/:id", updateLink);
router.delete("/:id", deleteLink);

export default router;
