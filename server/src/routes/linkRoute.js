import express from "express";
import {
  addLink,
  deleteLink,
  updateLink,
} from "../controllers/linkController.js";

const linkRouter = express.Router();

linkRouter.post("/", addLink);
linkRouter.put("/:id", updateLink);
linkRouter.delete("/:id", deleteLink);

export default linkRouter;
