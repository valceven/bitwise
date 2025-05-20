import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DeMorgansLawsComponent = () => {
  const [showExplanation, setShowExplanation] = useState(false);
  const [isRegistered, setIsRegistered] = useState(true);
  const [hasPaidFee, setHasPaidFee] = useState(true);
  
  // Calculate access based on both normal and De Morgan's version
  const originalCondition = !(isRegistered && hasPaidFee);
  const deMorgansVersion = !isRegistered || !hasPaidFee;
  
  // Demonstrate equivalence
  const areEqual = originalCondition === deMorgansVersion;
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="p-6 rounded-lg bg-[#F1F6F1] shadow-md"
    >
      <h2 className="text-2xl font-bold text-[#29314D] mb-4">
        <span className="text-[#F14E3A]">5. Complex Conditionals and De Morgan's Laws</span>
      </h2>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-6 text-[#29314D]"
      >
        <p className="mb-4">
          De Morgan's Laws are powerful tools for simplifying and transforming complex Boolean expressions.
          They help make code more readable and maintainable by converting between equivalent forms.
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
{`# These two expressions are equivalent
not (a and b) == (not a) or (not b)
not (a or b) == (not a) and (not b)

# Instead of this complex condition
if not (is_registered and has_paid_fee):
    print("Cannot access course")

# We can rewrite as
if not is_registered or not has_paid_fee:
    print("Cannot access course")`}
          </code>
        </pre>
      </motion.div>
      
      {/* Interactive De Morgan's Laws Demo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="bg-[#FFFFFF] p-4 rounded-lg shadow-md mb-6"
      >
        <h3 className="text-xl font-semibold text-[#6E61FF] mb-3">🎮 De Morgan's Laws Interactive Demo</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="registered-checkbox"
                checked={isRegistered}
                onChange={() => setIsRegistered(!isRegistered)}
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="registered-checkbox" className="text-[#29314D]">
                User is registered
              </label>
            </div>
            
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="paid-checkbox"
                checked={hasPaidFee}
                onChange={() => setHasPaidFee(!hasPaidFee)}
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="paid-checkbox" className="text-[#29314D]">
                User has paid fee
              </label>
            </div>
          </div>
          
          <div className="bg-[#F1F6F1] p-3 rounded-lg">
            <h4 className="font-semibold text-[#29314D] mb-2">Variable Values:</h4>
            <p className="text-[#29314D] font-mono">
              is_registered = <span className={isRegistered ? "text-[#27AE60]" : "text-[#F14E3A]"}>{isRegistered.toString()}</span>
            </p>
            <p className="text-[#29314D] font-mono">
              has_paid_fee = <span className={hasPaidFee ? "text-[#27AE60]" : "text-[#F14E3A]"}>{hasPaidFee.toString()}</span>
            </p>
          </div>
        </div>
        
        <div className="mb-4">
          <button 
            onClick={() => setShowExplanation(!showExplanation)}
            className="bg-[#9B51E0] hover:bg-[#8A41D0] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
          </button>
        </div>
        
        {/* Results Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="bg-[#56CCF2] p-4 rounded-lg shadow-inner"
          >
            <h4 className="font-bold text-[#29314D]">Original Expression:</h4>
            <div className="bg-[#FFFFFF] p-2 rounded mt-2 font-mono">
              <p>not (is_registered and has_paid_fee)</p>
              <p className="mt-2">
                not ({isRegistered.toString()} and {hasPaidFee.toString()})
              </p>
              <p className="mt-2">
                not ({(isRegistered && hasPaidFee).toString()})
              </p>
              <p className="mt-2 font-bold">
                Result: {originalCondition.toString()}
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="bg-[#F2994A] p-4 rounded-lg shadow-inner"
          >
            <h4 className="font-bold text-[#29314D]">De Morgan's Version:</h4>
            <div className="bg-[#FFFFFF] p-2 rounded mt-2 font-mono">
              <p>not is_registered or not has_paid_fee</p>
              <p className="mt-2">
                {(!isRegistered).toString()} or {(!hasPaidFee).toString()}
              </p>
              <p className="mt-2 font-bold">
                Result: {deMorgansVersion.toString()}
              </p>
            </div>
          </motion.div>
        </div>
        
        <div className={`p-3 rounded-lg text-center font-bold ${areEqual ? 'bg-[#27AE60] text-white' : 'bg-[#F14E3A] text-white'}`}>
          {areEqual ? 'Both expressions are equivalent! ✓' : 'Expressions are not equivalent! ✗'}
        </div>
        
        {/* Course Access Application */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-4 p-4 rounded-lg bg-[#DAC3FF]"
        >
          <h4 className="font-bold text-[#29314D] mb-2">Course Access Decision:</h4>
          <div className={`p-3 rounded-lg ${originalCondition ? 'bg-[#F14E3A]' : 'bg-[#27AE60]'}`}>
            <p className="text-white font-medium">
              {originalCondition 
                ? 'Cannot access course' 
                : 'Can access course'}
            </p>
          </div>
        </motion.div>
        
        {/* De Morgan's Laws Explanation */}
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.5 }}
            className="bg-[#F1F6F1] p-4 rounded-lg mt-4"
          >
            <h4 className="text-lg font-semibold text-[#29314D] mb-2">
              De Morgan's Laws Explained:
            </h4>
            
            <div className="bg-[#FFFFFF] p-3 rounded-lg mb-3">
              <p className="text-[#9B51E0] font-semibold">First Law:</p>
              <p className="text-[#29314D] font-mono mt-1">
                not (A and B) = not A or not B
              </p>
            </div>
            
            <div className="bg-[#FFFFFF] p-3 rounded-lg mb-3">
              <p className="text-[#9B51E0] font-semibold">Second Law:</p>
              <p className="text-[#29314D] font-mono mt-1">
                not (A or B) = not A and not B
              </p>
            </div>
            
            <p className="text-[#29314D] mt-3">
              These laws allow us to "distribute" the NOT operation over AND/OR expressions, 
              flipping the operators in the process (AND becomes OR, OR becomes AND).
            </p>
            
            <p className="text-[#29314D] mt-3">
              In programming, this often makes complex conditions more intuitive and easier to read,
              especially when you need to negate a compound condition.
            </p>
          </motion.div>
        )}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="bg-[#F2C94C] p-4 rounded-lg"
      >
        <h3 className="text-lg font-semibold text-[#29314D] mb-2">💡 Practical Applications:</h3>
        <ul className="list-disc list-inside text-[#29314D] space-y-2 ml-4">
          <li>Simplifying complex conditional statements</li>
          <li>Making negated conditions more readable</li>
          <li>Optimizing logic circuits in hardware design</li>
          <li>Improving maintainability of complex logical expressions</li>
          <li>Debugging logical errors by converting between equivalent forms</li>
        </ul>
      </motion.div>
    </motion.section>
  );
};

export default DeMorgansLawsComponent;