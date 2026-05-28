import axios from "axios";

export const baseURL = "http://127.0.0.1:8005/api";

const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
