import React, { useState, useEffect } from "react";
import { ArrowLeft, Book, Users, CheckCircle, Award, Clock } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

// Define the topics data structure based on lessonId
const topicsData = {
  "1": [
    { id: "1", name: "Topic 1", completionRate: 85, difficulty: "Easy" },
    { id: "2", name: "Topic 2", completionRate: 62, difficulty: "Easy" },
    { id: "3", name: "Topic 3", completionRate: 45, difficulty: "Easy" }
  ],
  "2": [
    { id: "4", name: "Topic 4", completionRate: 90, difficulty: "Easy" },
    { id: "5", name: "Topic 5", completionRate: 73, difficulty: "Medium" },
    { id: "6", name: "Topic 6", completionRate: 58, difficulty: "Medium" }
  ],
  "3": [
    { id: "7", name: "Topic 7", completionRate: 67, difficulty: "Easy" }
  ],
  "4": [
    { id: "8", name: "Topic 8", completionRate: 81, difficulty: "Easy" },
    { id: "9", name: "Topic 9", completionRate: 42, difficulty: "Medium" }
  ]
};

// Sample student data by topic
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

// TopicsList Component
const TopicsList = ({ topics, lessonId, onBack, onSelectTopic }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-bluez p-6">
        <div className="flex items-center">
          <button 
            onClick={onBack}
            className="mr-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-white">Lesson {lessonId}</h2>
            <p className="text-white/80 mt-1">{topics.length} topics available</p>
          </div>
        </div>
      </div>
      
      <div className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic) => {
            const students = studentsData[topic.id] || [];
            const completedCount = students.filter(s => s.completed).length;
            const completionPercentage = students.length > 0 
              ? Math.round((completedCount / students.length) * 100) 
              : 0;
              
            // Determine card color based on topic difficulty
            let cardColorClass = "border-l-greenz";
            if (topic.difficulty === "Medium") {
              cardColorClass = "border-l-yellowz";
            } else if (topic.difficulty === "Hard") {
              cardColorClass = "border-l-redz";
            }
            
            return (
              <div 
                key={topic.id}
                onClick={() => onSelectTopic(topic.id)}
                className={`bg-white border border-gray-200 border-l-4 ${cardColorClass} text-lg rounded-lg shadow-sm hover:shadow-md transition cursor-pointer p-12 gap-y-2`}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-2xl text-grayz">{topic.name}</h3>
                  <span className={`text-xs font-medium rounded-full px-4 py-1 ${
                    topic.difficulty === "Easy" ? "bg-green-100 text-greenz" :
                    topic.difficulty === "Medium" ? "bg-yellow-100 text-yellowz" : 
                    "bg-red-100 text-redz"
                  }`}>
                    {topic.difficulty}
                  </span>
                </div>
                
                <div className="flex items-center text-md text-gray-600 mb-3 p-2">
                  <Users size={24} className="mr-4 text-bluez" />
                  <span>{students.length} Students</span>
                </div>
                
                <div className="p-2 mx-2">
                  <div className="flex justify-between text-md mb-1 gap-x-4">
                    <span className="text-gray-600">Completion</span>
                    <span className="font-medium text-grayz">{completionPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-bluez h-2 rounded-full" 
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// StudentList Component
const StudentList = ({ topicId, students, onBack }) => {
  const topic = Object.values(topicsData)
    .flat()
    .find(t => t.id === topicId);
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-darkpurple p-6">
        <div className="flex items-center">
          <button 
            onClick={onBack}
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
                {students.map((student, index) => (
                  <tr 
                    key={student.id} 
                    className={index % 2 === 0 ? 'bg-white' : 'bg-offwhite'}
                    onClick={() => console.log(`View details for student ${student.id}`)}
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
      </div>
    </div>
  );
};

const DashboardStudentReportTopics = () => {
  const navigate = useNavigate();
  const { classCode, lessonId, topicId } = useParams();
  
  useEffect(() => {
    // Check if the current lessonId exists in our data
    if (lessonId && !topicsData[lessonId]) {
      console.error(`Lesson ${lessonId} not found in topicsData`);
    }
  }, [lessonId]);

  const handleBackFromLesson = () => {
    navigate(`/app/teacher/classroom/${classCode}`, { replace: false });
  };
  
  const handleTopicClick = (selectedTopicId) => {
    navigate(`/app/teacher/classroom/${classCode}/lesson/${lessonId}/topic/${selectedTopicId}`, { replace: false });
  };

  const handleBackFromTopic = () => {
    navigate(`/app/teacher/classroom/${classCode}/lesson/${lessonId}`, { replace: false });
  };

  // If we have a topicId, show the student list for that topic
  if (topicId) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <StudentList
          topicId={topicId}
          students={studentsData[topicId] || []}
          onBack={handleBackFromTopic}
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <TopicsList
        topics={topicsData[lessonId] || []}
        lessonId={lessonId}
        onBack={handleBackFromLesson}
        onSelectTopic={handleTopicClick}
      />
    </div>
  );
};

export default DashboardStudentReportTopics;