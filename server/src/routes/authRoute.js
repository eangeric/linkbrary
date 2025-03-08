import express from "express";
import {
  checkUser,
  loginUser,
  logoutUser,
  signUpUser,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", signUpUser);
authRouter.post("/login", loginUser);
authRouter.get("/me", checkUser);
authRouter.post("/logout", logoutUser);

export default authRouter;
