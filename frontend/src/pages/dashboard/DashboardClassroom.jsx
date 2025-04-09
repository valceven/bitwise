import React from "react";
import { useState } from "react";
import Modal from "../../components/JoinClassModal.jsx"; // Adjust the import path as necessary
import plus_join from "../../assets/plus-join.svg";

const DashboardClassroom = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

        <div className="border w-1/4 h-46 rounded-lg">
          <p className="text-sm font-semibold p-4">Boolean Algebra</p>
          <p>99 Jan 9999 </p>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Join a Class"
      ></Modal>
    </>
  );
};

export default DashboardClassroom;
