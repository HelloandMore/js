import Exercise from "../models/Exercise.js";
import Workout from "../models/Workout.js";
export const addExercise = async (req, res) => {
  try {
    const { workout_id, name, reps, sets, weight } = req.body;
    const workout = Workout.findById(workout_id);
    if (!workout || workout.user_id !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const newExercise = Exercise.create(workout_id, name, reps, sets, weight);
    res.status(201).json(newExercise);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding exercise", error: error.message });
  }
};
export const updateExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, reps, sets, weight } = req.body;
    const exercise = Exercise.findById(id);
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    const workout = Workout.findById(exercise.workout_id);
    if (workout.user_id !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const updatedExercise = Exercise.update(id, name, reps, sets, weight);
    res.status(200).json(updatedExercise);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating exercise", error: error.message });
  }
};
export const deleteExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const exercise = Exercise.findById(id);
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    const workout = Workout.findById(exercise.workout_id);
    if (workout.user_id !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    Exercise.delete(id);
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting exercise", error: error.message });
  }
};
export const getExercisesByWorkout = async (req, res) => {
  try {
    const { workoutId } = req.params;
    const workout = Workout.findById(workoutId);
    if (!workout || workout.user_id !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const exercises = Exercise.findByWorkoutId(workoutId);
    res.status(200).json(exercises);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving exercises", error: error.message });
  }
};
