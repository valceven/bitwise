import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

const ConclusionComponent = () => {
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
          <span className="text-[#9B51E0]">Closing Thoughts</span> on Boolean Algebra in Programming
        </h1>
        <div className="text-xl text-[#29314D]">
          <Typewriter
            words={["Let's reflect on how Boolean algebra fundamentals are woven throughout modern programming..."]}
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
        <h2 className="text-2xl font-bold text-[#27AE60] mb-4">Key Takeaways</h2>
        
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex items-start"
          >
            <div className="w-10 h-10 rounded-full bg-[#6E61FF] flex items-center justify-center text-white font-bold flex-shrink-0 mr-4">1</div>
            <div>
              <h3 className="text-lg font-semibold text-[#29314D]">Boolean Logic is Everywhere</h3>
              <p className="mt-1 text-[#29314D]">
                From conditional statements to database queries, Boolean expressions are the foundation of program decision-making.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="flex items-start"
          >
            <div className="w-10 h-10 rounded-full bg-[#F2994A] flex items-center justify-center text-white font-bold flex-shrink-0 mr-4">2</div>
            <div>
              <h3 className="text-lg font-semibold text-[#29314D]">Optimization Through Boolean Algebra</h3>
              <p className="mt-1 text-[#29314D]">
                Applying laws like De Morgan's can simplify complex conditions, making code more readable and efficient.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            className="flex items-start"
          >
            <div className="w-10 h-10 rounded-full bg-[#56CCF2] flex items-center justify-center text-white font-bold flex-shrink-0 mr-4">3</div>
            <div>
              <h3 className="text-lg font-semibold text-[#29314D]">From Theory to Practice</h3>
              <p className="mt-1 text-[#29314D]">
                The Boolean algebra we learn in theory translates directly to practical programming techniques across various paradigms.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="flex items-start"
          >
            <div className="w-10 h-10 rounded-full bg-[#F14E3A] flex items-center justify-center text-white font-bold flex-shrink-0 mr-4">4</div>
            <div>
              <h3 className="text-lg font-semibold text-[#29314D]">Hardware-Software Connection</h3>
              <p className="mt-1 text-[#29314D]">
                Boolean functions in code mirror the physical logic gates in electronics, forming the bridge between software and hardware.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="bg-[#DAC3FF] p-6 rounded-lg mb-6"
      >
        <h2 className="text-2xl font-bold text-[#29314D] mb-4">Boolean Algebra in Different Programming Contexts</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-[#6E61FF]">Functional Programming</h3>
            <p className="mt-2 text-[#29314D]">
              Boolean operations power filter functions, predicates, and higher-order functions that process collections.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-[#F2994A]">Object-Oriented Programming</h3>
            <p className="mt-2 text-[#29314D]">
              Boolean logic defines object behavior through polymorphism and determines class relationships and instance validation.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-[#56CCF2]">Web Development</h3>
            <p className="mt-2 text-[#29314D]">
              Boolean expressions control UI rendering, form validation, routing logic, and state management in modern frameworks.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-[#27AE60]">System Programming</h3>
            <p className="mt-2 text-[#29314D]">
              Bitwise operations and low-level Boolean logic enable efficient memory management and hardware interfacing.
            </p>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
        className="bg-[#29314D] text-white p-6 rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Next Steps on Your Journey</h2>
        
        <ul className="space-y-3">
          <motion.li 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.3 }}
            className="flex items-start"
          >
            <div className="w-6 h-6 rounded-full bg-[#F2C94C] flex items-center justify-center text-[#29314D] font-bold flex-shrink-0 mr-3">✓</div>
            <span>Explore logical operations in your favorite programming language</span>
          </motion.li>
          
          <motion.li 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.3 }}
            className="flex items-start"
          >
            <div className="w-6 h-6 rounded-full bg-[#F2C94C] flex items-center justify-center text-[#29314D] font-bold flex-shrink-0 mr-3">✓</div>
            <span>Practice simplifying complex conditionals in existing codebases</span>
          </motion.li>
          
          <motion.li 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.3 }}
            className="flex items-start"
          >
            <div className="w-6 h-6 rounded-full bg-[#F2C94C] flex items-center justify-center text-[#29314D] font-bold flex-shrink-0 mr-3">✓</div>
            <span>Experiment with bitwise operations for performance optimization</span>
          </motion.li>
          
          <motion.li 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.3 }}
            className="flex items-start"
          >
            <div className="w-6 h-6 rounded-full bg-[#F2C94C] flex items-center justify-center text-[#29314D] font-bold flex-shrink-0 mr-3">✓</div>
            <span>Consider how Boolean logic influences database design and queries</span>
          </motion.li>
          
          <motion.li 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 0.3 }}
            className="flex items-start"
          >
            <div className="w-6 h-6 rounded-full bg-[#F2C94C] flex items-center justify-center text-[#29314D] font-bold flex-shrink-0 mr-3">✓</div>
            <span>Try implementing a digital circuit simulator using Boolean functions</span>
          </motion.li>
        </ul>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.5, duration: 0.5 }}
          className="mt-6 bg-[#F1F6F1] text-[#29314D] p-4 rounded-lg text-center"
        >
          <p className="font-bold">Questions or need further clarification?</p>
          <p className="mt-2">Don't hesitate to ask! Boolean algebra is a foundational concept worth mastering.</p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default ConclusionComponent;