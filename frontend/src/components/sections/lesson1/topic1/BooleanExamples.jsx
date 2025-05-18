import React, { useState } from 'react';

const BooleanExamples = () => {
  // Example 1: Submitting a Project on Time
  const [beforeDeadline, setBeforeDeadline] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [groupmateHasCopy, setGroupmateHasCopy] = useState(false);
  
  // Example 2: Attending Class
  const [notCancelled, setNotCancelled] = useState(false);
  const [notSick, setNotSick] = useState(false);
  const [attendanceRequired, setAttendanceRequired] = useState(false);
  
  // Example 3: Taking a Break
  const [finishedModule, setFinishedModule] = useState(false);
  const [isTired, setIsTired] = useState(false);
  const [workedOverHour, setWorkedOverHour] = useState(false);
  
  // Example 4: Joining a Group Study
  const [friendGoing, setFriendGoing] = useState(false);
  const [notBusy, setNotBusy] = useState(false);
  const [didntStudyYesterday, setDidntStudyYesterday] = useState(false);
  
  // Example 5: Running a Program Function
  const [inputValid, setInputValid] = useState(false);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const [noErrors, setNoErrors] = useState(false);
  
  // Calculate the Boolean results
  const willSubmitProject = beforeDeadline && (isDone || groupmateHasCopy);
  const willAttendClass = notCancelled && (notSick || attendanceRequired);
  const willTakeBreak = finishedModule && (isTired || workedOverHour);
  const willJoinGroupStudy = friendGoing && (notBusy || didntStudyYesterday);
  const willRunFunction = inputValid && (userAuthenticated || testMode) && noErrors;
  
  // Component for toggle buttons
  const BooleanToggle = ({ value, onChange, label }) => (
    <div className="flex items-center justify-between p-2 mb-2">
      <span className="text-grayz mr-2">{label}</span>
      <div 
        className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${value ? 'bg-greenz' : 'bg-grayz'}`}
        onClick={onChange}
      >
        <div 
          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${value ? 'left-7' : 'left-1'}`}
        ></div>
      </div>
    </div>
  );
  
  // Component for results
  const Result = ({ condition, expression, variables, result }) => (
    <div className="mb-4">
      <div className="mb-3 text-sm text-grayz">
        <div className="font-mono mb-1">{expression}</div>
        {variables.map((v, i) => (
          <div key={i} className="text-xs">{v}</div>
        ))}
      </div>
      <div className={`text-white text-center p-3 rounded-lg transition-colors ${result ? 'bg-greenz' : 'bg-redz'}`}>
        {condition}: <strong>{result ? 'TRUE' : 'FALSE'}</strong>
      </div>
    </div>
  );
  
  // Example component
  const Example = ({ number, title, children, result, expression, variables, condition }) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-bold mb-2 text-bluez">{number}: {title}</h3>
      <p className="mb-4 text-grayz">{condition}</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-offwhite rounded-lg p-4">
          {children}
        </div>
        <div className="flex flex-col justify-center">
          <Result 
            condition={title} 
            expression={expression} 
            variables={variables}
            result={result} 
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto font-sans bg-offwhite p-6 rounded-xl">
      <h1 className="text-2xl font-bold mb-2 text-center text-bluez">Learning Boolean Algebra Through Examples</h1>
      <p className="mb-6 text-center text-grayz">Toggle the inputs to see how Boolean expressions work in everyday scenarios</p>
      
      {/* Example 1: Submitting a Project on Time */}
      <Example
        number="Example 1"
        title="Submitting a Project on Time"
        condition="You'll submit the project if it's before the deadline AND (you're done OR your groupmate has the final copy)."
        expression="A · (B + C)"
        variables={[
          "A = before deadline", 
          "B = you're done", 
          "C = groupmate has copy",
          "· = AND",
          "+ = OR"
        ]}
        result={willSubmitProject}
      >
        <BooleanToggle 
          label="Before deadline (A)" 
          value={beforeDeadline} 
          onChange={() => setBeforeDeadline(!beforeDeadline)} 
        />
        <BooleanToggle 
          label="You're done (B)" 
          value={isDone} 
          onChange={() => setIsDone(!isDone)} 
        />
        <BooleanToggle 
          label="Groupmate has copy (C)" 
          value={groupmateHasCopy} 
          onChange={() => setGroupmateHasCopy(!groupmateHasCopy)} 
        />
      </Example>
      
      {/* Example 2: Attending Class */}
      <Example
        number="Example 2"
        title="Attending Class"
        condition="You'll attend class if it's not cancelled AND (you're not sick OR attendance is required)."
        expression="D · (E + F)"
        variables={[
          "D = class not cancelled", 
          "E = you're not sick", 
          "F = attendance required",
          "· = AND",
          "+ = OR"
        ]}
        result={willAttendClass}
      >
        <BooleanToggle 
          label="Class not cancelled (D)" 
          value={notCancelled} 
          onChange={() => setNotCancelled(!notCancelled)} 
        />
        <BooleanToggle 
          label="Not sick (E)" 
          value={notSick} 
          onChange={() => setNotSick(!notSick)} 
        />
        <BooleanToggle 
          label="Attendance required (F)" 
          value={attendanceRequired} 
          onChange={() => setAttendanceRequired(!attendanceRequired)} 
        />
      </Example>
      
      {/* Example 3: Taking a Break */}
      <Example
        number="Example 3"
        title="Taking a Break"
        condition="You'll take a break if you've finished one module AND (you're tired OR you've been working for over an hour)."
        expression="G · (H + I)"
        variables={[
          "G = finished module", 
          "H = tired", 
          "I = worked over an hour",
          "· = AND",
          "+ = OR"
        ]}
        result={willTakeBreak}
      >
        <BooleanToggle 
          label="Finished module (G)" 
          value={finishedModule} 
          onChange={() => setFinishedModule(!finishedModule)} 
        />
        <BooleanToggle 
          label="Tired (H)" 
          value={isTired} 
          onChange={() => setIsTired(!isTired)} 
        />
        <BooleanToggle 
          label="Worked over an hour (I)" 
          value={workedOverHour} 
          onChange={() => setWorkedOverHour(!workedOverHour)} 
        />
      </Example>
      
      {/* Example 4: Joining a Group Study */}
      <Example
        number="Example 4"
        title="Joining a Group Study"
        condition="You'll join the group study if your friend is going AND (you're not too busy OR you didn't study yesterday)."
        expression="J · (K + L)"
        variables={[
          "J = friend is going", 
          "K = not too busy", 
          "L = didn't study yesterday",
          "· = AND",
          "+ = OR"
        ]}
        result={willJoinGroupStudy}
      >
        <BooleanToggle 
          label="Friend is going (J)" 
          value={friendGoing} 
          onChange={() => setFriendGoing(!friendGoing)} 
        />
        <BooleanToggle 
          label="Not too busy (K)" 
          value={notBusy} 
          onChange={() => setNotBusy(!notBusy)} 
        />
        <BooleanToggle 
          label="Didn't study yesterday (L)" 
          value={didntStudyYesterday} 
          onChange={() => setDidntStudyYesterday(!didntStudyYesterday)} 
        />
      </Example>
      
      {/* Example 5: Running a Program Function */}
      <Example
        number="Example 5"
        title="Running a Program Function"
        condition="You'll run the function if the input is valid AND (the user is authenticated OR it's a test mode) AND errors are not detected."
        expression="M · (N + O) · P"
        variables={[
          "M = input valid", 
          "N = user authenticated", 
          "O = test mode",
          "P = no errors",
          "· = AND",
          "+ = OR"
        ]}
        result={willRunFunction}
      >
        <BooleanToggle 
          label="Input valid (M)" 
          value={inputValid} 
          onChange={() => setInputValid(!inputValid)} 
        />
        <BooleanToggle 
          label="User authenticated (N)" 
          value={userAuthenticated} 
          onChange={() => setUserAuthenticated(!userAuthenticated)} 
        />
        <BooleanToggle 
          label="Test mode (O)" 
          value={testMode} 
          onChange={() => setTestMode(!testMode)} 
        />
        <BooleanToggle 
          label="No errors (P)" 
          value={noErrors} 
          onChange={() => setNoErrors(!noErrors)} 
        />
      </Example>
      
      <div className="bg-bluez text-white p-4 rounded-lg">
        <h2 className="font-bold mb-2 text-center">Boolean Algebra Notation</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-bold mb-1">Operators:</p>
            <ul className="list-disc pl-5">
              <li><strong>· (dot)</strong>: AND operation (sometimes written as ∧)</li>
              <li><strong>+ (plus)</strong>: OR operation (sometimes written as ∨)</li>
              <li><strong>¬ (overbar)</strong>: NOT operation (negation)</li>
            </ul>
          </div>
          <div>
            <p className="font-bold mb-1">Rules:</p>
            <ul className="list-disc pl-5">
              <li>A · B: True only if both A AND B are true</li>
              <li>A + B: True if either A OR B (or both) are true</li>
              <li>¬A: True if A is false; false if A is true</li>
              <li>Parentheses ( ) determine order of operations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooleanExamples;