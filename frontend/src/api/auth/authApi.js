import apiService from '../apiService';

// Define the register function
const registerUser = async (userData) => {
  try {
    //console.log("User data in register function:", userData);
    await apiService.post('/users/register', userData);
    return { success: true };
  } catch (error) {
    const errorMessage = error.response?.data || error.message || "An unknown error occurred";
    console.error("Registration Error: ", errorMessage);
    throw error.response?.data || error.message || "An unknown error occurred";
  }
}

const verifyUser = async (userData) => {
  try {
    const response = await apiService.post(`/users/verify/`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || "An unknown error occurred";
  }
}

const loginUser = async (credentials) => {  
    try {
        console.log("Credentials in login function:", credentials);
        const response = await apiService.post('/users/login', credentials);
        return response.data;
    } catch (error) {
        throw error.response.data || error.message || "An unknown error occurred";
    }
}

const editUser = async (userId, userData) => {
  try {
    console.log("User data in edit function:", userData);
    const response = await apiService.patch(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || "An unknown error occurred";
  }
};

const refreshAccessToken = async (data) => {
  try {
    const response = await apiService.post('/users/refresh', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || "An unknown error occurred";
  }
};

const logoutUser = async (email) => {
  try {
    const response = await apiService.put('/users/logout', email);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || "An unknown error occurred";
  }
}

export const authApi = {
  registerUser,
  loginUser,
  refreshAccessToken,
  editUser,
  logoutUser,
  verifyUser
};