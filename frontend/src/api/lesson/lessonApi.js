import apiService from "../apiService";

const fetchLessons = async (classroomId) => {
    console.log("Fetching lessons for classroom ID:", classroomId);
    try {
        const response = await apiService.get("lessons/get-lessons-by-classroom", {
            params: { classroomId: classroomId }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response?.data || error.message || "An unknown error occurred";
    }
}


export const lessonApi = {
    fetchLessons,
}