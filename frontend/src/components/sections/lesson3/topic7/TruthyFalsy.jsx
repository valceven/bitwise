import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TruthyFalsyComponent = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [isTruthy, setIsTruthy] = useState(null);
  
  // Sample values for demonstration
  const truthyValues = [
    { display: 'true', value: true, type: 'Boolean' },
    { display: '1', value: 1, type: 'Number' },
    { display: '-1', value: -1, type: 'Number' },
    { display: '"hello"', value: 'hello', type: 'String' },
    { display: '[0]', value: [0], type: 'Array' },
    { display: '{ key: "value" }', value: { key: 'value' }, type: 'Object' }
  ];
  
  const falsyValues = [
    { display: 'false', value: false, type: 'Boolean' },
    { display: '0', value: 0, type: 'Number' },
    { display: '""', value: '', type: 'String' },
    { display: '[]', value: [], type: 'Array' },
    { display: '{}', value: {}, type: 'Object' },
    { display: 'null', value: null, type: 'Null' },
    { display: 'undefined', value: undefined, type: 'Undefined' }
  ];
  
  // Test if a value is truthy
  const testTruthiness = (val) => {
    setSelectedValue(val);
    const result = Boolean(val.value);
    setIsTruthy(result);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };
  
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 rounded-lg bg-[#F1F6F1] shadow-md"
    >
      <h2 className="text-2xl font-bold text-[#29314D] mb-4">
        <span className="text-[#F2C94C]">8. Beyond True and False: Truthy and Falsy Values</span>
      </h2>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-6 text-[#29314D]"
      >
        <p className="mb-4">
          Many programming languages extend Boolean logic to non-Boolean values. In JavaScript, every value is either "truthy" or "falsy" 
          when evaluated in a Boolean context. This concept allows for concise and expressive code patterns.
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
{`// In JavaScript, these values are considered "falsy":
falsy_values = [false, 0, "", [], {}, null, undefined]

// Everything else is "truthy"
truthy_values = [true, 1, -1, "hello", [0], {"key": "value"}]

// This allows for concise code
username = input("Enter username: ") || "Guest"  // Uses "Guest" if input is empty`}
          </code>
        </pre>
      </motion.div>
      
      {/* Interactive Truthy/Falsy Explorer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="bg-[#FFFFFF] p-4 rounded-lg shadow-md mb-6"
      >
        <h3 className="text-xl font-semibold text-[#6E61FF] mb-3">🎮 Truthy/Falsy Value Explorer</h3>
        
        <p className="text-[#29314D] mb-4">
          Click on any value to see if JavaScript considers it truthy or falsy in a Boolean context:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-semibold text-[#27AE60] mb-2">Truthy Values:</h4>
            <div className="grid grid-cols-2 gap-2">
              {truthyValues.map((item, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => testTruthiness(item)}
                  className="p-2 border-2 border-[#27AE60] rounded-md text-[#29314D] hover:bg-[#27AE60] hover:text-white transition-colors"
                >
                  {item.display}
                </motion.button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-[#F14E3A] mb-2">Falsy Values:</h4>
            <div className="grid grid-cols-2 gap-2">
              {falsyValues.map((item, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => testTruthiness(item)}
                  className="p-2 border-2 border-[#F14E3A] rounded-md text-[#29314D] hover:bg-[#F14E3A] hover:text-white transition-colors"
                >
                  {item.display}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Result Display */}
        {selectedValue && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            key={selectedValue.display}
            className="bg-[#F1F6F1] p-4 rounded-lg"
          >
            <h4 className="font-semibold text-[#29314D] mb-2">When used in a Boolean context:</h4>
            <div className="flex items-center">
              <div className="font-mono bg-white p-2 rounded border border-[#DAC3FF]">
                if ({selectedValue.display}) &#123; ... &#125;
              </div>
              <div className="mx-4">→</div>
              <div className={`p-2 rounded-md font-bold ${
                isTruthy ? 'bg-[#27AE60] text-white' : 'bg-[#F14E3A] text-white'
              }`}>
                {isTruthy ? 'TRUTHY (condition runs)' : 'FALSY (condition skipped)'}
              </div>
            </div>
            
            <div className="mt-4 bg-[#DAC3FF] p-3 rounded-md">
              <p className="text-[#29314D]">
                <strong>Type:</strong> {selectedValue.type}
              </p>
              <p className="text-[#29314D] mt-1">
                <strong>Boolean evaluation:</strong> {String(Boolean(selectedValue.value))}
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
      
      {/* Practical Examples */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="bg-[#DAC3FF] p-4 rounded-lg mb-6"
      >
        <h3 className="text-lg font-semibold text-[#29314D] mb-3">Common Truthy/Falsy Patterns:</h3>
        
        <div className="space-y-4">
          <div className="bg-white p-3 rounded-lg">
            <h4 className="font-semibold text-[#6E61FF]">Default Values:</h4>
            <pre className="bg-[#F1F6F1] p-2 rounded mt-1 font-mono overflow-x-auto">
              <code>const username = userInput || "Guest";</code>
            </pre>
            <p className="text-[#29314D] mt-2">
              If userInput is falsy (empty string, null, etc.), "Guest" is used instead.
            </p>
          </div>
          
          <div className="bg-white p-3 rounded-lg">
            <h4 className="font-semibold text-[#6E61FF]">Conditional Execution:</h4>
            <pre className="bg-[#F1F6F1] p-2 rounded mt-1 font-mono overflow-x-auto">
              <code>isAdmin && showAdminPanel();</code>
            </pre>
            <p className="text-[#29314D] mt-2">
              The showAdminPanel function only executes if isAdmin is truthy.
            </p>
          </div>
          
          <div className="bg-white p-3 rounded-lg">
            <h4 className="font-semibold text-[#6E61FF]">Existence Checking:</h4>
            <pre className="bg-[#F1F6F1] p-2 rounded mt-1 font-mono overflow-x-auto">
              <code>if (data) &#123;
  // Only process if data exists and is not empty
  processData(data);
&#125;</code>
            </pre>
            <p className="text-[#29314D] mt-2">
              This checks if data is not null, undefined, empty string, 0, etc.
            </p>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="bg-[#F2994A] p-4 rounded-lg"
      >
        <h3 className="text-lg font-semibold text-[#29314D] mb-2">💡 Language Differences:</h3>
        <p className="text-[#29314D] mb-3">
          Different languages handle truthy/falsy values differently:
        </p>
        <ul className="list-disc list-inside text-[#29314D] space-y-2 ml-4">
          <li><strong>JavaScript:</strong> Has extensive truthy/falsy rules (as seen above)</li>
          <li><strong>Python:</strong> Empty collections, 0, None, and False are falsy; everything else is truthy</li>
          <li><strong>Ruby:</strong> Only false and nil are falsy; everything else (including 0 and empty strings) is truthy</li>
          <li><strong>PHP:</strong> Similar to JavaScript, but with some differences (empty arrays are truthy)</li>
        </ul>
        <p className="text-[#29314D] mt-3">
          Understanding these rules is crucial when writing conditional expressions in different languages!
        </p>
      </motion.div>
    </motion.section>
  );
};

export default TruthyFalsyComponent;