import React, { useEffect, useState } from "react";
import { teacherApi } from "../../../api/teacher/teacherApi";
import { useUser } from "../../../context/UserContext";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Check, X, UserCheck, UserX, Clock, Search, AlertCircle, Users, RefreshCw, CheckSquare, SquareCheck, Filter, Bell } from "lucide-react";

const DashboardPending = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useUser();

  const fetchPending = async () => {
    try {
      setRefreshing(true);
      const response = await teacherApi.fetchPendingStudents(user.userID);
      
      // Transform the response data to match our component structure
      const transformedClassrooms = response.map(classroom => ({
        name: classroom.className,
        classCode: classroom.classCode,
        classroomId: classroom.classroomId,
        students: classroom.pendingStudents.map(student => ({
          name: student.name,
          email: student.email,
          studentId: student.studentId,
          request: student.requst,
          joinedAt: new Date().toISOString() // Using current date as placeholder if not available
        })),
        selectedStudents: []
      })).filter(classroom => classroom.students.length > 0); // Only show classrooms with pending students
      
      setClassrooms(transformedClassrooms);
    } catch (error) {
      console.error(error.response?.data || error.message || "An unknown error occurred");
      toast.error("Failed to fetch pending students");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPending();
    const intervalId = setInterval(fetchPending, 30000); // Reduced to every 30 seconds instead of every second
    return () => clearInterval(intervalId);
  }, [user.userID]);

  const toggleSelectAll = (classIndex, checked) => {
    setClassrooms((prev) =>
      prev.map((cls, i) => {
        if (i !== classIndex) return cls;
        const allIds = checked ? cls.students.map((_, idx) => idx) : [];
        return { ...cls, selectedStudents: allIds };
      })
    );
  };

  const toggleStudent = (classIndex, studentIndex) => {
    setClassrooms((prev) =>
      prev.map((cls, i) => {
        if (i !== classIndex) return cls;
        const alreadySelected = cls.selectedStudents.includes(studentIndex);
        const newSelected = alreadySelected
          ? cls.selectedStudents.filter((i) => i !== studentIndex)
          : [...cls.selectedStudents, studentIndex];
        return { ...cls, selectedStudents: newSelected };
      })
    );
  };

  const handleAccept = async (classIndex, studentIndex) => {
    try {
      const classroom = classrooms[classIndex];
      const student = classroom.students[studentIndex];

      const data = {
        status: true,
        studentId: student.studentId,
        classroomId: classroom.classroomId,
        classCode: classroom.classCode
      }; 

      await teacherApi.acceptPendingStudent(data);
      
      // Update the state to remove the accepted student
      setClassrooms(prev => 
        prev.map((cls, i) => {
          if (i !== classIndex) return cls;
          return {
            ...cls,
            students: cls.students.filter((_, sIdx) => sIdx !== studentIndex),
            selectedStudents: cls.selectedStudents
              .filter(id => id !== studentIndex)
              .map(id => id > studentIndex ? id - 1 : id)
          };
        }).filter(cls => cls.students.length > 0) // Remove empty classrooms
      );
      
      toast.success(`${student.name} was successfully added to ${classroom.name}`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error(error.response?.data || error.message || "An unknown error occurred");
      toast.error("Failed to accept student");
    }
  };

  const handleReject = async (classIndex, studentIndex) => {
    try {
      const classroom = classrooms[classIndex];
      const student = classroom.students[studentIndex];

      const data = {
        status: true,
        studentId: student.studentId,
        classroomId: classroom.classroomId,
        classCode: classroom.classCode
      };

      await teacherApi.rejectPendingStudent(data);
      
      // Update the state to remove the rejected student
      setClassrooms(prev => 
        prev.map((cls, i) => {
          if (i !== classIndex) return cls;
          return {
            ...cls,
            students: cls.students.filter((_, sIdx) => sIdx !== studentIndex),
            selectedStudents: cls.selectedStudents
              .filter(id => id !== studentIndex)
              .map(id => id > studentIndex ? id - 1 : id)
          };
        }).filter(cls => cls.students.length > 0) // Remove empty classrooms
      );
      
      toast.error(`${student.name}'s request was rejected`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error(error.response?.data || error.message || "An unknown error occurred");
      toast.error("Failed to reject student");
    }
  };

  const handleBulkAction = async (classIndex, action) => {
    const classroom = classrooms[classIndex];
    const selectedIndexes = [...classroom.selectedStudents].sort((a, b) => b - a); // Sort in descending order
    
    if (selectedIndexes.length === 0) {
      toast.info("Please select at least one student", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }
    
    try {
      for (const studentIndex of selectedIndexes) {
        if (action === 'accept') {
          await handleAccept(classIndex, studentIndex);
        } else if (action === 'reject') {
          await handleReject(classIndex, studentIndex);
        }
      }
      
      toast.success(`Bulk ${action} completed successfully`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error(error);
      toast.error(`Failed to complete bulk ${action}`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  // Filter students based on search term
  const filteredClassrooms = classrooms.map(classroom => ({
    ...classroom,
    students: classroom.students.filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toString().includes(searchTerm)
    )
  })).filter(classroom => classroom.students.length > 0);

  const totalPendingStudents = classrooms.reduce((total, classroom) => total + classroom.students.length, 0);

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="bg-darkpurple text-white p-6">
            <div className="flex items-center">
              <div className="p-3 bg-white/20 rounded-lg mr-4">
                <Bell size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Pending Requests</h1>
                <p className="text-white/80 mt-1">
                  Student requests waiting for your approval
                </p>
              </div>
              <button 
                onClick={() => {
                  setRefreshing(true);
                  fetchPending().then(() => setRefreshing(false));
                }}
                disabled={refreshing}
                className="ml-auto p-2 bg-white/20 rounded-lg hover:bg-white/30 transition flex items-center text-white"
                title="Refresh pending requests"
              >
                <RefreshCw size={20} className={refreshing ? "animate-spin" : ""} />
              </button>
            </div>
          </div>
          
          <div className="p-4 bg-offwhite border-b border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm flex items-center">
                <div className="p-3 rounded-full bg-blue-100 mr-3">
                  <Users size={20} className="text-bluez" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-grayz">{totalPendingStudents}</div>
                  <div className="text-sm text-gray-500">Total Pending</div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm flex items-center">
                <div className="p-3 rounded-full bg-purple-100 mr-3">
                  <Clock size={20} className="text-darkpurple" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-grayz">{classrooms.length}</div>
                  <div className="text-sm text-gray-500">Classrooms with Requests</div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm flex items-center">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search students..."
                    className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bluez text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
              <RefreshCw size={30} className="text-bluez animate-spin" />
            </div>
            <h2 className="text-xl font-medium text-grayz mb-2">Loading pending requests</h2>
            <p className="text-gray-500">Please wait while we fetch the latest requests...</p>
          </div>
        ) : filteredClassrooms.length > 0 ? (
          <div className="space-y-6">
            {filteredClassrooms.map((cls, classIndex) => {
              const isAllSelected = cls.selectedStudents.length === cls.students.length && cls.students.length > 0;
              const hasSelected = cls.selectedStudents.length > 0;
              
              return (
                <div key={classIndex} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4 border-b border-gray-200 bg-offwhite flex flex-wrap justify-between items-center">
                    <div className="flex items-center">
                      <h2 className="text-lg font-bold text-grayz">{cls.name}</h2>
                      <span className="ml-2 px-2 py-0.5 bg-blue-100 text-bluez text-xs rounded-full">
                        {cls.students.length} {cls.students.length === 1 ? 'request' : 'requests'}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">Code: {cls.classCode}</span>
                    </div>
                    
                    <div className="flex space-x-2 mt-2 sm:mt-0">
                      <button 
                        className={`px-3 py-1.5 rounded text-sm font-medium flex items-center ${
                          hasSelected 
                            ? 'bg-greenz text-white hover:bg-green-600' 
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                        onClick={() => handleBulkAction(classIndex, 'accept')}
                        disabled={!hasSelected}
                      >
                        <UserCheck size={16} className="mr-1.5" />
                        Accept Selected
                      </button>
                      <button 
                        className={`px-3 py-1.5 rounded text-sm font-medium flex items-center ${
                          hasSelected 
                            ? 'bg-redz text-white hover:bg-red-600' 
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                        onClick={() => handleBulkAction(classIndex, 'reject')}
                        disabled={!hasSelected}
                      >
                        <UserX size={16} className="mr-1.5" />
                        Reject Selected
                      </button>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="pl-6 py-3 text-left text-xs font-medium text-grayz uppercase tracking-wider">
                            <div className="flex items-center h-5">
                              <input
                                type="checkbox"
                                className="h-4 w-4 text-bluez border-gray-300 rounded focus:ring-bluez focus:ring-offset-0"
                                checked={isAllSelected}
                                onChange={(e) => toggleSelectAll(classIndex, e.target.checked)}
                              />
                            </div>
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-grayz uppercase tracking-wider">Student</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-grayz uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-grayz uppercase tracking-wider">Student ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-grayz uppercase tracking-wider">Request</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-grayz uppercase tracking-wider">Date Requested</th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-grayz uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {cls.students.map((student, studentIndex) => (
                          <tr
                            key={studentIndex}
                            className={`${
                              cls.selectedStudents.includes(studentIndex) ? 'bg-blue-50' : 
                              studentIndex % 2 === 0 ? 'bg-white' : 'bg-offwhite'
                            } hover:bg-blue-50/50 transition-colors`}
                          >
                            <td className="pl-6 py-4">
                              <div className="flex items-center h-5">
                                <input
                                  type="checkbox"
                                  className="h-4 w-4 text-bluez border-gray-300 rounded focus:ring-bluez focus:ring-offset-0"
                                  checked={cls.selectedStudents.includes(studentIndex)}
                                  onChange={() => toggleStudent(classIndex, studentIndex)}
                                />
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                  <div className="text-gray-500 font-medium text-lg">
                                    {student.name.charAt(0).toUpperCase()}
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-grayz">{student.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {student.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {student.studentId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                student.request === 'Join Classroom' ? 'bg-green-100 text-greenz' : 'bg-red-100 text-yellowz'
                              }`}>
                                {student.request}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(student.joinedAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <div className="flex items-center justify-center space-x-3">
                                <button
                                  onClick={() => handleAccept(classIndex, studentIndex)}
                                  className="p-1.5 text-greenz hover:bg-green-50 rounded-full transition"
                                  title="Accept"
                                >
                                  <Check size={18} className="stroke-2" />
                                </button>
                                <button
                                  onClick={() => handleReject(classIndex, studentIndex)}
                                  className="p-1.5 text-redz hover:bg-red-50 rounded-full transition"
                                  title="Reject"
                                >
                                  <X size={18} className="stroke-2" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            {searchTerm ? (
              <>
                <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                  <Search size={30} className="text-bluez" />
                </div>
                <h2 className="text-xl font-medium text-grayz mb-2">No matching students found</h2>
                <p className="text-gray-500">
                  No students match your search term "{searchTerm}". Try a different search.
                </p>
              </>
            ) : (
              <>
                <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
                  <Check size={30} className="text-greenz" />
                </div>
                <h2 className="text-xl font-medium text-grayz mb-2">No pending requests</h2>
                <p className="text-gray-500">
                  You're all caught up! There are no pending student requests at this time.
                </p>
              </>
            )}
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 px-4 py-2 bg-bluez text-white rounded-lg hover:bg-blue-700 transition"
            >
              {searchTerm ? "Clear Search" : "Refresh"}
            </button>
          </div>
        )}
      </div>
      
      <ToastContainer 
        toastClassName="border shadow-sm rounded-lg text-black" 
        bodyClassName="text-sm font-medium" 
        position="bottom-right"
        closeButton={false}
      />
    </div>
  );
};

export default DashboardPending;