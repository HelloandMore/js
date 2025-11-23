import Workout from "../models/Workout.js";
import Exercise from "../models/Exercise.js";
export const createWorkout = async (req, res) => {
  try {
    const { date, duration, notes, exercises } = req.body;
    const user_id = req.user.id;
    const newWorkout = Workout.create(user_id, date, duration, notes || "");
    if (exercises && exercises.length > 0) {
      exercises.forEach((ex) => {
        Exercise.create(newWorkout.id, ex.name, ex.reps, ex.sets, ex.weight);
      });
    }
    res.status(201).json(newWorkout);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating workout", error: error.message });
  }
};
export const getWorkouts = async (req, res) => {
  try {
    const user_id = req.user.id;
    const workouts = Workout.findByUserId(user_id);
    const workoutsWithExercises = workouts.map((workout) => ({
      ...workout,
      exercises: Exercise.findByWorkoutId(workout.id),
    }));
    res.status(200).json(workoutsWithExercises);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving workouts", error: error.message });
  }
};
export const getWorkoutById = async (req, res) => {
  try {
    const { id } = req.params;
    const workout = Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    if (workout.user_id !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const exercises = Exercise.findByWorkoutId(workout.id);
    res.status(200).json({ ...workout, exercises });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving workout", error: error.message });
  }
};
export const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, duration, notes } = req.body;
    const workout = Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    if (workout.user_id !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const updatedWorkout = Workout.update(id, date, duration, notes);
    res.status(200).json(updatedWorkout);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating workout", error: error.message });
  }
};
export const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const workout = Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    if (workout.user_id !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    Workout.delete(id);
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting workout", error: error.message });
  }
};
export const getStatistics = async (req, res) => {
  try {
    const user_id = req.user.id;
    const stats = Workout.getStatistics(user_id);
    res.status(200).json(stats);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving statistics", error: error.message });
  }
};
