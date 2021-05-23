import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getSinglePost,
  getRandomPost,
  getMostLikedPosts,
  getPostsByGenre,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/most-liked", getMostLikedPosts);
router.get("/random", getRandomPost);
router.get("/stories/:genre", getPostsByGenre);
router.get("/:id", getSinglePost);

// Most liked

router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;
