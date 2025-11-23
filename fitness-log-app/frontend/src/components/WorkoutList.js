import React, { useEffect, useState } from "react";
import {
  getWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} from "../services/api";
const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    duration: "",
    notes: "",
  });
  useEffect(() => {
    fetchWorkouts();
  }, []);
  const fetchWorkouts = async () => {
    try {
      const data = await getWorkouts();
      setWorkouts(data);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateWorkout(editingId, formData);
      } else {
        await createWorkout(formData);
      }
      setFormData({
        date: new Date().toISOString().split("T")[0],
        duration: "",
        notes: "",
      });
      setShowForm(false);
      setEditingId(null);
      fetchWorkouts();
    } catch (error) {
      console.error("Error saving workout:", error);
    }
  };
  const handleEdit = (workout) => {
    setEditingId(workout.id);
    setFormData({
      date: workout.date,
      duration: workout.duration,
      notes: workout.notes,
    });
    setShowForm(true);
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this workout?")) {
      try {
        await deleteWorkout(id);
        fetchWorkouts();
      } catch (error) {
        console.error("Error deleting workout:", error);
      }
    }
  };
  return (
    <div>
      <h2>Your Workouts</h2>
      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditingId(null);
          setFormData({
            date: new Date().toISOString().split("T")[0],
            duration: "",
            notes: "",
          });
        }}
      >
        {showForm ? "Cancel" : "Add New Workout"}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Date:</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Duration (minutes):</label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Notes:</label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </div>
          <button type="submit">
            {editingId ? "Update" : "Create"} Workout
          </button>
        </form>
      )}
      <ul className="workout-list">
        {workouts.map((workout) => (
          <li key={workout.id}>
            <strong>Date:</strong> {new Date(workout.date).toLocaleDateString()}{" "}
            <br />
            <strong>Duration:</strong> {workout.duration} minutes <br />
            <strong>Notes:</strong> {workout.notes || "No notes"} <br />
            {workout.exercises && workout.exercises.length > 0 && (
              <div>
                <strong>Exercises:</strong>
                <ul>
                  {workout.exercises.map((ex) => (
                    <li key={ex.id}>
                      {ex.name} - {ex.sets} sets x {ex.reps} reps @ {ex.weight}{" "}
                      kg
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button onClick={() => handleEdit(workout)}>Edit</button>
            <button onClick={() => handleDelete(workout.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default WorkoutList;
