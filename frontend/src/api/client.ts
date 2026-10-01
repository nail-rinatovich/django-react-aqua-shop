import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000/api";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Заглушка под будущий JWT: если токен есть — подставляем.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Обработка 401 — на Спринте 2 добавим refresh.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO: refresh token / redirect to login
    return Promise.reject(error);
  }
);