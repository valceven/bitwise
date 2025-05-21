import React, { useState, useEffect } from "react";
import { ArrowLeft, Users, CheckCircle, Award, Clock, AlertCircle, Medal, FileText, Star, Trophy } from "lucide-react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { studentTopicApi } from "../../../api/studentTopic/studentTopicApi";

// Sample assessment results data - this would come from your API
const sampleAssessmentResults = {
  "1": [
    { id: 1, studentId: "STU-001", name: "Alice Johnson", score: 92, profileImg: "/api/placeholder/40/40", completedAt: "2024-05-15T14:30:00", timeSpent: "12m 45s" },
    { id: 2, studentId: "STU-002", name: "Bob Smith", score: 87, profileImg: "/api/placeholder/40/40", completedAt: "2024-05-15T15:20:00", timeSpent: "14m 22s" },
    { id: 3, studentId: "STU-003", name: "Charlie Davis", score: 95, profileImg: "/api/placeholder/40/40", completedAt: "2024-05-14T10:15:00", timeSpent: "11m 50s" },
    { id: 4, studentId: "STU-004", name: "Diana Martinez", score: 78, profileImg: "/api/placeholder/40/40", completedAt: "2024-05-16T09:45:00", timeSpent: "18m 12s" },
    { id: 5, studentId: "STU-005", name: "Ethan Brown", score: 84, profileImg: "/api/placeholder/40/40", completedAt: "2024-05-14T16:30:00", timeSpent: "15m 37s" },
    { id: 6, studentId: "STU-006", name: "Fiona White", score: 91, profileImg: "/api/placeholder/40/40", completedAt: "2024-05-15T11:20:00", timeSpent: "13m 15s" },
    { id: 7, studentId: "STU-007", name: "George Taylor", score: 73, profileImg: "/api/placeholder/40/40", completedAt: "2024-05-16T14:10:00", timeSpent: "19m 42s" },
    { id: 8, studentId: "STU-008", name: "Hannah Wilson", score: 88, profileImg: "/api/placeholder/40/40", completedAt: "2024-05-14T13:50:00", timeSpent: "14m 28s" },
  ],
  "2": [
    { id: 9, studentId: "STU-009", name: "Isaac Miller", score: 82, profileImg: "/api/placeholder/40/40", completedAt: "2024-05-15T10:05:00", timeSpent: "16m 33s" },
    { id: 10, studentId: "STU-010", name: "Julia García", score: 94, profileImg: "/api/placeholder/40/40", completedAt: "2024-05-14T14:25:00", timeSpent: "12m 19s" },
  ],
};


// Assessment metadata
const assessmentsInfo = {
  "1": { id: "1", name: "Assessment 1", topicId: "1", questions: 10, timeLimit: 15, passingScore: 70 },
  "2": { id: "2", name: "Assessment 2", topicId: "2", questions: 12, timeLimit: 20, passingScore: 75 },
  "3": { id: "3", name: "Assessment 3", topicId: "3", questions: 8, timeLimit: 12, passingScore: 70 },
  "4": { id: "4", name: "Assessment 4", topicId: "4", questions: 15, timeLimit: 25, passingScore: 80 },
  "5": { id: "5", name: "Assessment 5", topicId: "5", questions: 10, timeLimit: 30, passingScore: 75 },
  "6": { id: "6", name: "Assessment 6", topicId: "6", questions: 12, timeLimit: 20, passingScore: 75 },
  "7": { id: "7", name: "Assessment 7", topicId: "7", questions: 10, timeLimit: 15, passingScore: 70 },
  "8": { id: "8", name: "Assessment 8", topicId: "8", questions: 15, timeLimit: 20, passingScore: 80 },
  "9": { id: "9", name: "Assessment 9", topicId: "9", questions: 12, timeLimit: 25, passingScore: 75 }
};

// Format date string to display
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' });
  }
};

