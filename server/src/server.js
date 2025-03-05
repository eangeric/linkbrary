// server packages
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./database/connectDB.js";

// route imports
import shelfRoute from "./routes/shelfRoute.js";
import linkRoute from "./routes/linkRoute.js";

// dotenv to use environment variables
dotenv.config();
// create express app
const app = express();
const port = process.env.PORT;

// connect to db
connectDB();

// middleware
// use express json parsing
app.use(express.json());
// cors to allow connection from frontend
app.use(cors({ origin: process.env.FRONTEND }));
// morgan to log api requests
app.use(morgan("dev"));

// routes
app.use("/api/shelf", shelfRoute);
app.use("/api/link", linkRoute);

app.listen(port, () => {
  console.log("Server sorted on port:", port);
});
