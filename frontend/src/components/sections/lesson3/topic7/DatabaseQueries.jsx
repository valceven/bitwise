
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DatabaseQueries = () => {
  const [gradeFilter, setGradeFilter] = useState(80);
  const [attendanceFilter, setAttendanceFilter] = useState(90);
  const [projectFilter, setProjectFilter] = useState('A');

  // Sample student data
  const students = [
    { id: 1, name: "Alice", grade: 92, attendance: 98, final_project: 'A' },
    { id: 2, name: "Bob", grade: 78, attendance: 95, final_project: 'B' },
    { id: 3, name: "Charlie", grade: 85, attendance: 85, final_project: 'A' },
    { id: 4, name: "Diana", grade: 91, attendance: 75, final_project: 'B' },
    { id: 5, name: "Ethan", grade: 72, attendance: 92, final_project: 'A' },
    { id: 6, name: "Fiona", grade: 88, attendance: 93, final_project: 'C' },
  ];

  // Apply the filters using Boolean expressions
  const filteredStudents = students.filter(student => 
    (student.grade > gradeFilter && student.attendance > attendanceFilter) || 
    (student.final_project === projectFilter)
  );

  // Format the SQL query based on current filter values
  const sqlQuery = `SELECT * FROM students 
WHERE (grade > ${gradeFilter} AND attendance > ${attendanceFilter}) 
   OR (final_project = '${projectFilter}');`;

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i) => ({ 
      opacity: 1, 
      scale: 1, 
      transition: { 
        delay: 0.3 + (i * 0.1),
        duration: 0.5 
      } 
    })
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 rounded-lg bg-[#F1F6F1] shadow-md"
    >
      <h2 className="text-2xl font-bold text-[#29314D] mb-4">
        <span className="text-[#9B51E0]">2. Boolean Expressions in Database Queries</span>
      </h2>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-6 text-[#29314D]"
      >
        <p className="mb-4">
          SQL databases rely heavily on Boolean expressions to filter data. Boolean conditions determine 
          which records are included in query results, allowing for precise data retrieval.
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-[#29314D] text-[#F1F6F1] p-4 rounded-lg shadow-md mb-6 font-mono overflow-x-auto"
      >
        <pre><code>{sqlQuery}</code></pre>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="bg-[#FFFFFF] p-4 rounded-lg shadow-md mb-6"
      >
        <h3 className="text-xl font-semibold text-[#6E61FF] mb-3">🎮 Interactive Query Builder</h3>
        
        <div className="mb-4">
          <label className="block text-[#29314D] mb-2">
            Minimum Grade: {gradeFilter}
          </label>
          <input 
            type="range" 
            min="60" 
            max="100" 
            value={gradeFilter} 
            onChange={(e) => setGradeFilter(parseInt(e.target.value))}
            className="w-full h-2 bg-[#DAC3FF] rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-[#29314D] mb-2">
            Minimum Attendance: {attendanceFilter}%
          </label>
          <input 
            type="range" 
            min="60" 
            max="100" 
            value={attendanceFilter} 
            onChange={(e) => setAttendanceFilter(parseInt(e.target.value))}
            className="w-full h-2 bg-[#DAC3FF] rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-[#29314D] mb-2">
            Final Project Grade:
          </label>
          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="w-full p-2 border border-[#DAC3FF] rounded-md bg-white"
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="bg-[#56CCF2] p-4 rounded-lg mb-6"
      >
        <h3 className="text-lg font-semibold text-[#29314D] mb-2">Query Results: {filteredStudents.length} students found</h3>
        <div className="overflow-hidden rounded-lg border border-[#29314D]">
          <table className="min-w-full bg-white">
            <thead className="bg-[#29314D] text-white">
              <tr>
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Grade</th>
                <th className="py-2 px-4 text-left">Attendance</th>
                <th className="py-2 px-4 text-left">Project</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <motion.tr 
                  key={student.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  className={index % 2 === 0 ? 'bg-[#F1F6F1]' : 'bg-white'}
                >
                  <td className="py-2 px-4">{student.id}</td>
                  <td className="py-2 px-4">{student.name}</td>
                  <td className="py-2 px-4">{student.grade}</td>
                  <td className="py-2 px-4">{student.attendance}%</td>
                  <td className="py-2 px-4">{student.final_project}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="bg-[#F2994A] p-4 rounded-lg"
      >
        <h3 className="text-lg font-semibold text-[#29314D] mb-2">The Boolean Logic Explained:</h3>
        <p className="text-[#29314D] mb-2">This query uses a compound Boolean expression with:</p>
        <ul className="list-disc list-inside text-[#29314D] ml-4">
          <li>AND operator to require both grade AND attendance criteria be met</li>
          <li>OR operator to include students who meet either the combined grade/attendance criteria OR have the specified project grade</li>
        </ul>
        <p className="mt-4 text-[#29314D]">Try adjusting the filters to see how Boolean expressions determine which records are included!</p>
      </motion.div>
    </motion.section>
  );
};

export default DatabaseQueries;