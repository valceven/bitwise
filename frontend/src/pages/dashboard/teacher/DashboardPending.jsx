import React, { useEffect, useState } from "react";
import { teacherApi } from "../../../api/teacher/teacherApi";
import { studentApi } from "../../../api/student/studentApi";
import { useUser } from "../../../context/UserContext";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Check, X, UserCheck, UserX, Clock, Search, AlertCircle, Users, RefreshCw, CheckSquare, SquareCheck, Filter, Bell, LogOut, LogIn } from "lucide-react";

const DashboardPending = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("join"); // "join" or "leave"
  const { user } = useUser();
  useEffect(() => {
      document.title = "Pending Requests";
    }, []);

  const fetchPending = async () => {
    try {
      setRefreshing(true);
      const response = await teacherApi.fetchPendingStudents(user.userID);
      console.log("Teacher Pending:", response);
      
      const transformedClassrooms = response.map(classroom => {
        const joinStudents = classroom.pendingStudents.filter(student => student.request === 'Join Class');
        const leaveStudents = classroom.pendingStudents.filter(student => student.request === 'Leave Class' || student.request === 'Leave Classroom');
        
        return {
          name: classroom.className,
          classCode: classroom.classCode,
          classroomId: classroom.classroomId,
          students: classroom.pendingStudents.map(student => ({
            name: student.name,
            email: student.email,
            studentId: student.studentId,
            request: student.request,
            joinedAt: student.date
          })),
          joinRequests: joinStudents.map(student => ({
            name: student.name,
            email: student.email,
            studentId: student.studentId,
            request: student.request,
            joinedAt: new Date().toISOString()
          })),
          leaveRequests: leaveStudents.map(student => ({
            name: student.name,
            email: student.email,
            studentId: student.studentId,
            request: student.request,
            joinedAt: new Date().toISOString()
          })),
          selectedJoinStudents: [],
          selectedLeaveStudents: []
        };
      });
      
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

  const toggleSelectAll = (classIndex, checked, requestType) => {
    setClassrooms((prev) =>
      prev.map((cls, i) => {
        if (i !== classIndex) return cls;
        
        if (requestType === "join") {
          const allIds = checked ? Array.from({ length: cls.joinRequests.length }, (_, i) => i) : [];
          return { ...cls, selectedJoinStudents: allIds };
        } else {
          const allIds = checked ? Array.from({ length: cls.leaveRequests.length }, (_, i) => i) : [];
          return { ...cls, selectedLeaveStudents: allIds };
        }
      })
    );
  };

  const toggleStudent = (classIndex, studentIndex, requestType) => {
    setClassrooms((prev) =>
      prev.map((cls, i) => {
        if (i !== classIndex) return cls;
        
        if (requestType === "join") {
          const alreadySelected = cls.selectedJoinStudents.includes(studentIndex);
          const newSelected = alreadySelected
            ? cls.selectedJoinStudents.filter((i) => i !== studentIndex)
            : [...cls.selectedJoinStudents, studentIndex];
          return { ...cls, selectedJoinStudents: newSelected };
        } else {
          const alreadySelected = cls.selectedLeaveStudents.includes(studentIndex);
          const newSelected = alreadySelected
            ? cls.selectedLeaveStudents.filter((i) => i !== studentIndex)
            : [...cls.selectedLeaveStudents, studentIndex];
          return { ...cls, selectedLeaveStudents: newSelected };
        }
      })
    );
  };

  const handleAccept = async (classIndex, studentIndex, requestType) => {
    try {
      const classroom = classrooms[classIndex];
      const student = requestType === "join" 
        ? classroom.joinRequests[studentIndex] 
        : classroom.leaveRequests[studentIndex];

      const data = {
        status: true,
        studentId: student.studentId,
        classroomId: classroom.classroomId,
        classCode: classroom.classCode
      }; 

      if (requestType === "join") {
        try {
          await teacherApi.acceptPendingStudent(data);
        } catch (error) {
          console.error("Error acceptinig student", error.message);
        }
      } else {
        try {
          const response = await studentApi.leaveClassroom(data.studentId);
          console.log("Successfully left the classroom:", response);
        } catch (error) {
          console.error("Error leaving classroom: ", error.message);
        }
      }
      
      setClassrooms(prev => 
        prev.map((cls, i) => {
          if (i !== classIndex) return cls;
          
          if (requestType === "join") {
            return {
              ...cls,
              joinRequests: cls.joinRequests.filter((_, sIdx) => sIdx !== studentIndex),
              selectedJoinStudents: cls.selectedJoinStudents
                .filter(id => id !== studentIndex)
                .map(id => id > studentIndex ? id - 1 : id)
            };
          } else {
            return {
              ...cls,
              leaveRequests: cls.leaveRequests.filter((_, sIdx) => sIdx !== studentIndex),
              selectedLeaveStudents: cls.selectedLeaveStudents
                .filter(id => id !== studentIndex)
                .map(id => id > studentIndex ? id - 1 : id)
            };
          }
        })
      );
      
      const actionText = requestType === "join" ? "added to" : "removed from";
      toast.success(`${student.name} was successfully ${actionText} ${classroom.name}`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error(error.response?.data || error.message || "An unknown error occurred");
      toast.error(`Failed to ${activeTab === "join" ? "accept" : "remove"} student`);
    }
  };

  const handleReject = async (classIndex, studentIndex, requestType) => {
    try {
      const classroom = classrooms[classIndex];
      const student = requestType === "join" 
        ? classroom.joinRequests[studentIndex] 
        : classroom.leaveRequests[studentIndex];

      const data = {
        status: false,
        studentId: student.studentId,
        classroomId: classroom.classroomId,
        classCode: classroom.classCode
      };

      await teacherApi.rejectPendingStudent(data);
      
      setClassrooms(prev => 
        prev.map((cls, i) => {
          if (i !== classIndex) return cls;
          
          if (requestType === "join") {
            return {
              ...cls,
              joinRequests: cls.joinRequests.filter((_, sIdx) => sIdx !== studentIndex),
              selectedJoinStudents: cls.selectedJoinStudents
                .filter(id => id !== studentIndex)
                .map(id => id > studentIndex ? id - 1 : id)
            };
          } else {
            return {
              ...cls,
              leaveRequests: cls.leaveRequests.filter((_, sIdx) => sIdx !== studentIndex),
              selectedLeaveStudents: cls.selectedLeaveStudents
                .filter(id => id !== studentIndex)
                .map(id => id > studentIndex ? id - 1 : id)
            };
          }
        })
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

  const handleBulkAction = async (classIndex, action, requestType) => {
    const classroom = classrooms[classIndex];
    const selectedIndexes = requestType === "join" 
      ? [...classroom.selectedJoinStudents].sort((a, b) => b - a)
      : [...classroom.selectedLeaveStudents].sort((a, b) => b - a);
    
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
          await handleAccept(classIndex, studentIndex, requestType);
        } else if (action === 'reject') {
          await handleReject(classIndex, studentIndex, requestType);
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
  const filteredClassrooms = classrooms
    .map(classroom => ({
      ...classroom,
      joinRequests: classroom.joinRequests.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toString().includes(searchTerm)
      ),
      leaveRequests: classroom.leaveRequests.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toString().includes(searchTerm)
      )
    }))
    .filter(classroom => 
      (activeTab === "join" && classroom.joinRequests.length > 0) || 
      (activeTab === "leave" && classroom.leaveRequests.length > 0)
    );

  // Calculate totals correctly
  const totalJoinRequests = classrooms.reduce((total, classroom) => 
    total + classroom.joinRequests.length, 0);
    
  const totalLeaveRequests = classrooms.reduce((total, classroom) => 
    total + classroom.leaveRequests.length, 0);

  // Get classrooms with current tab's requests  
  const classroomsWithCurrentRequests = classrooms.filter(classroom => 
    activeTab === "join" 
      ? classroom.joinRequests.length > 0 
      : classroom.leaveRequests.length > 0
  );

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
          
          <div className="flex border-b border-gray-200">
            <button 
              className={`flex-1 py-3 px-4 text-center font-medium ${
                activeTab === "join" 
                ? "text-bluez border-b-2 border-bluez bg-blue-50/50" 
                : "text-gray-500 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("join")}
            >
              <div className="flex items-center justify-center">
                <LogIn size={18} className="mr-2" />
                Join Requests ({totalJoinRequests})
              </div>
            </button>
            <button 
              className={`flex-1 py-3 px-4 text-center font-medium ${
                activeTab === "leave" 
                ? "text-redz border-b-2 border-redz bg-red-50/50" 
                : "text-gray-500 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("leave")}
            >
              <div className="flex items-center justify-center">
                <LogOut size={18} className="mr-2" />
                Leave Requests ({totalLeaveRequests})
              </div>
            </button>
          </div>
          
          <div className="p-4 bg-offwhite border-b border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm flex items-center">
                <div className={`p-3 rounded-full ${activeTab === "join" ? "bg-blue-100" : "bg-red-100"} mr-3`}>
                  <Users size={20} className={activeTab === "join" ? "text-bluez" : "text-redz"} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-grayz">
                    {activeTab === "join" ? totalJoinRequests : totalLeaveRequests}
                  </div>
                  <div className="text-sm text-gray-500">
                    Total {activeTab === "join" ? "Join" : "Leave"} Requests
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm flex items-center">
                <div className="p-3 rounded-full bg-purple-100 mr-3">
                  <Clock size={20} className="text-darkpurple" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-grayz">{classroomsWithCurrentRequests.length}</div>
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
              const currentRequests = activeTab === "join" ? cls.joinRequests : cls.leaveRequests;
              const currentSelected = activeTab === "join" ? cls.selectedJoinStudents : cls.selectedLeaveStudents;
              const isAllSelected = currentSelected.length === currentRequests.length && currentRequests.length > 0;
              const hasSelected = currentSelected.length > 0;
              
              return (
                <div key={classIndex} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className={`p-4 border-b border-gray-200 ${
                    activeTab === "join" ? "bg-blue-50/50" : "bg-red-50/50"
                  } flex flex-wrap justify-between items-center`}>
                    <div className="flex items-center">
                      <h2 className="text-lg font-bold text-grayz">{cls.name}</h2>
                      <span className={`ml-2 px-2 py-0.5 ${
                        activeTab === "join" 
                        ? "bg-blue-100 text-bluez" 
                        : "bg-red-100 text-redz"
                      } text-xs rounded-full`}>
                        {currentRequests.length} {currentRequests.length === 1 ? 'request' : 'requests'}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">Code: {cls.classCode}</span>
                    </div>
                    
                    <div className="flex space-x-2 mt-2 sm:mt-0">
                      <button 
                        className={`px-3 py-1.5 rounded text-sm font-medium flex items-center ${
                          hasSelected 
                            ? activeTab === "join" 
                              ? 'bg-greenz text-white hover:bg-green-600' 
                              : 'bg-redz text-white hover:bg-red-600'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                        onClick={() => handleBulkAction(classIndex, 'accept', activeTab)}
                        disabled={!hasSelected}
                      >
                        {activeTab === "join" ? (
                          <><UserCheck size={16} className="mr-1.5" /> Accept Selected</>
                        ) : (
                          <><LogOut size={16} className="mr-1.5" /> Approve Removal</>
                        )}
                      </button>
                      <button 
                        className={`px-3 py-1.5 rounded text-sm font-medium flex items-center ${
                          hasSelected 
                            ? 'bg-gray-700 text-white hover:bg-gray-800' 
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                        onClick={() => handleBulkAction(classIndex, 'reject', activeTab)}
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
                                onChange={(e) => toggleSelectAll(classIndex, e.target.checked, activeTab)}
                              />
                            </div>
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-grayz uppercase tracking-wider">Student</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-grayz uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-grayz uppercase tracking-wider">Student ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-grayz uppercase tracking-wider">Date Requested</th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-grayz uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currentRequests.map((student, studentIndex) => (
                          <tr
                            key={studentIndex}
                            className={`${
                              currentSelected.includes(studentIndex) 
                                ? activeTab === "join" ? 'bg-blue-50' : 'bg-red-50'
                                : studentIndex % 2 === 0 ? 'bg-white' : 'bg-offwhite'
                            } hover:bg-blue-50/50 transition-colors`}
                          >
                            <td className="pl-6 py-4">
                              <div className="flex items-center h-5">
                                <input
                                  type="checkbox"
                                  className="h-4 w-4 text-bluez border-gray-300 rounded focus:ring-bluez focus:ring-offset-0"
                                  checked={currentSelected.includes(studentIndex)}
                                  onChange={() => toggleStudent(classIndex, studentIndex, activeTab)}
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(student.joinedAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <div className="flex items-center justify-center space-x-3">
                                <button
                                  onClick={() => handleAccept(classIndex, studentIndex, activeTab)}
                                  className={`p-1.5 ${
                                    activeTab === "join" 
                                      ? "text-greenz hover:bg-green-50" 
                                      : "text-redz hover:bg-red-50"
                                  } rounded-full transition`}
                                  title={activeTab === "join" ? "Accept" : "Approve Removal"}
                                >
                                  <Check size={18} className="stroke-2" />
                                </button>
                                <button
                                  onClick={() => handleReject(classIndex, studentIndex, activeTab)}
                                  className="p-1.5 text-gray-700 hover:bg-gray-100 rounded-full transition"
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
                <div className={`inline-block p-3 ${
                  activeTab === "join" ? "bg-blue-100" : "bg-red-100"
                } rounded-full mb-4`}>
                  {activeTab === "join" ? (
                    <LogIn size={30} className="text-bluez" />
                  ) : (
                    <LogOut size={30} className="text-redz" />
                  )}
                </div>
                <h2 className="text-xl font-medium text-grayz mb-2">
                  No pending {activeTab === "join" ? "join" : "leave"} requests
                </h2>
                <p className="text-gray-500">
                  You're all caught up! There are no pending {activeTab === "join" ? "join" : "leave"} requests at this time.
                </p>
              </>
            )}
            <button
              onClick={() => {
                setSearchTerm("");
                setRefreshing(true);
                fetchPending().then(() => setRefreshing(false));
              }}
              className={`mt-4 px-4 py-2 ${
                activeTab === "join" ? "bg-bluez hover:bg-blue-700" : "bg-redz hover:bg-red-700"
              } text-white rounded-lg transition`}
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