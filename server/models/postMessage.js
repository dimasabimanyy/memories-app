import mongoose from "mongoose";
import random from "mongoose-simple-random";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  story: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  creator: String,
  tags: [String],
  mainCharacters: {
    type: [String],
    required: true,
  },
  selectedFile: {
    type: String,
    required: true,
  },
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
  language: {
    type: String,
    required: true,
  },
});

postSchema.plugin(random);

const story = mongoose.model("story", postSchema);

export default story;
