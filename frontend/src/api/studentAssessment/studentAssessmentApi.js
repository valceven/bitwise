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

export const studentAssessmentApi = {
    enterAssessment,
    getStudentAssessments
}