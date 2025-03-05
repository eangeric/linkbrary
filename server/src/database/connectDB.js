import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    if (connection) {
      console.log("MongoDB connected successfully");
    } else {
      throw new Error("Error in connection to mongoDB");
    }
  } catch (error) {
    console.log("Error in connection to mongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
