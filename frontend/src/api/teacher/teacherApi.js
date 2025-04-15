import apiService from "../apiService";

const createClassroom = async (classroomData) => {
  try {
    const response = await apiService.post("/createClassroom", classroomData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || "An unknown error occurred";
  }
};

const fetchClassroomList = async (id) => {
  try {
    const response = await apiService.get("/classroom", {
      params: { id }
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || "An unknown error occurred";
  }
};

export const teacherApi = {
  createClassroom,
  fetchClassroomList
};
