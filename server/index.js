import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import postsRoutes from "./routes/posts.js";
import usersRoutes from "./routes/users.js";
import profileRoutes from "./routes/profile.js";

dotenv.config({ path: "./config/config.env" });
const app = express();

connectDB();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/user", usersRoutes);
app.use("/posts", postsRoutes);
app.use("/profile", profileRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
