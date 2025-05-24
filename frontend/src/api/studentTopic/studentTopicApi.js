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

const enterTopic = async (data) => {
    try {
        const response = await apiService.put("student-topic/view-topic", data);
        return response.data;
    } catch (error) {
        console.error("Error occured while viewing topic",error.message);
        throw error.response?.data || error.message || "Error updating studentTopic isViewed status";
    }
}

const getStudentTopicIds = async (studentId) => {
    try {
        const response = await apiService.get("student-topic/get-student-topics", {
            params: { studentId }
        })
        return response.data;
    } catch (error) {
        console.error("Error occured while fetching studentTopic Ids", error.message);
    }
}

export const studentTopicApi = {
    fetchStudentTopicProgress,
    enterTopic,
    getStudentTopicIds
}