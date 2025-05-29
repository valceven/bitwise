import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, ChevronDown, ChevronUp, HelpCircle, Info } from 'lucide-react';

const TruthTableLessonPart4 = () => {
  // Custom colors matching the previous components
  const colors = {
    greenz: "#27AE60",
    darkpurple: "#9B51E0",
    bluez: "#6E61FF",
    yellowz: "#F2C94C",
    cyanz: "#56CCF2",
    grayz: "#29314D",
    orangez: "#F2994A",
    lightpurple: "#DAC3FF",
    offwhite: "#F1F6F1",
    redz: "#F14E3A",
    white: "#FFFFFF",
    blackz: "#031926",
  };
  
  // Example expressions with their step-by-step explanations
  const examples = [
    {
      id: 1,
      title: "Example 1: (A AND B) OR (NOT C)",
      expression: "(A AND B) OR (NOT C)",
      variables: ["A", "B", "C"],
      steps: [
        { id: "step1", title: "Step 1: Calculate A AND B", column: "A AND B" },
        { id: "step2", title: "Step 2: Calculate NOT C", column: "NOT C" },
        { id: "step3", title: "Step 3: Calculate (A AND B) OR (NOT C)", column: "Output" }
      ],
      calculateStepValue: (row, step) => {
        switch(step.id) {
          case "step1":
            return row.A === 1 && row.B === 1 ? 1 : 0;
          case "step2":
            return row.C === 0 ? 1 : 0;
          case "step3":
            const andResult = row.A === 1 && row.B === 1 ? 1 : 0;
            const notResult = row.C === 0 ? 1 : 0;
            return andResult === 1 || notResult === 1 ? 1 : 0;
          default:
            return null;
        }
      },
      explanation: "This expression combines two sub-expressions with OR. First, calculate A AND B (which is 1 only when both A and B are 1). Then calculate NOT C (which is 1 when C is 0). Finally, OR these results (giving 1 if either sub-expression is 1)."
    },
    {
      id: 2,
      title: "Example 2: NOT((A OR B) AND C)",
      expression: "NOT((A OR B) AND C)",
      variables: ["A", "B", "C"],
      steps: [
        { id: "step1", title: "Step 1: Calculate A OR B", column: "A OR B" },
        { id: "step2", title: "Step 2: Calculate (A OR B) AND C", column: "(A OR B) AND C" },
        { id: "step3", title: "Step 3: Calculate NOT((A OR B) AND C)", column: "Output" }
      ],
      calculateStepValue: (row, step) => {
        switch(step.id) {
          case "step1":
            return row.A === 1 || row.B === 1 ? 1 : 0;
          case "step2":
            const orResult = row.A === 1 || row.B === 1 ? 1 : 0;
            return orResult === 1 && row.C === 1 ? 1 : 0;
          case "step3":
            const orResult2 = row.A === 1 || row.B === 1 ? 1 : 0;
            const andResult = orResult2 === 1 && row.C === 1 ? 1 : 0;
            return andResult === 0 ? 1 : 0;
          default:
            return null;
        }
      },
      explanation: "Work from the innermost parentheses outward. First, calculate A OR B. Then, AND the result with C. Finally, apply NOT to the entire expression, inverting the final result."
    },
    {
      id: 3,
      title: "Example 3: (A XOR B) AND (NOT C)",
      expression: "(A XOR B) AND (NOT C)",
      variables: ["A", "B", "C"],
      steps: [
        { id: "step1", title: "Step 1: Calculate A XOR B", column: "A XOR B" },
        { id: "step2", title: "Step 2: Calculate NOT C", column: "NOT C" },
        { id: "step3", title: "Step 3: Calculate (A XOR B) AND (NOT C)", column: "Output" }
      ],
      calculateStepValue: (row, step) => {
        switch(step.id) {
          case "step1":
            return (row.A === 1 && row.B === 0) || (row.A === 0 && row.B === 1) ? 1 : 0;
          case "step2":
            return row.C === 0 ? 1 : 0;
          case "step3":
            const xorResult = (row.A === 1 && row.B === 0) || (row.A === 0 && row.B === 1) ? 1 : 0;
            const notResult = row.C === 0 ? 1 : 0;
            return xorResult === 1 && notResult === 1 ? 1 : 0;
          default:
            return null;
        }
      },
      explanation: "XOR is true when inputs are different. Calculate A XOR B (which is 1 when A and B have different values). Then calculate NOT C. Finally, AND these results (giving 1 only if both sub-expressions are 1)."
    },
    {
      id: 4,
      title: "Challenge: (A AND (B OR C)) OR (NOT A AND B)",
      expression: "(A AND (B OR C)) OR (NOT A AND B)",
      variables: ["A", "B", "C"],
      steps: [
        { id: "step1", title: "Step 1: Calculate B OR C", column: "B OR C" },
        { id: "step2", title: "Step 2: Calculate A AND (B OR C)", column: "A AND (B OR C)" },
        { id: "step3", title: "Step 3: Calculate NOT A", column: "NOT A" },
        { id: "step4", title: "Step 4: Calculate NOT A AND B", column: "NOT A AND B" },
        { id: "step5", title: "Step 5: Calculate final output", column: "Output" }
      ],
      calculateStepValue: (row, step) => {
        switch(step.id) {
          case "step1":
            return row.B === 1 || row.C === 1 ? 1 : 0;
          case "step2":
            const orResult = row.B === 1 || row.C === 1 ? 1 : 0;
            return row.A === 1 && orResult === 1 ? 1 : 0;
          case "step3":
            return row.A === 0 ? 1 : 0;
          case "step4":
            const notA = row.A === 0 ? 1 : 0;
            return notA === 1 && row.B === 1 ? 1 : 0;
          case "step5":
            const orResult2 = row.B === 1 || row.C === 1 ? 1 : 0;
            const andResult1 = row.A === 1 && orResult2 === 1 ? 1 : 0;
            const notA2 = row.A === 0 ? 1 : 0;
            const andResult2 = notA2 === 1 && row.B === 1 ? 1 : 0;
            return andResult1 === 1 || andResult2 === 1 ? 1 : 0;
          default:
            return null;
        }
      },
      explanation: "This expression requires multiple steps. First calculate B OR C, then AND it with A. Separately, calculate NOT A and then AND it with B. Finally, OR these two results together."
    }
  ];
  
  const tips = [
    "Work inside parentheses first. If your expression has nested parentheses, solve the innermost ones before the outer ones.",
    "Use intermediate columns for partial results — it makes the table easier to follow.",
    "Respect operator precedence: NOT > AND > OR (unless parentheses specify otherwise).",
    "For expressions with many variables, you can use software tools or programming languages to generate truth tables automatically.",
    "When checking equivalence of two expressions, create truth tables for both and compare outputs."
  ];
  
  // State
  const [selectedExample, setSelectedExample] = useState(examples[0]);
  const [tableData, setTableData] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1500); // ms between steps
  const [showExplanation, setShowExplanation] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  
  // Generate truth table data when example changes
  useEffect(() => {
    const numVariables = selectedExample.variables.length;
    const numRows = Math.pow(2, numVariables);
    
    // Generate all binary combinations
    const newTableData = [];
    for (let i = 0; i < numRows; i++) {
      const row = {};
      // Convert number to binary and pad with leading zeros
      const binary = i.toString(2).padStart(numVariables, '0');
      
      // Add each variable value to the row
      selectedExample.variables.forEach((variable, index) => {
        row[variable] = parseInt(binary[index]);
      });
      
      // Add step values (all null initially)
      selectedExample.steps.forEach(step => {
        row[step.column] = null;
      });
      
      newTableData.push(row);
    }
    
    setTableData(newTableData);
    setCurrentStep(0);
    setCompletedSteps([]);
    setIsAnimating(false);
  }, [selectedExample]);
  
  // Animation effect
  useEffect(() => {
    let timer;
    
    if (isAnimating && currentStep < selectedExample.steps.length) {
      timer = setTimeout(() => {
        handleStepForward();
      }, animationSpeed);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isAnimating, currentStep, selectedExample.steps.length, animationSpeed]);
  
  // Handlers
  const handleStepForward = () => {
    if (currentStep >= selectedExample.steps.length) return;
    
    const step = selectedExample.steps[currentStep];
    const newTableData = [...tableData];
    
    // Calculate values for the current step
    newTableData.forEach((row, index) => {
      row[step.column] = selectedExample.calculateStepValue(row, step);
    });
    
    setTableData(newTableData);
    setCompletedSteps([...completedSteps, step.id]);
    setCurrentStep(currentStep + 1);
    
    // Stop animation if we've reached the end
    if (currentStep + 1 >= selectedExample.steps.length) {
      setIsAnimating(false);
    }
  };
  
  const handleStepBack = () => {
    if (currentStep <= 0) return;
    
    const newCurrentStep = currentStep - 1;
    const step = selectedExample.steps[newCurrentStep];
    const newTableData = [...tableData];
    
    // Reset values for the previous step
    newTableData.forEach((row, index) => {
      row[step.column] = null;
    });
    
    setTableData(newTableData);
    setCompletedSteps(completedSteps.filter(id => id !== step.id));
    setCurrentStep(newCurrentStep);
  };
  
  const handleReset = () => {
    const newTableData = [...tableData];
    
    // Reset all step values
    newTableData.forEach(row => {
      selectedExample.steps.forEach(step => {
        row[step.column] = null;
      });
    });
    
    setTableData(newTableData);
    setCurrentStep(0);
    setCompletedSteps([]);
    setIsAnimating(false);
  };
  
  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };
  
  // Render table header
  const renderTableHeader = () => {
    const columns = [...selectedExample.variables];
    
    // Add step columns
    selectedExample.steps.forEach(step => {
      columns.push(step.column);
    });
    
    return (
      <tr>
        {columns.map((column, index) => (
          <th 
            key={index} 
            className={`px-2 sm:px-3 py-2 text-center text-sm ${
              selectedExample.variables.includes(column)
                ? 'bg-blue-100 text-blue-600'
                : column === 'Output'
                  ? 'bg-blue-600 text-white'
                  : 'bg-purple-100 text-purple-600'
            }`}
          >
            {column}
          </th>
        ))}
      </tr>
    );
  };
  
  // Render table rows
  const renderTableRows = () => {
    return tableData.map((row, rowIndex) => (
      <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
        {selectedExample.variables.map((variable, colIndex) => (
          <td key={`var-${colIndex}`} className="px-2 sm:px-3 py-2 text-center border border-gray-200 font-mono text-sm">
            {row[variable]}
          </td>
        ))}
        
        {selectedExample.steps.map((step, stepIndex) => (
          <td 
            key={`step-${stepIndex}`} 
            className={`px-2 sm:px-3 py-2 text-center border border-gray-200 font-mono text-sm ${
              step.column === 'Output' 
                ? row[step.column] === 1 
                  ? 'text-green-600 font-bold' 
                  : row[step.column] === 0 
                    ? 'text-red-600 font-bold' 
                    : ''
                : row[step.column] === 1 
                  ? 'text-blue-600 font-bold' 
                  : ''
            }`}
          >
            {row[step.column] !== null ? row[step.column] : "-"}
          </td>
        ))}
      </tr>
    ));
  };
  
  // Render the current step explanation
  const renderCurrentStepExplanation = () => {
    if (currentStep === 0) {
      return (
        <div className="text-gray-600">
          Click "Start" or "Next Step" to begin building the truth table.
        </div>
      );
    } else if (currentStep >= selectedExample.steps.length) {
      return (
        <div className="text-gray-600">
          <span className="font-bold">Complete!</span> You've built the entire truth table.
        </div>
      );
    } else {
      const currentStepData = selectedExample.steps[currentStep];
      return (
        <div className="text-gray-600">
          <span className="font-bold">{currentStepData.title}:</span> Calculate the values for the "{currentStepData.column}" column.
        </div>
      );
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-bluez mb-3">Combining Multiple Operators in Truth Tables</h1>
        <div className="w-24 h-1 bg-bluez mx-auto rounded-full mb-4"></div>
        <p className="text-gray-600 text-sm sm:text-base">
          Learn how to build truth tables for complex Boolean expressions with multiple operators
        </p>
      </div>
      
      {/* Example selector */}
      <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm mb-6">
        <h2 className="text-lg font-bold text-gray-700 mb-3">Select an Example:</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {examples.map((example) => (
            <button
              key={example.id}
              className={`p-3 rounded-lg transition-colors text-left ${
                selectedExample.id === example.id
                  ? 'bg-bluez text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-blue-50'
              }`}
              onClick={() => setSelectedExample(example)}
            >
              <div className="font-bold text-sm sm:text-base">{example.title}</div>
              <div className={`text-xs sm:text-sm mt-1 ${selectedExample.id === example.id ? 'text-white/80' : 'text-gray-500'}`}>
                {example.expression}
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Expression and Controls Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        {/* Expression */}
        <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-bluez mb-3 break-all">{selectedExample.expression}</h2>
          
          <div className="mb-4">
            <button
              className="flex items-center text-bluez hover:text-blue-500 transition-colors text-sm sm:text-base"
              onClick={() => setShowExplanation(!showExplanation)}
            >
              <Info size={18} className="mr-2 flex-shrink-0" />
              {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
            </button>
            
            {showExplanation && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg text-xs sm:text-sm text-gray-600">
                {selectedExample.explanation}
              </div>
            )}
          </div>
          
          {/* Current Step */}
          <div className="bg-blue-50 p-3 rounded-lg mb-4">
            <h3 className="font-bold text-bluez mb-2 text-sm sm:text-base">Current Step:</h3>
            <div className="text-xs sm:text-sm">
              {renderCurrentStepExplanation()}
            </div>
          </div>
          
          {/* Animation controls */}
          <div className="space-y-4">
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              <button
                className="p-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleReset}
                disabled={currentStep === 0}
                title="Reset"
              >
                <SkipBack size={18} />
              </button>
              
              <button
                className="p-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleStepBack}
                disabled={currentStep === 0}
                title="Previous Step"
              >
                <ChevronUp size={18} />
              </button>
              
              <button
                className="p-2 rounded-lg bg-bluez text-white hover:bg-blue-700"
                onClick={toggleAnimation}
                title={isAnimating ? "Pause" : "Play"}
              >
                {isAnimating ? <Pause size={18} /> : <Play size={18} />}
              </button>
              
              <button
                className="p-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleStepForward}
                disabled={currentStep >= selectedExample.steps.length}
                title="Next Step"
              >
                <ChevronDown size={18} />
              </button>
              
              <button
                className="p-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  while (currentStep < selectedExample.steps.length) {
                    handleStepForward();
                  }
                }}
                disabled={currentStep >= selectedExample.steps.length}
                title="Complete All Steps"
              >
                <SkipForward size={18} />
              </button>
            </div>
            
            <div className="flex items-center justify-center sm:justify-start">
              <span className="text-sm text-gray-600 mr-2">Speed:</span>
              <select
                className="bg-white border border-gray-300 rounded-md text-sm p-1"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
              >
                <option value={2500}>Slow</option>
                <option value={1500}>Medium</option>
                <option value={800}>Fast</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Progress steps */}
        <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm">
          <h3 className="font-bold text-gray-700 mb-3 text-sm sm:text-base">Build Progress:</h3>
          <div className="space-y-2">
            {selectedExample.steps.map((step, index) => (
              <div 
                key={index}
                className={`p-2 sm:p-3 rounded-lg flex items-center ${
                  completedSteps.includes(step.id)
                    ? 'bg-green-100 text-green-600'
                    : currentStep === index
                      ? 'bg-blue-100 text-bluez border border-blue-300'
                      : 'bg-gray-100 text-gray-500'
                }`}
              >
                <div
                  className={`w-6 h-6 flex items-center justify-center rounded-full mr-2 sm:mr-3 flex-shrink-0 ${
                    completedSteps.includes(step.id)
                      ? 'bg-green-600 text-white'
                      : currentStep === index
                        ? 'bg-bluez text-white'
                        : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                <div className="text-xs sm:text-sm">{step.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Truth Table */}
      <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm mb-6">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Truth Table for {selectedExample.expression}</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-full">
            <thead>
              {renderTableHeader()}
            </thead>
            <tbody>
              {renderTableRows()}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 text-xs sm:text-sm text-gray-500 italic text-center sm:text-left">
          Click the play button or use the step controls to build the truth table step by step.
        </div>
      </div>
      
      {/* Tips section - Now below the truth table */}
      <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-gray-700">General Tips</h2>
          <button
            className="text-blue-600 hover:text-blue-500 transition-colors text-sm sm:text-base"
            onClick={() => setShowTips(!showTips)}
          >
            {showTips ? 'Hide Tips' : 'Show Tips'}
          </button>
        </div>
        
        {showTips && (
          <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm">
            {tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Interactive note */}
      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-center">
        <p className="text-gray-600 text-sm sm:text-base">
          <span className="font-bold">Learning:</span> Try all the examples to understand different patterns of complex Boolean expressions. 
          Use the step-by-step animation to see how each intermediate value is calculated.
        </p>
      </div>
    </div>
  );
};

export default TruthTableLessonPart4;