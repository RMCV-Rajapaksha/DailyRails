import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

const apiService = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const getErrorMessage = (error) => {
    //higer that 2xx
    if (error.response) {
        return error.response.data.message || "Server error";
    } else if (error.request) {
        return "No response from server";
    } else {
        return "Request failed";
    } 
};

apiService.interceptors.response.use(
    (response) => response.data,
    (error) => {
        
        const errorMessage = getErrorMessage(error);

        if (error.response && error.response.status === 403) {
            return Promise.reject("Session is expired, Please log in again");
        }

        console.error("API request failed:", errorMessage);
        return Promise.reject(errorMessage);
    }
);

export default apiService;