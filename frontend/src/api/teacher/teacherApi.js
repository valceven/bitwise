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
    const response = await apiService.get("/classroom/classroom", {
      params: { teacherID: id }
    });
    console.log("gikan sa repsponse fetch classroom", response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || "An unknown error occurred";
  }
};

const fetchPendingStudents = async (id) => {
  try {
    const response = await apiService.get("teacher", {
      params: {teacherId : id}
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || "An unknown error occurred";
  }
}

const acceptPendingStudent = async (data) => {
  try {
    const response = await apiService.post("teacher/accept-student", data);
    console.log(response.data);
  } catch (error) {
    throw error.response?.data || error.message || "An unknown error occured";
  }
}

const rejectPendingStudent = async (data) => {
  try {
    const response = await apiService.post("teacher/reject-student", data);
    console.log(response.data);
  } catch (error) {
    throw error.response?.data || error.message || "An unknown error occured";
  }
}

export const teacherApi = {
  createClassroom,
  fetchClassroomList,
  fetchPendingStudents,
  acceptPendingStudent,
  rejectPendingStudent
};
