import axios from "axios";

const path = import.meta.env.VITE_URL_API;

const api = axios.create({
  baseURL: path,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export default api;
