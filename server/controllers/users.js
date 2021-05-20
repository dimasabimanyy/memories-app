import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config({ path: "../config/config.env" });

const secret = "kxQZ7zgYQQWDdfoqjsRB";

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signUp = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword, username } =
    req.body;

  try {
    const existingUser = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingUser)
      return res.status(400).json({ message: "User already exist." });

    if (existingUsername)
      return res.status(400).json({ message: "Try pick another username" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      username,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getProfile = async (req, res) => {
  try {
    const { id } = req.params;

    // check if the logged in using email or google
    const user = await User.findById({ _id: id });

    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: "User not found." });
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const profile = req.body;

  // Check if the id is valid with mongoose
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No profile with id : ${id}`);

  const updatedProfile = await User.findByIdAndUpdate(
    id,
    { ...profile, id },
    { new: true }
  );

  res.json(updatedProfile);
};
