import React, { useState, useEffect } from "react";
import JoinClass from "../../components/JoinClass";
import { useUser } from "../../context/UserContext";
import 'react-toastify/dist/ReactToastify.css';
import ClassroomView from "./ClassroomView";
import { useNavigate } from "react-router-dom";


const DashboardClassroomStudent = () => {
    const [studentClassroom, setStudentClassroom] = useState(null); 
    const { user } = useUser();
    const navigate = useNavigate();

  console.log(user);

  useEffect(() => {
    const fetchClassroom = async () => {
      try {
        
        const Classroom = { id: "abc123" }; // replace with API call
        setStudentClassroom(Classroom);

        navigate(`/classroom/${Classroom.id}`);
      } catch (error) {
        console.error("Error fetching classroom:", error.message);
      }
    };

    if (user?.student?.id) {
      fetchClassroom();
    }
  }, [user, navigate]);

  return (
    <>
      <div className="flex flex-col items-center w-full space-y-6">
        {!studentClassroom && <JoinClass user={user} />}

      </div>

    </>
  );
};

export default DashboardClassroomStudent;
