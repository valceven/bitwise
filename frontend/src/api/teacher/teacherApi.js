import apiService from "../apiService";

const createClassroom = async (classroomData) => {
  try {
    const response = await apiService.post("/classroom/createClassroom", classroomData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || "An unknown error occurred";
  }
};

const fetchClassroomList = async (id) => {
  try {
    const response = await apiService.get("/classroom/classroom", {
      params: { teacherID: id }
    });
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

const removeStudentFromClassroom = async (studentId, classroomID) => {
  try {
    const response = await apiService.delete(`/studentClassroom/remove-student-from-classroom`, 
      { params: { studentId, classroomID } }
    );
    console.log("Student removed successfully:", response);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || "An unknown error occurred";
  }
}

const updateClassroom = async (classroomData) => {
  try {
    console.log("Updating classroom with data:", classroomData);
    const response = await apiService.put("/classroom/update-classroom", classroomData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || "An unknown error occurred";
  }
};

const deleteClassroom = async (classroomId) => {
  try {
    const response = await apiService.delete(`/classroom/delete-classroom/`, {
      params: { classroomId }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || "An unknown error occurred";
  }
}

const archiveClassroom = async (data) => {
  try {
    const response = await apiService.put("/classroom/archive-classroom", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || "An unknown error occurred";
  }
}

const fetchScores = async (classCode) => {
  try {
    const response = await apiService.get("/studentClassroom/get-student-scores-by-classroom-code", {
      params: { classCode }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || "An unknown error occurred";
  }
}

const fetchRankingScores = async (classCode) => {
  try {

  } catch (error) {
    throw error.response?.data || error.message || "An unknown error occurred";
  }
}

export const teacherApi = {
  createClassroom,
  fetchClassroomList,
  fetchPendingStudents,
  acceptPendingStudent,
  rejectPendingStudent,
  removeStudentFromClassroom,
  updateClassroom,
  deleteClassroom,
  archiveClassroom,
  fetchScores
};
