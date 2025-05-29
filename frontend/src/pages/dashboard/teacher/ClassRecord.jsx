import React, { useState, useEffect } from "react";
import { ArrowLeft, User, Trash2, Search, UserPlus, Download, UserX, Filter, SortAsc, SortDesc } from "lucide-react";
import { CSVLink, CSVDownload } from "react-csv";
import { teacherApi } from "../../../api/teacher/teacherApi";
import { useParams } from "react-router-dom";

const ClassRecord = ({ classroom, onBack, onRemoveStudent }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("rank");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterActive, setFilterActive] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const { classCode } = useParams();
  const [rankingData, setRankingData] = useState([]);
  

  useEffect(() => {
    const loadScores = async () => {
      try {
        const data = await teacherApi.fetchScores(classCode);

        const header = ["Student Name", "Student Email"];
        for (let i = 1; i <= 9; i++) {
          header.push(`Assessment ${i}`);
        }

        const rows = data.scores.map((student) => [
          student.studentName,
          student.studentEmail,
          ...student.assessmentScores,
        ]);

        setCsvData([header, ...rows]);

      } catch (error) {
        console.error("An error occurred fetching scores: ", error.message);
      }
    };

    const loadRankingScores = async () => {
      try {
        const rankingScores = await teacherApi.fetchRankingScores(classCode);
        setRankingData(rankingScores);
      } catch (error) {
        console.error("An error occured fetching leaderboard scores: ", error.message);
      }
    }

    if (classCode) {
      loadScores();
      loadRankingScores();
    }
  }, [classCode]);

  // Use ranking data instead of classroom students
  const studentsWithStats = rankingData || [];
  
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  
  const getSortedStudents = () => {
    return [...studentsWithStats].sort((a, b) => {
      let comparison = 0;
      
      if (sortField === "studentName") {
        comparison = a.studentName?.localeCompare(b.studentName) || 0;
      } else if (sortField === "rank") {
        comparison = (a.rank || 0) - (b.rank || 0);
      } else if (sortField === "totalScore") {
        comparison = (a.totalScore || 0) - (b.totalScore || 0);
      }
      
      return sortDirection === "asc" ? comparison : -comparison;
    });
  };
  
  const filteredStudents = getSortedStudents().filter(student => 
    student.studentName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveClick = (student) => {
    if (window.confirm(`Are you sure you want to remove ${student.studentName} from this class?`)) {
      // You'll need to get the actual studentId from somewhere or modify this function
      // For now, using studentName as identifier
      onRemoveStudent(student.studentName, classroom.classroomId);
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <SortAsc size={14} className="text-gray-400" />;
    return sortDirection === "asc" ? 
      <SortAsc size={14} className="text-bluez" /> : 
      <SortDesc size={14} className="text-bluez" />;
  };

  // Get max score for progress bar scaling
  const maxScore = 900;

  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-darkpurple text-white p-6">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold">Class Record</h2>
            <div className="flex flex-wrap gap-4 mt-1">
              <p className="text-sm text-white/80">
                Class: <span className="font-medium text-white">{classroom?.className}</span>
              </p>
              <p className="text-sm text-white/80">
                Section: <span className="font-medium text-white">{classroom?.section}</span>
              </p>
              <p className="text-sm text-white/80">
                Code: <span className="font-medium text-white">{classroom?.classCode}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Class stats */}
      <div className="bg-offwhite p-6 border-b border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Total Students Card */}
          <div className="bg-white rounded-lg p-4 shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-blue-100 mr-3">
              <User size={20} className="text-bluez" />
            </div>
            <div>
              <div className="font-bold text-grayz">
                Total Students: {studentsWithStats.length}
              </div>
            </div>
          </div>

          <div className="bg-white hover:bg-lightpurple rounded-lg p-4 shadow-sm flex items-center cursor-pointer">
            <CSVLink data={csvData} target="_blank" className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 mr-3">
                <Download size={20} className="text-darkpurple" />
              </div>
              <div>
                <span className="text-darkpurple hover:text-purple-800 transition font-medium text-sm">
                  Export Student List
                </span>
              </div>
            </CSVLink>
          </div>

        </div>
      </div>

      {/* Search and filters */}
      <div className="p-6">
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="relative flex-1 min-w-[240px]">
            <input
              type="text"
              placeholder="Search students by name..."
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bluez"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
          </div>
          
          <button 
            className={`px-4 py-2 border rounded-lg flex items-center ${
              filterActive ? "bg-bluez text-white border-bluez" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => setFilterActive(!filterActive)}
          >
            <Filter size={18} className="mr-2" />
            Filters
          </button>
        
        </div>
        
        {/* Filter panel - can be expanded */}
        {filterActive && (
          <div className="mb-6 p-4 bg-offwhite rounded-lg border border-gray-200">
            <h3 className="font-medium text-grayz mb-3">Filter Options</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Score Range
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bluez">
                  <option value="">All Scores</option>
                  <option value="0-25">0-25 points</option>
                  <option value="26-50">26-50 points</option>
                  <option value="51-75">51-75 points</option>
                  <option value="76-100">76+ points</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rank Range
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bluez">
                  <option value="">All Ranks</option>
                  <option value="1-5">Top 5</option>
                  <option value="6-10">6-10</option>
                  <option value="11-20">11-20</option>
                  <option value="21+">21+</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Performance
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bluez">
                  <option value="">All Performance</option>
                  <option value="excellent">Excellent (Top 25%)</option>
                  <option value="good">Good (Top 50%)</option>
                  <option value="needs-improvement">Needs Improvement</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Student table */}
        <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-offwhite">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-grayz uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("rank")}
                  >
                    <div className="flex items-center">
                      Rank <SortIcon field="rank" />
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-grayz uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("studentName")}
                  >
                    <div className="flex items-center">
                      Student <SortIcon field="studentName" />
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-grayz uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("totalScore")}
                  >
                    <div className="flex items-center">
                      Total Score <SortIcon field="totalScore" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-grayz uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student, index) => (
                    <tr key={`${student.rank}-${student.studentName}`} className={index % 2 === 0 ? 'bg-white' : 'bg-offwhite'}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                            student.rank === 1 ? 'bg-yellow-500' :
                            student.rank === 2 ? 'bg-gray-400' :
                            student.rank === 3 ? 'bg-amber-600' :
                            'bg-bluez'
                          }`}>
                            {student.rank === 1 && '🥇'}
                            {student.rank === 2 && '🥈'}
                            {student.rank === 3 && '🥉'}
                            {student.rank > 3 && student.rank}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-grayz">#{student.rank}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-lightpurple flex items-center justify-center">
                            <User size={20} className="text-darkpurple" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-grayz">{student.studentName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="flex items-center text-sm mb-1">
                            <span className="font-bold text-grayz mr-2">{student.totalScore} pts</span>
                            <span className="text-xs text-gray-500">
                              ({maxScore > 0 ? Math.round((student.totalScore / maxScore) * 100) : 0}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                student.totalScore > maxScore * 0.75 ? 'bg-greenz' : 
                                student.totalScore > maxScore * 0.5 ? 'bg-yellowz' : 
                                student.totalScore > maxScore * 0.25 ? 'bg-orangez' : 'bg-redz'
                              }`}
                              style={{ 
                                width: maxScore > 0 ? `${Math.min((student.totalScore / maxScore) * 100, 100)}%` : '0%' 
                              }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => console.log("View student details:", student.studentName)}
                            className="p-1 text-bluez hover:bg-blue-50 rounded"
                            title="View details"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-clipboard-list">
                              <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                              <path d="M12 11h4"></path>
                              <path d="M12 16h4"></path>
                              <path d="M8 11h.01"></path>
                              <path d="M8 16h.01"></path>
                            </svg>
                          </button>
                          <button
                            onClick={() => handleRemoveClick(student)}
                            className="p-1 text-redz hover:bg-red-50 rounded"
                            title="Remove student"
                          >
                            <UserX size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center">
                      <div className="flex flex-col items-center">
                        <div className="p-3 bg-gray-100 rounded-full mb-3">
                          <Search size={24} className="text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium">
                          {searchTerm ? "No students found matching your search" : "No ranking data available yet"}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          {searchTerm ? "Try a different search term or clear the search" : "Students need to complete assessments to appear in rankings"}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Pagination and results count */}
        {filteredStudents.length > 0 && (
          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <div>
              Showing <span className="font-medium">{filteredStudents.length}</span> of <span className="font-medium">{studentsWithStats.length}</span> students
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50" disabled>
                Previous
              </button>
              <span className="px-3 py-1 bg-bluez text-white rounded">1</span>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50" disabled>
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassRecord;