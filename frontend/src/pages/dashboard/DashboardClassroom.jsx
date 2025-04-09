import React, { useState } from "react";
import Modal from "../../components/JoinClassModal.jsx"; // Adjust the import path as necessary
import plus_join from "../../assets/plus-join.svg";

const DashboardClassroom = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const classrooms = [
    {
      id: 1,
      title: "Math 101",
      description: "Basic algebra and geometry fundamentals.",
    },
    {
      id: 2,
      title: "History of Art",
      description: "Explore art through the ages and major movements.",
    },
    {
      id: 3,
      title: "Computer Science",
      description: "Learn programming, data structures, and algorithms.",
    },
    {
      id: 4,
      title: "Biology",
      description: "Understand the science of living organisms.",
    },
  ];

  return (
    <>
      <div className="flex flex-col w-full space-y-6">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl font-bold">Classrooms</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-greenz2 text-white px-6 py-2 joinclass-shadow text-sm font-semibold flex items-center space-x-4"
          >
            <div>Join</div>
            <img src={plus_join} />
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {classrooms.map((classroom) => (
            <div
              key={classroom.id}
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Join a Class"
      />
    </>
  );
};

export default DashboardClassroom;
