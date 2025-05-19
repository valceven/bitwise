import React from 'react';
import { motion } from 'framer-motion';

const ConclusionComponent = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="p-6 rounded-lg bg-[#F1F6F1] shadow-md"
    >
      <h2 className="text-2xl font-bold text-[#29314D] mb-4">
        <span className="text-[#9B51E0]">Conclusion</span>
      </h2>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-6 bg-[#FFFFFF] p-6 rounded-lg shadow-md"
      >
        <h3 className="text-xl font-semibold text-[#29314D] mb-3">Key Takeaways</h3>
        
        <ul className="space-y-4">
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex items-start"
          >
            <div className="w-8 h-8 rounded-full bg-[#27AE60] flex items-center justify-center text-white font-bold flex-shrink-0 mr-3">1</div>
            <div className="text-[#29314D]">
              <strong>Logic Gates are the Fundamental Building Blocks:</strong> They process binary signals (0s and 1s) according to Boolean functions, forming the basis of all digital systems.
            </div>
          </motion.li>
          
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-start"
          >
            <div className="w-8 h-8 rounded-full bg-[#F2994A] flex items-center justify-center text-white font-bold flex-shrink-0 mr-3">2</div>
            <div className="text-[#29314D]">
              <strong>Universal Gates Enable Flexibility:</strong> NAND and NOR gates are called universal gates because they can be used to create any other logic function, making them crucial in integrated circuit design.
            </div>
          </motion.li>
          
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex items-start"
          >
            <div className="w-8 h-8 rounded-full bg-[#6E61FF] flex items-center justify-center text-white font-bold flex-shrink-0 mr-3">3</div>
            <div className="text-[#29314D]">
              <strong>Digital Building Blocks Create Complex Systems:</strong> Multiplexers (MUX), demultiplexers (DEMUX), and adders combine logic gates to create functional circuits that serve as the building blocks for more complex digital systems.
            </div>
          </motion.li>
          
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex items-start"
          >
            <div className="w-8 h-8 rounded-full bg-[#56CCF2] flex items-center justify-center text-white font-bold flex-shrink-0 mr-3">4</div>
            <div className="text-[#29314D]">
              <strong>Adders Form the Backbone of Computing:</strong> Half adders and full adders are essential components that enable arithmetic operations in computers, forming the foundation of ALUs (Arithmetic Logic Units) in processors.
            </div>
          </motion.li>
          
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex items-start"
          >
            <div className="w-8 h-8 rounded-full bg-[#F14E3A] flex items-center justify-center text-white font-bold flex-shrink-0 mr-3">5</div>
            <div className="text-[#29314D]">
              <strong>Digital Circuit Design Follows Patterns:</strong> Understanding how to combine simple gates into functional blocks like multiplexers and adders provides insight into how complex digital systems are designed, optimized, and implemented.
            </div>
          </motion.li>
        </ul>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="bg-[#DAC3FF] p-6 rounded-lg mb-6"
      >
        <h3 className="text-xl font-semibold text-[#29314D] mb-3">Next Steps in Your Learning Journey</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.3 }}
            className="bg-white p-3 rounded-lg"
          >
            <h4 className="font-semibold text-[#6E61FF]">Sequential Circuits</h4>
            <p className="text-[#29314D] text-sm mt-1">Explore circuits with memory elements like flip-flops and latches that can store information</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.3 }}
            className="bg-white p-3 rounded-lg"
          >
            <h4 className="font-semibold text-[#6E61FF]">Advanced Digital Blocks</h4>
            <p className="text-[#29314D] text-sm mt-1">Study more complex components like encoders, decoders, and comparators</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.3 }}
            className="bg-white p-3 rounded-lg"
          >
            <h4 className="font-semibold text-[#6E61FF]">Multi-bit Operations</h4>
            <p className="text-[#29314D] text-sm mt-1">Learn how to combine full adders to create ripple carry adders and other multi-bit processing units</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.3 }}
            className="bg-white p-3 rounded-lg"
          >
            <h4 className="font-semibold text-[#6E61FF]">Computer Architecture</h4>
            <p className="text-[#29314D] text-sm mt-1">Discover how these building blocks form the basis of CPU design and computer memory systems</p>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="bg-[#29314D] text-white p-6 rounded-lg text-center"
      >
        <h3 className="text-xl font-semibold mb-4">Congratulations!</h3>
        <p>
          You've completed the lesson on Logic Gates, Circuits, and Digital Building Blocks. This knowledge provides 
          the foundation for understanding how computers process information at the hardware level.
        </p>
        <p className="mt-4">
          Continue exploring the interactive components to see how multiplexers, demultiplexers, and adders work.
          Try the quiz to test your understanding, and see if you can design your own digital circuits!
        </p>
      </motion.div>
    </motion.section>
  );
};

export default ConclusionComponent;