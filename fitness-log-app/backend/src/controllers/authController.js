import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = User.create(email, hashedPassword);
    res
      .status(201)
      .json({ message: "User registered successfully", userId: newUser.id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    res
      .status(200)
      .json({ message: "Login successful", token, userId: user.id });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
