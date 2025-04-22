import { useState } from "react";
import { ArrowLeft, Users, Filter } from "lucide-react";

const StudentList = ({ topicId, students = [], onBack }) => {
  const [filter, setFilter] = useState("all");

  const filteredStudents = students
    .filter((s) =>
      filter === "all" ? true :
      filter === "completed" ? s.completed :
      !s.completed
    )
    .sort((a, b) => b.points - a.points);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <Users size={20} className="text-gray-600" />
          Students List: <span className="font-bold">{topicId}</span>
        </h2>

        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-md p-1 text-sm"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>

        <button
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition text-sm self-start sm:self-auto"
          onClick={onBack}
        >
          <ArrowLeft size={16} />
          Back to Topics
        </button>
      </div>

      {filteredStudents.length === 0 ? (
        <p className="text-gray-500">No students found.</p>
      ) : (
        filteredStudents.map((student, index) => {
          const progress = (student.points / 4000) * 100;
          return (
            <div
              key={student.id}
              className="flex items-center gap-4 p-4 rounded-xl bg-white border shadow-sm"
            >
              <div className="text-center w-6 text-sm font-bold text-purple-500">
                {index + 1}
              </div>
              <img
                src={student.profileImg}
                alt={student.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-800 flex justify-between items-center">
                  {student.name}
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    student.completed ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                  }`}>
                    {student.completed ? "Completed" : "In Progress"}
                  </span>
                </div>
                <div className="text-sm text-purple-600">{student.points} points</div>
                <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                  <div
                    className="h-2 bg-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default StudentList;
