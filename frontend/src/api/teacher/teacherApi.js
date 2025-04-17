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
    console.log("User ID used for fetch:", id);
    const response = await apiService.get("/classroom", {
      params: { teacherID: id }
    });
    console.log("gikan sa repsponse fetch classroom", response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || "An unknown error occurred";
  }
};

export const teacherApi = {
  createClassroom,
  fetchClassroomList
};
