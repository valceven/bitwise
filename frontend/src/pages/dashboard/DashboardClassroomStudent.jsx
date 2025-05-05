import React, { useState, useEffect } from "react";
import JoinClass from "../../components/JoinClass";
import PendingClassRequest from "../../components/PendingRequest";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { studentApi } from "../../api/student/studentApi";
import ClassroomView from "./ClassroomView";


import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardClassroomStudent = () => {
  const [classroom, setClassroom] = useState(null);
  const [pendingRequest, setPendingRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const navigate = useNavigate();

  console.log(classroom);

  useEffect(() => {
    let intervalId;
    const fetchData = async () => {
      
      
      let hasClassroom = false;
      
      try {
        const classroomResponse = await studentApi.fetchClassroom(user.userID);
        if (classroomResponse) {
          setClassroom(classroomResponse);
          hasClassroom = true;
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error("Error fetching classroom:", error.message);
      }
      
      if (!hasClassroom) {
        try {
          const pendingResponse = await studentApi.checkPendingStatus(user.userID);
          if (pendingResponse != null) {
            setPendingRequest(pendingResponse);
          }else{
            setPendingRequest(null);
          }
        } catch (error) {
          console.error("Error checking pending status:", error.message);
          setPendingRequest(null);
        }
      }
      
      setIsLoading(false);
    };


    fetchData();

    intervalId = setInterval(fetchData, 2000);
    return () => clearInterval(intervalId); 
  }, [user, navigate]);

  

  const handleCancelRequest = async () => {
    try {
      await studentApi.cancelPendingRequest(pendingRequest.pendingId);
      setPendingRequest(null);
      
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
    <div className="w-full pb-0 h-full">
      {classroom ? (
        <ClassroomView classroom={classroom} user={user} />
      ) : pendingRequest ? (
        <PendingClassRequest 
          pendingRequest={pendingRequest} 
          onCancelRequest={handleCancelRequest} 
        />
      ) : (
        <JoinClass user={user} />
      )}
      <ToastContainer toastClassName="border shadow-none text-black" bodyClassName="text-xs font-medium" />
    </div>
  );
};

export default DashboardClassroomStudent;