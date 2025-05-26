import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dailyrails.altero.dev/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;