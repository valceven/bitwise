import apiService from "../apiService";

const createClassroom = async (classroomData) => {
  try {
    const response = await apiService.post("/createClassroom", classroomData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || "An unknown error occurred";
  }
};

// const fetchClassroomList;

export const teacherApi = {
  createClassroom,
};
