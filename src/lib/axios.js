import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api-berita-indonesia.vercel.app/",
});