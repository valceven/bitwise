import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CircuitSimulation = () => {
  // State for inputs A and B
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);
  
  // Logic gate functions
  const AND_gate = (a, b) => a && b;
  const OR_gate = (a, b) => a || b;
  const NOT_gate = (a) => !a;
  const XOR_gate = (a, b) => a !== b;
  
  // Half adder simulation
  const half_adder = (a, b) => {
    const sum_bit = XOR_gate(a, b);
    const carry_bit = AND_gate(a, b);
    return { sum_bit, carry_bit };
  };
  
  // Calculate outputs
  const { sum_bit, carry_bit } = half_adder(inputA, inputB);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };
  
  const gateOutputVariants = {
    initial: { scale: 1 },
    pulse: { 
      scale: [1, 1.1, 1],
      backgroundColor: ["#FFFFFF", "#F2C94C", "#FFFFFF"],
      transition: { duration: 0.5 } 
    }
  };
  
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 rounded-lg bg-[#F1F6F1] shadow-md"
    >
      <h2 className="text-2xl font-bold text-[#29314D] mb-4">
        <span className="text-[#9B51E0]">7. Circuit Simulation in Software</span>
      </h2>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-6 text-[#29314D]"
      >
        <p className="mb-4">
          Before implementing electronic circuits physically, engineers often simulate them using Boolean algebra in code.
          This allows testing and debugging before committing to hardware.
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
{`def AND_gate(a, b):
    return a and b

def OR_gate(a, b):
    return a or b

def NOT_gate(a):
    return not a

def XOR_gate(a, b):
    return a != b  # XOR is true when inputs are different

# Simulating a half adder circuit
def half_adder(a, b):
    sum_bit = XOR_gate(a, b)
    carry_bit = AND_gate(a, b)
    return sum_bit, carry_bit

# Test the half adder
for a in [False, True]:
    for b in [False, True]:
        sum_bit, carry_bit = half_adder(a, b)
        print(f"Inputs: {a}, {b} → Sum: {sum_bit}, Carry: {carry_bit}")`}
          </code>
        </pre>
      </motion.div>
      
      {/* Interactive Circuit Simulation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="bg-[#FFFFFF] p-4 rounded-lg shadow-md mb-6"
      >
        <h3 className="text-xl font-semibold text-[#6E61FF] mb-3">🎮 Half Adder Circuit Simulator</h3>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="bg-[#F1F6F1] p-4 rounded-lg flex-1">
            <h4 className="font-semibold text-[#29314D] mb-3">Inputs:</h4>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-[#29314D] mb-2">Input A:</label>
                <button 
                  onClick={() => setInputA(!inputA)}
                  className={`w-16 h-10 rounded-md font-bold ${
                    inputA 
                      ? 'bg-[#27AE60] text-white' 
                      : 'bg-[#F14E3A] text-white'
                  }`}
                >
                  {inputA ? '1' : '0'}
                </button>
              </div>
              
              <div>
                <label className="block text-[#29314D] mb-2">Input B:</label>
                <button 
                  onClick={() => setInputB(!inputB)}
                  className={`w-16 h-10 rounded-md font-bold ${
                    inputB 
                      ? 'bg-[#27AE60] text-white' 
                      : 'bg-[#F14E3A] text-white'
                  }`}
                >
                  {inputB ? '1' : '0'}
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-[#F1F6F1] p-4 rounded-lg flex-1">
            <h4 className="font-semibold text-[#29314D] mb-3">Outputs:</h4>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-[#29314D] mb-2">Sum Bit:</label>
                <motion.div 
                  variants={gateOutputVariants}
                  initial="initial"
                  animate="pulse"
                  key={`sum-${inputA}-${inputB}`}
                  className={`w-16 h-10 rounded-md font-bold flex items-center justify-center ${
                    sum_bit 
                      ? 'bg-[#27AE60] text-white' 
                      : 'bg-[#F14E3A] text-white'
                  }`}
                >
                  {sum_bit ? '1' : '0'}
                </motion.div>
              </div>
              
              <div>
                <label className="block text-[#29314D] mb-2">Carry Bit:</label>
                <motion.div 
                  variants={gateOutputVariants}
                  initial="initial"
                  animate="pulse"
                  key={`carry-${inputA}-${inputB}`}
                  className={`w-16 h-10 rounded-md font-bold flex items-center justify-center ${
                    carry_bit 
                      ? 'bg-[#27AE60] text-white' 
                      : 'bg-[#F14E3A] text-white'
                  }`}
                >
                  {carry_bit ? '1' : '0'}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Circuit Diagram */}
        <div className="bg-[#DAC3FF] p-4 rounded-lg">
          <h4 className="font-semibold text-[#29314D] mb-3">Half Adder Circuit Diagram:</h4>
          <div className="bg-white p-4 rounded-lg">
            <svg width="100%" height="200" viewBox="0 0 400 200" className="mx-auto">
              {/* Input A */}
              <text x="20" y="60" className="font-mono text-sm">A: {inputA ? '1' : '0'}</text>
              <line x1="40" y1="60" x2="100" y2="60" stroke="#29314D" strokeWidth="2" />
              <line x1="40" y1="60" x2="100" y2="140" stroke="#29314D" strokeWidth="2" />
              
              {/* Input B */}
              <text x="20" y="140" className="font-mono text-sm">B: {inputB ? '1' : '0'}</text>
              <line x1="40" y1="140" x2="100" y2="140" stroke="#29314D" strokeWidth="2" />
              <line x1="40" y1="140" x2="100" y2="60" stroke="#29314D" strokeWidth="2" />
              
              {/* XOR Gate for Sum */}
              <rect x="100" y="40" width="80" height="40" rx="10" ry="10" fill="#6E61FF" />
              <text x="130" y="65" className="font-mono text-sm fill-white">XOR</text>
              <line x1="180" y1="60" x2="280" y2="60" stroke="#29314D" strokeWidth="2" />
              <text x="290" y="65" className="font-mono text-sm">Sum: {sum_bit ? '1' : '0'}</text>
              
              {/* AND Gate for Carry */}
              <rect x="100" y="120" width="80" height="40" rx="10" ry="10" fill="#F2994A" />
              <text x="130" y="145" className="font-mono text-sm fill-white">AND</text>
              <line x1="180" y1="140" x2="280" y2="140" stroke="#29314D" strokeWidth="2" />
              <text x="290" y="145" className="font-mono text-sm">Carry: {carry_bit ? '1' : '0'}</text>
            </svg>
          </div>
        </div>
      </motion.div>
      
      {/* Truth Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="bg-[#56CCF2] p-4 rounded-lg mb-6"
      >
        <h3 className="text-lg font-semibold text-[#29314D] mb-2">Half Adder Truth Table:</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-[#29314D] text-white">
              <tr>
                <th className="py-2 px-4 text-center">A</th>
                <th className="py-2 px-4 text-center">B</th>
                <th className="py-2 px-4 text-center">Sum (XOR)</th>
                <th className="py-2 px-4 text-center">Carry (AND)</th>
              </tr>
            </thead>
            <tbody>
              <tr className={`border-b ${!inputA && !inputB ? 'bg-[#F2C94C] font-bold' : ''}`}>
                <td className="py-2 px-4 text-center">0</td>
                <td className="py-2 px-4 text-center">0</td>
                <td className="py-2 px-4 text-center">0</td>
                <td className="py-2 px-4 text-center">0</td>
              </tr>
              <tr className={`border-b ${!inputA && inputB ? 'bg-[#F2C94C] font-bold' : ''}`}>
                <td className="py-2 px-4 text-center">0</td>
                <td className="py-2 px-4 text-center">1</td>
                <td className="py-2 px-4 text-center">1</td>
                <td className="py-2 px-4 text-center">0</td>
              </tr>
              <tr className={`border-b ${inputA && !inputB ? 'bg-[#F2C94C] font-bold' : ''}`}>
                <td className="py-2 px-4 text-center">1</td>
                <td className="py-2 px-4 text-center">0</td>
                <td className="py-2 px-4 text-center">1</td>
                <td className="py-2 px-4 text-center">0</td>
              </tr>
              <tr className={`${inputA && inputB ? 'bg-[#F2C94C] font-bold' : ''}`}>
                <td className="py-2 px-4 text-center">1</td>
                <td className="py-2 px-4 text-center">1</td>
                <td className="py-2 px-4 text-center">0</td>
                <td className="py-2 px-4 text-center">1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="bg-[#F2C94C] p-4 rounded-lg"
      >
        <h3 className="text-lg font-semibold text-[#29314D] mb-2">💡 From Software to Hardware:</h3>
        <p className="text-[#29314D] mb-2">
          The Boolean functions we've used in code directly map to physical logic gates in hardware:
        </p>
        <ul className="list-disc list-inside text-[#29314D] space-y-2 ml-4">
          <li>Software AND function → Hardware AND gate</li>
          <li>Software OR function → Hardware OR gate</li>
          <li>Software NOT function → Hardware NOT gate</li>
          <li>Software XOR function → Hardware XOR gate</li>
        </ul>
        <p className="text-[#29314D] mt-3">
          This connection between Boolean algebra and physical electronics is the foundation of all digital computing!
        </p>
      </motion.div>
    </motion.section>
  );
};

export default CircuitSimulation;