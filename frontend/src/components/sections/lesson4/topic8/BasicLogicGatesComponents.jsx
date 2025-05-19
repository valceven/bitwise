import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BasicLogicGatesComponent = () => {
  const [selectedGate, setSelectedGate] = useState('not');
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);
  
  // Calculate outputs based on inputs and selected gate
  const calculateOutput = () => {
    switch(selectedGate) {
      case 'not':
        return !inputA;
      case 'and':
        return inputA && inputB;
      case 'or':
        return inputA || inputB;
      case 'nand':
        return !(inputA && inputB);
      case 'nor':
        return !(inputA || inputB);
      case 'xor':
        return inputA !== inputB;
      case 'xnor':
        return inputA === inputB;
      default:
        return false;
    }
  };
  
  // Gate data with symbols, descriptions and truth tables
  const gateData = {
    not: {
      name: "NOT Gate (Inverter)",
      description: "Inverts the input signal. When the input is 0, the output is 1, and vice versa.",
      booleanExpression: "Y = NOT A",
      truthTable: [
        { inputs: [0], output: 1 },
        { inputs: [1], output: 0 }
      ],
      color: "#F14E3A"
    },
    and: {
      name: "AND Gate",
      description: "Output is 1 only when all inputs are 1. It implements logical multiplication.",
      booleanExpression: "Y = A AND B",
      truthTable: [
        { inputs: [0, 0], output: 0 },
        { inputs: [0, 1], output: 0 },
        { inputs: [1, 0], output: 0 },
        { inputs: [1, 1], output: 1 }
      ],
      color: "#27AE60"
    },
    or: {
      name: "OR Gate",
      description: "Output is 1 when any input is 1. It implements logical addition.",
      booleanExpression: "Y = A OR B",
      truthTable: [
        { inputs: [0, 0], output: 0 },
        { inputs: [0, 1], output: 1 },
        { inputs: [1, 0], output: 1 },
        { inputs: [1, 1], output: 1 }
      ],
      color: "#F2C94C"
    },
    nand: {
      name: "NAND Gate",
      description: "Output is 0 only when all inputs are 1. It's the inverse of the AND gate.",
      booleanExpression: "Y = NOT (A AND B)",
      truthTable: [
        { inputs: [0, 0], output: 1 },
        { inputs: [0, 1], output: 1 },
        { inputs: [1, 0], output: 1 },
        { inputs: [1, 1], output: 0 }
      ],
      color: "#6E61FF"
    },
    nor: {
      name: "NOR Gate",
      description: "Output is 1 only when all inputs are 0. It's the inverse of the OR gate.",
      booleanExpression: "Y = NOT (A OR B)",
      truthTable: [
        { inputs: [0, 0], output: 1 },
        { inputs: [0, 1], output: 0 },
        { inputs: [1, 0], output: 0 },
        { inputs: [1, 1], output: 0 }
      ],
      color: "#56CCF2"
    },
    xor: {
      name: "XOR Gate (Exclusive OR)",
      description: "Output is 1 when the inputs are different. It's often called the 'inequality detector'.",
      booleanExpression: "Y = A XOR B = (A OR B) AND NOT (A AND B)",
      truthTable: [
        { inputs: [0, 0], output: 0 },
        { inputs: [0, 1], output: 1 },
        { inputs: [1, 0], output: 1 },
        { inputs: [1, 1], output: 0 }
      ],
      color: "#F2994A"
    },
    xnor: {
      name: "XNOR Gate (Exclusive NOR)",
      description: "Output is 1 when the inputs are the same. It's the inverse of the XOR gate.",
      booleanExpression: "Y = NOT (A XOR B)",
      truthTable: [
        { inputs: [0, 0], output: 1 },
        { inputs: [0, 1], output: 0 },
        { inputs: [1, 0], output: 0 },
        { inputs: [1, 1], output: 1 }
      ],
      color: "#9B51E0"
    }
  };
  
  // Gate symbols as SVG
  const gateSymbols = {
    not: (
      <svg width="180" height="80" viewBox="0 0 180 80">
        <path d="M40 40 L90 15 L90 65 Z" fill="#F1F6F1" stroke="#F14E3A" strokeWidth="2"/>
        <circle cx="95" cy="40" r="5" fill="#F1F6F1" stroke="#F14E3A" strokeWidth="2"/>
        <line x1="20" y1="40" x2="40" y2="40" stroke="#29314D" strokeWidth="2"/>
        <line x1="100" y1="40" x2="120" y2="40" stroke="#29314D" strokeWidth="2"/>
        <text x="15" y="35" fontSize="12" fill="#29314D">A</text>
        <text x="125" y="35" fontSize="12" fill="#29314D">Y</text>
      </svg>
    ),
    and: (
      <svg width="180" height="80" viewBox="0 0 180 80">
        <path d="M40 15 L75 15 Q100 15 100 40 Q100 65 75 65 L40 65 Z" fill="#F1F6F1" stroke="#27AE60" strokeWidth="2"/>
        <line x1="20" y1="25" x2="40" y2="25" stroke="#29314D" strokeWidth="2"/>
        <line x1="20" y1="55" x2="40" y2="55" stroke="#29314D" strokeWidth="2"/>
        <line x1="100" y1="40" x2="120" y2="40" stroke="#29314D" strokeWidth="2"/>
        <text x="15" y="20" fontSize="12" fill="#29314D">A</text>
        <text x="15" y="50" fontSize="12" fill="#29314D">B</text>
        <text x="125" y="35" fontSize="12" fill="#29314D">Y</text>
      </svg>
    ),
    or: (
      <svg width="180" height="80" viewBox="0 0 180 80">
        <path d="M40 15 C 60 15, 70 15, 100 40 C 70 65, 60 65, 40 65 C 50 40, 50 40, 40 15" fill="#F1F6F1" stroke="#F2C94C" strokeWidth="2"/>
        <line x1="20" y1="25" x2="40" y2="25" stroke="#29314D" strokeWidth="2"/>
        <line x1="20" y1="55" x2="40" y2="55" stroke="#29314D" strokeWidth="2"/>
        <line x1="100" y1="40" x2="120" y2="40" stroke="#29314D" strokeWidth="2"/>
        <text x="15" y="20" fontSize="12" fill="#29314D">A</text>
        <text x="15" y="50" fontSize="12" fill="#29314D">B</text>
        <text x="125" y="35" fontSize="12" fill="#29314D">Y</text>
      </svg>
    ),
    nand: (
      <svg width="180" height="80" viewBox="0 0 180 80">
        <path d="M40 15 L75 15 Q100 15 100 40 Q100 65 75 65 L40 65 Z" fill="#F1F6F1" stroke="#6E61FF" strokeWidth="2"/>
        <circle cx="105" cy="40" r="5" fill="#F1F6F1" stroke="#6E61FF" strokeWidth="2"/>
        <line x1="20" y1="25" x2="40" y2="25" stroke="#29314D" strokeWidth="2"/>
        <line x1="20" y1="55" x2="40" y2="55" stroke="#29314D" strokeWidth="2"/>
        <line x1="110" y1="40" x2="120" y2="40" stroke="#29314D" strokeWidth="2"/>
        <text x="15" y="20" fontSize="12" fill="#29314D">A</text>
        <text x="15" y="50" fontSize="12" fill="#29314D">B</text>
        <text x="125" y="35" fontSize="12" fill="#29314D">Y</text>
      </svg>
    ),
    nor: (
      <svg width="180" height="80" viewBox="0 0 180 80">
        <path d="M40 15 C 60 15, 70 15, 100 40 C 70 65, 60 65, 40 65 C 50 40, 50 40, 40 15" fill="#F1F6F1" stroke="#56CCF2" strokeWidth="2"/>
        <circle cx="105" cy="40" r="5" fill="#F1F6F1" stroke="#56CCF2" strokeWidth="2"/>
        <line x1="20" y1="25" x2="40" y2="25" stroke="#29314D" strokeWidth="2"/>
        <line x1="20" y1="55" x2="40" y2="55" stroke="#29314D" strokeWidth="2"/>
        <line x1="110" y1="40" x2="120" y2="40" stroke="#29314D" strokeWidth="2"/>
        <text x="15" y="20" fontSize="12" fill="#29314D">A</text>
        <text x="15" y="50" fontSize="12" fill="#29314D">B</text>
        <text x="125" y="35" fontSize="12" fill="#29314D">Y</text>
      </svg>
    ),
    xor: (
      <svg width="180" height="80" viewBox="0 0 180 80">
        <path d="M45 15 C 65 15, 75 15, 105 40 C 75 65, 65 65, 45 65 C 55 40, 55 40, 45 15" fill="#F1F6F1" stroke="#F2994A" strokeWidth="2"/>
        <path d="M40 15 C 50 40, 50 40, 40 65" fill="none" stroke="#F2994A" strokeWidth="2"/>
        <line x1="20" y1="25" x2="40" y2="25" stroke="#29314D" strokeWidth="2"/>
        <line x1="20" y1="55" x2="40" y2="55" stroke="#29314D" strokeWidth="2"/>
        <line x1="105" y1="40" x2="120" y2="40" stroke="#29314D" strokeWidth="2"/>
        <text x="15" y="20" fontSize="12" fill="#29314D">A</text>
        <text x="15" y="50" fontSize="12" fill="#29314D">B</text>
        <text x="125" y="35" fontSize="12" fill="#29314D">Y</text>
      </svg>
    ),
    xnor: (
      <svg width="180" height="80" viewBox="0 0 180 80">
        <path d="M45 15 C 65 15, 75 15, 105 40 C 75 65, 65 65, 45 65 C 55 40, 55 40, 45 15" fill="#F1F6F1" stroke="#9B51E0" strokeWidth="2"/>
        <path d="M40 15 C 50 40, 50 40, 40 65" fill="none" stroke="#9B51E0" strokeWidth="2"/>
        <circle cx="110" cy="40" r="5" fill="#F1F6F1" stroke="#9B51E0" strokeWidth="2"/>
        <line x1="20" y1="25" x2="40" y2="25" stroke="#29314D" strokeWidth="2"/>
        <line x1="20" y1="55" x2="40" y2="55" stroke="#29314D" strokeWidth="2"/>
        <line x1="115" y1="40" x2="120" y2="40" stroke="#29314D" strokeWidth="2"/>
        <text x="15" y="20" fontSize="12" fill="#29314D">A</text>
        <text x="15" y="50" fontSize="12" fill="#29314D">B</text>
        <text x="125" y="35" fontSize="12" fill="#29314D">Y</text>
      </svg>
    )
  };
  
  // Get the current gate data
  const currentGate = gateData[selectedGate];
  const output = calculateOutput();

  // List of all gates for the selector
  const allGates = ['not', 'and', 'or', 'nand', 'nor', 'xor', 'xnor'];
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="p-6 rounded-lg bg-[#F1F6F1] shadow-md"
    >
      <h2 className="text-2xl font-bold text-[#29314D] mb-4">
        <span className="text-[#6E61FF]">Basic Logic Gates</span>
      </h2>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-6 text-[#29314D]"
      >
        <p className="mb-4">
          Logic gates are the building blocks of digital circuits. Each gate performs a specific Boolean operation
          on its inputs. Let's explore each type of gate and see how it functions.
        </p>
      </motion.div>
      
      {/* Gate Selector */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-[#FFFFFF] p-4 rounded-lg shadow-md mb-6"
      >
        <h3 className="text-xl font-semibold text-[#6E61FF] mb-4">Select a Logic Gate:</h3>
        
        <div className="flex flex-wrap gap-3 justify-center">
          {allGates.map((gate) => (
            <button
              key={gate}
              onClick={() => setSelectedGate(gate)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedGate === gate 
                  ? `bg-[${gateData[gate].color}] text-white` 
                  : 'bg-[#F1F6F1] text-[#29314D] hover:bg-[#DAC3FF]'
              }`}
              style={{ backgroundColor: selectedGate === gate ? gateData[gate].color : '' }}
            >
              {gateData[gate].name.split(' ')[0]}
            </button>
          ))}
        </div>
      </motion.div>
      
      {/* Selected Gate Display */}
      <motion.div
        key={selectedGate}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
      >
        <div className="bg-[#FFFFFF] p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4" style={{ color: currentGate.color }}>
            {currentGate.name}
          </h3>
          
          <div className="mb-4">
            <p className="text-[#29314D] mb-2">{currentGate.description}</p>
            <div className="bg-[#F1F6F1] p-3 rounded-lg font-mono mt-2">
              <code>{currentGate.booleanExpression}</code>
            </div>
          </div>
          
          <div className="flex justify-center">
            {gateSymbols[selectedGate]}
          </div>
        </div>
        
        <div className="bg-[#FFFFFF] p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-[#29314D]">Truth Table</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {selectedGate === 'not' ? (
                    <th className="border border-[#DAC3FF] bg-[#F1F6F1] p-2">A</th>
                  ) : (
                    <>
                      <th className="border border-[#DAC3FF] bg-[#F1F6F1] p-2">A</th>
                      <th className="border border-[#DAC3FF] bg-[#F1F6F1] p-2">B</th>
                    </>
                  )}
                  <th className="border border-[#DAC3FF] bg-[#F1F6F1] p-2">Y</th>
                </tr>
              </thead>
              <tbody>
                {currentGate.truthTable.map((row, index) => (
                  <tr key={index}>
                    {row.inputs.map((input, i) => (
                      <td key={i} className="border border-[#DAC3FF] p-2 text-center">{input}</td>
                    ))}
                    <td className="border border-[#DAC3FF] p-2 text-center">{row.output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
      
      {/* Interactive Gate Simulator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="bg-[#DAC3FF] p-4 rounded-lg mb-6"
      >
        <h3 className="text-xl font-semibold text-[#29314D] mb-4">🎮 Interactive Gate Simulator</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Input Controls */}
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-[#29314D] mb-3">Inputs</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[#29314D] mb-2">Input A:</label>
                <div className="flex">
                  <button
                    onClick={() => setInputA(false)}
                    className={`flex-1 py-2 rounded-l-lg font-bold transition-colors ${
                      !inputA ? 'bg-[#F14E3A] text-white' : 'bg-[#F1F6F1] text-[#29314D]'
                    }`}
                  >
                    0
                  </button>
                  <button
                    onClick={() => setInputA(true)}
                    className={`flex-1 py-2 rounded-r-lg font-bold transition-colors ${
                      inputA ? 'bg-[#27AE60] text-white' : 'bg-[#F1F6F1] text-[#29314D]'
                    }`}
                  >
                    1
                  </button>
                </div>
              </div>
              
              {selectedGate !== 'not' && (
                <div>
                  <label className="block text-[#29314D] mb-2">Input B:</label>
                  <div className="flex">
                    <button
                      onClick={() => setInputB(false)}
                      className={`flex-1 py-2 rounded-l-lg font-bold transition-colors ${
                        !inputB ? 'bg-[#F14E3A] text-white' : 'bg-[#F1F6F1] text-[#29314D]'
                      }`}
                    >
                      0
                    </button>
                    <button
                      onClick={() => setInputB(true)}
                      className={`flex-1 py-2 rounded-r-lg font-bold transition-colors ${
                        inputB ? 'bg-[#27AE60] text-white' : 'bg-[#F1F6F1] text-[#29314D]'
                      }`}
                    >
                      1
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Gate Visualization */}
          <div className="bg-white p-4 rounded-lg flex flex-col items-center justify-center">
            <div className="w-full mb-2 text-center font-semibold" style={{ color: currentGate.color }}>
              {currentGate.name}
            </div>
            {gateSymbols[selectedGate]}
          </div>
          
          {/* Output Result */}
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-[#29314D] mb-3">Output</h4>
            
            <div className="mb-4">
              <div
                className={`p-6 rounded-lg flex items-center justify-center text-white text-4xl font-bold ${
                  output ? 'bg-[#27AE60]' : 'bg-[#F14E3A]'
                }`}
              >
                {output ? '1' : '0'}
              </div>
            </div>
            
            <div className="bg-[#F1F6F1] p-3 rounded-lg">
              <p className="text-[#29314D] font-mono">
                {selectedGate === 'not' ? (
                  <>NOT {inputA ? '1' : '0'} = {output ? '1' : '0'}</>
                ) : (
                  <>{inputA ? '1' : '0'} {selectedGate.toUpperCase()} {inputB ? '1' : '0'} = {output ? '1' : '0'}</>
                )}
              </p>
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
        <h3 className="text-lg font-semibold text-[#29314D] mb-2">💡 Key Points:</h3>
        <ul className="list-disc list-inside text-[#29314D] space-y-2 ml-4">
          <li>Logic gates are the fundamental building blocks of digital systems</li>
          <li>Each gate performs a specific Boolean operation on binary inputs</li>
          <li>NAND and NOR are called universal gates because they can be used to implement any other gate</li>
          <li>Logic gates can be combined to create more complex circuits</li>
          <li>Truth tables show all possible input combinations and their corresponding outputs</li>
        </ul>
      </motion.div>
    </motion.section>
  );
};

export default BasicLogicGatesComponent;