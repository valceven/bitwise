import React, { useState, useEffect } from "react";
import JoinClass from "../../components/JoinClass";
import PendingClassRequest from "../../components/PendingRequest";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { studentApi } from "../../api/student/studentApi";
import ClassroomView from "./ClassroomView";

const DashboardClassroomStudent = () => {
  const [classroom, setClassroom] = useState(null);
  const [pendingRequest, setPendingRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      let hasClassroom = false;
      
      try {
        const classroomResponse = await studentApi.fetchClassroom(user.userID);
        if (classroomResponse) {
          setClassroom(classroomResponse);
          hasClassroom = true;
        }
      } catch (error) {
        console.error("Error fetching classroom:", error.message);
      }
      
      if (!hasClassroom) {
        try {
          const pendingResponse = await studentApi.checkPendingStatus(user.userID);
          if (pendingResponse != null) {
            setPendingRequest(pendingResponse);
          }
        } catch (error) {
          console.error("Error checking pending status:", error.message);
        }
      }
      
      setIsLoading(false);
    };

    fetchData();
  }, [user, navigate]);

  const handleCancelRequest = async () => {
    try {
      await studentApi.cancelPendingRequest(pendingRequest.pendingId);
      setPendingRequest(null);
      alert("Request cancelled successfully");
    } catch (error) {
      console.error('Error cancelling request:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full p-8 pb-0 h-full">
      {classroom ? (
<<<<<<< HEAD
        <ClassroomView classroom={classroom} />
      ) : pendingRequest ? (
        <PendingClassRequest 
          pendingRequest={pendingRequest} 
          onCancelRequest={handleCancelRequest} 
        />
=======
        <div className="">
          <div className="border rounded-lg p-6 w-1/4">
            <h1 className="text-3xl font-bold mb-4">{classroom.className}</h1>
            <p className="text-gray-700 mb-6">
              Welcome to the Classroom {classroom.className}!
            </p>
          </div>

          <ClassroomView />
        </div>
>>>>>>> 555fbb2406e3cbfa3dad44043b85f88517348a1d
      ) : (
        <JoinClass user={user} />
      )}
    </div>
  );
};

export default DashboardClassroomStudent;