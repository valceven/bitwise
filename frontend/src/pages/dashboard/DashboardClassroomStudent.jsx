import React, { useState, useEffect } from "react";
import JoinClass from "../../components/JoinClass";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { studentApi } from "../../api/student/studentApi";
import ClassroomView from "./ClassroomView";

const DashboardClassroomStudent = () => {
  const [classroom, setClassroom] = useState(null);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassroom = async () => {
      try {
        const response = await studentApi.fetchClassroom(user.userID);
        setClassroom(response);
      } catch (error) {
        console.error("Error fetching classroom:", error.message);
      }
    };

    fetchClassroom();
  }, [user, navigate]);

  return (
    <div className="w-full p-8 pb-0 h-full">
      {classroom ? (
        <div className="">
          <div className="border rounded-lg p-6 w-1/4">
            <h1 className="text-3xl font-bold mb-4">{classroom.className}</h1>
            <p className="text-gray-700 mb-6">
              Welcome to the Classroom {classroom.className}!
            </p>
          </div>

          <ClassroomView />
        </div>
      ) : (
        <JoinClass user={user} />
      )}
    </div>
  );
};

export default DashboardClassroomStudent;
