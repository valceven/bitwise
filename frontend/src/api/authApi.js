import axios from 'axios';

// Define the login API function
export const login = async (credentials) => {
    const response = await axios.post('https://localhost:8000/login', credentials);
    return response.data; // Return the API response data
};


export const register = async (credentials) => {
    const response = await axios.post('https://localhost:8000/register', credentials);
    return response.data; // Return the API response data
};