import apiService from '../apiService';

// Define the register function
const registerUser = async (userData) => {
  try {
    console.log("User data in register function:", userData);
    const response = await apiService.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || error.message || "An unknown error occurred";
    console.error("Registration Error: ", errorMessage);
    throw error.response?.data || error.message || "An unknown error occurred";
  }
}

const loginUser = async (credentials) => {  
    try {
        const response = await apiService.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        throw error.response.data || error.message || "An unknown error occurred";
    }
}

export const authApi = {
    registerUser,
    loginUser,
};