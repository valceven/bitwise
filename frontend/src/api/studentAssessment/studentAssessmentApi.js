import apiService from "../apiService";

const enterAssessment = async (studentAssessmentId) => {
    try {
        const response = await apiService.put(
            "student-assessment/view-student-assessment",
            {},
            { params: { studentAssessmentId } }
        );
        return response.data;
    } catch (error) {
        console.error("Error occurred while entering assessment", error.message);
        throw error.response?.data || error.message || "Error entering studentAssessment";
    }
};


const getStudentAssessments = async (studentId) => {
    try {
        const response = await apiService.get("student-assessment/get-all-student-assessments", {
            params: { studentId }
        })
        return response.data;
    } catch (error) {
        console.error("Error occured while getting student assessments", error.message);
        throw error.response?.data || error.message || "Error getting studentAssessment";
    }
}

const finishAssessment = async (data) => {
    try {
        const response = await apiService.put("student-assessment/complete-student-assessment", data);
        return response.data;
    } catch (error) {
        console.error("Error occured while getting finishing assessments", error.message);
        throw error.response?.data || error.message || "Error finishing studentAssessment";
    }
}

const fetchStudentAssessmentsLeaderboard = async (data) => {
    try {
        const response = await apiService.post("student-assessment/get-student-assessment-by-classcode", data);
        return response.data;
    } catch (error) {
        console.error("Error occured while getting student assessments leaderboard", error.message);
        throw error.response?.data || error.message || "Error fetching student assessments leaderboard";
    }
}

export const studentAssessmentApi = {
    enterAssessment,
    getStudentAssessments,
    finishAssessment,
    fetchStudentAssessmentsLeaderboard
};