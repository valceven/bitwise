import React from 'react';

// Custom colors from the provided palette
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

// Logic gate symbols as SVG components
const LogicGateSymbols = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-6">
      {/* AND Gate */}
      <div className="flex flex-col items-center">
        <svg width="80" height="60" viewBox="0 0 80 60">
          <path d="M20,10 L20,50 L40,50 Q60,30 40,10 L20,10 Z" 
                fill="white" stroke={colors.bluez} strokeWidth="2"/>
          <line x1="0" y1="20" x2="20" y2="20" stroke={colors.bluez} strokeWidth="2"/>
          <line x1="0" y1="40" x2="20" y2="40" stroke={colors.bluez} strokeWidth="2"/>
          <line x1="60" y1="30" x2="80" y2="30" stroke={colors.bluez} strokeWidth="2"/>
        </svg>
        <p className="text-center mt-2 font-semibold">AND</p>
      </div>
      
      {/* OR Gate */}
      <div className="flex flex-col items-center">
        <svg width="80" height="60" viewBox="0 0 80 60">
          <path d="M20,10 Q40,10 60,30 Q40,50 20,50 Q30,30 20,10 Z" 
                fill="white" stroke={colors.bluez} strokeWidth="2"/>
          <line x1="0" y1="20" x2="20" y2="20" stroke={colors.bluez} strokeWidth="2"/>
          <line x1="0" y1="40" x2="20" y2="40" stroke={colors.bluez} strokeWidth="2"/>
          <line x1="60" y1="30" x2="80" y2="30" stroke={colors.bluez} strokeWidth="2"/>
        </svg>
        <p className="text-center mt-2 font-semibold">OR</p>
      </div>
      
      {/* NOT Gate */}
      <div className="flex flex-col items-center">
        <svg width="80" height="60" viewBox="0 0 80 60">
          <path d="M20,10 L20,50 L50,30 Z" 
                fill="white" stroke={colors.bluez} strokeWidth="2"/>
          <circle cx="55" cy="30" r="5" 
                 fill="white" stroke={colors.bluez} strokeWidth="2"/>
          <line x1="0" y1="30" x2="20" y2="30" stroke={colors.bluez} strokeWidth="2"/>
          <line x1="60" y1="30" x2="80" y2="30" stroke={colors.bluez} strokeWidth="2"/>
        </svg>
        <p className="text-center mt-2 font-semibold">NOT</p>
      </div>
      
      {/* XOR Gate */}
      <div className="flex flex-col items-center">
        <svg width="80" height="60" viewBox="0 0 80 60">
          <path d="M25,10 Q45,10 65,30 Q45,50 25,50 Q35,30 25,10 Z" 
                fill="white" stroke={colors.bluez} strokeWidth="2"/>
          <path d="M15,10 Q25,30 15,50" 
                fill="none" stroke={colors.bluez} strokeWidth="2"/>
          <line x1="0" y1="20" x2="15" y2="20" stroke={colors.bluez} strokeWidth="2"/>
          <line x1="0" y1="40" x2="15" y2="40" stroke={colors.bluez} strokeWidth="2"/>
          <line x1="65" y1="30" x2="80" y2="30" stroke={colors.bluez} strokeWidth="2"/>
        </svg>
        <p className="text-center mt-2 font-semibold">XOR</p>
      </div>
    </div>
  );
};

