import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://64.227.172.42:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;