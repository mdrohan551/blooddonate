const mongoose = require("mongoose");

// Define Schema
const PostSchema = new mongoose.Schema(
  {
    post: String,
    image: String,
    UserID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    comments: [
      {
        userID: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

// Create Model
const PostModel = mongoose.model("post", PostSchema);

module.exports = PostModel;
