import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    shelf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shelf",
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String, default: "My saved link." },
    url: { type: String, required: true },
    position: { type: Number, required: true },
  },
  { timestamps: true }
);

const Link = mongoose.model("Link", linkSchema);

export default Link;
