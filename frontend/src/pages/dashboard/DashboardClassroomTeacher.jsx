import React, { useState, useEffect } from "react";
import CreateClassModal from "../../components/modals/CreateClassModal";
import plus_join from "../../assets/plus-join.svg";
import { teacherApi } from "../../api/teacher/teacherApi";
import { FiCopy } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { Outlet, useParams } from "react-router-dom";


const DashboardClassroomTeacher = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classrooms, setClassrooms] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await teacherApi.fetchClassroomList(user.userID);
        setClassrooms(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching classrooms:", error.message);
      }
    };

    if (user.userID && user.userType === 2) {
      fetchClassrooms();
    }
    
  }, [user]);

  // Handle navigation to student report for the selected classroom
  const navigateToStudentReport = (classCode) => {
    navigate(`/app/classroom/${classCode}`);
  };

  if (id) {
    return <Outlet />;
  }

  return (
    <>
        <div className="w-9/10 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Classrooms</h1>
            <button
            onClick={() => setIsModalOpen(true)}
            className="bg-greenz2 text-white px-6 py-2 joinclass-shadow text-sm font-semibold flex items-center space-x-4"
            >
            <div>Create</div>
            <img src={plus_join} />
            </button>
        </div>

        {/* Classroom List */}
        <div className="flex flex-wrap justify-center gap-4">
            {classrooms.map((classroom) => (
            <div
              key={classroom.className}
              className="w-86 h-50 p-6 bg-white border border-black rounded-lg flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 ease-in-out"
            >
              <div>
                <div className="flex flex-row">
                  <div className="flex flex-col mb-3">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                      {classroom.className}
                    </h5>
                    <div className="flex flex-row space-x-2 items-center text-sm">
                      <p>
                        {new Date(classroom.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p>•</p>
                      <p>{classroom.section}</p>
                    </div>
                  </div>
            
                  <div className="flex items-top space-x-4 ml-auto z-50">
                    <span className="h-4 mt-2 text-xs font-mono text-gray-800">
                      {classroom.classCode}
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigator.clipboard.writeText(classroom.classCode);
                        toast.success("Class code copied!", {
                          position: "bottom-right",
                          autoClose: 1500,
                        });
                      }}
                      className="h-min p-1 hover:bg-gray-200 rounded transition"
                      title="Copy class code"
                    >
                      <FiCopy className="text-gray-600 w-5 h-5" />
                    </button>
                  </div>
                </div>
            
                <p className="mb-3 font-normal text-sm text-gray-700 line-clamp-5">
                  {classroom.description}
                </p>
              </div>
            
              {/* Analytics Button - Updated to navigate to student report */}
              <button
                onClick={() => navigateToStudentReport(classroom.classCode)}
                className="mt-2 text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 text-sm rounded shadow"
              >
                View Classroom
              </button>
            
              <ToastContainer toastClassName="border shadow-none text-black" bodyClassName="text-xs font-medium" />
            </div>
            ))}
        </div>

        <CreateClassModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create a Class"
          user={user}
        />
    </>
  );
};

export default DashboardClassroomTeacher;