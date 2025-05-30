import React, { useState, useEffect } from "react";
import CreateClassModal from "../../../components/modals/CreateClassModal";
import EditClassroomModal from "../../../components/modals/EditClassroomModal"; // Add this import
import { teacherApi } from "../../../api/teacher/teacherApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Outlet, useParams } from "react-router-dom";
import {
  PlusCircle,
  Copy,
  Users,
  Calendar,
  BookOpen,
  ClipboardList,
  BarChart4,
  Settings,
  Search,
  Clock,
  ExternalLink,
  Edit3,
  Archive,
  ArchiveRestore,
} from "lucide-react";

const TeacherClassroom = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Add this state
  const [selectedClassroom, setSelectedClassroom] = useState(null); // Add this state
  const [classrooms, setClassrooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("active");
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassrooms = async () => {
      setIsLoading(true);
      try {
        const response = await teacherApi.fetchClassroomList(user.userID);
        setClassrooms(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching classrooms:", error.message);
        toast.error("Failed to load classrooms");
      } finally {
        setIsLoading(false);
      }
    };

    if (user.userID && user.userType === 2) {
      fetchClassrooms();
    }
  }, [user]);

  // Handle navigation to student report for the selected classroom
  const navigateToStudentReport = (classCode) => {
    navigate(`/app/teacher/classroom/${classCode}`);
  };

  // Handle opening edit modal
  const handleEditClassroom = (e, classroom) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedClassroom(classroom);
    setIsEditModalOpen(true);
  };

  const handleArchiveClassroom = async (e, classroom) => {
    e.preventDefault();
    e.stopPropagation();

    const isCurrentlyArchived = classroom.isArchived;
    const action = isCurrentlyArchived ? "unarchive" : "archive";

    const data = {
      teacherId: user.userID,
      classroomId: classroom.classroomId,
    };

    try {
      await teacherApi.archiveClassroom(data);

      setClassrooms((prevClassrooms) =>
        prevClassrooms.map((c) =>
          c.classCode === classroom.classCode
            ? { ...c, isArchived: !isCurrentlyArchived }
            : c
        )
      );

      toast.success(`Classroom ${action}d successfully!`);
    } catch (error) {
      console.error(`Error ${action}ing classroom:`, error);
      toast.error(`Failed to ${action} classroom`);
    }
  };

  // Handle classroom update
  const handleClassroomUpdated = (updatedClassroom) => {
    setClassrooms((prevClassrooms) =>
      prevClassrooms.map((classroom) =>
        classroom.classCode === updatedClassroom.classCode
          ? updatedClassroom
          : classroom
      )
    );
  };

  // Handle classroom deletion
  const handleClassroomDeleted = (deletedClassCode) => {
    setClassrooms((prevClassrooms) =>
      prevClassrooms.filter(
        (classroom) => classroom.classCode !== deletedClassCode
      )
    );
  };

  // Filter classrooms based on search term and active tab
  const filteredClassrooms = classrooms
    .filter(
      (classroom) =>
        classroom.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
        classroom.description
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        classroom.section?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        classroom.classCode?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((classroom) => {
      if (activeTab === "active") return classroom.isArchived === false;
      if (activeTab === "recent") {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return new Date(classroom.createdAt) >= thirtyDaysAgo;
      }
      if (activeTab === "archived") {
        return classroom.isArchived === true;
      }
      return true;
    });

  const copyClassCode = (e, classCode) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(classCode);
    toast.success("Class code copied!", {
      position: "bottom-right",
      autoClose: 1500,
    });
  };

  // Function to get a random color for each classroom
  const getClassroomColor = (id) => {
    const colors = [
      "bg-bluez",
      "bg-darkpurple",
      "bg-greenz",
      "bg-orangez",
      "bg-cyanz",
    ];
    const textColors = [
      "text-bluez",
      "text-darkpurple",
      "text-greenz",
      "text-orangez",
      "text-cyanz",
    ];
    const index = id?.length
      ? id.charCodeAt(0) % colors.length
      : Math.floor(Math.random() * colors.length);
    return {
      bg: colors[index],
      text: textColors[index],
      lightBg: `bg-${colors[index].split("-")[1]}/10`,
    };
  };

  if (id) {
    return <Outlet />;
  }

  // Skeleton loader for classrooms
  const ClassroomSkeleton = () => (
    <div className="w-full md:w-80 h-64 bg-white border border-gray-200 rounded-xl shadow-sm p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="flex space-x-2 mb-4">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
      <div className="h-24 bg-gray-200 rounded mb-6"></div>
      <div className="flex justify-between items-center">
        <div className="h-5 bg-gray-200 rounded w-1/3"></div>
        <div className="h-10 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  );

  return (
    <div className="w-full p-6 bg-gray-50 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-grayz">My Classrooms</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-bluez text-white px-5 py-2.5 rounded-lg shadow-sm hover:bg-blue-700 transition flex items-center space-x-2"
            >
              <PlusCircle size={18} />
              <span>Create Class</span>
            </button>
          </div>

          {/* Search and filters */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex flex-wrap gap-4">
              <div className="relative flex-1 min-w-[240px]">
                <input
                  type="text"
                  placeholder="Search classrooms..."
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bluez"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
              </div>

              <div className="flex space-x-1 rounded-lg bg-offwhite p-1">
                <button
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === "active"
                      ? "bg-white shadow-sm"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("active")}
                >
                  Active
                </button>
                <button
                  className={`px-4 py-2 rounded-lg flex items-center ${
                    activeTab === "recent"
                      ? "bg-white shadow-sm"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("recent")}
                >
                  <Clock size={16} className="mr-1.5" />
                  Recent
                </button>
                <button
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === "archived"
                      ? "bg-white shadow-sm"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("archived")}
                >
                  Archived
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Classroom Stats */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 flex items-center">
            <div className="p-3 rounded-full bg-blue-100 mr-3">
              <BookOpen size={20} className="text-bluez" />
            </div>
            <div>
              <div className="text-2xl font-bold text-grayz">
                {classrooms.length}
              </div>
              <div className="text-sm text-gray-500">Total Classes</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 flex items-center">
            <div className="p-3 rounded-full bg-purple-100 mr-3">
              <Users size={20} className="text-darkpurple" />
            </div>
            <div>
              <div className="text-2xl font-bold text-grayz">
                {classrooms.reduce(
                  (sum, classroom) => sum + (classroom.students?.length || 0),
                  0
                )}
              </div>
              <div className="text-sm text-gray-500">Total Students</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 mr-3">
              <ClipboardList size={20} className="text-yellowz" />
            </div>
            <div>
              <div className="text-2xl font-bold text-grayz">
                {classrooms.length > 0
                  ? new Date(
                      Math.max(...classrooms.map((c) => new Date(c.createdAt)))
                    ).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })
                  : "-"}
              </div>
              <div className="text-sm text-gray-500">Last Created</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 flex items-center">
            <div className="p-3 rounded-full bg-green-100 mr-3">
              <BarChart4 size={20} className="text-greenz" />
            </div>
            <div>
              <div className="text-2xl font-bold text-grayz">85%</div>
              <div className="text-sm text-gray-500">Avg. Completion</div>
            </div>
          </div>
        </div>

        {/* Classroom List */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <ClassroomSkeleton key={index} />
            ))}
          </div>
        ) : filteredClassrooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClassrooms.map((classroom) => {
              const colorScheme = getClassroomColor(classroom.classCode);
              const studentCount = classroom.students?.length || 0;

              return (
                <div
                  key={classroom.classCode}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
                >
                  <div className={`h-2 ${colorScheme.bg}`}></div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl font-bold text-grayz line-clamp-1">
                          {classroom.className}
                        </h2>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar size={14} className="mr-1.5" />
                          <span>
                            {new Date(classroom.createdAt).toLocaleDateString(
                              undefined,
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                          <span className="mx-2">•</span>
                          <span>{classroom.section}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1">
                        <span className="bg-gray-100 text-grayz text-xs font-mono py-1 px-2 rounded">
                          {classroom.classCode}
                        </span>
                        <button
                          onClick={(e) => copyClassCode(e, classroom.classCode)}
                          className="p-1.5 hover:bg-gray-100 rounded transition"
                          title="Copy class code"
                        >
                          <Copy size={16} className="text-gray-500" />
                        </button>
                        <button
                          onClick={(e) => handleEditClassroom(e, classroom)}
                          className="p-1.5 hover:bg-gray-100 rounded transition"
                          title="Edit classroom"
                        >
                          <Edit3 size={16} className="text-gray-500" />
                        </button>
                        <button
                          onClick={(e) => handleArchiveClassroom(e, classroom)}
                          className="p-1.5 hover:bg-gray-100 rounded transition"
                          title={
                            classroom.isArchived
                              ? "Unarchive classroom"
                              : "Archive classroom"
                          }
                        >
                          {classroom.isArchived ? (
                            <ArchiveRestore
                              size={16}
                              className="text-green-600"
                            />
                          ) : (
                            <Archive size={16} className="text-orange-600" />
                          )}
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-3 h-14">
                      {classroom.description ||
                        "No description provided for this classroom."}
                    </p>

                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <div className="flex items-center mr-4">
                        <Users size={16} className="mr-1.5" />
                        <span>
                          {studentCount} Student{studentCount !== 1 ? "s" : ""}
                        </span>
                      </div>

                      <div className="flex items-center">
                        <BookOpen size={16} className="mr-1.5" />
                        <span>4 Lessons</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                      <div className={`flex items-center ${colorScheme.text}`}>
                        <div
                          className={`w-2 h-2 rounded-full ${colorScheme.bg} mr-1.5`}
                        ></div>
                        <span className="text-xs font-medium">Active</span>
                      </div>

                      <button
                        onClick={() =>
                          navigateToStudentReport(classroom.classCode)
                        }
                        className="flex items-center text-sm font-medium text-bluez hover:underline"
                      >
                        View Classroom
                        <ExternalLink size={14} className="ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center bg-white py-16 px-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-blue-50 rounded-full">
                <Search size={36} className="text-bluez" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-grayz mb-2">
              No classrooms found
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? `No classrooms match "${searchTerm}". Try a different search term.`
                : "You haven't created any classrooms yet."}
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-bluez text-white px-5 py-2.5 rounded-lg shadow-sm hover:bg-blue-700 transition inline-flex items-center"
            >
              <PlusCircle size={18} className="mr-2" />
              Create Your First Classroom
            </button>
          </div>
        )}
      </div>

      <CreateClassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create a Class"
        user={user}
      />

      <EditClassroomModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        classroom={selectedClassroom}
        onClassroomUpdated={handleClassroomUpdated}
        onClassroomDeleted={handleClassroomDeleted}
      />

      <ToastContainer
        toastClassName="border shadow-none text-black"
        bodyClassName="text-xs font-medium"
        position="bottom-right"
      />
    </div>
  );
};

export default TeacherClassroom;
