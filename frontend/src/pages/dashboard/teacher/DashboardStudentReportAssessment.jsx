import React, { useState, useEffect } from "react";
import { ArrowLeft, Users, CheckCircle, Award, Clock, AlertCircle, Medal, FileText, Star, Trophy } from "lucide-react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { studentAssessmentApi } from "../../../api/studentAssessment/studentAssessmentApi";

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
  const [sortField, setSortField] = useState("rank");
  const [sortDirection, setSortDirection] = useState("asc");
  const [stats, setStats] = useState({
    totalStudents: 0,
    completedCount: 0,
    avgScore: 0,
    highestScore: 0
  });
  
  useEffect(() => {
    const fetchAssessmentResults = async () => {
      setIsLoading(true);
      setError(null);

      const data = {
        classCode: classCode,
        assessmentId: assessmentId,
      };
      try {
        const response = await studentAssessmentApi.fetchStudentAssessmentsLeaderboard(data);
        
        setAssessment(response);

        if (response) {
        const processedResults = response.map((result, index) => ({
          ...result,
          id: result.id || index + 1,
          completedAt: result.isCompleted ? (result.completedAt || new Date().toISOString()) : null,
        }));
        
        // Use the actual response data instead of classroom data
        const totalStudents = processedResults.length;
        const completedResults = processedResults.filter(r => r.isCompleted);
        const completedCount = completedResults.length;
        const scores = completedResults.map(r => r.score).filter(score => typeof score === 'number');
        const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
        const highestScore = scores.length ? Math.max(...scores) : 0;
        
        setStats({
          totalStudents,
          completedCount,
          avgScore,
          highestScore
        });
        
        setResults(processedResults);
      } else {
        setResults([]);
        setStats({
          totalStudents: 0,
          completedCount: 0,
          avgScore: 0,
          highestScore: 0
        });
      }
        
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching assessment results:", err?.message);
        setError("Failed to fetch assessment results");
        setIsLoading(false);
      }
    };

    fetchAssessmentResults();
  }, [classroom, assessmentId, classCode]);

  const handleSort = (field) => {
    let newDirection = sortDirection;
    
    if (field === sortField) {
      newDirection = sortDirection === "asc" ? "desc" : "asc";
    } else {
      newDirection = field === "rank" ? "asc" : "desc";
    }
    
    setSortField(field);
    setSortDirection(newDirection);
    
    const newResults = [...results].sort((a, b) => {
      let aValue = a[field];
      let bValue = b[field];
      
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;
      
      if (field === "score" || field === "rank") {
        return newDirection === "asc" ? aValue - bValue : bValue - aValue;
      } else {
        aValue = String(aValue);
        bValue = String(bValue);
        return newDirection === "asc" 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
    });
    
    setResults(newResults);
  };

  const handleBack = () => {
    navigate(`/app/teacher/classroom/${classCode}/lesson/${lessonId}`, { replace: false });
  };

  const getScoreColor = (score) => {
    if (typeof score !== 'number') return "text-gray-600";
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getMedalIcon = (rank) => {
    if (rank === 1) return <Trophy size={18} className="text-yellow-500" />;
    if (rank === 2) return <Medal size={18} className="text-gray-400" />;
    if (rank === 3) return <Medal size={18} className="text-amber-600" />;
    return null;
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
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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
        <div className="bg-purple-600 p-6 shadow-md">
          <div className="flex items-center">
            <button 
              onClick={handleBack}
              className="mr-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {assessment ? assessment.name : `Assessment ${assessmentId}`}
              </h2>
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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              <span className="ml-3 text-gray-600">Loading assessment results...</span>
            </div>
          ) : (
            <>
              {/* Stats Dashboard */}
              <div className="mb-8">
                <div className="bg-gray-50 rounded-lg p-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
                  
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-3 rounded-full bg-blue-100 mr-4">
                      <Users size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <span className="block text-3xl font-bold text-gray-800 mb-1">
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
                      <span className="block text-3xl font-bold text-gray-800 mb-1">{stats.highestScore}%</span>
                      <span className="text-sm text-gray-500 uppercase tracking-wide">Highest Score</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-3 rounded-full bg-green-100 mr-4">
                      <Award size={24} className="text-green-600" />
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
              
              {/* Leaderboard/Results Table */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
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
                          <button 
                            onClick={() => handleSort("rank")}
                            className="flex items-center focus:outline-none hover:text-gray-700"
                          >
                            Rank
                            {sortField === "rank" && (
                              <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                            )}
                          </button>
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <button 
                            onClick={() => handleSort("studentName")}
                            className="flex items-center focus:outline-none hover:text-gray-700"
                          >
                            Student
                            {sortField === "studentName" && (
                              <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                            )}
                          </button>
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <button 
                            onClick={() => handleSort("score")}
                            className="flex items-center focus:outline-none hover:text-gray-700"
                          >
                            Score
                            {sortField === "score" && (
                              <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                            )}
                          </button>
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {results.map((result) => (
                        <tr 
                          key={result.id} 
                          className={`hover:bg-purple-50 cursor-pointer transition ${
                            result.rank <= 3 ? 
                              result.rank === 1 ? 'bg-yellow-50' : 
                              result.rank === 2 ? 'bg-gray-50' : 'bg-amber-50' 
                            : ''
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
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-800">{result.studentName}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-xl font-bold ${getScoreColor(result.score)}`}>
                              {result.isCompleted && typeof result.score === 'number' ? `${result.score}%` : '-'}
                            </div>
                            {result.isCompleted && typeof result.score === 'number' && result.score >= (assessment?.passingScore || 60) ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <CheckCircle size={12} className="mr-1" />
                                Passed
                              </span>
                            ) : result.isCompleted && typeof result.score === 'number' ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                <AlertCircle size={12} className="mr-1" />
                                Failed
                              </span>
                            ) : null}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {result.isCompleted ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <CheckCircle size={12} className="mr-1" />
                                Completed
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                <Clock size={12} className="mr-1" />
                                Pending
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {results.length === 0 && !isLoading && (
                  <div className="text-center py-12">
                    <div className="mx-auto w-16 h-16 mb-4 text-gray-300 flex justify-center">
                      <FileText size={64} />
                    </div>
                    <p className="text-gray-800 text-lg font-medium">No students have been assigned this assessment yet.</p>
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