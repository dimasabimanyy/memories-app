import mongoose from "mongoose";
import random from "mongoose-simple-random";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  bannerFile: String,
  description: String,
  genre: {
    type: String,
    required: true,
  },
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  id: {
    type: String,
  },
  language: String,
  rating: String,
});

postSchema.plugin(random);

const postMessage = mongoose.model("postMessage", postSchema);

export default postMessage;
