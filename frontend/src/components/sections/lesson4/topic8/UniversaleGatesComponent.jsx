import React, { useState } from 'react';
import { motion } from 'framer-motion';

const UniversalGatesComponent = () => {
  const [selectedDemo, setSelectedDemo] = useState('nand');
  
  // NAND implementations
  const nandImplementations = [
    {
      gate: "NOT Gate",
      description: "A NOT gate can be created using a single NAND gate by connecting both inputs together.",
      booleanExpression: "NOT(A) = A NAND A",
      diagram: (
        <svg width="300" height="120" viewBox="0 0 300 120">
          {/* Input */}
          <line x1="20" y1="60" x2="80" y2="60" stroke="#29314D" strokeWidth="2" />
          <text x="15" y="55" fontSize="12" fill="#29314D">A</text>
          
          {/* Connection to both NAND inputs */}
          <line x1="80" y1="60" x2="110" y2="45" stroke="#29314D" strokeWidth="2" />
          <line x1="80" y1="60" x2="110" y2="75" stroke="#29314D" strokeWidth="2" />
          
          {/* NAND Gate */}
          <path d="M110 30 L145 30 Q170 30 170 60 Q170 90 145 90 L110 90 Z" fill="#F1F6F1" stroke="#6E61FF" strokeWidth="2"/>
          <circle cx="175" cy="60" r="5" fill="#F1F6F1" stroke="#6E61FF" strokeWidth="2"/>
          <line x1="180" y1="60" x2="220" y2="60" stroke="#29314D" strokeWidth="2" />
          
          {/* Output */}
          <text x="230" y="55" fontSize="12" fill="#29314D">NOT A</text>
        </svg>
      )
    },
    {
      gate: "AND Gate",
      description: "An AND gate can be created using a NAND gate followed by a NOT gate (which is itself a NAND gate).",
      booleanExpression: "A AND B = NOT(A NAND B) = (A NAND B) NAND (A NAND B)",
      diagram: (
        <svg width="350" height="120" viewBox="0 0 350 120">
          {/* Inputs */}
          <line x1="20" y1="45" x2="80" y2="45" stroke="#29314D" strokeWidth="2" />
          <line x1="20" y1="75" x2="80" y2="75" stroke="#29314D" strokeWidth="2" />
          <text x="15" y="40" fontSize="12" fill="#29314D">A</text>
          <text x="15" y="70" fontSize="12" fill="#29314D">B</text>
          
          {/* First NAND Gate */}
          <path d="M80 30 L115 30 Q140 30 140 60 Q140 90 115 90 L80 90 Z" fill="#F1F6F1" stroke="#6E61FF" strokeWidth="2"/>
          <circle cx="145" cy="60" r="5" fill="#F1F6F1" stroke="#6E61FF" strokeWidth="2"/>
          <line x1="150" y1="60" x2="190" y2="60" stroke="#29314D" strokeWidth="2" />
          
          {/* Connection to second NAND as NOT gate */}
          <line x1="190" y1="60" x2="220" y2="45" stroke="#29314D" strokeWidth="2" />
          <line x1="190" y1="60" x2="220" y2="75" stroke="#29314D" strokeWidth="2" />
          
          {/* Second NAND Gate (as NOT) */}
          <path d="M220 30 L255 30 Q280 30 280 60 Q280 90 255 90 L220 90 Z" fill="#F1F6F1" stroke="#6E61FF" strokeWidth="2"/>
          <circle cx="285" cy="60" r="5" fill="#F1F6F1" stroke="#6E61FF" strokeWidth="2"/>
          <line x1="290" y1="60" x2="320" y2="60" stroke="#29314D" strokeWidth="2" />
          
          {/* Output */}
          <text x="325" y="55" fontSize="12" fill="#29314D">A AND B</text>
        </svg>
      )
    },
    {
      gate: "OR Gate",
      description: "An OR gate can be created using three NAND gates.",
      booleanExpression: "A OR B = (A NAND A) NAND (B NAND B) = NOT(A) NAND NOT(B)",
      diagram: (
        <svg width="350" height="140" viewBox="0 0 350 140">
          {/* Inputs */}
          <line x1="20" y1="40" x2="60" y2="40" stroke="#29314D" strokeWidth="2" />
          <line x1="20" y1="100" x2="60" y2="100" stroke="#29314D" strokeWidth="2" />
          <text x="15" y="35" fontSize="12" fill="#29314D">A</text>
          <text x="15" y="95" fontSize="12" fill="#29314D">B</text>
          
          {/* Top NAND Gate (NOT A) */}
          <line x1="60" y1="40" x2="80" y2="30" stroke="#29314D" strokeWidth="2" />
          <line x1="60" y1="40" x2="80" y2="50" stroke="#29314D" strokeWidth="2" />
          <path d="M80 15 L110 15 Q130 15 130 40 Q130 65 110 65 L80 65 Z" fill="#F1F6F1" stroke="#6E61FF" strokeWidth="2"/>
          <circle cx="135" cy="40" r="5" fill="#F1F6F1" stroke="#6E61FF" strokeWidth="2"/>
          <line x1="140" y1="40" x2="180" y2="40" stroke="#29314D" strokeWidth="2" />
          
          {/* Bottom NAND Gate (NOT B) */}
          <line x1="60" y1="100" x2="80" y2="90" stroke="#29314D" strokeWidth="2" />
          <line x1="60" y1="100" x2="80" y2="110" stroke="#29314D" strokeWidth="2" />
          <path d="M80 75 L110 75 Q130 75 130 100 Q130 125 110 125 L80 125 Z" fill="#F1F6F1" stroke="#6E61FF" strokeWidth="2"/>
          <circle cx="135" cy="100" r="5" fill="#F1F6F1" stroke="#6E61FF" strokeWidth="2"/>
          <line x1="140" y1="100" x2="180" y2="100" stroke="#29314D" strokeWidth="2" />
          
          {/* Final NAND Gate */}
          <line x1="180" y1="40" x2="230" y2="40" stroke="#29314D" strokeWidth="2" />
          <line x1="230" y1="40" x2="230" y2="60" stroke="#29314D" strokeWidth="2" />
          <line x1="180" y1="100" x2="230" y2="100" stroke="#29314D" strokeWidth="2" />
          <line x1="230" y1="100" x2="230" y2="80" stroke="#29314D" strokeWidth="2" />
          <path d="M230 45 L260 45 Q285 45 285 70 Q285 95 260 95 L230 95 Z" fill="#F1F6F1" stroke="#6E61FF" strokeWidth="2"/>
          <circle cx="290" cy="70" r="5" fill="#F1F6F1" stroke="#6E61FF" strokeWidth="2"/>
          <line x1="295" y1="70" x2="320" y2="70" stroke="#29314D" strokeWidth="2" />
          
          {/* Output */}
          <text x="325" y="65" fontSize="12" fill="#29314D">A OR B</text>
        </svg>
      )
    }
  ];
  
  // NOR implementations
  const norImplementations = [
    {
      gate: "NOT Gate",
      description: "A NOT gate can be created using a single NOR gate by connecting both inputs together.",
      booleanExpression: "NOT(A) = A NOR A",
      diagram: (
        <svg width="300" height="120" viewBox="0 0 300 120">
          {/* Input */}
          <line x1="20" y1="60" x2="80" y2="60" stroke="#29314D" strokeWidth="2" />
          <text x="15" y="55" fontSize="12" fill="#29314D">A</text>
          
          {/* Connection to both NOR inputs */}
          <line x1="80" y1="60" x2="110" y2="45" stroke="#29314D" strokeWidth="2" />
          <line x1="80" y1="60" x2="110" y2="75" stroke="#29314D" strokeWidth="2" />
          
          {/* NOR Gate */}
          <path d="M110 30 C 130 30, 140 30, 170 60 C 140 90, 130 90, 110 90 C 120 60, 120 60, 110 30" fill="#F1F6F1" stroke="#56CCF2" strokeWidth="2"/>
          <circle cx="175" cy="60" r="5" fill="#F1F6F1" stroke="#56CCF2" strokeWidth="2"/>
          <line x1="180" y1="60" x2="220" y2="60" stroke="#29314D" strokeWidth="2" />
          
          {/* Output */}
          <text x="230" y="55" fontSize="12" fill="#29314D">NOT A</text>
        </svg>
      )
    },
    {
      gate: "OR Gate",
      description: "An OR gate can be created using a NOR gate followed by a NOT gate (which is itself a NOR gate).",
      booleanExpression: "A OR B = NOT(A NOR B) = (A NOR B) NOR (A NOR B)",
      diagram: (
        <svg width="350" height="120" viewBox="0 0 350 120">
          {/* Inputs */}
          <line x1="20" y1="45" x2="80" y2="45" stroke="#29314D" strokeWidth="2" />
          <line x1="20" y1="75" x2="80" y2="75" stroke="#29314D" strokeWidth="2" />
          <text x="15" y="40" fontSize="12" fill="#29314D">A</text>
          <text x="15" y="70" fontSize="12" fill="#29314D">B</text>
          
          {/* First NOR Gate */}
          <path d="M80 30 C 100 30, 110 30, 140 60 C 110 90, 100 90, 80 90 C 90 60, 90 60, 80 30" fill="#F1F6F1" stroke="#56CCF2" strokeWidth="2"/>
          <circle cx="145" cy="60" r="5" fill="#F1F6F1" stroke="#56CCF2" strokeWidth="2"/>
          <line x1="150" y1="60" x2="190" y2="60" stroke="#29314D" strokeWidth="2" />
          
          {/* Connection to second NOR as NOT gate */}
          <line x1="190" y1="60" x2="220" y2="45" stroke="#29314D" strokeWidth="2" />
          <line x1="190" y1="60" x2="220" y2="75" stroke="#29314D" strokeWidth="2" />
          
          {/* Second NOR Gate (as NOT) */}
          <path d="M220 30 C 240 30, 250 30, 280 60 C 250 90, 240 90, 220 90 C 230 60, 230 60, 220 30" fill="#F1F6F1" stroke="#56CCF2" strokeWidth="2"/>
          <circle cx="285" cy="60" r="5" fill="#F1F6F1" stroke="#56CCF2" strokeWidth="2"/>
          <line x1="290" y1="60" x2="320" y2="60" stroke="#29314D" strokeWidth="2" />
          
          {/* Output */}
          <text x="325" y="55" fontSize="12" fill="#29314D">A OR B</text>
        </svg>
      )
    },
    {
      gate: "AND Gate",
      description: "An AND gate can be created using three NOR gates.",
      booleanExpression: "A AND B = (A NOR A) NOR (B NOR B) = NOT(A) NOR NOT(B)",
      diagram: (
        <svg width="350" height="140" viewBox="0 0 350 140">
          {/* Inputs */}
          <line x1="20" y1="40" x2="60" y2="40" stroke="#29314D" strokeWidth="2" />
          <line x1="20" y1="100" x2="60" y2="100" stroke="#29314D" strokeWidth="2" />
          <text x="15" y="35" fontSize="12" fill="#29314D">A</text>
          <text x="15" y="95" fontSize="12" fill="#29314D">B</text>
          
          {/* Top NOR Gate (NOT A) */}
          <line x1="60" y1="40" x2="80" y2="30" stroke="#29314D" strokeWidth="2" />
          <line x1="60" y1="40" x2="80" y2="50" stroke="#29314D" strokeWidth="2" />
          <path d="M80 15 C 100 15, 110 15, 130 40 C 110 65, 100 65, 80 65 C 90 40, 90 40, 80 15" fill="#F1F6F1" stroke="#56CCF2" strokeWidth="2"/>
          <circle cx="135" cy="40" r="5" fill="#F1F6F1" stroke="#56CCF2" strokeWidth="2"/>
          <line x1="140" y1="40" x2="180" y2="40" stroke="#29314D" strokeWidth="2" />
          
          {/* Bottom NOR Gate (NOT B) */}
          <line x1="60" y1="100" x2="80" y2="90" stroke="#29314D" strokeWidth="2" />
          <line x1="60" y1="100" x2="80" y2="110" stroke="#29314D" strokeWidth="2" />
          <path d="M80 75 C 100 75, 110 75, 130 100 C 110 125, 100 125, 80 125 C 90 100, 90 100, 80 75" fill="#F1F6F1" stroke="#56CCF2" strokeWidth="2"/>
          <circle cx="135" cy="100" r="5" fill="#F1F6F1" stroke="#56CCF2" strokeWidth="2"/>
          <line x1="140" y1="100" x2="180" y2="100" stroke="#29314D" strokeWidth="2" />
          
          {/* Final NOR Gate */}
          <line x1="180" y1="40" x2="230" y2="40" stroke="#29314D" strokeWidth="2" />
          <line x1="230" y1="40" x2="230" y2="60" stroke="#29314D" strokeWidth="2" />
          <line x1="180" y1="100" x2="230" y2="100" stroke="#29314D" strokeWidth="2" />
          <line x1="230" y1="100" x2="230" y2="80" stroke="#29314D" strokeWidth="2" />
          <path d="M230 45 C 250 45, 260 45, 285 70 C 260 95, 250 95, 230 95 C 240 70, 240 70, 230 45" fill="#F1F6F1" stroke="#56CCF2" strokeWidth="2"/>
          <circle cx="290" cy="70" r="5" fill="#F1F6F1" stroke="#56CCF2" strokeWidth="2"/>
          <line x1="295" y1="70" x2="320" y2="70" stroke="#29314D" strokeWidth="2" />
          
          {/* Output */}
          <text x="325" y="65" fontSize="12" fill="#29314D">A AND B</text>
        </svg>
      )
    }
  ];
  
  // Get the current implementations based on selection
  const currentImplementations = selectedDemo === 'nand' ? nandImplementations : norImplementations;
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="p-6 rounded-lg bg-[#F1F6F1] shadow-md"
    >
      <h2 className="text-2xl font-bold text-[#29314D] mb-4">
        <span className="text-[#F2994A]">Universal Gates</span>
      </h2>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-6 text-[#29314D]"
      >
        <p className="mb-4">
          NAND and NOR gates are known as universal gates because any other logic function can be 
          implemented using only NAND gates or only NOR gates. This property makes them particularly 
          important in integrated circuit design.
        </p>
      </motion.div>
      
      {/* Universal Gate Selector */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-[#FFFFFF] p-4 rounded-lg shadow-md mb-6"
      >
        <h3 className="text-xl font-semibold text-[#29314D] mb-4">Select Universal Gate Type:</h3>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setSelectedDemo('nand')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedDemo === 'nand' 
                ? 'bg-[#6E61FF] text-white' 
                : 'bg-[#F1F6F1] text-[#29314D] hover:bg-[#DAC3FF]'
            }`}
          >
            NAND Gate Implementations
          </button>
          <button
            onClick={() => setSelectedDemo('nor')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedDemo === 'nor' 
                ? 'bg-[#56CCF2] text-white' 
                : 'bg-[#F1F6F1] text-[#29314D] hover:bg-[#DAC3FF]'
            }`}
          >
            NOR Gate Implementations
          </button>
        </div>
      </motion.div>
      
      {/* Implementation Demonstrations */}
      <motion.div
        key={selectedDemo}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {currentImplementations.map((implementation, index) => (
          <motion.div
            key={implementation.gate}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index, duration: 0.5 }}
            className="bg-[#FFFFFF] p-4 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-3" style={{ color: selectedDemo === 'nand' ? '#6E61FF' : '#56CCF2' }}>
              {implementation.gate} Using {selectedDemo.toUpperCase()} Gates
            </h3>
            
            <div className="mb-4">
              <p className="text-[#29314D] mb-2">{implementation.description}</p>
              <div className="bg-[#F1F6F1] p-3 rounded-lg font-mono mt-2">
                <code>{implementation.booleanExpression}</code>
              </div>
            </div>
            
            <div className="flex justify-center bg-[#F1F6F1] p-4 rounded-lg">
              {implementation.diagram}
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="mt-6 bg-[#DAC3FF] p-4 rounded-lg"
      >
        <h3 className="text-lg font-semibold text-[#29314D] mb-2">Why Universal Gates Matter:</h3>
        <ul className="list-disc list-inside text-[#29314D] space-y-2 ml-4">
          <li>They simplify integrated circuit manufacturing by allowing standardization on a single gate type</li>
          <li>Fewer different components means more efficient production and lower costs</li>
          <li>The universality property is vital in designing minimalist computing systems</li>
          <li>In practice, most digital ICs use NAND gates as their fundamental building block</li>
        </ul>
      </motion.div>
    </motion.section>
  );
};

export default UniversalGatesComponent;