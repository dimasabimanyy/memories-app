import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.status(200).json({ data: posts });
  } catch (err) {
    res.status(404).json({ message: error.message });
  }
};

export const getRandomPost = async (req, res) => {
  try {
    await PostMessage.findOneRandom((err, result) => {
      if (!err) {
        res.status(200).json(result);
      }
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getMostLikedPosts = async (req, res) => {
  try {
    const posts = await PostMessage.find().sort({ likes: -1 }).limit(11);

    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getPostsByGenre = async (req, res) => {
  let { genre } = req.params;

  try {
    const posts = await PostMessage.find({ genre: genre }).limit(11);
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: "Story not found" });
  }
};

export const getSinglePost = async (req, res) => {
  const { id } = req.params;

  try {
    const postMessage = await PostMessage.findById({ _id: id });
    res.status(200).json(postMessage);
  } catch (err) {
    res.status(404).json({ message: "Post not found" });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  // Check if the id is valid with mongoose
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id : ${id}`);

  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { ...post, id },
    {
      new: true,
    }
  );

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id : ${id}`);

  await PostMessage.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id : ${id}`);

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    // Like the post
    post.likes.push(req.userId);
  } else {
    // dislike the post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.status(200).json(updatedPost);
};
