import express from "express";
import { getProfile } from "../controllers/users.js";
import auth from "../middleware/auth.js";

const Router = express.Router();

Router.get("/:id", getProfile);

export default Router;
