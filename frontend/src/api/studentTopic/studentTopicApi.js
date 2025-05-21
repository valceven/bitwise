import apiService from "../apiService";

const fetchStudentTopicProgress = async (data) => {
    try {
        const response = await apiService.post("student-topic/get-topic-completion", data);
        return response.data;
    } catch (error) {
        console.error("Error occured while fetching student topic progress", error.message);
        throw error.response?.data || error.message || "Error fetching student progress";
    }
}

export const studentTopicApi = {
    fetchStudentTopicProgress
}