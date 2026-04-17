import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://pet-adoption-platform-1-s9bq.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

export default api;
