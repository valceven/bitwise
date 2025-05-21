import React, { useState, useEffect } from "react";
import { ArrowLeft, Users, CheckCircle, Award, Clock, AlertCircle } from "lucide-react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { studentTopicApi } from "../../../api/studentTopic/studentTopicApi";

// Sample student data by topic - In real implementation, this would be fetched from an API
const studentsData = {
  "1": [
    { id: 1, name: "Alice", points: 4000, profileImg: "/api/placeholder/40/40", completed: true, completedAt: "2 days ago" },
    { id: 2, name: "Bob", points: 2400, profileImg: "/api/placeholder/40/40", completed: false }
  ],
  "2": [
    { id: 3, name: "Charlie", points: 1680, profileImg: "/api/placeholder/40/40", completed: false }
  ],
  "3": [
    { id: 4, name: "David", points: 3200, profileImg: "/api/placeholder/40/40", completed: true, completedAt: "1 day ago" }
  ],
  "4": [
    { id: 5, name: "Emma", points: 2900, profileImg: "/api/placeholder/40/40", completed: false }
  ],
  "5": [
    { id: 6, name: "Frank", points: 1500, profileImg: "/api/placeholder/40/40", completed: true, completedAt: "3 days ago" }
  ],
  "6": [
    { id: 7, name: "Grace", points: 3800, profileImg: "/api/placeholder/40/40", completed: false }
  ],
  "7": [
    { id: 8, name: "Henry", points: 2100, profileImg: "/api/placeholder/40/40", completed: true, completedAt: "5 hours ago" }
  ],
  "8": [
    { id: 9, name: "Isabella", points: 4200, profileImg: "/api/placeholder/40/40", completed: false }
  ],
  "9": [
    { id: 10, name: "Jack", points: 3500, profileImg: "/api/placeholder/40/40", completed: true, completedAt: "1 week ago" }
  ]
};

// Define the topics data structure for reference
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

// Helper function to find topic by ID
const findTopicById = (topicId) => {
  for (const lessonTopics of Object.values(topicsData)) {
    const found = lessonTopics.find(t => t.id === topicId);
    if (found) return found;
  }
  return null;
};

const DashboardStudentReportTopics = ({ classroom }) => {
  const navigate = useNavigate();
  const { classCode, lessonId, topicId } = useParams();
  
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    const fetchTopicStudents = async () => {
      if (!classroom?.classroomId || !topicId) {
        return;
      }

      setIsLoading(true);
      setError(null);
      
      try {
        // Find the topic data
        const foundTopic = findTopicById(topicId);
        setTopic(foundTopic);
        
        // API call placeholder - Comment: This would be a real API call in production
        // const response = await studentTopicApi.fetchStudentsByTopic({
        //   classroomId: classroom.classroomId,
        //   topicId: parseInt(topicId)
        // });
        
        // Instead of actual API call, we'll use the mock data
        const mockStudents = studentsData[topicId] || [];
        
        // Simulate API delay
        setTimeout(() => {
          setStudents(mockStudents);
          setIsLoading(false);
        }, 500);
      } catch (err) {
        console.error("Error fetching students for topic:", err?.message);
        setError("Failed to fetch students for this topic");
        setIsLoading(false);
      }
    };

    fetchTopicStudents();
  }, [classroom, topicId]);

  const handleBack = () => {
    navigate(`/app/teacher/classroom/${classCode}/lesson/${lessonId}`, { replace: false });
  };

  // If there's an error, show an error message
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
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-darkpurple p-6">
          <div className="flex items-center">
            <button 
              onClick={handleBack}
              className="mr-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-white">{topic ? topic.name : `Topic ${topicId}`}</h2>
              <p className="text-white/80 mt-1">{students.length} students enrolled</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bluez"></div>
              <span className="ml-3 text-grayz">Loading student data...</span>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="bg-offwhite rounded-lg p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="flex flex-col items-center justify-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="p-2 rounded-full bg-blue-100 mb-2">
                      <Users size={20} className="text-bluez" />
                    </div>
                    <span className="text-2xl font-bold text-grayz">{students.length}</span>
                    <span className="text-xs text-gray-500">Enrolled</span>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="p-2 rounded-full bg-green-100 mb-2">
                      <CheckCircle size={20} className="text-greenz" />
                    </div>
                    <span className="text-2xl font-bold text-grayz">{students.filter(s => s.completed).length}</span>
                    <span className="text-xs text-gray-500">Completed</span>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="p-2 rounded-full bg-yellow-100 mb-2">
                      <Award size={20} className="text-yellowz" />
                    </div>
                    <span className="text-2xl font-bold text-grayz">
                      {students.length > 0 ? Math.max(...students.map(s => s.points)).toLocaleString() : 0}
                    </span>
                    <span className="text-xs text-gray-500">Highest Score</span>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="p-2 rounded-full bg-purple-100 mb-2">
                      <Clock size={20} className="text-darkpurple" />
                    </div>
                    <span className="text-2xl font-bold text-grayz">
                      {students.length > 0 
                        ? Math.round(students.reduce((acc, s) => acc + s.points, 0) / students.length).toLocaleString()
                        : 0}
                    </span>
                    <span className="text-xs text-gray-500">Avg. Score</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-offwhite">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-grayz uppercase tracking-wider">Student</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-grayz uppercase tracking-wider">Points</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-grayz uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-grayz uppercase tracking-wider">Completed</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {students.map((student) => (
                        <tr 
                          key={student.id} 
                          className="hover:bg-lightpurple/20 cursor-pointer transition"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full" src={student.profileImg} alt={student.name} />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-grayz">{student.name}</div>
                                <div className="text-xs text-gray-500">Student ID: {student.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-grayz">{student.points.toLocaleString()}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              student.completed 
                                ? 'bg-green-100 text-greenz' 
                                : 'bg-yellow-100 text-yellowz'
                            }`}>
                              {student.completed ? 'Completed' : 'In Progress'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {student.completed ? student.completedAt : 'Not yet'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {students.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-grayz text-lg">No students have enrolled in this topic yet.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardStudentReportTopics;