import React, { useEffect, useState } from "react";
import { teacherApi } from "../../api/teacher/teacherApi";
import { useUser } from "../../context/UserContext";

const DashboardPending = () => {
  const [classrooms, setClassrooms] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const response = await teacherApi.fetchPendingStudents(user.userID);
        console.log(response);
        
        // Transform the response data to match our component structure
        const transformedClassrooms = response.map(classroom => ({
          name: classroom.className,
          classCode: classroom.classCode,
          classroomId: classroom.classroomId,
          students: classroom.pendingStudents.map(student => ({
            name: student.name,
            email: student.email,
            studentId: student.studentId,
            verified: student.isVerified || 'Yes', 
          })),
          selectedStudents: []
        })).filter(classroom => classroom.students.length > 0); // Only show classrooms with pending students
        
        setClassrooms(transformedClassrooms);
        console.log(transformedClassrooms);
      } catch (error) {
        console.error(error.response?.data || error.message || "An unknown error occurred");
      }
    };
  
    fetchPending();
  }, []);

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

      console.log(data);

      const response = await teacherApi.acceptPendingStudent(data);
      console.log(response);
    } catch (error) {
      console.error(error.response?.data || error.message || "An unknown error occured.");
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

      const response = await teacherApi.rejectPendingStudent(data);
      console.log(response);
    } catch (error) {
      console.error(error.response?.data || error.message || "An unknown error occured.");
    }
  };

  return (
        <div className="flex flex-col w-full px-24 space-y-6 overflow-y-auto">
      {classrooms.length > 0 ? (
        classrooms.map((cls, classIndex) => {
          const isAllSelected = cls.selectedStudents.length === cls.students.length;

          return (
            <div key={classIndex} className="space-y-2">
              <h1 className="text-xl font-bold">{cls.name}</h1>
              <div className="w-full max-h-[300px] overflow-y-auto relative border border-gray-200 sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="pl-6 py-4 align-middle">
                        <div className="flex items-center h-full">
                          <input
                            type="checkbox"
                            className="w-3.5 h-3.5 text-white bg-white border border-gray-300 rounded-sm checked:bg-blue-600 focus:ring-0"
                            checked={isAllSelected}
                            onChange={(e) => toggleSelectAll(classIndex, e.target.checked)}
                          />
                        </div>
                      </th>
                      <th className="px-6 py-3">Student Name</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">Student ID</th>
                      <th className="px-6 py-3">Verified</th>
                      <th className="px-6 py-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cls.students.map((student, studentIndex) => (
                      <tr
                        key={studentIndex}
                        className={`border-b border-gray-200 ${studentIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                      >
                        <td className="pl-6 py-4 align-middle">
                          <div className="flex items-center h-full">
                            <input
                              type="checkbox"
                              className="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
                              checked={cls.selectedStudents.includes(studentIndex)}
                              onChange={() => toggleStudent(classIndex, studentIndex)}
                            />
                          </div>
                        </td>
                        <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {student.name}
                        </th>
                        <td className="px-6 py-4">{student.email}</td>
                        <td className="px-6 py-4">{student.studentId}</td>
                        <td className="px-6 py-4">{student.verified}</td>
                        <td className="py-2 space-x-4 flex justify-center">
                          <a 
                            href="#" 
                            className=" text-blue-600 hover:bg-gray-200 rounded-md h-auto flex items-center p-2"
                            onClick={(e) => {
                              e.preventDefault();
                              handleAccept(classIndex, studentIndex);
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                            </svg>
                          </a>
                          <a 
                            href="#" 
                            className="text-red-600 hover:bg-gray-200 rounded-md h-auto flex items-center p-2"
                            onClick={(e) => {
                              e.preventDefault();
                              handleReject(classIndex, studentIndex);
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                            </svg>

                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">No pending student requests available.</p>
        </div>
      )}
    </div>
  );
};

export default DashboardPending;