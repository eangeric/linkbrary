import mongoose from "mongoose";
import Link from "./linkSchema.js";

const shelfSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

shelfSchema.methods.getLinks = async function () {
  return await Link.find({ shelfID: this._id }).sort({ position: 1 });
};

const Shelf = mongoose.model("Shelf", shelfSchema);

export default Shelf;
