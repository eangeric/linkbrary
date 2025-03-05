import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    shelfID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shelf",
      required: true,
    },
    url: { type: String, required: true },
    position: { type: Number, required: true },
  },
  { timestamps: true }
);

const Link = mongoose.model("Link", linkSchema);

export default Link;
