import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ username, password: hashed });

    res.status(201).json(
        { message: "User registered successfully", user }
    );
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) 
        return res.status(404).json({ message: "User not found" }
    );

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) 
        return res.status(401).json({ message: "Invalid credentials" }
    );

    const token = jwt.sign(
        { id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" }
    );

    res.json(
        { message: "Login successful", token }
    );
  } catch (error) {
    res.status(400).json(
        { message: error.message }
    );
  }
};

export const profile = async (req, res) => {

  const user = await User.findById(req.user.id).select("-password");

  res.json(user);
};