const DashboardStudentReportAssessment = ({ classroom }) => {
  const navigate = useNavigate();
  const { classCode, lessonId, assessmentId } = useParams();
  
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [assessment, setAssessment] = useState(null);
  const [sortField, setSortField] = useState("score");
  const [sortDirection, setSortDirection] = useState("desc");
  const [stats, setStats] = useState({
    totalStudents: 0,
    completedCount: 0,
    avgScore: 0,
    highestScore: 0
  });

  useEffect(() => {
    const fetchAssessmentResults = async () => {
      if (!classroom?.classroomId || !assessmentId) {
        return;
      }

      setIsLoading(true);
      setError(null);
      
      try {
        // Find assessment info
        const assessmentInfo = assessmentsInfo[assessmentId];
        setAssessment(assessmentInfo);
        
        // API call placeholder - This would be a real API call in production
        // const response = await studentAssessmentApi.fetchStudentResults({
        //   classroomId: classroom.classroomId,
        //   assessmentId: assessmentId
        // });
        
        // Instead of actual API call, we'll use the mock data
        const mockResults = sampleAssessmentResults[assessmentId] || [];
        
        // Calculate stats
        const totalStudents = classroom.students?.length || 0;
        const completedCount = mockResults.length;
        const scores = mockResults.map(r => r.score);
        const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
        const highestScore = scores.length ? Math.max(...scores) : 0;
        
        // Average time calculation (mock)
        // Removed average time calculation
        
        setStats({
          totalStudents,
          completedCount,
          avgScore,
          highestScore
        });
        
        // Sort results by score (default)
        const sortedResults = [...mockResults].sort((a, b) => b.score - a.score);
        
        // Add ranking
        const rankedResults = sortedResults.map((result, index) => ({
          ...result,
          rank: index + 1
        }));
        
        setResults(rankedResults);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching assessment results:", err?.message);
        setError("Failed to fetch assessment results");
        setIsLoading(false);
      }
    };

    fetchAssessmentResults();
  }, [classroom, assessmentId]);

  // Sort results based on current sort field and direction
  const handleSort = (field) => {
    if (field === sortField) {
      // Toggle direction if same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // New field, default to descending for score, ascending for others
      setSortField(field);
      setSortDirection(field === "score" ? "desc" : "asc");
    }
    
    // Sort the results
    const newResults = [...results].sort((a, b) => {
      if (field === "score" || field === "rank") {
        return sortDirection === "asc" ? a[field] - b[field] : b[field] - a[field];
      } else {
        return sortDirection === "asc" 
          ? a[field].localeCompare(b[field]) 
          : b[field].localeCompare(a[field]);
      }
    });
    
    setResults(newResults);
  };

  const handleBack = () => {
    navigate(`/app/teacher/classroom/${classCode}/lesson/${lessonId}`, { replace: false });
  };

  // Get score color based on value
  const getScoreColor = (score) => {
    if (score >= 90) return "text-greenz";
    if (score >= 80) return "text-bluez";
    if (score >= 70) return "text-yellowz";
    return "text-redz";
  };

  // Get medal for top 3 ranks
  const getMedalIcon = (rank) => {
    if (rank === 1) return <Trophy size={18} className="text-yellow-500" />;
    if (rank === 2) return <Medal size={18} className="text-gray-400" />;
    if (rank === 3) return <Medal size={18} className="text-amber-600" />;
    return null;
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
        <div className="bg-purplez bg-bluez p-6 shadow-md">
          <div className="flex items-center">
            <button 
              onClick={handleBack}
              className="mr-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-white">{assessment ? assessment.name : `Assessment ${assessmentId}`}</h2>
              <p className="text-white/80 mt-1 flex items-center">
                <FileText size={16} className="mr-2 text-white/70" />
                Student results and performance analysis
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purplez"></div>
              <span className="ml-3 text-grayz">Loading assessment results...</span>
            </div>
          ) : (
            <>
              {/* Stats Dashboard */}
              <div className="mb-8">
                <div className="bg-offwhite rounded-lg p-6 grid grid-cols-1 sm:grid-cols-4 gap-5">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-3 rounded-full bg-purple-100 mr-4">
                      <FileText size={24} className="text-purplez" />
                    </div>
                    <div>
                      <span className="block text-3xl font-bold text-grayz mb-1">{assessment?.questions || 0}</span>
                      <span className="text-sm text-gray-500 uppercase tracking-wide">Questions</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-3 rounded-full bg-blue-100 mr-4">
                      <Users size={24} className="text-bluez" />
                    </div>
                    <div>
                      <span className="block text-3xl font-bold text-grayz mb-1">
                        {stats.completedCount}/{stats.totalStudents}
                      </span>
                      <span className="text-sm text-gray-500 uppercase tracking-wide">Completion</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-3 rounded-full bg-yellow-100 mr-4">
                      <Trophy size={24} className="text-yellow-500" />
                    </div>
                    <div>
                      <span className="block text-3xl font-bold text-grayz mb-1">{stats.highestScore}%</span>
                      <span className="text-sm text-gray-500 uppercase tracking-wide">Highest Score</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-3 rounded-full bg-green-100 mr-4">
                      <Award size={24} className="text-greenz" />
                    </div>
                    <div>
                      <span className={`block text-3xl font-bold ${getScoreColor(stats.avgScore)} mb-1`}>
                        {stats.avgScore}%
                      </span>
                      <span className="text-sm text-gray-500 uppercase tracking-wide">Average Score</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Score Distribution (you could add a chart here later) */}
              
              {/* Leaderboard/Results Table */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-grayz flex items-center mb-4">
                  <Trophy size={22} className="mr-2 text-yellow-500" />
                  Student Rankings
                </h3>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                          Rank
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <button 
                            onClick={() => handleSort("name")}
                            className="flex items-center focus:outline-none"
                          >
                            Student
                            {sortField === "name" && (
                              <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                            )}
                          </button>
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <button 
                            onClick={() => handleSort("score")}
                            className="flex items-center focus:outline-none"
                          >
                            Score
                            {sortField === "score" && (
                              <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                            )}
                          </button>
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <button 
                            onClick={() => handleSort("timeSpent")}
                            className="flex items-center focus:outline-none"
                          >
                            Time Spent
                            {sortField === "timeSpent" && (
                              <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                            )}
                          </button>
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <button 
                            onClick={() => handleSort("completedAt")}
                            className="flex items-center focus:outline-none"
                          >
                            Completed
                            {sortField === "completedAt" && (
                              <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                            )}
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {results.map((result) => (
                        <tr 
                          key={result.id} 
                          className={`hover:bg-purple-50 cursor-pointer transition ${
                            result.rank <= 3 ? result.rank === 1 ? 'bg-yellow-50' : result.rank === 2 ? 'bg-gray-50' : 'bg-amber-50' : ''
                          }`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center justify-center">
                              {result.rank <= 3 ? (
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                                  result.rank === 1 ? 'bg-yellow-100' : 
                                  result.rank === 2 ? 'bg-gray-100' : 'bg-amber-100'
                                }`}>
                                  {getMedalIcon(result.rank)}
                                </div>
                              ) : (
                                <span className="text-sm font-semibold text-gray-500">#{result.rank}</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full" src={result.profileImg} alt={result.name} />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-grayz">{result.name}</div>
                                <div className="text-xs text-gray-500">ID: {result.studentId}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-xl font-bold ${getScoreColor(result.score)}`}>
                              {result.score}%
                            </div>
                            {result.score >= assessment?.passingScore ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <CheckCircle size={12} className="mr-1" />
                                Passed
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                <AlertCircle size={12} className="mr-1" />
                                Failed
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
                            {result.timeSpent}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {formatDate(result.completedAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {results.length === 0 && (
                  <div className="text-center py-12">
                    <div className="mx-auto w-16 h-16 mb-4 text-gray-300">
                      <FileText size={64} />
                    </div>
                    <p className="text-grayz text-lg font-medium">No students have completed this assessment yet.</p>
                    <p className="text-gray-500 mt-1">Results will appear here when students submit their work.</p>
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

export default DashboardStudentReportAssessment;