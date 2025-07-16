import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chatify-project-backend.vercel.app/api/v1",
  withCredentials: true,
});