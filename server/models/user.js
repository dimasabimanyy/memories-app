import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  works: {
    type: [String],
  },
  readingList: {
    type: [String],
  },
  location: {
    type: String,
  },
  myWebsite: {
    type: String,
  },
});

export default mongoose.model("User", userSchema);
