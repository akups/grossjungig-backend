/* We'll write the schema and register our model for the comments here */
const mongoose = require("mongoose");

// const { Schema } = mongoose;
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  imageUrl: String,
  title: {
    type: String,
  },
  _author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
