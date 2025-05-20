import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';

const IntroductionComponent = () => {
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
          <span className="text-[#9B51E0]">Boolean Algebra</span> in Programming
        </h1>
        <div className="text-xl text-[#29314D]">
          <Typewriter
            words={['Now that you understand the theory, let\'s see how Boolean Algebra powers real-world code!']}
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
        transition={{ delay: 1.2, duration: 0.5 }}
        className="bg-[#DAC3FF] p-4 rounded-lg shadow-inner mb-6"
      >
        <h2 className="text-xl font-bold text-[#29314D] mb-2">🎯 In this lesson, you will:</h2>
        <ul className="list-disc list-inside text-[#29314D] space-y-3 ml-4">
          <motion.li 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <strong>Explore</strong> how Boolean operations apply in various programming scenarios
          </motion.li>
          <motion.li 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.7, duration: 0.5 }}
          >
            <strong>Discover</strong> bitwise operations and their practical applications
          </motion.li>
          <motion.li 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.9, duration: 0.5 }}
          >
            <strong>Learn</strong> how Boolean logic powers database queries, state management, and more
          </motion.li>
          <motion.li 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.1, duration: 0.5 }}
          >
            <strong>Practice</strong> with interactive examples that demonstrate real-world usage
          </motion.li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="bg-[#FFFFFF] p-4 rounded-lg border-l-4 border-[#6E61FF]"
      >
        <p className="text-[#29314D] italic">
          "Boolean logic isn't just theoretical—it's the foundation of how computers make decisions!"
        </p>
      </motion.div>
    </motion.section>
  );
};

export default IntroductionComponent;