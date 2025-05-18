import React, { useState } from 'react';
import { Info, Check, X, RotateCw, Image } from 'lucide-react';

const LogicalOperatorsPart2 = () => {
  const [activeOperator, setActiveOperator] = useState('nand');
  const [showDescription, setShowDescription] = useState(true);
  const [showSymbol, setShowSymbol] = useState(true);
  const operatorImages = {
  nand: "/src/assets/Nand.png",
  nor: "/src/assets/Nor.png",
  xor: "/src/assets/Xor.png",
  xnor: "/src/assets/Xnor.png",
};


  // Function to render active truth table
  const renderTruthTable = () => {
    switch(activeOperator) {
      case 'nand':
        return (
          <table className="w-full text-center">
            <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
              <tr>
                <th className="p-3 border-b border-r border-gray-200 font-bold text-bluez">A</th>
                <th className="p-3 border-b border-r border-gray-200 font-bold text-bluez">B</th>
                <th className="p-3 border-b border-gray-200 font-bold text-bluez">A NAND B</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-r border-b border-gray-200">0</td>
                <td className="p-3 border-r border-b border-gray-200">0</td>
                <td className="p-3 border-b border-gray-200 font-bold text-greenz">1 ✓</td>
              </tr>
              <tr>
                <td className="p-3 border-r border-b border-gray-200">0</td>
                <td className="p-3 border-r border-b border-gray-200">1</td>
                <td className="p-3 border-b border-gray-200 font-bold text-greenz">1 ✓</td>
              </tr>
              <tr>
                <td className="p-3 border-r border-b border-gray-200">1</td>
                <td className="p-3 border-r border-b border-gray-200">0</td>
                <td className="p-3 border-b border-gray-200 font-bold text-greenz">1 ✓</td>
              </tr>
              <tr>
                <td className="p-3 border-r border-gray-200">1</td>
                <td className="p-3 border-r border-gray-200">1</td>
                <td className="p-3 border-gray-200 font-bold text-redz">0 ✗</td>
              </tr>
            </tbody>
          </table>
        );
      case 'nor':
        return (
          <table className="w-full text-center">
            <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
              <tr>
                <th className="p-3 border-b border-r border-gray-200 font-bold text-bluez">A</th>
                <th className="p-3 border-b border-r border-gray-200 font-bold text-bluez">B</th>
                <th className="p-3 border-b border-gray-200 font-bold text-bluez">A NOR B</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-r border-b border-gray-200">0</td>
                <td className="p-3 border-r border-b border-gray-200">0</td>
                <td className="p-3 border-b border-gray-200 font-bold text-greenz">1 ✓</td>
              </tr>
              <tr>
                <td className="p-3 border-r border-b border-gray-200">0</td>
                <td className="p-3 border-r border-b border-gray-200">1</td>
                <td className="p-3 border-b border-gray-200 font-bold text-redz">0 ✗</td>
              </tr>
              <tr>
                <td className="p-3 border-r border-b border-gray-200">1</td>
                <td className="p-3 border-r border-b border-gray-200">0</td>
                <td className="p-3 border-b border-gray-200 font-bold text-redz">0 ✗</td>
              </tr>
              <tr>
                <td className="p-3 border-r border-gray-200">1</td>
                <td className="p-3 border-r border-gray-200">1</td>
                <td className="p-3 border-gray-200 font-bold text-redz">0 ✗</td>
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
                <th className="p-3 border-b border-gray-200 font-bold text-bluez">A XOR B</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-r border-b border-gray-200">0</td>
                <td className="p-3 border-r border-b border-gray-200">0</td>
                <td className="p-3 border-b border-gray-200 font-bold text-redz">0 ✗</td>
              </tr>
              <tr>
                <td className="p-3 border-r border-b border-gray-200">0</td>
                <td className="p-3 border-r border-b border-gray-200">1</td>
                <td className="p-3 border-b border-gray-200 font-bold text-greenz">1 ✓</td>
              </tr>
              <tr>
                <td className="p-3 border-r border-b border-gray-200">1</td>
                <td className="p-3 border-r border-b border-gray-200">0</td>
                <td className="p-3 border-b border-gray-200 font-bold text-greenz">1 ✓</td>
              </tr>
              <tr>
                <td className="p-3 border-r border-gray-200">1</td>
                <td className="p-3 border-r border-gray-200">1</td>
                <td className="p-3 border-gray-200 font-bold text-redz">0 ✗</td>
              </tr>
            </tbody>
          </table>
        );
      case 'xnor':
        return (
          <table className="w-full text-center">
            <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
              <tr>
                <th className="p-3 border-b border-r border-gray-200 font-bold text-bluez">A</th>
                <th className="p-3 border-b border-r border-gray-200 font-bold text-bluez">B</th>
                <th className="p-3 border-b border-gray-200 font-bold text-bluez">A XNOR B</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-r border-b border-gray-200">0</td>
                <td className="p-3 border-r border-b border-gray-200">0</td>
                <td className="p-3 border-b border-gray-200 font-bold text-greenz">1 ✓</td>
              </tr>
              <tr>
                <td className="p-3 border-r border-b border-gray-200">0</td>
                <td className="p-3 border-r border-b border-gray-200">1</td>
                <td className="p-3 border-b border-gray-200 font-bold text-redz">0 ✗</td>
              </tr>
              <tr>
                <td className="p-3 border-r border-b border-gray-200">1</td>
                <td className="p-3 border-r border-b border-gray-200">0</td>
                <td className="p-3 border-b border-gray-200 font-bold text-redz">0 ✗</td>
              </tr>
              <tr>
                <td className="p-3 border-r border-gray-200">1</td>
                <td className="p-3 border-r border-gray-200">1</td>
                <td className="p-3 border-gray-200 font-bold text-greenz">1 ✓</td>
              </tr>
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };

  // Get operator details
  const getOperatorDetails = () => {
    switch(activeOperator) {
      case 'nand':
        return {
          name: "NAND",
          symbol: "↑",
          description: "Opposite of AND. Returns 0 only when both inputs are 1. For all other input combinations, it returns 1.",
          formula: "NAND = NOT (A AND B)",
          realWorldUse: "NAND gates are universal, meaning any other logic gate can be built using only NAND gates. They're fundamental in computer hardware."
        };
      case 'nor':
        return {
          name: "NOR",
          symbol: "↓",
          description: "Opposite of OR. Returns 1 only when both inputs are 0. For all other input combinations, it returns 0.",
          formula: "NOR = NOT (A OR B)",
          realWorldUse: "NOR gates, like NAND, are universal and can be used to create any other logic gate. They're important in digital circuit design."
        };
      case 'xor':
        return {
          name: "XOR",
          symbol: "⊕",
          description: "Returns 1 only if inputs are different. If both inputs are the same (both 0 or both 1), it returns 0.",
          formula: "XOR = (A AND NOT B) OR (NOT A AND B)",
          realWorldUse: "XOR is used in cryptography, error detection, and binary addition circuits."
        };
      case 'xnor':
        return {
          name: "XNOR",
          symbol: "⊙",
          description: "Returns 1 if inputs are the same (both 0 or both 1). If inputs are different, it returns 0.",
          formula: "XNOR = NOT (A XOR B)",
          realWorldUse: "XNOR is used in comparator circuits, error detection, and in some cryptographic operations."
        };
      default:
        return {
          name: "",
          symbol: "",
          description: "",
          formula: "",
          realWorldUse: ""
        };
    }
  };

  const operatorDetails = getOperatorDetails();

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-bluez mb-3">Advanced Logical Operators</h1>
        <div className="w-24 h-1 bg-bluez mx-auto rounded-full"></div>
      </div>
      
      {/* Introduction */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 border-l-4 border-bluez">
        <div className="flex items-start mb-4">
          <div className="text-2xl text-darkpurple mr-3">🧱</div>
          <div>
            <h2 className="text-xl font-bold text-grayz mb-4">Types of Logical Operators</h2>
            <p className="text-grayz leading-relaxed">
              Beyond the basic AND, OR, and NOT operators, there are several other important logical operators used in digital systems. These operators combine basic operations to create more complex logical functions. Let's explore these operators and understand their behavior.
            </p>
          </div>
        </div>
      </div>
      
      {/* Interactive Operator Selection */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h3 className="text-lg font-semibold text-grayz mb-4 text-center">Select an Operator to Explore</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <button
            className={`p-4 rounded-lg transition-all shadow-sm flex flex-col items-center justify-center ${activeOperator === 'nand' ? 'bg-bluez text-white shadow-md' : 'bg-offwhite hover:bg-blue-50 text-grayz'}`}
            onClick={() => setActiveOperator('nand')}
          >
            <span className="text-2xl font-bold mb-1">↑</span>
            <span className="font-medium">NAND</span>
          </button>
          
          <button
            className={`p-4 rounded-lg transition-all shadow-sm flex flex-col items-center justify-center ${activeOperator === 'nor' ? 'bg-bluez text-white shadow-md' : 'bg-offwhite hover:bg-blue-50 text-grayz'}`}
            onClick={() => setActiveOperator('nor')}
          >
            <span className="text-2xl font-bold mb-1">↓</span>
            <span className="font-medium">NOR</span>
          </button>
          
          <button
            className={`p-4 rounded-lg transition-all shadow-sm flex flex-col items-center justify-center ${activeOperator === 'xor' ? 'bg-bluez text-white shadow-md' : 'bg-offwhite hover:bg-blue-50 text-grayz'}`}
            onClick={() => setActiveOperator('xor')}
          >
            <span className="text-2xl font-bold mb-1">⊕</span>
            <span className="font-medium">XOR</span>
          </button>
          
          <button
            className={`p-4 rounded-lg transition-all shadow-sm flex flex-col items-center justify-center ${activeOperator === 'xnor' ? 'bg-bluez text-white shadow-md' : 'bg-offwhite hover:bg-blue-50 text-grayz'}`}
            onClick={() => setActiveOperator('xnor')}
          >
            <span className="text-2xl font-bold mb-1">⊙</span>
            <span className="font-medium">XNOR</span>
          </button>
        </div>
      </div>
      
      {/* Operator Details */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-bluez flex items-center">
            <span className="mr-2">{operatorDetails.name}</span>
            <span className="text-2xl">({operatorDetails.symbol})</span>
          </h2>
          
          <div className="flex space-x-2">
            <button 
              className={`px-3 py-1 rounded-md transition-colors flex items-center text-sm ${showDescription ? 'bg-bluez text-white' : 'bg-gray-100 text-grayz hover:bg-gray-200'}`}
              onClick={() => setShowDescription(!showDescription)}
            >
              <Info size={14} className="mr-1" />
              Description
            </button>
            <button 
              className={`px-3 py-1 rounded-md transition-colors flex items-center text-sm ${showSymbol ? 'bg-bluez text-white' : 'bg-gray-100 text-grayz hover:bg-gray-200'}`}
              onClick={() => setShowSymbol(!showSymbol)}
            >
              <Image size={14} className="mr-1" />
              Symbol
            </button>
          </div>
        </div>
        
        {/* Operator Description */}
        {showDescription && (
          <div className="bg-offwhite p-4 rounded-lg mb-6 border-l-4 border-bluez">
            <h3 className="font-semibold text-grayz mb-2">Description:</h3>
            <p className="text-grayz mb-4">{operatorDetails.description}</p>
            
            <h3 className="font-semibold text-grayz mb-2">Formula:</h3>
            <p className="text-bluez font-mono bg-white p-2 rounded mb-4 inline-block">{operatorDetails.formula}</p>
            
            <h3 className="font-semibold text-grayz mb-2">Real-world Application:</h3>
            <p className="text-grayz">{operatorDetails.realWorldUse}</p>
          </div>
        )}
        
        {/* Truth Table and Symbol Visualization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Truth Table */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3">
              <h3 className="font-semibold text-bluez">Truth Table</h3>
            </div>
            {renderTruthTable()}
          </div>
          
          {/* Gate Symbol */}
            {showSymbol && (
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3">
                <h3 className="font-semibold text-bluez">Gate Symbol</h3>
                </div>
                <div className="p-6 flex flex-col items-center justify-center">
                <div className="w-56 h-48 bg-gray-100 rounded-md flex items-center justify-center mb-3">
                    <img
                    src={operatorImages[activeOperator] || "/src/assets/default.png"}
                    alt={`${activeOperator} Gate`}
                    className="w-56 h-32 opacity-50"
                    />
                </div>
                </div>
            </div>
            )}

        </div>
      </div>
      
      
      
      {/* Summary Table */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-bluez mb-4 flex items-center">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
            <span className="text-bluez">🧮</span>
          </div>
          Operator Summary
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
              <tr>
                <th className="p-3 border-b border-r border-gray-200 font-bold text-grayz">Operator</th>
                <th className="p-3 border-b border-r border-gray-200 font-bold text-grayz">Symbol</th>
                <th className="p-3 border-b border-r border-gray-200 font-bold text-grayz">Output is TRUE when...</th>
                <th className="p-3 border-b border-gray-200 font-bold text-grayz">Gate Name</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="p-3 border-r border-gray-100 font-medium">AND</td>
                <td className="p-3 border-r border-gray-100 font-mono text-center">∧</td>
                <td className="p-3 border-r border-gray-100">Both A and B are 1</td>
                <td className="p-3">AND Gate</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="p-3 border-r border-gray-100 font-medium">OR</td>
                <td className="p-3 border-r border-gray-100 font-mono text-center">∨</td>
                <td className="p-3 border-r border-gray-100">Either A or B is 1</td>
                <td className="p-3">OR Gate</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="p-3 border-r border-gray-100 font-medium">NOT</td>
                <td className="p-3 border-r border-gray-100 font-mono text-center">¬</td>
                <td className="p-3 border-r border-gray-100">A is 0 (it inverts A)</td>
                <td className="p-3">NOT Gate</td>
              </tr>
              <tr className={`border-b border-gray-100 ${activeOperator === 'nand' ? 'bg-blue-50' : ''}`}>
                <td className="p-3 border-r border-gray-100 font-medium">NAND</td>
                <td className="p-3 border-r border-gray-100 font-mono text-center">↑</td>
                <td className="p-3 border-r border-gray-100">NOT (A AND B)</td>
                <td className="p-3">NAND Gate</td>
              </tr>
              <tr className={`border-b border-gray-100 ${activeOperator === 'nor' ? 'bg-blue-50' : ''}`}>
                <td className="p-3 border-r border-gray-100 font-medium">NOR</td>
                <td className="p-3 border-r border-gray-100 font-mono text-center">↓</td>
                <td className="p-3 border-r border-gray-100">NOT (A OR B)</td>
                <td className="p-3">NOR Gate</td>
              </tr>
              <tr className={`border-b border-gray-100 ${activeOperator === 'xor' ? 'bg-blue-50' : ''}`}>
                <td className="p-3 border-r border-gray-100 font-medium">XOR</td>
                <td className="p-3 border-r border-gray-100 font-mono text-center">⊕</td>
                <td className="p-3 border-r border-gray-100">A and B are different</td>
                <td className="p-3">XOR Gate</td>
              </tr>
              <tr className={`${activeOperator === 'xnor' ? 'bg-blue-50' : ''}`}>
                <td className="p-3 border-r border-gray-100 font-medium">XNOR</td>
                <td className="p-3 border-r border-gray-100 font-mono text-center">⊙</td>
                <td className="p-3 border-r border-gray-100">A and B are the same</td>
                <td className="p-3">XNOR Gate</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-3 text-sm text-gray-500 text-center">
          <p>Currently selected operator is highlighted in the table</p>
        </div>
      </div>
    </div>
  );
};

export default LogicalOperatorsPart2;