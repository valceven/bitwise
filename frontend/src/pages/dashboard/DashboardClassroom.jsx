import React from "react";
import { useUser } from "../../context/UserContext";
import "react-toastify/dist/ReactToastify.css";
import TeacherClassroom from "./teacher/TeacherClassroom";
import StudentClassroom from "./student/StudentClassroom";
import { useEffect } from "react";

const DashboardClassroom = () => {
  const { user } = useUser();
  useEffect(() => {
    document.title = "Classroom";
  }, []);

  return (
    <>
      <div className="h-full flex flex-col items-center w-full space-y-6">
        {user.userType === 2 ? (
          <TeacherClassroom user={user} />
        ) : (
          <StudentClassroom user={user} />
        )}
        {console.log("user kay", user.userType)}
      </div>
    </>
  );
};

export default DashboardClassroom;
