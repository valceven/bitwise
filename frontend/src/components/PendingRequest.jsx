import React from 'react';
import Star from '../assets/Star.svg';

const PendingClassRequest = ({ pendingRequest, onCancelRequest }) => {
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6">
      <div
        style={{ boxShadow: '4px 4px 0px #0b1e2d' }}
        className="relative bg-white rounded-2xl p-8 w-full max-w-md border-1"
      >
        <img
          src={Star}
          alt="Star"
          className="absolute top-[-20px] left-[-20px] w-16 h-16 sm:w-20 sm:h-20"
        />

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2 addgrotesk">Pending Class Request</h2>
          
          <div className="mb-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-yellow-700 font-medium mb-2">Waiting for Approval</p>
              <p className="text-gray-700 mb-4">Your request to join this class is waiting for teacher approval:</p>
              
              <div className="text-left bg-white p-4 rounded-lg border border-gray-200 mb-4">
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Class Name:</span>
                  <span className="ml-2">{pendingRequest.className}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Section:</span>
                  <span className="ml-2">{pendingRequest.section}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Teacher:</span>
                  <span className="ml-2">{pendingRequest.teacherName}</span>
                </div>
                <div className="mb-0">
                  <span className="font-medium text-gray-700">Class Code:</span>
                  <span className="ml-2">{pendingRequest.classCode}</span>
                </div>
              </div>
              
              <button
                onClick={onCancelRequest}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Cancel Request
              </button>
            </div>
            
            <p className="text-gray-600 italic">Your teacher will review your request soon. Please check back later.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingClassRequest;