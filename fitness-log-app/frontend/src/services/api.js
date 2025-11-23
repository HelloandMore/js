import axios from "axios";
const API_URL = "http://localhost:5000/api";
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};
export const getWorkouts = async () => {
  const response = await axios.get(`${API_URL}/workouts`, {
    headers: getAuthHeader(),
  });
  return response.data;
};
export const getWorkoutById = async (workoutId) => {
  const response = await axios.get(`${API_URL}/workouts/${workoutId}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};
export const createWorkout = async (workoutData) => {
  const response = await axios.post(`${API_URL}/workouts`, workoutData, {
    headers: getAuthHeader(),
  });
  return response.data;
};
export const updateWorkout = async (workoutId, workoutData) => {
  const response = await axios.put(
    `${API_URL}/workouts/${workoutId}`,
    workoutData,
    {
      headers: getAuthHeader(),
    }
  );
  return response.data;
};
export const deleteWorkout = async (workoutId) => {
  const response = await axios.delete(`${API_URL}/workouts/${workoutId}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};
export const getStatistics = async () => {
  const response = await axios.get(`${API_URL}/workouts/statistics`, {
    headers: getAuthHeader(),
  });
  return response.data;
};
export const getExercises = async (workoutId) => {
  const response = await axios.get(`${API_URL}/exercises/${workoutId}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};
export const createExercise = async (exerciseData) => {
  const response = await axios.post(`${API_URL}/exercises`, exerciseData, {
    headers: getAuthHeader(),
  });
  return response.data;
};
export const updateExercise = async (exerciseId, exerciseData) => {
  const response = await axios.put(
    `${API_URL}/exercises/${exerciseId}`,
    exerciseData,
    {
      headers: getAuthHeader(),
    }
  );
  return response.data;
};
export const deleteExercise = async (exerciseId) => {
  const response = await axios.delete(`${API_URL}/exercises/${exerciseId}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};
