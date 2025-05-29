import apiService from "../apiService";

const enterLesson = async (data) => {
    try {
        const response = await apiService.put("student-lesson/view-student-lesson", data)
        console.log(response)

        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response?.data || error.message || "An unknown error occurred";
    }
}

const fetchStudentLessons = async (studentId) => {
    try {
        const response = await apiService.get("lessons/get-lessons-by-student-classroom", {
             params: { studentId }
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response?.data || error.message || "An unknown error occurred";
    }
}

const completeLesson = async (data) => {
    try {
        const response = await apiService.put("student-lesson/complete-student-lesson", data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response?.data || error.message || "An unknow error occured";
    }
}


export const studentLessonApi = {
    enterLesson,
    fetchStudentLessons,
    completeLesson
}