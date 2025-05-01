import React from "react";
import { useUser } from "../../context/UserContext";
import 'react-toastify/dist/ReactToastify.css';
import DashboardClassroomStudent from "./DashboardClassroomStudent";
import DashboardClassroomTeacher from "./DashboardClassroomTeacher";


const DashboardClassroom = () => {
  const { user } = useUser();

  console.log(user);


  return (
    <>
      <div className="h-full flex flex-col items-center w-full space-y-6">
        {user.userType === 2 ? (
          <DashboardClassroomTeacher/>
        ) : ( <DashboardClassroomStudent/> )}
      </div>

    </>
  );
};

export default DashboardClassroom;
