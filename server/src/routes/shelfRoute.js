import express from "express";
import {
  createShelf,
  deleteShelf,
  getShelves,
  updateShelf,
} from "../controllers/shelfController.js";

const shelfRouter = express.Router();

shelfRouter.get("/", getShelves);
shelfRouter.post("/", createShelf);
shelfRouter.patch("/:id", updateShelf);
shelfRouter.delete("/:id", deleteShelf);

export default shelfRouter;
