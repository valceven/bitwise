import React, { useState, useEffect } from "react";
import CreateClassModal from "../../components/modals/CreateClassModal";
import JoinClassModal from "../../components/modals/JoinClassModal";
import plus_join from "../../assets/plus-join.svg";
import { useUser } from "../../context/UserContext";
import { teacherApi } from "../../api/teacher/teacherApi";

const DashboardClassroom = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classrooms, setClassrooms] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await teacherApi.fetchClassroomList(user.userID);
        setClassrooms(response);
      } catch (error) {
        console.error("Error fetching classrooms:", error.message);
      }
    };

    if (user?.userID) fetchClassrooms();
  }, []);

  return (
    <>
      <div className="flex flex-col w-full space-y-6">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl font-bold">Classrooms</h1>

          {user.userType === 2 ? (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-greenz2 text-white px-6 py-2 joinclass-shadow text-sm font-semibold flex items-center space-x-4"
            >
              <div>Create</div>
              <img src={plus_join} />
            </button>
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-greenz2 text-white px-6 py-2 joinclass-shadow text-sm font-semibold flex items-center space-x-4"
            >
              <div>Join</div>
              <img src={plus_join} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {classrooms.map((classroom) => (
            <div
              key={classroom.className}
              className="max-w-sm p-6 bg-white border border-black rounded-lg flex flex-col justify-between"
            >
              <div>
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    {classroom.title}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700">
                  {classroom.description}
                </p>
              </div>
              <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 w-maxx"
              >
                View Classroom
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Conditionally render the appropriate modal based on user type */}
      {user.userType === 2 ? (
        <CreateClassModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create a Class"
          user={user}
        />
      ) : (
        <JoinClassModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Join a Class"
          user={user}
        />
      )}
    </>
  );
};

export default DashboardClassroom;