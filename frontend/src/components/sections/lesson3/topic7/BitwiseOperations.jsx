import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BitwiseOperations = () => {
  const [firstNumber, setFirstNumber] = useState(60);
  const [secondNumber, setSecondNumber] = useState(13);
  
  // Calculate results
  const bitwiseAND = firstNumber & secondNumber;
  const bitwiseOR = firstNumber | secondNumber;
  const bitwiseNOT = ~firstNumber;
  const bitwiseXOR = firstNumber ^ secondNumber;
  
  // Convert to binary for display
  const toBinary = (num) => {
    // For negative numbers (like NOT result), we'll show 8 bits
    if (num < 0) {
      // Convert to unsigned 8-bit representation
      return (num >>> 0).toString(2).slice(-8).padStart(8, '0');
    }
    return num.toString(2).padStart(8, '0');
  };
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="p-6 rounded-lg bg-[#F1F6F1] shadow-md"
    >
      <h2 className="text-2xl font-bold text-[#29314D] mb-4">
        <span className="text-[#27AE60]">1. Bitwise Operations</span>
      </h2>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-6 text-[#29314D]"
      >
        <p className="mb-4">
          Boolean algebra isn't just used for true/false values but also for manipulating individual bits in binary data. 
          This is particularly useful in system programming, optimization, and graphics processing.
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
{`# Bitwise AND (&), OR (|), NOT (~), XOR (^)
a = ${firstNumber}  # ${toBinary(firstNumber)} in binary
b = ${secondNumber}  # ${toBinary(secondNumber)} in binary

print(a & b)  # Bitwise AND: ${toBinary(bitwiseAND)} (${bitwiseAND})
print(a | b)  # Bitwise OR: ${toBinary(bitwiseOR)} (${bitwiseOR})
print(~a)     # Bitwise NOT: ${toBinary(bitwiseNOT)} (${bitwiseNOT})
print(a ^ b)  # Bitwise XOR: ${toBinary(bitwiseXOR)} (${bitwiseXOR})`}
          </code>
        </pre>
      </motion.div>
      
      {/* Interactive Slider Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="bg-[#FFFFFF] p-4 rounded-lg shadow-md mb-6"
      >
        <h3 className="text-xl font-semibold text-[#6E61FF] mb-3">🎮 Try it yourself!</h3>
        <div className="mb-4">
          <label className="block text-[#29314D] mb-2">
            First Number (a): {firstNumber} = {toBinary(firstNumber)}
          </label>
          <input 
            type="range" 
            min="0" 
            max="255" 
            value={firstNumber} 
            onChange={(e) => setFirstNumber(parseInt(e.target.value))}
            className="w-full h-2 bg-[#DAC3FF] rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#29314D] mb-2">
            Second Number (b): {secondNumber} = {toBinary(secondNumber)}
          </label>
          <input 
            type="range" 
            min="0" 
            max="255" 
            value={secondNumber} 
            onChange={(e) => setSecondNumber(parseInt(e.target.value))}
            className="w-full h-2 bg-[#DAC3FF] rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </motion.div>
      
      {/* Results Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="bg-[#56CCF2] p-4 rounded-lg shadow-inner">
          <h4 className="font-bold text-[#29314D]">a & b (AND)</h4>
          <div className="bg-[#FFFFFF] p-2 rounded mt-2 font-mono">
            <div>{toBinary(firstNumber)}</div>
            <div>{toBinary(secondNumber)}</div>
            <div className="border-t border-[#29314D] mt-1 pt-1">{toBinary(bitwiseAND)} = {bitwiseAND}</div>
          </div>
        </div>
        
        <div className="bg-[#F2994A] p-4 rounded-lg shadow-inner">
          <h4 className="font-bold text-[#29314D]">a | b (OR)</h4>
          <div className="bg-[#FFFFFF] p-2 rounded mt-2 font-mono">
            <div>{toBinary(firstNumber)}</div>
            <div>{toBinary(secondNumber)}</div>
            <div className="border-t border-[#29314D] mt-1 pt-1">{toBinary(bitwiseOR)} = {bitwiseOR}</div>
          </div>
        </div>
        
        <div className="bg-[#F14E3A] p-4 rounded-lg shadow-inner">
          <h4 className="font-bold text-[#29314D]">~a (NOT)</h4>
          <div className="bg-[#FFFFFF] p-2 rounded mt-2 font-mono">
            <div>{toBinary(firstNumber)}</div>
            <div className="border-t border-[#29314D] mt-1 pt-1">{toBinary(bitwiseNOT)} = {bitwiseNOT}</div>
          </div>
        </div>
        
        <div className="bg-[#F2C94C] p-4 rounded-lg shadow-inner">
          <h4 className="font-bold text-[#29314D]">a ^ b (XOR)</h4>
          <div className="bg-[#FFFFFF] p-2 rounded mt-2 font-mono">
            <div>{toBinary(firstNumber)}</div>
            <div>{toBinary(secondNumber)}</div>
            <div className="border-t border-[#29314D] mt-1 pt-1">{toBinary(bitwiseXOR)} = {bitwiseXOR}</div>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="mt-6 bg-[#DAC3FF] p-4 rounded-lg"
      >
        <h3 className="text-lg font-semibold text-[#29314D] mb-2">💡 Common Applications:</h3>
        <ul className="list-disc list-inside text-[#29314D] space-y-2 ml-4">
          <li>Setting/checking flags in system programming</li>
          <li>Optimizing memory usage in embedded systems</li>
          <li>Fast calculations in graphics programming</li>
          <li>Network protocol implementations</li>
          <li>Cryptography and hashing functions</li>
        </ul>
      </motion.div>
    </motion.section>
  );
};

export default BitwiseOperations;