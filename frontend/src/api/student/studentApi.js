import apiService from "../apiService";

const joinClassroom = async (data) => {
    try {
        const response = await apiService.post("students/join-classroom", data);
        return response.data; 
    } catch (error) {
        console.error(error);
        throw error.response?.data || error.message || "An unknown error occured";
    }
}

// const fetchClassroom;

export const studentApi = {
    joinClassroom
};