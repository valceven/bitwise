import apiService from "../apiService";

const fetchClassroomByClassCode = async (classCode) => {
    try {
        const response = await apiService.get("classroom/classroom-by-classcode", {
            params: { classCode: classCode }
        });
        return response.data;
    }   catch (error) {
        console.error("Error fetching classroom by class code:", error);
        throw error.response?.data || error.message || "An unknown error occurred";
    }
}

export const classroomApi = {
    fetchClassroomByClassCode,
};