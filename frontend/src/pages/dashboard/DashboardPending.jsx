import React, { useState } from "react";

const DashboardPending = () => {
  const [classrooms, setClassrooms] = useState([
    {
      name: "CS-132",
      students: [
        { name: 'Alice Johnson', email: 'alice.johnson@example.com', studentId: 'S123456', verified: 'No' },
        { name: 'Brian Lee', email: 'brian.lee@example.com', studentId: 'S123457', verified: 'No' },
        { name: 'Carla Mendes', email: 'carla.mendes@example.com', studentId: 'S123458', verified: 'No' },
      ],
      selectedStudents: [],
    },
    {
      name: "Classroom No.2",
      students: [
        { name: 'Daniel Green', email: 'daniel.green@example.com', studentId: 'S123459', verified: 'No' },
        { name: 'Elena Smith', email: 'elena.smith@example.com', studentId: 'S123460', verified: 'No' },
      ],
      selectedStudents: [],
    },
    {
      name: "Classroom No.3",
      students: [
        { name: 'Fred Collins', email: 'fred.collins@example.com', studentId: 'S123461', verified: 'No' },
        { name: 'Gina Ray', email: 'gina.ray@example.com', studentId: 'S123462', verified: 'No' },
      ],
      selectedStudents: [],
    },
    {
      name: "Classroom No.4",
      students: [
        { name: 'Fred Collins', email: 'fred.collins@example.com', studentId: 'S123461', verified: 'No' },
        { name: 'Gina Ray', email: 'gina.ray@example.com', studentId: 'S123462', verified: 'No' },
        { name: 'Daniel Green', email: 'daniel.green@example.com', studentId: 'S123459', verified: 'No' },
        { name: 'Elena Smith', email: 'elena.smith@example.com', studentId: 'S123460', verified: 'No' },
      ],
      selectedStudents: [],
    },
  ]);

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

  return (
    <div className="flex flex-col justify-center w-full space-y-6 overflow-y-auto max-h-[80vh] pt-96 px-20">
      {classrooms.map((cls, classIndex) => {
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
                      <td className="py-4 space-x-10 flex justify-center">
                        <a href="#" className="font-medium text-blue-600 hover:underline">Accept</a>
                        <a href="#" className="font-medium text-red-600 hover:underline">Reject</a>
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
  );
};

export default DashboardPending;
