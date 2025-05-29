import React, { useState, useEffect } from 'react';
import { HelpCircle, Check, RefreshCw, ChevronRight, ChevronDown } from 'lucide-react';

const TruthTableBuilder = () => {
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
  
  // Available logical expressions
  const expressions = [
    { id: 1, text: "A AND B", variables: ["A", "B"], operation: "AND" },
    { id: 2, text: "A OR B", variables: ["A", "B"], operation: "OR" },
    { id: 3, text: "NOT A", variables: ["A"], operation: "NOT" },
    { id: 4, text: "A OR (NOT B)", variables: ["A", "B"], operation: "OR_NOT" },
    { id: 5, text: "(A AND B) OR C", variables: ["A", "B", "C"], operation: "AND_OR" },
  ];
  
  // State
  const [selectedExpression, setSelectedExpression] = useState(expressions[0]);
  const [tableData, setTableData] = useState([]);
  const [userOutputs, setUserOutputs] = useState([]);
  const [showOperationSteps, setShowOperationSteps] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);
  const [showHint, setShowHint] = useState(false);
  
  // Initialize table data when expression changes
  useEffect(() => {
    const numVariables = selectedExpression.variables.length;
    const numRows = Math.pow(2, numVariables);
    
    // Generate all binary combinations
    const newTableData = [];
    for (let i = 0; i < numRows; i++) {
      const row = {};
      // Convert number to binary and pad with leading zeros
      const binary = i.toString(2).padStart(numVariables, '0');
      
      // Add each variable value to the row
      selectedExpression.variables.forEach((variable, index) => {
        row[variable] = parseInt(binary[index]);
      });
      
      // Add intermediate steps based on the operation
      if (selectedExpression.operation === "OR_NOT") {
        row["NOT B"] = row["B"] === 0 ? 1 : 0;
      } else if (selectedExpression.operation === "AND_OR") {
        row["A AND B"] = row["A"] === 1 && row["B"] === 1 ? 1 : 0;
      }
      
      newTableData.push(row);
    }
    
    setTableData(newTableData);
    setUserOutputs(Array(numRows).fill(null));
    setIsVerified(false);
    setExpandedRows([]);
  }, [selectedExpression]);
  
  // Calculate the correct output for a row
  const calculateCorrectOutput = (row) => {
    switch (selectedExpression.operation) {
      case "AND":
        return row["A"] === 1 && row["B"] === 1 ? 1 : 0;
      case "OR":
        return row["A"] === 1 || row["B"] === 1 ? 1 : 0;
      case "NOT":
        return row["A"] === 0 ? 1 : 0;
      case "OR_NOT":
        return row["A"] === 1 || row["NOT B"] === 1 ? 1 : 0;
      case "AND_OR":
        return row["A AND B"] === 1 || row["C"] === 1 ? 1 : 0;
      default:
        return null;
    }
  };
  
  // Toggle a user's output selection
  const toggleOutput = (index) => {
    if (isVerified) return;
    
    const newOutputs = [...userOutputs];
    if (newOutputs[index] === null) {
      newOutputs[index] = 0;
    } else if (newOutputs[index] === 0) {
      newOutputs[index] = 1;
    } else {
      newOutputs[index] = 0;
    }
    setUserOutputs(newOutputs);
  };
  
  // Verify the user's answers
  const verifyAnswers = () => {
    setIsVerified(true);
  };
  
  // Reset the exercise
  const resetExercise = () => {
    setUserOutputs(Array(tableData.length).fill(null));
    setIsVerified(false);
    setExpandedRows([]);
    setShowHint(false);
  };
  
  // Calculate user's score
  const calculateScore = () => {
    let correctCount = 0;
    tableData.forEach((row, index) => {
      if (userOutputs[index] === calculateCorrectOutput(row)) {
        correctCount++;
      }
    });
    return correctCount;
  };
  
  // Toggle row expansion for step-by-step calculation view
  const toggleRowExpansion = (index) => {
    const newExpandedRows = [...expandedRows];
    const rowIndex = newExpandedRows.indexOf(index);
    
    if (rowIndex === -1) {
      newExpandedRows.push(index);
    } else {
      newExpandedRows.splice(rowIndex, 1);
    }
    
    setExpandedRows(newExpandedRows);
  };
  
  // Generate step-by-step explanation for a row
  const getStepByStepExplanation = (row, index) => {
    switch (selectedExpression.operation) {
      case "AND":
        return (
          <>
            <p className="text-grayz">
              <span className="font-medium">A AND B</span> is true (1) only when both inputs are true (1).
            </p>
            <p className="text-grayz mt-1">
              A = {row["A"]}, B = {row["B"]} → {row["A"]} AND {row["B"]} = {calculateCorrectOutput(row)}
            </p>
          </>
        );
      case "OR":
        return (
          <>
            <p className="text-grayz">
              <span className="font-medium">A OR B</span> is true (1) when at least one input is true (1).
            </p>
            <p className="text-grayz mt-1">
              A = {row["A"]}, B = {row["B"]} → {row["A"]} OR {row["B"]} = {calculateCorrectOutput(row)}
            </p>
          </>
        );
      case "NOT":
        return (
          <>
            <p className="text-grayz">
              <span className="font-medium">NOT A</span> inverts the input value.
            </p>
            <p className="text-grayz mt-1">
              A = {row["A"]} → NOT {row["A"]} = {calculateCorrectOutput(row)}
            </p>
          </>
        );
      case "OR_NOT":
        return (
          <>
            <p className="text-grayz">
              <span className="font-medium">Step 1:</span> Calculate NOT B
            </p>
            <p className="text-grayz mt-1">
              B = {row["B"]} → NOT B = {row["NOT B"]}
            </p>
            <p className="text-grayz mt-2">
              <span className="font-medium">Step 2:</span> Calculate A OR (NOT B)
            </p>
            <p className="text-grayz mt-1">
              A = {row["A"]}, NOT B = {row["NOT B"]} → {row["A"]} OR {row["NOT B"]} = {calculateCorrectOutput(row)}
            </p>
          </>
        );
      case "AND_OR":
        return (
          <>
            <p className="text-grayz">
              <span className="font-medium">Step 1:</span> Calculate A AND B
            </p>
            <p className="text-grayz mt-1">
              A = {row["A"]}, B = {row["B"]} → A AND B = {row["A AND B"]}
            </p>
            <p className="text-grayz mt-2">
              <span className="font-medium">Step 2:</span> Calculate (A AND B) OR C
            </p>
            <p className="text-grayz mt-1">
              (A AND B) = {row["A AND B"]}, C = {row["C"]} → {row["A AND B"]} OR {row["C"]} = {calculateCorrectOutput(row)}
            </p>
          </>
        );
      default:
        return null;
    }
  };
  
  // Get hint for the current expression
  const getHint = () => {
    switch (selectedExpression.operation) {
      case "AND":
        return "The AND operator returns 1 only when all inputs are 1. Otherwise it returns 0.";
      case "OR":
        return "The OR operator returns 1 if at least one input is 1. It only returns 0 when all inputs are 0.";
      case "NOT":
        return "The NOT operator inverts the input: 0 becomes 1, and 1 becomes 0.";
      case "OR_NOT":
        return "First calculate NOT B for each row, then determine if either A OR (NOT B) is 1.";
      case "AND_OR":
        return "Calculate (A AND B) first, then determine if either that result OR C is 1.";
      default:
        return "";
    }
  };
  
  // Render table columns, including intermediate step columns when needed
  const renderTableColumns = () => {
    const columns = [...selectedExpression.variables];
    
    if (showOperationSteps) {
      if (selectedExpression.operation === "OR_NOT") {
        columns.push("NOT B");
      } else if (selectedExpression.operation === "AND_OR") {
        columns.push("A AND B");
      }
    }
    
    columns.push(selectedExpression.text);
    
    return columns.map((col, index) => (
      <th 
        key={index} 
        className={`p-2 text-center ${
          col === selectedExpression.text ? 'bg-bluez text-white' : 'bg-bluez/20 text-bluez'
        }`}
      >
        {col}
      </th>
    ));
  };
  
  // Render table rows
  const renderTableRows = () => {
    return tableData.map((row, rowIndex) => {
      const isExpanded = expandedRows.includes(rowIndex);
      const isCorrect = userOutputs[rowIndex] === calculateCorrectOutput(row);
      
      return (
        <React.Fragment key={rowIndex}>
          <tr className={`${rowIndex % 2 === 0 ? 'bg-offwhite' : 'bg-white'}`}>
            {selectedExpression.variables.map((variable, colIndex) => (
              <td key={colIndex} className="p-3 text-center border border-gray-200">
                {row[variable]}
              </td>
            ))}
            
            {showOperationSteps && selectedExpression.operation === "OR_NOT" && (
              <td className="p-3 text-center border border-gray-200">
                {row["NOT B"]}
              </td>
            )}
            
            {showOperationSteps && selectedExpression.operation === "AND_OR" && (
              <td className="p-3 text-center border border-gray-200">
                {row["A AND B"]}
              </td>
            )}
            
            <td className="p-3 text-center border border-gray-200">
              <div className="flex justify-center items-center">
                {isVerified ? (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    isCorrect ? 'bg-greenz/20 text-greenz' : 'bg-redz/20 text-redz'
                  }`}>
                    {userOutputs[rowIndex]}
                    {isCorrect ? (
                      <Check size={16} className="ml-1 text-greenz" />
                    ) : (
                      <span className="ml-1 text-xs text-redz">→ {calculateCorrectOutput(row)}</span>
                    )}
                  </div>
                ) : (
                  <button
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold transition-colors ${
                      userOutputs[rowIndex] === null
                        ? 'border-bluez/30 text-bluez/50 hover:border-bluez hover:text-bluez'
                        : 'border-bluez bg-bluez/10 text-bluez'
                    }`}
                    onClick={() => toggleOutput(rowIndex)}
                  >
                    {userOutputs[rowIndex] === null ? '?' : userOutputs[rowIndex]}
                  </button>
                )}
                
                <button 
                  className="ml-2 text-grayz hover:text-bluez transition-colors"
                  onClick={() => toggleRowExpansion(rowIndex)}
                >
                  {isExpanded ? (
                    <ChevronDown size={18} />
                  ) : (
                    <ChevronRight size={18} />
                  )}
                </button>
              </div>
            </td>
          </tr>
          
          {isExpanded && (
            <tr className="bg-bluez/5 border-t border-b border-bluez/10">
              <td colSpan={selectedExpression.variables.length + (showOperationSteps ? 2 : 1)} className="p-3">
                <div className="pl-4 py-2 text-sm border-l-2 border-bluez">
                  {getStepByStepExplanation(row, rowIndex)}
                </div>
              </td>
            </tr>
          )}
        </React.Fragment>
      );
    });
  };
  
  return (
    <div>
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-bluez mb-3">Truth Table Practice</h1>
        <div className="w-24 h-1 bg-bluez mx-auto rounded-full mb-4"></div>
        <p className="text-grayz">Fill in the truth table by clicking the output values</p>
      </div>
      
      {/* Expression Selector */}
      <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
        <h2 className="text-lg font-bold text-grayz mb-3">Select a Logical Expression:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {expressions.map((expression) => (
            <button
              key={expression.id}
              className={`p-3 rounded-lg transition-colors ${
                selectedExpression.id === expression.id
                  ? 'bg-bluez text-white'
                  : 'bg-offwhite text-grayz hover:bg-bluez/10'
              }`}
              onClick={() => {
                setSelectedExpression(expression);
                resetExercise();
              }}
            >
              {expression.text}
            </button>
          ))}
        </div>
      </div>
      
      {/* Controls */}
      <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
        <div className="flex flex-wrap justify-between items-center">
          <div className="mb-3 sm:mb-0">
            <label className="flex items-center text-grayz">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 text-bluez rounded focus:ring-bluez"
                checked={showOperationSteps}
                onChange={() => setShowOperationSteps(!showOperationSteps)}
              />
              Show intermediate steps
            </label>
          </div>
          
          <div className="flex space-x-3">
            <button
              className={`px-4 py-2 rounded-lg flex items-center ${
                userOutputs.includes(null)
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : isVerified
                    ? 'bg-bluez/20 text-grayz cursor-not-allowed'
                    : 'bg-bluez text-white hover:bg-bluez/90'
              }`}
              onClick={verifyAnswers}
              disabled={userOutputs.includes(null) || isVerified}
            >
              Verify
            </button>
            
            <button
              className="px-4 py-2 rounded-lg flex items-center bg-gray-200 text-grayz hover:bg-gray-300"
              onClick={resetExercise}
            >
              <RefreshCw size={16} className="mr-2" /> Reset
            </button>
            
            <button
              className="p-2 rounded-lg flex items-center bg-yellowz/20 text-grayz hover:bg-yellowz/30"
              onClick={() => setShowHint(!showHint)}
            >
              <HelpCircle size={16} />
            </button>
          </div>
        </div>
        
        {showHint && (
          <div className="mt-3 p-3 bg-yellowz/10 rounded-lg border border-yellowz/30">
            <p className="text-grayz text-sm">
              <span className="font-bold">Hint:</span> {getHint()}
            </p>
          </div>
        )}
      </div>
      
      {/* Truth Table */}
      <div className="bg-white p-5 rounded-lg shadow-sm mb-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {renderTableColumns()}
            </tr>
          </thead>
          <tbody>
            {renderTableRows()}
          </tbody>
        </table>
        
        {isVerified && (
          <div className="mt-4 p-3 rounded-lg bg-offwhite">
            <div className="flex items-center justify-between">
              <div className="font-bold text-lg text-grayz">
                Score: {calculateScore()}/{tableData.length}
              </div>
              
              <div className="text-sm text-grayz">
                {calculateScore() === tableData.length
                  ? 'Perfect! You understand this truth table.'
                  : 'Check the rows marked with corrections and try again!'}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Instructions */}
      <div className="bg-bluez/10 p-5 rounded-lg border border-bluez/30">
        <h2 className="text-lg font-bold text-bluez mb-3">How to Use This Tool</h2>
        <ul className="space-y-2 text-grayz">
          <li className="flex items-start">
            <span className="font-bold mr-2">1.</span> 
            <span>Select a logical expression to work with</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold mr-2">2.</span> 
            <span>Click the ? buttons in the output column to cycle between 0 and 1</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold mr-2">3.</span> 
            <span>Click the arrow next to any row to see a step-by-step explanation</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold mr-2">4.</span> 
            <span>Enable "Show intermediate steps" for complex expressions to see the calculation process</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold mr-2">5.</span> 
            <span>Click "Verify" when you've filled in all outputs to check your answers</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TruthTableBuilder;