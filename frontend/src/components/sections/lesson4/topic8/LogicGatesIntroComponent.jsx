import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

const LogicGatesIntroComponent = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="p-6 rounded-lg bg-[#F1F6F1] shadow-md"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold text-[#29314D] mb-4">
          <span className="text-[#9B51E0]">Introduction to</span> Logic Gates and Circuits
        </h1>
        <div className="text-xl text-[#29314D]">
          <Typewriter
            words={["Let's explore how Boolean algebra is physically implemented in digital electronics..."]}
            cursor
            cursorStyle='_'
            typeSpeed={40}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="bg-[#FFFFFF] p-6 rounded-lg shadow-md mb-6"
      >
        <h2 className="text-2xl font-bold text-[#6E61FF] mb-4">What Are Logic Gates?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <p className="text-[#29314D]">
              Logic gates are the fundamental building blocks of digital circuits. They are physical electronic 
              devices that implement Boolean functions, taking one or more binary inputs (0 or 1) and producing 
              a single binary output based on those inputs.
            </p>
            <p className="mt-4 text-[#29314D]">
              Just as we use Boolean operators in programming, logic gates perform the same operations but in 
              hardware. They're how computers process information at the most basic level.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="bg-[#F1F6F1] p-4 rounded-lg flex flex-col items-center justify-center"
          >
            <div className="w-64 h-64 relative">
              <svg width="100%" height="100%" viewBox="0 0 200 200">
                {/* Stylized CPU/Circuit Animation */}
                <rect x="40" y="40" width="120" height="120" rx="10" fill="#29314D" />
                <circle cx="70" cy="70" r="15" fill="#6E61FF" />
                <circle cx="130" cy="70" r="15" fill="#F2C94C" />
                <circle cx="70" cy="130" r="15" fill="#F14E3A" />
                <circle cx="130" cy="130" r="15" fill="#27AE60" />
                
                {/* Circuit Traces */}
                <path d="M70 85 L70 105 L100 105 L100 120" stroke="#56CCF2" strokeWidth="3" fill="none" />
                <path d="M130 85 L130 100 L110 100 L110 120" stroke="#F2994A" strokeWidth="3" fill="none" />
                <path d="M85 70 L105 70" stroke="#DAC3FF" strokeWidth="3" fill="none" />
                <path d="M85 130 L105 130" stroke="#DAC3FF" strokeWidth="3" fill="none" />
                
                {/* Digital Pulse Animation */}
                <circle cx="85" cy="70" r="3" fill="white">
                  <animate attributeName="cx" from="70" to="130" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="85" cy="130" r="3" fill="white">
                  <animate attributeName="cx" from="130" to="70" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="70" cy="95" r="3" fill="white">
                  <animate attributeName="cy" from="70" to="130" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="130" cy="95" r="3" fill="white">
                  <animate attributeName="cy" from="130" to="70" dur="3s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>
            <p className="text-sm text-[#29314D] text-center mt-2">
              Logic gates form the foundation of all digital systems
            </p>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        className="bg-[#DAC3FF] p-6 rounded-lg"
      >
        <h2 className="text-2xl font-bold text-[#29314D] mb-4">Key Concepts of Logic Gates</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.3 }}
            className="bg-white p-4 rounded-lg"
          >
            <div className="w-12 h-12 rounded-full bg-[#F14E3A] flex items-center justify-center text-white font-bold mb-3">1</div>
            <h3 className="text-lg font-semibold text-[#29314D] mb-2">Binary Signals</h3>
            <p className="text-[#29314D]">
              Logic gates process binary signals: HIGH (1) and LOW (0), representing on/off, true/false states.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.3 }}
            className="bg-white p-4 rounded-lg"
          >
            <div className="w-12 h-12 rounded-full bg-[#27AE60] flex items-center justify-center text-white font-bold mb-3">2</div>
            <h3 className="text-lg font-semibold text-[#29314D] mb-2">Boolean Operations</h3>
            <p className="text-[#29314D]">
              Each gate implements a specific Boolean function (AND, OR, NOT, etc.) in physical hardware.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.3 }}
            className="bg-white p-4 rounded-lg"
          >
            <div className="w-12 h-12 rounded-full bg-[#F2C94C] flex items-center justify-center text-white font-bold mb-3">3</div>
            <h3 className="text-lg font-semibold text-[#29314D] mb-2">Circuit Integration</h3>
            <p className="text-[#29314D]">
              Gates can be combined to create complex circuits that perform specific computational tasks.
            </p>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.5 }}
        className="mt-6 bg-[#29314D] text-white p-6 rounded-lg text-center"
      >
        <h2 className="text-2xl font-bold mb-4">In This Lesson</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.3 }}
            className="bg-[#6E61FF] p-3 rounded-lg"
          >
            <p className="font-semibold">Basic Logic Gates</p>
            <p className="text-sm mt-1">NOT, AND, OR, XOR</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.3 }}
            className="bg-[#F2994A] p-3 rounded-lg"
          >
            <p className="font-semibold">Complex Gates</p>
            <p className="text-sm mt-1">NAND, NOR, XNOR</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.3 }}
            className="bg-[#27AE60] p-3 rounded-lg"
          >
            <p className="font-semibold">Logic Circuits</p>
            <p className="text-sm mt-1">Adders, Flip-Flops</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 0.3 }}
            className="bg-[#F14E3A] p-3 rounded-lg"
          >
            <p className="font-semibold">Interactive Quiz</p>
            <p className="text-sm mt-1">Test Your Knowledge</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default LogicGatesIntroComponent;