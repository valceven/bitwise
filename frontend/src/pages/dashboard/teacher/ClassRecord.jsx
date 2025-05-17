import React, { useState } from "react";
import { ArrowLeft, User, Trash2, Search, UserPlus, Download, UserX, Filter, SortAsc, SortDesc } from "lucide-react";

const ClassRecord = ({ classroom, onBack, onRemoveStudent }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterActive, setFilterActive] = useState(false);
  
  // Assuming we have this data - you'll need to adapt this to your actual data structure
  const studentsWithStats = classroom?.students?.map(student => ({
    ...student,
    progress: Math.floor(Math.random() * 100), // Replace with actual progress data
    lastActive: new Date(Date.now() - Math.floor(Math.random() * 10) * 86400000).toLocaleDateString(), // Replace with actual last active data
  })) || [];
  
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
      
      if (sortField === "name") {
        comparison = a.name?.localeCompare(b.name) || 0;
      } else if (sortField === "email") {
        comparison = a.email?.localeCompare(b.email) || 0;
      } else if (sortField === "joinedAt") {
        const dateA = new Date(a.joinedAt || 0);
        const dateB = new Date(b.joinedAt || 0);
        comparison = dateA - dateB;
      } else if (sortField === "progress") {
        comparison = (a.progress || 0) - (b.progress || 0);
      }
      
      return sortDirection === "asc" ? comparison : -comparison;
    });
  };
  
  const filteredStudents = getSortedStudents().filter(student => 
    student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (student.studentIdNumber && student.studentIdNumber.toString().includes(searchTerm))
  );

  const handleRemoveClick = (student) => {
    if (window.confirm(`Are you sure you want to remove ${student.name} from this class?`)) {
      onRemoveStudent(student.studentId, classroom.classroomId);
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <SortAsc size={14} className="text-gray-400" />;
    return sortDirection === "asc" ? 
      <SortAsc size={14} className="text-bluez" /> : 
      <SortDesc size={14} className="text-bluez" />;
  };

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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-blue-100 mr-3">
              <User size={20} className="text-bluez" />
            </div>
            <div>
              <div className="text-2xl font-bold text-grayz">{studentsWithStats.length}</div>
              <div className="text-sm text-gray-500">Total Students</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-green-100 mr-3">
              <UserPlus size={20} className="text-greenz" />
            </div>
            <div>
              <div className="text-2xl font-bold text-grayz">
                {new Date(Math.max(...studentsWithStats.map(s => new Date(s.joinedAt || 0)))).toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-500">Latest Joined</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-purple-100 mr-3">
              <Download size={20} className="text-darkpurple" />
            </div>
            <div>
              <button className="text-darkpurple hover:text-purple-800 transition font-medium text-sm">
                Export Student List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and filters */}
      <div className="p-6">
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="relative flex-1 min-w-[240px]">
            <input
              type="text"
              placeholder="Search students by name, email or ID..."
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
          
          <button 
            className="px-4 py-2 bg-greenz text-white rounded-lg hover:bg-green-600 transition flex items-center"
            onClick={() => console.log("Add new student")}
          >
            <UserPlus size={18} className="mr-2" />
            Add Student
          </button>
        </div>
        
        {/* Filter panel - can be expanded */}
        {filterActive && (
          <div className="mb-6 p-4 bg-offwhite rounded-lg border border-gray-200">
            <h3 className="font-medium text-grayz mb-3">Filter Options</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Progress
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bluez">
                  <option value="">All Progress Levels</option>
                  <option value="0-25">0-25%</option>
                  <option value="26-50">26-50%</option>
                  <option value="51-75">51-75%</option>
                  <option value="76-100">76-100%</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Join Date
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bluez">
                  <option value="">All Time</option>
                  <option value="this-week">This Week</option>
                  <option value="this-month">This Month</option>
                  <option value="last-month">Last Month</option>
                  <option value="this-year">This Year</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Activity
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bluez">
                  <option value="">All Activity</option>
                  <option value="today">Active Today</option>
                  <option value="this-week">Active This Week</option>
                  <option value="inactive">Inactive (2 weeks)</option>
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
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center">
                      Student <SortIcon field="name" />
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-grayz uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("email")}
                  >
                    <div className="flex items-center">
                      Email <SortIcon field="email" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-grayz uppercase tracking-wider">
                    Student ID#
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-grayz uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("joinedAt")}
                  >
                    <div className="flex items-center">
                      Joined <SortIcon field="joinedAt" />
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-grayz uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("progress")}
                  >
                    <div className="flex items-center">
                      Progress <SortIcon field="progress" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-grayz uppercase tracking-wider">
                    Last Active
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-grayz uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student, index) => (
                    <tr key={student.id} className={index % 2 === 0 ? 'bg-white' : 'bg-offwhite'}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-lightpurple flex items-center justify-center">
                            {student.profileImg ? (
                              <img src={student.profileImg} alt={student.name} className="h-10 w-10 object-cover" />
                            ) : (
                              <User size={20} className="text-darkpurple" />
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-grayz">{student.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {student.studentIdNumber || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(student.joinedAt || Date.now()).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="flex items-center text-xs mb-1">
                            <span className="font-medium text-grayz">{student.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${
                                student.progress > 75 ? 'bg-greenz' : 
                                student.progress > 50 ? 'bg-yellowz' : 
                                student.progress > 25 ? 'bg-orangez' : 'bg-redz'
                              }`}
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {student.lastActive}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => console.log("View student details:", student.id)}
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
                    <td colSpan="7" className="px-6 py-8 text-center">
                      <div className="flex flex-col items-center">
                        <div className="p-3 bg-gray-100 rounded-full mb-3">
                          <Search size={24} className="text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium">
                          {searchTerm ? "No students found matching your search" : "No students in this class yet"}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          {searchTerm ? "Try a different search term or clear the search" : "Add students to get started"}
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