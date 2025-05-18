import apiService from "../apiService";

const joinClassroom = async (data) => {
    try {
        const response = await apiService.post("students/join-classroom", data);
        return response.data; 
    } catch (error) {
        console.error(error);
        throw error.response?.data || error.message || "An unknown error occured";
    }
}

const fetchClassroom = async (studentId) => {
    try {
        const response = await apiService.get("students/fetch-classroom", {
            params: { studentId: studentId }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.resonse?.data || error.message || "An unknown error occured";
    }
}

const checkPendingStatus = async (studentId) => {
    try {
        const response = await apiService.get("students/check-pending-status", {
            params: { studentId: studentId }
        })
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response?.data || error.message || "An uknown error occured"
    }
}

const cancelPendingRequest = async (pendingId) => {
    console.log(pendingId);
    try {
        const response = await apiService.delete("students/remove-pending-status", {
            params : { pendingId }
        })
        return response.data;
    } catch (error) {
        console.error("Failed to cancel pending request:", error);
        throw error.response?.data || error.message || "An uknown error occured"
    }
}

const submitLeaveRequest = async (data) => {
    try {
        console.log(data);
        const response = await apiService.post("classroom/submit-leave-request", data);
        console.log("Submit Leave Request:", response);
        return response.data;
    } catch (error) {
        console.error("Failed To send Leave Request: ", error);
        throw error.response?.data || error.message || "An unknown error occured";
    }
}

const leaveClassroom = async (studentId) => {
    try {
        const response = await apiService.delete("classroom/leave-classroom", {
            params: { studentId }
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Failed to leave classroom:", error);
        throw error.response?.data || error.message || "An unknown error occurred";
    }
}

// const fetchClassroom;

export const studentApi = {
    joinClassroom,
    fetchClassroom,
    checkPendingStatus,
    cancelPendingRequest,
    leaveClassroom,
    submitLeaveRequest
};