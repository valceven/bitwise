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
    <div>
      {classroom ? (
        <div>
          <h1>You have a classroom: {classroom.className}</h1>
          <ClassroomView />
        </div>
      ) : (
        <JoinClass user={user} />
      )}
    </div>
  );
};

export default DashboardClassroomStudent;
