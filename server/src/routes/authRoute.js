import express from "express";
import {
  checkUser,
  loginUser,
  signinUser,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", signinUser);
authRouter.post("/login", loginUser);
authRouter.get("/me", checkUser);

export default authRouter;
