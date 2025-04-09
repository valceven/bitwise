import React from "react";
import { useState } from "react";
import Modal from "../../components/JoinClassModal.jsx"; // Adjust the import path as necessary

const DashboardHome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="h-screen flex items-center justify-center">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-bluez text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Join a Class
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Join a Class"
      >
        
      </Modal>
    </div>
  );
};

export default DashboardHome;
