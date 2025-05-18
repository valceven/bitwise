import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ProgramOptimization = () => {
  const [showOptimized, setShowOptimized] = useState(false);
  const [optimizationStep, setOptimizationStep] = useState(1);
  
  // Original and optimized examples
  const examples = [
    {
      title: "Condition Simplification",
      original: `if ((isUser && isActive) || (isUser && isAdmin)) {
  grant_access();
}`,
      optimized: `if (isUser && (isActive || isAdmin)) {
  grant_access();
}`,
      explanation: "Using the distributive property: A and (B or C) = (A and B) or (A and C)"
    },
    {
      title: "Redundant Checks Elimination",
      original: `if (count > 0 && count > 10) {
  console.log("Large count");
}`,
      optimized: `if (count > 10) {
  console.log("Large count");
}`,
      explanation: "If count > 10, then count > 0 is always true (logically redundant)"
    },
    {
      title: "De Morgan's Laws Application",
      original: `if (!(age >= 18 && hasId)) {
  denyEntry();
}`,
      optimized: `if (age < 18 || !hasId) {
  denyEntry();
}`,
      explanation: "Using De Morgan's Law: NOT(A AND B) = NOT A OR NOT B"
    }
  ];
  
  // Switch to next optimization example
  const nextExample = () => {
    if (optimizationStep < examples.length) {
      setOptimizationStep(optimizationStep + 1);
    } else {
      setOptimizationStep(1);
    }
    setShowOptimized(false);
  };
  
  // Current example
  const currentExample = examples[optimizationStep - 1];
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="p-6 rounded-lg bg-[#F1F6F1] shadow-md"
    >
      <h2 className="text-2xl font-bold text-[#29314D] mb-4">
        <span className="text-[#27AE60]">9. Using Boolean Algebra for Program Optimization</span>
      </h2>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-6 text-[#29314D]"
      >
        <p className="mb-4">
          Boolean algebra can optimize code by simplifying conditions. By applying Boolean laws, we can make our 
          conditionals more efficient, readable, and maintainable.
        </p>
      </motion.div>
      
      {/* Optimization Examples */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="bg-[#FFFFFF] p-4 rounded-lg shadow-md mb-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-[#6E61FF]">
            {optimizationStep}. {currentExample.title}
          </h3>
          <div className="flex items-center">
            <span className="text-[#29314D] mr-3">Example {optimizationStep} of {examples.length}</span>
            <button
              onClick={nextExample}
              className="bg-[#9B51E0] hover:bg-[#8A41D0] text-white px-3 py-1 rounded focus:outline-none focus:shadow-outline"
            >
              Next Example
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <motion.div
            key={`original-${optimizationStep}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-[#F1F6F1] p-4 rounded-lg"
          >
            <h4 className="font-semibold text-[#F14E3A] mb-2">Original Code:</h4>
            <pre className="bg-[#FFFFFF] p-3 rounded border border-[#DAC3FF] font-mono overflow-x-auto">
              <code>{currentExample.original}</code>
            </pre>
          </motion.div>
          
          <motion.div
            key={`optimized-${optimizationStep}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: showOptimized ? 1 : 0, x: showOptimized ? 0 : 20 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-[#F1F6F1] p-4 rounded-lg"
          >
            <h4 className="font-semibold text-[#27AE60] mb-2">Optimized Code:</h4>
            {showOptimized ? (
              <pre className="bg-[#FFFFFF] p-3 rounded border border-[#DAC3FF] font-mono overflow-x-auto">
                <code>{currentExample.optimized}</code>
              </pre>
            ) : (
              <div className="flex items-center justify-center h-32 bg-[#FFFFFF] p-3 rounded border border-[#DAC3FF]">
                <button
                  onClick={() => setShowOptimized(true)}
                  className="bg-[#6E61FF] hover:bg-[#5D50EE] text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline"
                >
                  Show Optimized Version
                </button>
              </div>
            )}
          </motion.div>
        </div>
        
        {showOptimized && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#DAC3FF] p-4 rounded-lg"
          >
            <h4 className="font-semibold text-[#29314D] mb-2">Optimization Explanation:</h4>
            <p className="text-[#29314D]">{currentExample.explanation}</p>
          </motion.div>
        )}
      </motion.div>
      
      {/* Benefits of Boolean Optimization */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="bg-[#56CCF2] p-4 rounded-lg mb-6"
      >
        <h3 className="text-lg font-semibold text-[#29314D] mb-3">Benefits of Boolean Optimization:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded-lg">
            <h4 className="font-semibold text-[#6E61FF]">⚡ Improved Performance</h4>
            <p className="mt-1 text-[#29314D]">
              Simplifying conditions can reduce the number of evaluations needed, especially with short-circuit evaluation.
            </p>
          </div>
          
          <div className="bg-white p-3 rounded-lg">
            <h4 className="font-semibold text-[#6E61FF]">📖 Better Readability</h4>
            <p className="mt-1 text-[#29314D]">
              Cleaner conditions are easier to understand, maintain, and debug at a glance.
            </p>
          </div>
          
          <div className="bg-white p-3 rounded-lg">
            <h4 className="font-semibold text-[#6E61FF]">🛡️ Reduced Bugs</h4>
            <p className="mt-1 text-[#29314D]">
              Simpler expressions are less prone to logical errors and unexpected edge cases.
            </p>
          </div>
          
          <div className="bg-white p-3 rounded-lg">
            <h4 className="font-semibold text-[#6E61FF]">♻️ Code Reusability</h4>
            <p className="mt-1 text-[#29314D]">
              Well-structured Boolean logic can be extracted into reusable functions and predicates.
            </p>
          </div>
        </div>
      </motion.div>
      
      {/* Optimization Techniques */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="bg-[#F2C94C] p-4 rounded-lg"
      >
        <h3 className="text-lg font-semibold text-[#29314D] mb-3">Optimization Techniques:</h3>
        <ul className="list-disc list-inside text-[#29314D] space-y-2 ml-4">
          <li><strong>Apply De Morgan's Laws</strong> to simplify negated compound conditions</li>
          <li><strong>Factor out common terms</strong> using the distributive property</li>
          <li><strong>Eliminate redundant checks</strong> that are implied by other conditions</li>
          <li><strong>Rearrange conditions</strong> to take advantage of short-circuit evaluation</li>
          <li><strong>Use Boolean algebra identities</strong> to reduce complex expressions</li>
          <li><strong>Combine multiple if statements</strong> with common conditions</li>
        </ul>
        <p className="text-[#29314D] mt-4 bg-white p-3 rounded-lg">
          <span className="font-bold">Pro Tip:</span> Modern compilers and interpreters may automatically optimize some Boolean expressions, 
          but writing optimized code yourself improves readability and maintainability.
        </p>
      </motion.div>
    </motion.section>
  );
};

export default ProgramOptimization;