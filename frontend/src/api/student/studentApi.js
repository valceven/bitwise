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

const fetchClassroom = async (studentId) => {
    try {
        const response = await apiService.get("students/fetch-classroom", {
            params: { studentId: studentId }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.resonse?.data || error.message || "An unknown error occured";
    }
}

// const fetchClassroom;

export const studentApi = {
    joinClassroom,
    fetchClassroom
};