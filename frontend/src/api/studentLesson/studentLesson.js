import apiService from "../apiService";

const lessonViewed = async (data) => {
    try {
        const response = await apiService.put("student-lesson/view-student-lesson", data)
        console.log(response)

        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response?.data || error.message || "An unknown error occurred";
    }
}

const fetchStudentLessons = async (studentLesson) => {
    try {
        const response = await apiService.post("lessons/get-lessons-by-student-classroom", 
            studentLesson
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response?.data || error.message || "An unknown error occurred";
    }
}


export const studentLessonApi = {
    lessonViewed,
    fetchStudentLessons,
}