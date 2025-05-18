import React, { useState } from 'react';
import { motion } from 'framer-motion';

const RegexBoolean = () => {
  const [pattern, setPattern] = useState('^a.*b$');
  const [testString, setTestString] = useState('acb');
  const [matchResult, setMatchResult] = useState(true);
  
  // Test strings for demonstration
  const sampleStrings = ['acb', 'abc', 'cab', 'ab', 'a123b', 'abc123'];
  
  // Update match result when pattern or test string changes
  const checkMatch = (pat, str) => {
    try {
      const regex = new RegExp(pat);
      return regex.test(str);
    } catch (e) {
      return false;
    }
  };
  
  // Handle pattern change
  const handlePatternChange = (e) => {
    const newPattern = e.target.value;
    setPattern(newPattern);
    setMatchResult(checkMatch(newPattern, testString));
  };
  
  // Handle test string change
  const handleStringSelect = (str) => {
    setTestString(str);
    setMatchResult(checkMatch(pattern, str));
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
        <span className="text-[#27AE60]">6. Boolean Algebra in Regular Expressions</span>
      </h2>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-6 text-[#29314D]"
      >
        <p className="mb-4">
          Regular expressions (regex) heavily rely on Boolean logic for pattern matching.
          Each character or group in a regex pattern represents a condition that must be met
          for a successful match.
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
{`import re

# Match strings that start with 'a' AND end with 'b'
pattern = r'^a.*b$'

strings = ['acb', 'abc', 'cab']
for s in strings:
    matches = bool(re.match(pattern, s))
    print(f"'{s}' matches: {matches}")`}
          </code>
        </pre>
      </motion.div>
      
      {/* Interactive Regex Pattern Matcher */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="bg-[#FFFFFF] p-4 rounded-lg shadow-md mb-6"
      >
        <h3 className="text-xl font-semibold text-[#6E61FF] mb-3">🎮 Regex Pattern Matcher</h3>
        
        <div className="mb-4">
          <label className="block text-[#29314D] mb-2">Regex Pattern:</label>
          <div className="flex items-center">
            <input 
              type="text" 
              value={pattern} 
              onChange={handlePatternChange}
              className="flex-grow p-2 border border-[#DAC3FF] rounded-md font-mono"
            />
          </div>
          <p className="text-sm text-[#29314D] mt-1">
            <strong>Pattern meaning:</strong> Match strings that start with 'a' AND end with 'b'
          </p>
        </div>
        
        <div className="mb-4">
          <label className="block text-[#29314D] mb-2">Test String: "{testString}"</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {sampleStrings.map((str, index) => (
              <button 
                key={index}
                onClick={() => handleStringSelect(str)}
                className={`p-2 border rounded-md font-mono ${
                  testString === str
                    ? 'bg-[#9B51E0] text-white border-[#9B51E0]'
                    : 'bg-white text-[#29314D] border-[#DAC3FF] hover:bg-[#F1F6F1]'
                }`}
              >
                {str}
              </button>
            ))}
          </div>
        </div>
        
        {/* Match Result */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          key={`${pattern}-${testString}`}
          className={`p-4 rounded-lg ${
            matchResult ? 'bg-[#27AE60] text-white' : 'bg-[#F14E3A] text-white'
          }`}
        >
          <h4 className="font-bold mb-1">Match Result:</h4>
          <p className="font-mono">
            "{testString}" {matchResult ? 'MATCHES' : 'DOES NOT MATCH'} /{pattern}/
          </p>
        </motion.div>
      </motion.div>
      
      {/* Boolean Logic in Regex Explanation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="bg-[#DAC3FF] p-4 rounded-lg mb-6"
      >
        <h3 className="text-lg font-semibold text-[#29314D] mb-2">Boolean Logic in Regex:</h3>
        
        <div className="bg-[#FFFFFF] p-3 rounded-lg mb-3">
          <h4 className="font-semibold text-[#29314D]">Common Boolean Operations in Regex:</h4>
          <ul className="list-disc list-inside text-[#29314D] ml-4 mt-2">
            <li><strong>AND:</strong> Multiple conditions that must all be true (implicitly applied)</li>
            <li><strong>OR:</strong> Alternative patterns using the <code className="bg-[#F1F6F1] px-1 rounded">|</code> operator</li>
            <li><strong>NOT:</strong> Negative character classes <code className="bg-[#F1F6F1] px-1 rounded">[^...]</code> or negative lookahead <code className="bg-[#F1F6F1] px-1 rounded">(?!...)</code></li>
          </ul>
        </div>
        
        <div className="bg-[#FFFFFF] p-3 rounded-lg">
          <h4 className="font-semibold text-[#29314D]">Our Pattern <code className="bg-[#F1F6F1] px-1 rounded">^a.*b$</code> Explained:</h4>
          <ul className="list-disc list-inside text-[#29314D] ml-4 mt-2">
            <li><code className="bg-[#F1F6F1] px-1 rounded">^a</code>: String must start with 'a' (first condition)</li>
            <li><code className="bg-[#F1F6F1] px-1 rounded">.*</code>: Any characters in between (wildcard)</li>
            <li><code className="bg-[#F1F6F1] px-1 rounded">b$</code>: String must end with 'b' (second condition)</li>
            <li>These conditions are combined with an implicit AND operation</li>
          </ul>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="bg-[#56CCF2] p-4 rounded-lg"
      >
        <h3 className="text-lg font-semibold text-[#29314D] mb-2">💡 Real-world Applications:</h3>
        <ul className="list-disc list-inside text-[#29314D] space-y-2 ml-4">
          <li>Input validation (email addresses, phone numbers, etc.)</li>
          <li>Text searching and pattern matching</li>
          <li>Data extraction from text</li>
          <li>Lexical analysis in compilers</li>
          <li>Search and replace operations in text editors</li>
          <li>URL routing in web frameworks</li>
        </ul>
      </motion.div>
    </motion.section>
  );
};

export default RegexBoolean;