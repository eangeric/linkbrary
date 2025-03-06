// server packages
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import connectDB from "./database/connectDB.js";

// route imports

import shelfRouter from "./routes/shelfRoute.js";
import linkRouter from "./routes/linkRoute.js";
import authRouter from "./routes/authRoute.js";

// dotenv to use environment variables
dotenv.config();
// create express app
const app = express();
const port = process.env.PORT;

// connect to db
await connectDB();

// middleware
// use express json parsing
app.use(express.json());
// cors to allow connection from frontend
app.use(cors({ origin: process.env.FRONTEND }));
// morgan to log api requests
app.use(morgan("dev"));
// express session to handle session cookies
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 1000 * 60 * 60,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

// routes
app.use("/api/auth", authRouter);
app.use("/api/shelf", shelfRouter);
app.use("/api/link", linkRouter);

// TODO ADD SIGNUP + LOGIN +

app.listen(port, () => {
  console.log("Server sorted on port:", port);
});
