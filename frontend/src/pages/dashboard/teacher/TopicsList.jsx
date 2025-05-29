import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Book, Users, CheckCircle, Award, Clock, FileText, BarChart, Loader } from "lucide-react";
import { classroomApi } from "../../../api/classroom/classroomApi";
import { studentTopicApi } from "../../../api/studentTopic/studentTopicApi";

// Updated assessment data to include average score and completion data
const assessmentsData = {
  "1": { id: "1", name: "Assessment 1", topicId: "1", averageScore: 78, completionRate: 65 },
  "2": { id: "2", name: "Assessment 2", topicId: "2", averageScore: 82, completionRate: 70 },
  "3": { id: "3", name: "Assessment 3", topicId: "3", averageScore: 75, completionRate: 60 },
  "4": { id: "4", name: "Assessment 4", topicId: "4", averageScore: 88, completionRate: 85 },
  "5": { id: "5", name: "Assessment 5", topicId: "5", averageScore: 81, completionRate: 72 },
  "6": { id: "6", name: "Assessment 6", topicId: "6", averageScore: 79, completionRate: 68 },
  "7": { id: "7", name: "Assessment 7", topicId: "7", averageScore: 73, completionRate: 55 },
  "8": { id: "8", name: "Assessment 8", topicId: "8", averageScore: 85, completionRate: 80 },
  "9": { id: "9", name: "Assessment 9", topicId: "9", averageScore: 77, completionRate: 62 }
};

export const TopicsList = ({ topics, lessonId, onBack }) => {
    const { classCode } = useParams();
    const [classroom, setClassroom] = useState(null);
    const [topicProgressRates, setTopicProgressRates] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClassroomData = async () => {
            try {
                const response = await classroomApi.fetchClassroomByClassCode(classCode);
                setClassroom(response);
            } catch (err) {
                console.error("Error fetching classroom data:", err?.message);
                setError("Failed to fetch classroom data");
            }
        };

        fetchClassroomData();
    }, [classCode]);

    useEffect(() => {
        const fetchTopicProgressData = async () => {
            if (!classroom || !classroom.classroomId || !topics || topics.length === 0) {
                return;
            }
            
            try {
                const progressRates = {};
                
                // Use Promise.all to fetch progress for all topics in parallel
                await Promise.all(topics.map(async (topic) => {
                    try {
                        const data = {
                            classroomId: classroom.classroomId,
                            topicId: topic.id
                        };

                        const topicProgress = await studentTopicApi.fetchStudentTopicProgress(data);
                        console.log(`Topic ${topic.id} progress:`, topicProgress);
                        progressRates[topic.id] = topicProgress;
                    } catch (topicError) {
                        console.error(`Error fetching progress for topic ${topic.id}:`, topicError?.message);
                        progressRates[topic.id] = 0;
                    }
                }));
                
                setTopicProgressRates(progressRates);
            } catch (err) {
                console.error("Error fetching topic progress data:", err?.message);
                setError("Failed to fetch topic progress data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchTopicProgressData();
    }, [classroom, topics, lessonId]);

  
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
            <p className="text-white/80 mt-1">{topics.length} topics available with {topics.length} assessments</p>
          </div>
        </div>
      </div>
      
      <div className="p-8">
        {isLoading ? (
          <div className="flex justify-center items-center p-12">
            <Loader size={32} className="animate-spin text-bluez mr-2" />
            <span className="text-grayz text-lg">Loading topic progress data...</span>
          </div>
        ) : error ? (
          <div className="text-center p-6 text-redz">
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {topics.map((topic) => {
              const assessment = assessmentsData[topic.id] || null;
              const completionRate = topicProgressRates[topic.id] || 0;
              
              let cardColorClass = "border-l-greenz";
              if (topic.difficulty === "Medium") {
                cardColorClass = "border-l-yellowz";
              } else if (topic.difficulty === "Hard") {
                cardColorClass = "border-l-redz";
              }
              
              return (
                <div key={topic.id} className="mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Topic Card */}
                    <Link 
                      to={`/app/teacher/classroom/${classCode}/lesson/${lessonId}/topic/${topic.id}`}
                      className={`md:col-span-2 bg-white border border-gray-200 border-l-4 ${cardColorClass} rounded-lg shadow-sm hover:shadow-md transition cursor-pointer p-6 block`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-xl text-grayz">{topic.name}</h3>
                        <span className={`text-xs font-medium rounded-full px-3 py-1 ${
                          topic.difficulty === "Easy" ? "bg-green-100 text-greenz" :
                          topic.difficulty === "Medium" ? "bg-yellow-100 text-yellowz" : 
                          "bg-red-100 text-redz"
                        }`}>
                          {topic.difficulty}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Users size={18} className="mr-2 text-bluez" />
                        <span>
                          {classroom.students?.length || 0} Students
                        </span>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Completion</span>
                          <span className="font-medium text-grayz">{completionRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-bluez h-2 rounded-full" 
                            style={{ width: `${completionRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </Link>
                    
                    {/* Updated Assessment Card with progress tracker and average score */}
                    {assessment && (
                      <Link 
                        to={`/app/teacher/classroom/${classCode}/lesson/${lessonId}/assessment/${assessment.id}`}
                        className="bg-white border border-gray-200 border-l-4 border-l-purplez rounded-lg shadow-sm hover:shadow-md transition cursor-pointer p-6 block"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-semibold text-xl text-grayz">{assessment.name}</h3>
                          <div className="p-2 rounded-full bg-purple-100">
                            <FileText size={16} className="text-purplez" />
                          </div>
                        </div>

                        
                        {/* View Details button */}
                        <div className="mt-4 text-center">
                          <span className="inline-block text-sm font-medium text-purplez hover:text-purple-700">
                            View Assessment Details →
                          </span>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};