import React, { useState } from 'react';
import { motion } from 'framer-motion';

const GraduationCalculatorComponent = () => {
  // State for graduation calculator
  const [grades, setGrades] = useState([75, 80, 85]);
  const [attendance, setAttendance] = useState(90);
  const [projectComplete, setProjectComplete] = useState(false);
  const [currentGrade, setCurrentGrade] = useState('');
  
  // Function to determine if a student can graduate
  const canGraduate = (grades, attendance, projectComplete) => {
    // Only calculate average if there are grades
    const passingGrades = grades.length > 0 ? (grades.reduce((sum, grade) => sum + grade, 0) / grades.length >= 70) : false;
    const goodAttendance = attendance >= 80;
    
    return (passingGrades && goodAttendance) || 
           (projectComplete && passingGrades) || 
           (projectComplete && goodAttendance && Math.min(...grades) >= 60);
  };
  
  // Calculate graduation eligibility
  const graduationResult = canGraduate(grades, attendance, projectComplete);
  
  // Add a new grade
  const addGrade = () => {
    if (currentGrade && !isNaN(currentGrade) && currentGrade >= 0 && currentGrade <= 100) {
      setGrades([...grades, Number(currentGrade)]);
      setCurrentGrade('');
    }
  };
  
  // Remove a grade
  const removeGrade = (index) => {
    const newGrades = [...grades];
    newGrades.splice(index, 1);
    setGrades(newGrades);
  };
  
  // Get average grade
  const averageGrade = grades.length > 0 
    ? (grades.reduce((sum, grade) => sum + grade, 0) / grades.length).toFixed(1) 
    : 0;
  
  // Condition evaluation details
  const condition1 = grades.length > 0 ? (grades.reduce((sum, grade) => sum + grade, 0) / grades.length >= 70) : false;
  const condition2 = attendance >= 80;
  const condition3 = projectComplete;
  const condition4 = Math.min(...grades) >= 60;
  
  const condition1And2 = condition1 && condition2;
  const condition3And1 = condition3 && condition1;
  const condition3And2And4 = condition3 && condition2 && condition4;
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="p-6 rounded-lg bg-[#F1F6F1] shadow-md"
    >
      <h2 className="text-2xl font-bold text-[#29314D] mb-4">
        <span className="text-[#F14E3A]">10. Boolean Logic in Real-World Applications</span>
      </h2>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-6 text-[#29314D]"
      >
        <p className="mb-4">
          Let's analyze a real-world application of Boolean logic with our graduation eligibility calculator.
          This demonstrates how Boolean expressions create decision structures that model real-world policies.
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-[#29314D] text-[#F1F6F1] p-4 rounded-lg shadow-md mb-6 font-mono"
      >
        <pre className="overflow-x-auto">
          <code>
{`def can_graduate(grades, attendance, project_complete):
    passing_grades = sum(grades) / len(grades) >= 70 if grades else False
    good_attendance = attendance >= 80
    
    return (passing_grades and good_attendance) or \\
           (project_complete and passing_grades) or \\
           (project_complete and good_attendance and min(grades) >= 60)`}
          </code>
        </pre>
      </motion.div>
      
      {/* Interactive Graduation Calculator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="bg-[#FFFFFF] p-4 rounded-lg shadow-md mb-6"
      >
        <h3 className="text-xl font-semibold text-[#6E61FF] mb-3">🎮 Graduation Eligibility Calculator</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-semibold text-[#29314D] mb-3">Student Grades:</h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {grades.map((grade, index) => (
                <div 
                  key={index} 
                  className={`px-3 py-1 rounded-full flex items-center ${
                    grade >= 70 ? 'bg-[#27AE60] text-white' : 
                    grade >= 60 ? 'bg-[#F2C94C] text-[#29314D]' : 'bg-[#F14E3A] text-white'
                  }`}
                >
                  {grade}
                  <button 
                    onClick={() => removeGrade(index)}
                    className="ml-2 w-4 h-4 rounded-full bg-white text-[#29314D] flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex mb-4">
              <input
                type="number"
                min="0"
                max="100"
                value={currentGrade}
                onChange={(e) => setCurrentGrade(e.target.value)}
                className="flex-grow p-2 border border-[#DAC3FF] rounded-l-md"
                placeholder="Add grade (0-100)"
              />
              <button
                onClick={addGrade}
                className="bg-[#6E61FF] hover:bg-[#5D50EE] text-white px-4 py-2 rounded-r-md"
              >
                Add
              </button>
            </div>
            
            <div className="bg-[#F1F6F1] p-3 rounded-lg mb-4">
              <p className="text-[#29314D]">
                <strong>Average Grade:</strong> {averageGrade}
                <span className={`ml-2 px-2 py-1 rounded-md text-xs ${
                  averageGrade >= 70 ? 'bg-[#27AE60] text-white' : 'bg-[#F14E3A] text-white'
                }`}>
                  {averageGrade >= 70 ? 'PASSING' : 'FAILING'}
                </span>
              </p>
              <p className="text-[#29314D] mt-2">
                <strong>Lowest Grade:</strong> {grades.length > 0 ? Math.min(...grades) : 'N/A'}
                {grades.length > 0 && (
                  <span className={`ml-2 px-2 py-1 rounded-md text-xs ${
                    Math.min(...grades) >= 60 ? 'bg-[#27AE60] text-white' : 'bg-[#F14E3A] text-white'
                  }`}>
                    {Math.min(...grades) >= 60 ? 'ACCEPTABLE' : 'TOO LOW'}
                  </span>
                )}
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-[#29314D] mb-3">Other Criteria:</h4>
            
            <div className="mb-4">
              <label className="block text-[#29314D] mb-2">
                Attendance: {attendance}%
              </label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={attendance} 
                onChange={(e) => setAttendance(parseInt(e.target.value))}
                className="w-full h-2 bg-[#DAC3FF] rounded-lg appearance-none cursor-pointer"
              />
              <div className="mt-1 flex justify-between">
                <span className="text-xs text-[#F14E3A]">0%</span>
                <span className="text-xs text-[#F2C94C]">50%</span>
                <span className="text-xs text-[#27AE60]">100%</span>
              </div>
            </div>
            
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="project-checkbox"
                checked={projectComplete}
                onChange={() => setProjectComplete(!projectComplete)}
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="project-checkbox" className="text-[#29314D]">
                Final Project Completed
              </label>
            </div>
            
            <div className="bg-[#F1F6F1] p-3 rounded-lg">
              <p className="text-[#29314D]">
                <strong>Good Attendance:</strong> 
                <span className={`ml-2 px-2 py-1 rounded-md text-xs ${
                  attendance >= 80 ? 'bg-[#27AE60] text-white' : 'bg-[#F14E3A] text-white'
                }`}>
                  {attendance >= 80 ? 'YES' : 'NO'}
                </span>
              </p>
              <p className="text-[#29314D] mt-2">
                <strong>Project Status:</strong> 
                <span className={`ml-2 px-2 py-1 rounded-md text-xs ${
                  projectComplete ? 'bg-[#27AE60] text-white' : 'bg-[#F14E3A] text-white'
                }`}>
                  {projectComplete ? 'COMPLETE' : 'INCOMPLETE'}
                </span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Graduation Result */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          key={`${condition1}-${condition2}-${condition3}-${condition4}`}
          className={`p-4 rounded-lg ${
            graduationResult ? 'bg-[#27AE60] text-white' : 'bg-[#F14E3A] text-white'
          }`}
        >
          <h4 className="font-bold mb-1 text-xl">Graduation Result:</h4>
          <p className="text-lg">
            This student {graduationResult ? 'is eligible' : 'is not eligible'} to graduate.
          </p>
        </motion.div>
      </motion.div>
      
      {/* Logical Conditions Breakdown */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="bg-[#DAC3FF] p-4 rounded-lg mb-6"
      >
        <h3 className="text-lg font-semibold text-[#29314D] mb-3">Boolean Logic Breakdown:</h3>
        <p className="text-[#29314D] mb-4">
          A student can graduate if <strong>ANY</strong> of these conditions are met:
        </p>
        
        <div className="space-y-4">
          <div className={`p-3 rounded-lg ${
            condition1And2 ? 'bg-[#27AE60] text-white' : 'bg-[#FFFFFF] text-[#29314D]'
          }`}>
            <h4 className="font-semibold">Condition 1:</h4>
            <div className="flex items-center mt-1">
              <div className="flex-grow">
                <p className="font-mono">
                  passing_grades AND good_attendance
                </p>
                <p className="mt-1 text-sm">
                  ({condition1 ? 'True' : 'False'} AND {condition2 ? 'True' : 'False'}) = {condition1And2 ? 'True' : 'False'}
                </p>
              </div>
              <div className="flex-shrink-0 ml-3">
                {condition1And2 ? '✓' : '✗'}
              </div>
            </div>
          </div>
          
          <div className={`p-3 rounded-lg ${
            condition3And1 ? 'bg-[#27AE60] text-white' : 'bg-[#FFFFFF] text-[#29314D]'
          }`}>
            <h4 className="font-semibold">Condition 2:</h4>
            <div className="flex items-center mt-1">
              <div className="flex-grow">
                <p className="font-mono">
                  project_complete AND passing_grades
                </p>
                <p className="mt-1 text-sm">
                  ({condition3 ? 'True' : 'False'} AND {condition1 ? 'True' : 'False'}) = {condition3And1 ? 'True' : 'False'}
                </p>
              </div>
              <div className="flex-shrink-0 ml-3">
                {condition3And1 ? '✓' : '✗'}
              </div>
            </div>
          </div>
          
          <div className={`p-3 rounded-lg ${
            condition3And2And4 ? 'bg-[#27AE60] text-white' : 'bg-[#FFFFFF] text-[#29314D]'
          }`}>
            <h4 className="font-semibold">Condition 3:</h4>
            <div className="flex items-center mt-1">
              <div className="flex-grow">
                <p className="font-mono">
                  project_complete AND good_attendance AND min_grade >= 60
                </p>
                <p className="mt-1 text-sm">
                  ({condition3 ? 'True' : 'False'} AND {condition2 ? 'True' : 'False'} AND {condition4 ? 'True' : 'False'}) = {condition3And2And4 ? 'True' : 'False'}
                </p>
              </div>
              <div className="flex-shrink-0 ml-3">
                {condition3And2And4 ? '✓' : '✗'}
              </div>
            </div>
          </div>
          
          <div className="p-3 rounded-lg bg-[#29314D] text-white">
            <h4 className="font-semibold">Final Result:</h4>
            <div className="flex items-center mt-1">
              <div className="flex-grow">
                <p className="font-mono">
                  condition1 OR condition2 OR condition3
                </p>
                <p className="mt-1 text-sm">
                  ({condition1And2 ? 'True' : 'False'} OR {condition3And1 ? 'True' : 'False'} OR {condition3And2And4 ? 'True' : 'False'}) = {graduationResult ? 'True' : 'False'}
                </p>
              </div>
              <div className="flex-shrink-0 ml-3">
                {graduationResult ? '✓' : '✗'}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="bg-[#F2994A] p-4 rounded-lg"
      >
        <h3 className="text-lg font-semibold text-[#29314D] mb-2">💡 Real-World Applications:</h3>
        <p className="text-[#29314D] mb-3">
          This example demonstrates how Boolean expressions model real-world decision-making:
        </p>
        <ul className="list-disc list-inside text-[#29314D] space-y-2 ml-4">
          <li>Educational policies for graduation requirements</li>
          <li>Loan approval criteria in financial systems</li>
          <li>Insurance eligibility determinations</li>
          <li>Job applicant filtering in HR systems</li>
          <li>Medical diagnosis systems</li>
          <li>Government benefit qualification rules</li>
        </ul>
        <p className="text-[#29314D] mt-3">
          Complex organizational policies are often implemented as Boolean expressions that determine outcomes based on multiple criteria.
        </p>
      </motion.div>
    </motion.section>
  );
};

export default GraduationCalculatorComponent;