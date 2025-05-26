import apiService from "../apiService";

const fetchRoadmapProgress = async (studentId) => {
  try {
    const response = await apiService.get("studentClassroom/get-student-progress-by-StudentClassroom-id", {
      params: { studentId }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || "An unknown error occurred";
  }
}

export const studentClassroomApi = {
  fetchRoadmapProgress,
};