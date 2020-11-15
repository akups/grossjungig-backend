const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: String,
    type: {
      enum: ["link", "text"],
      type: String,
    },
    _author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    upvote_count: Number,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
