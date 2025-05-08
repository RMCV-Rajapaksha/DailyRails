import axios from "axios";

// Get API URL from environment variables
const API_URL = process.env.API_URL || "http://10.0.2.2:4000/api";

const AuthService = {
  register: async (userData) => {
    try {
      // Changed from /user/register to /users/register to match your backend route
      const response = await axios.post(`${API_URL}/user/register`, userData);
      console.log("Registration response:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
      throw (
        error.response?.data || {
          success: false,
          message: "Network error during registration",
        }
      );
    }
  },

  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/user/login`, credentials);
      console.log("Login response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      throw (
        error.response?.data || {
          success: false,
          message: "Network error during login",
        }
      );
    }
  },
};

export default AuthService;
