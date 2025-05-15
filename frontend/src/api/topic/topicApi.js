import apiService from "../apiService";

const updateProgress = async (progressData) => {
    try {
        const response = await apiService.post("/complete-student-topic", progressData);
        console.log(response.data);
    } catch (error) {
        throw error.response?.data || error.message || "An unknown error occurred";
    }
}

export const topicApi = {
    updateProgress,
};