import React, { useState, useEffect } from "react";
import { TopicsList } from "./TopicsList";
import { useNavigate, useParams, Link } from "react-router-dom";
import { studentTopicApi } from "../../../api/studentTopic/studentTopicApi";
import { classroomApi } from "../../../api/classroom/classroomApi";

// Define the topics data structure based on lessonId
const topicsData = {
  "1": [
    { id: "1", name: "Topic 1", difficulty: "Easy" },
    { id: "2", name: "Topic 2", difficulty: "Easy" },
    { id: "3", name: "Topic 3", difficulty: "Easy" }
  ],
  "2": [
    { id: "4", name: "Topic 4", difficulty: "Easy" },
    { id: "5", name: "Topic 5", difficulty: "Medium" },
    { id: "6", name: "Topic 6", difficulty: "Medium" }
  ],
  "3": [
    { id: "7", name: "Topic 7", difficulty: "Easy" }
  ],
  "4": [
    { id: "8", name: "Topic 8", difficulty: "Easy" },
    { id: "9", name: "Topic 9", difficulty: "Medium" }
  ]
};

const DashboardStudentReportLessons = () => {
  const navigate = useNavigate();
  const { classCode, lessonId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  const handleBackFromLesson = () => {
    navigate(`/app/teacher/classroom/${classCode}`, { replace: false });
  };

  if (error && !isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-red-500 mb-4">
            <AlertCircle size={48} className="mx-auto mb-2" />
            <h2 className="text-xl font-semibold">Error Loading Data</h2>
          </div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-bluez text-white rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <TopicsList
        topics={topicsData[lessonId] || []}
        lessonId={lessonId}
        onBack={handleBackFromLesson}
      />
    </div>
  );
};

export default DashboardStudentReportLessons;