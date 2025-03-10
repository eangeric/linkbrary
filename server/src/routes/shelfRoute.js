import express from "express";
import {
  createShelf,
  deleteShelf,
  getShelves,
} from "../controllers/shelfController.js";

const shelfRouter = express.Router();

shelfRouter.get("/", getShelves);
shelfRouter.post("/", createShelf);
shelfRouter.delete("/:id", deleteShelf);

export default shelfRouter;
