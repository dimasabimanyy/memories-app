import express from "express";
import { getProfile, updateProfile } from "../controllers/users.js";
import auth from "../middleware/auth.js";

const Router = express.Router();

Router.get("/:id", getProfile);
Router.patch("/:id/edit", auth, updateProfile);

export default Router;
