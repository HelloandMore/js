import express from "express";
import db from "../data/db.js";

const router = express.Router();

router.get("/", (req, res) => {
  const response = db.prepare("SELECT * FROM users").all();
  res.status(200).json(response);
});

export default router;
