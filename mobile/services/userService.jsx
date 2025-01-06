import axios from "axios";

const API_BASE_URL = "http://10.0.2.2:4000/api/user"; // Replace with your backend's base URL

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data; // Backend's success response
  } catch (error) {
    console.error("Registration failed:", error.response?.data || error.message);
    throw error.response?.data || { message: "Registration failed" };
  }
};


export const signInUser = async (credentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, credentials);
      return response.data; // Backend's success response
    } catch (error) {
      console.error("Sign-in failed:", error.response?.data || error.message);
      throw error.response?.data || { message: "Sign-in failed" };
    }
  };