// Truth Table Component
const TruthTable = ({ operator }) => {
  const tables = {
    "AND": [
      { A: 0, B: 0, Output: 0 },
      { A: 0, B: 1, Output: 0 },
      { A: 1, B: 0, Output: 0 },
      { A: 1, B: 1, Output: 1 }
    ],
    "OR": [
      { A: 0, B: 0, Output: 0 },
      { A: 0, B: 1, Output: 1 },
      { A: 1, B: 0, Output: 1 },
      { A: 1, B: 1, Output: 1 }
    ],
    "NOT": [
      { A: 0, Output: 1 },
      { A: 1, Output: 0 }
    ],
    "NAND": [
      { A: 0, B: 0, Output: 1 },
      { A: 0, B: 1, Output: 1 },
      { A: 1, B: 0, Output: 1 },
      { A: 1, B: 1, Output: 0 }
    ],
    "NOR": [
      { A: 0, B: 0, Output: 1 },
      { A: 0, B: 1, Output: 0 },
      { A: 1, B: 0, Output: 0 },
      { A: 1, B: 1, Output: 0 }
    ],
    "XOR": [
      { A: 0, B: 0, Output: 0 },
      { A: 0, B: 1, Output: 1 },
      { A: 1, B: 0, Output: 1 },
      { A: 1, B: 1, Output: 0 }
    ],
    "XNOR": [
      { A: 0, B: 0, Output: 1 },
      { A: 0, B: 1, Output: 0 },
      { A: 1, B: 0, Output: 0 },
      { A: 1, B: 1, Output: 1 }
    ]
  };

  const data = tables[operator];
  const columns = Object.keys(data[0]);

  return (
    <div className="bg-white rounded shadow-sm border border-grayz/20 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-bluez text-white">
            {columns.map((col, idx) => (
              <th key={idx} className="p-2 text-center">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={rowIdx} className={rowIdx % 2 === 0 ? "bg-offwhite" : "bg-white"}>
              {columns.map((col, colIdx) => (
                <td key={colIdx} className="p-2 text-center border-t border-grayz/10">
                  <span className={col === "Output" && row[col] === 1 ? "text-bluez font-bold" : ""}>
                    {row[col]}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Main Component
const LogicalOperatorsKeyTakeaways = () => {
  // Operator definitions
  const operators = [
    { 
      name: "AND", 
      symbol: "∧", 
      definition: "Outputs 1 only if both inputs are 1", 
      example: "A AND B is true only when both A and B are true."
    },
    { 
      name: "OR", 
      symbol: "∨", 
      definition: "Outputs 1 when at least one input is 1", 
      example: "A OR B is true when either A or B (or both) are true."
    },
    { 
      name: "NOT", 
      symbol: "¬", 
      definition: "Inverts the input value", 
      example: "NOT A is true when A is false, and false when A is true."
    },
    { 
      name: "NAND", 
      symbol: "↑", 
      definition: "Opposite of AND (NOT AND)", 
      example: "A NAND B is false only when both A and B are true."
    },
    { 
      name: "NOR", 
      symbol: "↓", 
      definition: "Opposite of OR (NOT OR)", 
      example: "A NOR B is true only when both A and B are false."
    },
    { 
      name: "XOR", 
      symbol: "⊕", 
      definition: "Outputs 1 only when inputs are different", 
      example: "A XOR B is true when either A or B is true, but not both."
    },
    { 
      name: "XNOR", 
      symbol: "⊙", 
      definition: "Outputs 1 only when inputs are the same", 
      example: "A XNOR B is true when A and B have the same value."
    }
  ];

  return (
    <div className="p-6 bg-offwhite rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-bluez mb-2">Logical Operators: Key Takeaways</h1>
        <p className="text-grayz">Understanding the fundamental building blocks of digital logic</p>
      </div>
      
      {/* Learning Objectives Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border-l-4" style={{ borderLeftColor: colors.bluez }}>
        <h2 className="text-lg font-bold mb-3 text-bluez">Learning Objectives</h2>
        <ul className="list-disc list-inside space-y-2 text-grayz">
          <li>Define common logical operators</li>
          <li>Explain how each operator works using binary logic</li>
          <li>Differentiate operators based on their behavior</li>
          <li>Recognize logic gate symbols associated with each operator</li>
        </ul>
      </div>

      {/* Logic Gate Symbols */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-blackz border-b-2 pb-2" style={{ borderColor: colors.bluez }}>
          Logic Gate Symbols
        </h2>
        <LogicGateSymbols />
      </div>
      
      {/* Key Takeaways Section */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-blackz border-b-2 pb-2" style={{ borderColor: colors.bluez }}>
          Key Takeaways
        </h2>
        
        <div className="space-y-4">
          {/* Understanding Binary Logic */}
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="font-bold mb-3 text-darkpurple">Understanding Binary Logic</h3>
            <ul className="list-disc list-inside space-y-2 ml-2 text-grayz">
              <li>Logical operators work with binary inputs (0 or 1, TRUE or FALSE)</li>
              <li>Each operator performs a specific function on these inputs</li>
              <li>Truth tables show all possible input combinations and their outputs</li>
            </ul>
          </div>
          
          {/* Basic Logical Operators */}
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="font-bold mb-3 text-darkpurple">Basic Logical Operators</h3>
            <ul className="list-disc list-inside space-y-2 ml-2 text-grayz">
              <li><span className="font-semibold">AND</span>: Outputs 1 only when all inputs are 1 (conjunction)</li>
              <li><span className="font-semibold">OR</span>: Outputs 1 when at least one input is 1 (disjunction)</li>
              <li><span className="font-semibold">NOT</span>: Inverts the input value (negation)</li>
            </ul>
          </div>
          
          {/* Compound Logical Operators */}
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="font-bold mb-3 text-darkpurple">Compound Logical Operators</h3>
            <ul className="list-disc list-inside space-y-2 ml-2 text-grayz">
              <li><span className="font-semibold">NAND</span>: "Not AND" - Opposite of AND, outputs 0 only when all inputs are 1</li>
              <li><span className="font-semibold">NOR</span>: "Not OR" - Opposite of OR, outputs 1 only when all inputs are 0</li>
              <li><span className="font-semibold">XOR</span>: "Exclusive OR" - Outputs 1 only when inputs are different</li>
              <li><span className="font-semibold">XNOR</span>: "Exclusive NOR" - Outputs 1 only when all inputs are the same</li>
            </ul>
          </div>
          
          {/* Applications of Logical Operators */}
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="font-bold mb-3 text-darkpurple">Applications of Logical Operators</h3>
            <ul className="list-disc list-inside space-y-2 ml-2 text-grayz">
              <li>Building blocks of digital circuits and computer systems</li>
              <li>Used in programming for conditional statements and control flow</li>
              <li>Essential for database queries and search functions</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Operators in Detail Section */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-blackz border-b-2 pb-2" style={{ borderColor: colors.bluez }}>
          Operators in Detail
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {operators.map((op, idx) => (
            <div key={idx} className="bg-white p-5 rounded-lg shadow-sm border-t-4" style={{ borderTopColor: colors.bluez }}>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-lg">{op.name}</h3>
                <span className="text-2xl text-bluez font-bold">{op.symbol}</span>
              </div>
              <p className="mb-3 text-grayz">{op.definition}</p>
              <p className="text-sm italic text-grayz">{op.example}</p>
              
              <div className="mt-4">
                <p className="text-sm font-semibold mb-2 text-darkpurple">Truth Table:</p>
                <TruthTable operator={op.name} />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Summary Section */}
      <div className="bg-bluez/10 p-5 rounded-lg border border-bluez/20">
        <h2 className="text-lg font-bold mb-3 text-bluez">Summary</h2>
        <p className="text-grayz">
          Logical operators are fundamental to digital systems and programming. They provide a way to make decisions based on conditions and are the foundation of all computing systems. Understanding how each operator behaves with different inputs is essential for designing circuits, writing efficient code, and solving logical problems.
        </p>
      </div>
    </div>
  );
};

export default LogicalOperatorsKeyTakeaways;