import React, { useState } from 'react';
import { Info, Check, X, RotateCw } from 'lucide-react';

const LogicalOperatorsLessonPart1 = () => {
  const [showExplanation, setShowExplanation] = useState(false);
  const [activeOperator, setActiveOperator] = useState('and');
  
  // Operator image mapping
  const operatorImages = {
    and: "/src/assets/And.png",
    or: "/src/assets/OR.png",
    not: "/src/assets/Not.png",
    xor: "/src/assets/Xor.png",
    nand: "/src/assets/Nand.png",
    nor: "/src/assets/Nor.png",
    xnor: "/src/assets/Xnor.png",
  };
  
  // Function to handle operator selection
  const handleOperatorChange = (operator) => {
    setActiveOperator(operator);
  };
  
  // Render truth table based on selected operator
  const renderTruthTable = () => {
    switch(activeOperator) {
      case 'and':
        return (
          <table className="w-full text-center">
            <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
              <tr>
                <th className="p-3 border-b border-r border-gray-200 font-bold text-bluez">A</th>
                <th className="p-3 border-b border-r border-gray-200 font-bold text-bluez">B</th>
                <th className="p-3 border-b border-gray-200 font-bold text-bluez">A ∧ B (AND)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-r border-b border-gray-200">0</td>
                <td className="p-3 border-r border-b border-gray-200">0</td>
                <td className="p-3 border-b border-gray-200">0</td>
              </tr>
              <tr>
                <td className="p-3 border-r border-b border-gray-200">0</td>
                <td className="p-3 border-r border-b border-gray-200">1</td>
                <td className="p-3 border-b border-gray-200">0</td>
              </tr>
              <tr>
                <td className="p-3 border-r border-b border-gray-200">1</td>
                <td className="p-3 border-r border-b border-gray-200">0</td>
                <td className="p-3 border-b border-gray-200">0</td>
              </tr>
              <tr>
                <td className="p-3 border-r border-gray-200">1</td>
                <td className="p-3 border-r border-gray-200">1</td>
                <td className="p-3 border-gray-200 font-bold">1</td>
              </tr>
            </tbody>
          </table>
        );
      case 'or':
        return (
          <table className="w-full text-center">
            <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
              <tr>
                <th className="p-3 border-b border-r border-gray-200 font-bold text-bluez">A</th>
                <th className="p-3 border-b border-r border-gray-200 font-bold text-bluez">B</th>
                <th className="p-3 border-b border-gray-200 font-bold text-bluez">A ∨ B (OR)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-r border-b border-gray-200">0</td>
                <td className="p-3 border-r border-b border-gray-200">0</td>
                <td className="p-3 border-b border-gray-200">0</td>
              </tr>
              <tr>
                <td className="p-3 border-r border-b border-gray-200">0</td>
                <td className="p-3 border-r border-b border-gray-200">1</td>
                <td className="p-3 border-b border-gray-200 font-bold">1</td>
              </tr>
              <tr>
                <td className="p-3 border-r border-b border-gray-200">1</td>
                <td className="p-3 border-r border-b border-gray-200">0</td>
                <td className="p-3 border-b border-gray-200 font-bold">1</td>
              </tr>
              <tr>
                <td className="p-3 border-r border-gray-200">1</td>
                <td className="p-3 border-r border-gray-200">1</td>
                <td className="p-3 border-gray-200 font-bold">1</td>
              </tr>
            </tbody>
          </table>
        );
      case 'not':
        return (
          <table className="w-full text-center">
            <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
              <tr>
                <th className="p-3 border-b border-r border-gray-200 font-bold text-bluez">A</th>
                <th className="p-3 border-b border-gray-200 font-bold text-bluez">¬A (NOT)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-r border-b border-gray-200">0</td>
                <td className="p-3 border-b border-gray-200 font-bold">1</td>
              </tr>
              <tr>
                <td className="p-3 border-r border-gray-200">1</td>
                <td className="p-3 border-gray-200 font-bold">0</td>
              </tr>
            </tbody>
          </table>
        );
      case 'xor':
        return (
          <table className="w-full text-center">
            <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
              <tr>
                <th className="p-3 border-b border-r border-gray-200 font-bold text-bluez">A</th>
                <th className="p-3 border-b border-r border-gray-200 font-bold text-bluez">B</th>
                <th className="p-3 border-b border-gray-200 font-bold text-bluez">A ⊕ B (XOR)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-r border-b border-gray-200">0</td>
                <td className="p-3 border-r border-b border-gray-200">0</td>
                <td className="p-3 border-b border-gray-200">0</td>
              </tr>
              <tr>
                <td className="p-3 border-r border-b border-gray-200">0</td>
                <td className="p-3 border-r border-b border-gray-200">1</td>
                <td className="p-3 border-b border-gray-200 font-bold">1</td>
              </tr>
              <tr>
                <td className="p-3 border-r border-b border-gray-200">1</td>
                <td className="p-3 border-r border-b border-gray-200">0</td>
                <td className="p-3 border-b border-gray-200 font-bold">1</td>
              </tr>
              <tr>
                <td className="p-3 border-r border-gray-200">1</td>
                <td className="p-3 border-r border-gray-200">1</td>
                <td className="p-3 border-gray-200">0</td>
              </tr>
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };
  
  // Render operator explanation
  const renderExplanation = () => {
    switch(activeOperator) {
      case 'and':
        return "The AND operation (symbol: ∧) returns True (1) only when both inputs are True (1). Otherwise, it returns False (0). It's used when all conditions must be met simultaneously.";
      case 'or':
        return "The OR operation (symbol: ∨) returns True (1) if at least one input is True (1). It only returns False (0) when all inputs are False (0). It's used when at least one condition needs to be satisfied.";
      case 'not':
        return "The NOT operation (symbol: ¬) inverts its input: True becomes False, and False becomes True. It's used when you need the opposite of a condition.";
      case 'xor':
        return "The XOR (Exclusive OR) operation (symbol: ⊕) returns True (1) when inputs are different. It returns False (0) when inputs are the same. It's used for detecting differences between signals.";
      default:
        return "";
    }
  };
  
  // Get operator symbol
  const getOperatorSymbol = () => {
    switch(activeOperator) {
      case 'and': return "∧";
      case 'or': return "∨";
      case 'not': return "¬";
      case 'xor': return "⊕";
      default: return "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-bluez mb-3">Logical Operators</h1>
        <div className="w-24 h-1 bg-bluez mx-auto rounded-full"></div>
      </div>
      
      {/* Introduction */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="flex items-start mb-4">
          <div className="text-2xl text-darkpurple mr-3">🧠</div>
          <div>
            <h2 className="text-xl font-bold text-grayz mb-4">What are Logical Operators?</h2>
            
            <p className="text-grayz mb-4 leading-relaxed bg-offwhite p-4 rounded-md border-l-4 border-bluez">
              <span className="text-bluez font-medium">Logical operators are symbols or words used to connect two or more logical statements</span> and return a Boolean result — either True (1) or False (0).
            </p>
            
            <p className="text-grayz leading-relaxed mb-6">
              They are the building blocks of Boolean algebra and digital logic circuits. You'll see them in programming, electronics, and computer architecture.
            </p>
            
            {/* Interactive Operator Selector */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-inner">
              <h3 className="text-lg font-semibold text-grayz mb-4 text-center">Explore Different Logical Operators</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                <button
                  className={`p-4 rounded-lg transition-all shadow-sm flex flex-col items-center justify-center ${activeOperator === 'and' ? 'bg-bluez text-white shadow-md' : 'bg-white hover:bg-blue-50 text-grayz'}`}
                  onClick={() => handleOperatorChange('and')}
                >
                  <span className="text-2xl font-bold mb-1">∧</span>
                  <span className="font-medium">AND</span>
                </button>
                
                <button
                  className={`p-4 rounded-lg transition-all shadow-sm flex flex-col items-center justify-center ${activeOperator === 'or' ? 'bg-bluez text-white shadow-md' : 'bg-white hover:bg-blue-50 text-grayz'}`}
                  onClick={() => handleOperatorChange('or')}
                >
                  <span className="text-2xl font-bold mb-1">∨</span>
                  <span className="font-medium">OR</span>
                </button>
                
                <button
                  className={`p-4 rounded-lg transition-all shadow-sm flex flex-col items-center justify-center ${activeOperator === 'not' ? 'bg-bluez text-white shadow-md' : 'bg-white hover:bg-blue-50 text-grayz'}`}
                  onClick={() => handleOperatorChange('not')}
                >
                  <span className="text-2xl font-bold mb-1">¬</span>
                  <span className="font-medium">NOT</span>
                </button>
                
                <button
                  className={`p-4 rounded-lg transition-all shadow-sm flex flex-col items-center justify-center ${activeOperator === 'xor' ? 'bg-bluez text-white shadow-md' : 'bg-white hover:bg-blue-50 text-grayz'}`}
                  onClick={() => handleOperatorChange('xor')}
                >
                  <span className="text-2xl font-bold mb-1">⊕</span>
                  <span className="font-medium">XOR</span>
                </button>
              </div>
              
              {/* Operator Display */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-bluez flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                      <span className="font-bold text-bluez">{getOperatorSymbol()}</span>
                    </div>
                    {activeOperator.toUpperCase()} Operation
                  </h3>
                  <button 
                    className="bg-blue-50 hover:bg-blue-100 text-bluez hover:text-blue-800 py-2 px-4 rounded-lg flex items-center text-sm transition-colors"
                    onClick={() => setShowExplanation(!showExplanation)}
                  >
                    <Info size={16} className="mr-1" />
                    {showExplanation ? "Hide Explanation" : "Show Explanation"}
                  </button>
                </div>
                
                {/* Operator Image */}
                <div className="mb-6 flex justify-center">
                  {operatorImages[activeOperator] ? (
                    <img 
                      src={operatorImages[activeOperator]} 
                      alt={`${activeOperator.toUpperCase()} gate diagram`}
                      className="h-32 object-contain border border-gray-200 rounded-lg p-2 bg-gray-50"
                    />
                  ) : (
                    <div className="h-32 w-60 flex items-center justify-center border border-gray-200 rounded-lg p-2 bg-gray-50 text-gray-400">
                      Image placeholder for {activeOperator.toUpperCase()} operator
                    </div>
                  )}
                </div>
                
                {showExplanation && (
                  <div className="bg-blue-50 p-4 rounded-xl shadow-sm mb-6 transition-all border-l-4 border-bluez">
                    <p className="text-grayz">{renderExplanation()}</p>
                  </div>
                )}
                
                {/* Truth Table */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
                  {renderTruthTable()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogicalOperatorsLessonPart1;