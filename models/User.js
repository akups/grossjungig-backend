const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["youth", "senior"],
    required: true,
  },
  timestamps: {
    type: Date,
    default: Date.now,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
