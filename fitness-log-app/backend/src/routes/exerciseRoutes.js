import express from "express";
import * as exerciseController from "../controllers/exerciseController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/", authMiddleware, exerciseController.addExercise);
router.get(
  "/:workoutId",
  authMiddleware,
  exerciseController.getExercisesByWorkout
);
router.put("/:id", authMiddleware, exerciseController.updateExercise);
router.delete("/:id", authMiddleware, exerciseController.deleteExercise);
export default router;
