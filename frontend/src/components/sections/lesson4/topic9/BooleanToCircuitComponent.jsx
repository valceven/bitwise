import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BooleanToCircuitComponent = () => {
  const [expression, setExpression] = useState('A AND (NOT B)');
  const [customExpression, setCustomExpression] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [circuitStep, setCircuitStep] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [activeExample, setActiveExample] = useState(0);
  
  const examples = [
    {
      title: "Simple Expression",
      expression: "A AND (NOT B)",
      steps: [
        "Identify operations: NOT B, then AND with A",
        "Draw a NOT gate with input B",
        "Draw an AND gate with inputs A and (NOT B)",
        "The output of the AND gate is Y"
      ],
      explanation: "This circuit takes two inputs A and B. It first inverts B using a NOT gate, then performs an AND operation between A and the inverted B. The circuit outputs 1 only when A is 1 AND B is 0."
    },
    {
      title: "OR and AND",
      expression: "(A OR B) AND (NOT C)",
      steps: [
        "Identify operations: A OR B, NOT C, and AND the results",
        "Draw an OR gate with inputs A and B",
        "Draw a NOT gate with input C",
        "Draw an AND gate with inputs from OR gate and NOT gate",
        "The output of the AND gate is Y"
      ],
      explanation: "This circuit combines OR and AND operations. It outputs 1 when either A OR B is 1 (or both) AND C is 0. This is a common pattern in control systems where you need multiple conditions to be satisfied."
    },
    {
      title: "Nested Operations",
      expression: "A AND (B OR (NOT C))",
      steps: [
        "Start from innermost: NOT C",
        "Next: B OR (NOT C)",
        "Finally: A AND the result",
        "First draw a NOT gate for C",
        "Draw an OR gate with inputs B and (NOT C)",
        "Draw an AND gate with inputs A and the OR gate output"
      ],
      explanation: "This circuit demonstrates nested operations. We process from the innermost brackets outward, just like in algebra. The circuit returns 1 only when A is 1 AND either B is 1 OR C is 0."
    },
    {
      title: "Sum-of-Products Form",
      expression: "(A AND B) OR (NOT A AND C)",
      steps: [
        "Identify the two product terms: (A AND B) and (NOT A AND C)",
        "For first term: Draw an AND gate with inputs A and B",
        "For second term: Draw a NOT gate for A, then an AND gate with NOT A and C",
        "Connect both AND outputs to an OR gate",
        "The output of the OR gate is Y"
      ],
      explanation: "This is a Sum-of-Products (SOP) form, which is a standard way to represent Boolean functions. It's suitable for implementing with AND gates followed by OR gates. This particular expression is a multiplexer function, where C selects either A or B."
    }
  ];
  
  useEffect(() => {
    setCircuitStep(0);
  }, [activeExample, expression]);
  
  const handleExampleClick = (index) => {
    setActiveExample(index);
    setExpression(examples[index].expression);
    setShowCustomInput(false);
  };
  
  const handleCustomSubmit = () => {
    if (customExpression.trim()) {
      setExpression(customExpression);
      setShowCustomInput(false);
    }
  };
  
  const handleNextStep = () => {
    if (circuitStep < examples[activeExample].steps.length - 1) {
      setCircuitStep(circuitStep + 1);
    }
  };
  
  const handlePrevStep = () => {
    if (circuitStep > 0) {
      setCircuitStep(circuitStep - 1);
    }
  };
  
  // SVG circuit diagrams for each example at different steps
  const getCircuitDiagram = () => {
    switch(activeExample) {
      case 0: // A AND (NOT B)
        return (
          <svg width="280" height="140" viewBox="0 0 280 140">
            {/* Input A */}
            <line x1="40" y1="40" x2="160" y2="40" stroke="#29314D" strokeWidth="2" />
            <text x="30" y="45" fill="#29314D" fontSize="14" textAnchor="end">A</text>
            
            {/* Input B */}
            <line x1="40" y1="80" x2="80" y2="80" stroke="#29314D" strokeWidth="2" />
            <text x="30" y="85" fill="#29314D" fontSize="14" textAnchor="end">B</text>
            
            {/* NOT Gate - show only if circuitStep >= 1 */}
            {circuitStep >= 1 && (
              <>
                <rect x="80" y="70" width="40" height="20" fill="#F1F6F1" stroke="#6E61FF" strokeWidth="2" />
                <text x="100" y="85" fill="#29314D" fontSize="10" textAnchor="middle">NOT</text>
                <circle cx="125" cy="80" r="5" fill="#F1F6F1" stroke="#29314D" strokeWidth="1" />
                <line x1="120" y1="80" x2="160" y2="80" stroke="#29314D" strokeWidth="2" />
              </>
            )}
            
            {/* AND Gate - show only if circuitStep >= 2 */}
            {circuitStep >= 2 && (
              <>
                <path d="M160,30 L160,90 Q200,90 200,60 Q200,30 160,30" fill="#F1F6F1" stroke="#27AE60" strokeWidth="2" />
                <text x="180" y="65" fill="#29314D" fontSize="12" textAnchor="middle">AND</text>
                <line x1="200" y1="60" x2="240" y2="60" stroke="#29314D" strokeWidth="2" />
                <text x="250" y="65" fill="#29314D" fontSize="14" textAnchor="start">Y</text>
              </>
            )}
          </svg>
        );
        
      case 1: // (A OR B) AND (NOT C)
        return (
          <svg width="340" height="180" viewBox="0 0 340 180">
            {/* Input A */}
            <line x1="40" y1="40" x2="80" y2="40" stroke="#29314D" strokeWidth="2" />
            <text x="30" y="45" fill="#29314D" fontSize="14" textAnchor="end">A</text>
            
            {/* Input B */}
            <line x1="40" y1="80" x2="80" y2="80" stroke="#29314D" strokeWidth="2" />
            <text x="30" y="85" fill="#29314D" fontSize="14" textAnchor="end">B</text>
            
            {/* Input C */}
            <line x1="40" y1="140" x2="80" y2="140" stroke="#29314D" strokeWidth="2" />
            <text x="30" y="145" fill="#29314D" fontSize="14" textAnchor="end">C</text>
            
            {/* OR Gate - show if circuitStep >= 1 */}
            {circuitStep >= 1 && (
              <>
                <path d="M80,30 Q120,30 140,60 Q120,90 80,90 L80,30" fill="#F1F6F1" stroke="#F2994A" strokeWidth="2" />
                <text x="110" y="65" fill="#29314D" fontSize="12" textAnchor="middle">OR</text>
                <line x1="140" y1="60" x2="220" y2="60" stroke="#29314D" strokeWidth="2" />
              </>
            )}
            
            {/* NOT Gate - show if circuitStep >= 2 */}
            {circuitStep >= 2 && (
              <>
                <rect x="80" y="130" width="40" height="20" fill="#F1F6F1" stroke="#6E61FF" strokeWidth="2" />
                <text x="100" y="145" fill="#29314D" fontSize="10" textAnchor="middle">NOT</text>
                <circle cx="125" cy="140" r="5" fill="#F1F6F1" stroke="#29314D" strokeWidth="1" />
                <line x1="120" y1="140" x2="220" y2="140" stroke="#29314D" strokeWidth="2" />
              </>
            )}
            
            {/* AND Gate - show if circuitStep >= 3 */}
            {circuitStep >= 3 && (
              <>
                <path d="M220,50 L220,150 Q260,150 260,100 Q260,50 220,50" fill="#F1F6F1" stroke="#27AE60" strokeWidth="2" />
                <text x="240" y="105" fill="#29314D" fontSize="12" textAnchor="middle">AND</text>
                <line x1="260" y1="100" x2="300" y2="100" stroke="#29314D" strokeWidth="2" />
                <text x="310" y="105" fill="#29314D" fontSize="14" textAnchor="start">Y</text>
              </>
            )}
          </svg>
        );
        
      case 2: // A AND (B OR (NOT C))
        return (
          <svg width="340" height="180" viewBox="0 0 340 180">
            {/* Input A */}
            <line x1="40" y1="40" x2="220" y2="40" stroke="#29314D" strokeWidth="2" />
            <text x="30" y="45" fill="#29314D" fontSize="14" textAnchor="end">A</text>
            
            {/* Input B */}
            <line x1="40" y1="80" x2="140" y2="80" stroke="#29314D" strokeWidth="2" />
            <text x="30" y="85" fill="#29314D" fontSize="14" textAnchor="end">B</text>
            
            {/* Input C */}
            <line x1="40" y1="120" x2="80" y2="120" stroke="#29314D" strokeWidth="2" />
            <text x="30" y="125" fill="#29314D" fontSize="14" textAnchor="end">C</text>
            
            {/* NOT Gate - show if circuitStep >= 1 */}
            {circuitStep >= 1 && (
              <>
                <rect x="80" y="110" width="40" height="20" fill="#F1F6F1" stroke="#6E61FF" strokeWidth="2" />
                <text x="100" y="125" fill="#29314D" fontSize="10" textAnchor="middle">NOT</text>
                <circle cx="125" cy="120" r="5" fill="#F1F6F1" stroke="#29314D" strokeWidth="1" />
                <line x1="120" y1="120" x2="140" y2="120" stroke="#29314D" strokeWidth="2" />
              </>
            )}
            
            {/* OR Gate - show if circuitStep >= 2 */}
            {circuitStep >= 2 && (
              <>
                <path d="M140,70 Q180,70 200,100 Q180,130 140,130 L140,70" fill="#F1F6F1" stroke="#F2994A" strokeWidth="2" />
                <text x="170" y="105" fill="#29314D" fontSize="12" textAnchor="middle">OR</text>
                <line x1="200" y1="100" x2="220" y2="100" stroke="#29314D" strokeWidth="2" />
              </>
            )}
            
            {/* AND Gate - show if circuitStep >= 3 */}
            {circuitStep >= 3 && (
              <>
                <path d="M220,30 L220,110 Q260,110 260,70 Q260,30 220,30" fill="#F1F6F1" stroke="#27AE60" strokeWidth="2" />
                <text x="240" y="75" fill="#29314D" fontSize="12" textAnchor="middle">AND</text>
                <line x1="260" y1="70" x2="300" y2="70" stroke="#29314D" strokeWidth="2" />
                <text x="310" y="75" fill="#29314D" fontSize="14" textAnchor="start">Y</text>
              </>
            )}
          </svg>
        );
        
      case 3: // (A AND B) OR (NOT A AND C)
        return (
          <svg width="340" height="180" viewBox="0 0 340 180">
            {/* Input A */}
            <line x1="40" y1="40" x2="80" y2="40" stroke="#29314D" strokeWidth="2" />
            <text x="30" y="45" fill="#29314D" fontSize="14" textAnchor="end">A</text>
            
            {/* Input B */}
            <line x1="40" y1="80" x2="120" y2="80" stroke="#29314D" strokeWidth="2" />
            <text x="30" y="85" fill="#29314D" fontSize="14" textAnchor="end">B</text>
            
            {/* Input C */}
            <line x1="40" y1="140" x2="120" y2="140" stroke="#29314D" strokeWidth="2" />
            <text x="30" y="145" fill="#29314D" fontSize="14" textAnchor="end">C</text>
            
            {/* NOT Gate for A - show if circuitStep >= 1 */}
            {circuitStep >= 1 && (
              <>
                <line x1="60" y1="40" x2="60" y2="100" stroke="#29314D" strokeWidth="1.5" />
                <rect x="80" y="100" width="40" height="20" fill="#F1F6F1" stroke="#6E61FF" strokeWidth="2" />
                <line x1="60" y1="110" x2="80" y2="110" stroke="#29314D" strokeWidth="1.5" />
                <text x="100" y="115" fill="#29314D" fontSize="10" textAnchor="middle">NOT</text>
                <circle cx="125" cy="110" r="5" fill="#F1F6F1" stroke="#29314D" strokeWidth="1" />
              </>
            )}
            
            {/* First AND Gate - show if circuitStep >= 2 */}
            {circuitStep >= 2 && (
              <>
                <path d="M120,30 L120,90 Q160,90 160,60 Q160,30 120,30" fill="#F1F6F1" stroke="#27AE60" strokeWidth="2" />
                <text x="140" y="65" fill="#29314D" fontSize="12" textAnchor="middle">AND</text>
                <line x1="160" y1="60" x2="220" y2="60" stroke="#29314D" strokeWidth="2" />
              </>
            )}
            
            {/* Second AND Gate - show if circuitStep >= 3 */}
            {circuitStep >= 3 && (
              <>
                <path d="M120,100 L120,150 Q160,150 160,125 Q160,100 120,100" fill="#F1F6F1" stroke="#27AE60" strokeWidth="2" />
                <text x="140" y="130" fill="#29314D" fontSize="12" textAnchor="middle">AND</text>
                <line x1="160" y1="125" x2="220" y2="125" stroke="#29314D" strokeWidth="2" />
              </>
            )}
            
            {/* OR Gate - show if circuitStep >= 4 */}
            {circuitStep >= 4 && (
              <>
                <path d="M220,50 Q260,50 280,90 Q260,130 220,130 L220,50" fill="#F1F6F1" stroke="#F2994A" strokeWidth="2" />
                <text x="250" y="95" fill="#29314D" fontSize="12" textAnchor="middle">OR</text>
                <line x1="280" y1="90" x2="310" y2="90" stroke="#29314D" strokeWidth="2" />
                <text x="320" y="95" fill="#29314D" fontSize="14" textAnchor="start">Y</text>
              </>
            )}
          </svg>
        );
        
      default:
        return <div className="text-[#29314D] text-center">Select an example to view the circuit diagram.</div>;
    }
  };
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="p-6 rounded-lg bg-[#F1F6F1] shadow-md"
    >
      <h2 className="text-2xl font-bold text-[#29314D] mb-4">
        <span className="text-[#9B51E0]">Translating Boolean Expressions into Logic Circuits</span>
      </h2>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-6 text-[#29314D]"
      >
        <p className="mb-4">
          Converting Boolean expressions into logic circuits is a fundamental skill in digital design. 
          This interactive tool will help you visualize how different Boolean expressions translate to actual 
          circuit implementations using logic gates.
        </p>
      </motion.div>
      
      {/* Example Selection */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-[#FFFFFF] p-4 rounded-lg shadow-md mb-6"
      >
        <h3 className="text-xl font-semibold text-[#29314D] mb-3">Choose an Example Expression:</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {examples.map((ex, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(index)}
              className={`p-3 rounded-lg transition-colors text-left ${
                activeExample === index 
                  ? 'bg-[#6E61FF] text-white' 
                  : 'bg-[#F1F6F1] hover:bg-[#DAC3FF] text-[#29314D]'
              }`}
            >
              <div className="font-semibold">{ex.title}</div>
              <div className="text-sm mt-1 font-mono">{ex.expression}</div>
            </button>
          ))}
          
          <button
            onClick={() => setShowCustomInput(!showCustomInput)}
            className={`p-3 rounded-lg transition-colors text-left ${
              showCustomInput 
                ? 'bg-[#6E61FF] text-white' 
                : 'bg-[#F1F6F1] hover:bg-[#DAC3FF] text-[#29314D]'
            }`}
          >
            <div className="font-semibold">Custom Expression</div>
            <div className="text-sm mt-1 font-mono">{customExpression || "Enter your own expression"}</div>
          </button>
        </div>
        
        {showCustomInput && (
          <div className="mt-4 p-3 bg-[#F1F6F1] rounded-lg">
            <p className="text-sm text-[#29314D] mb-2">
              Enter a Boolean expression using AND, OR, NOT, and parentheses.
              Example: (A AND B) OR (NOT C)
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={customExpression}
                onChange={(e) => setCustomExpression(e.target.value)}
                placeholder="Enter expression..."
                className="flex-1 px-3 py-2 border border-[#DAC3FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6E61FF]"
              />
              <button
                onClick={handleCustomSubmit}
                className="px-4 py-2 bg-[#6E61FF] text-white rounded-lg hover:bg-[#5D50EE] transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </motion.div>
      
      {/* Current Expression */}
      <motion.div
        key={`expr-${expression}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#FFFFFF] p-4 rounded-lg shadow-md mb-6"
      >
        <h3 className="text-xl font-semibold text-[#29314D] mb-3">Current Expression:</h3>
        <div className="p-3 bg-[#F1F6F1] rounded-lg font-mono text-[#29314D] text-center text-lg">
          Y = {expression}
        </div>
        
        <div className="mt-4">
          <h4 className="font-semibold text-[#29314D] mb-2">The Conversion Process:</h4>
          <ol className="list-decimal list-inside text-[#29314D] ml-4 space-y-1">
            <li>Understand the Boolean expression structure</li>
            <li>Break down the expression into basic operations (AND, OR, NOT)</li>
            <li>Process operations from innermost parentheses outward</li>
            <li>Draw the corresponding gates in order of operations</li>
            <li>Connect the gates according to the expression structure</li>
          </ol>
        </div>
      </motion.div>
      
      {/* Interactive Circuit Diagram */}
      <motion.div
        key={`diagram-${activeExample}-${circuitStep}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#FFFFFF] p-4 rounded-lg shadow-md mb-6"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold text-[#29314D]">Circuit Diagram:</h3>
          <div className="text-[#6E61FF] font-medium">
            Step {circuitStep + 1} of {examples[activeExample]?.steps.length || 0}
          </div>
        </div>
        
        <div className="bg-[#F1F6F1] p-4 rounded-lg mb-4 min-h-[200px] flex justify-center items-center">
          {getCircuitDiagram()}
        </div>
        
        <div className="mb-4 p-3 bg-[#DAC3FF] bg-opacity-40 rounded-lg">
          <p className="text-[#29314D]">
            <span className="font-semibold">Current step:</span> {examples[activeExample]?.steps[circuitStep]}
          </p>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={handlePrevStep}
            disabled={circuitStep === 0}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              circuitStep > 0 
                ? 'bg-[#6E61FF] hover:bg-[#5D50EE] text-white' 
                : 'bg-[#F1F6F1] text-[#29314D] cursor-not-allowed'
            }`}
          >
            Previous Step
          </button>
          
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="px-4 py-2 bg-[#27AE60] hover:bg-[#219653] text-white rounded-lg font-medium transition-colors"
          >
            {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
          </button>
          
          <button
            onClick={handleNextStep}
            disabled={circuitStep >= examples[activeExample]?.steps.length - 1}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              circuitStep < examples[activeExample]?.steps.length - 1
                ? 'bg-[#6E61FF] hover:bg-[#5D50EE] text-white' 
                : 'bg-[#F1F6F1] text-[#29314D] cursor-not-allowed'
            }`}
          >
            Next Step
          </button>
        </div>
      </motion.div>
      
      {/* Explanation */}
      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#FFFFFF] p-4 rounded-lg shadow-md mb-6"
        >
          <h3 className="text-xl font-semibold text-[#29314D] mb-3">Explanation:</h3>
          <div className="p-4 bg-[#DAC3FF] bg-opacity-50 rounded-lg text-[#29314D]">
            <p>{examples[activeExample]?.explanation}</p>
          </div>
        </motion.div>
      )}
      
      {/* Logic Gate Reference */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="bg-[#FFFFFF] p-4 rounded-lg shadow-md"
      >
        <h3 className="text-xl font-semibold text-[#29314D] mb-3">Logic Gate Reference:</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-[#F1F6F1] p-3 rounded-lg border-l-4 border-[#27AE60]">
            <h4 className="font-semibold text-[#27AE60]">AND Gate</h4>
            <p className="text-sm text-[#29314D] mt-1">Outputs 1 only when all inputs are 1</p>
            <p className="text-xs font-mono mt-1">Y = A AND B</p>
          </div>
          
          <div className="bg-[#F1F6F1] p-3 rounded-lg border-l-4 border-[#F2994A]">
            <h4 className="font-semibold text-[#F2994A]">OR Gate</h4>
            <p className="text-sm text-[#29314D] mt-1">Outputs 1 when any input is 1</p>
            <p className="text-xs font-mono mt-1">Y = A OR B</p>
          </div>
          
          <div className="bg-[#F1F6F1] p-3 rounded-lg border-l-4 border-[#6E61FF]">
            <h4 className="font-semibold text-[#6E61FF]">NOT Gate</h4>
            <p className="text-sm text-[#29314D] mt-1">Inverts the input (0→1, 1→0)</p>
            <p className="text-xs font-mono mt-1">Y = NOT A</p>
          </div>
          
          <div className="bg-[#F1F6F1] p-3 rounded-lg border-l-4 border-[#56CCF2]">
            <h4 className="font-semibold text-[#56CCF2]">XOR Gate</h4>
            <p className="text-sm text-[#29314D] mt-1">Outputs 1 when inputs are different</p>
            <p className="text-xs font-mono mt-1">Y = A XOR B</p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default BooleanToCircuitComponent;