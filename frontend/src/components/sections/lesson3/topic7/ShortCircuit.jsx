import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ShortCircuit = () => {
  const [userId, setUserId] = useState(1);
  const [processingResult, setProcessingResult] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [executionTracker, setExecutionTracker] = useState({
    getUserDataCalled: false,
    returnedValue: null,
    secondConditionEvaluated: false,
    finalResult: false
  });
  
  // Simulated database function
  const getUserData = (userId) => {
    // Track that this function was called
    setExecutionTracker(prev => ({
      ...prev,
      getUserDataCalled: true
    }));
    
    // Simulate returning user data or null
    const result = userId > 0 
      ? { name: "Alice", active: true } 
      : null;
    
    setExecutionTracker(prev => ({
      ...prev,
      returnedValue: result
    }));
    
    return result;
  };
  
  // Process function that uses short-circuit evaluation
  const processActiveUser = (userId) => {
    // Reset tracker
    setExecutionTracker({
      getUserDataCalled: false,
      returnedValue: null,
      secondConditionEvaluated: false,
      finalResult: false
    });
    
    const user = getUserData(userId);
    
    // This is where short-circuit evaluation happens
    // If user is null, the second part won't be evaluated
    let result = false;
    
    if (user) {
      // Track that second condition was evaluated
      setExecutionTracker(prev => ({
        ...prev,
        secondConditionEvaluated: true
      }));
      
      if (user.active) {
        result = true;
      }
    }
    
    setExecutionTracker(prev => ({
      ...prev,
      finalResult: result
    }));
    
    setProcessingResult(result);
    return result;
  };
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="p-6 rounded-lg bg-[#F1F6F1] shadow-md"
    >
      <h2 className="text-2xl font-bold text-[#29314D] mb-4">
        <span className="text-[#6E61FF]">4. Short-Circuit Evaluation in Practice</span>
      </h2>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-6 text-[#29314D]"
      >
        <p className="mb-4">
          Short-circuit evaluation is a technique where the second part of a logical expression 
          is only evaluated if necessary. This can improve performance and prevent errors in code.
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
{`def get_user_data(user_id):
    # This might be an expensive database operation
    print("Fetching user data...")
    return {"name": "Alice", "active": True} if user_id > 0 else None

def process_active_user(user_id):
    user = get_user_data(user_id)
    
    # Short-circuit prevents null reference errors and saves computation
    if user and user.get("active"):
        print(f"Processing user: {user['name']}")
        return True
    return False`}
          </code>
        </pre>
      </motion.div>
      
      {/* Interactive Short-Circuit Demo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="bg-[#FFFFFF] p-4 rounded-lg shadow-md mb-6"
      >
        <h3 className="text-xl font-semibold text-[#6E61FF] mb-3">🎮 Short-Circuit Evaluation Demo</h3>
        
        <div className="mb-4">
          <label className="block text-[#29314D] mb-2">
            User ID: {userId} (negative values will return null)
          </label>
          <input 
            type="range" 
            min="-5" 
            max="5" 
            value={userId} 
            onChange={(e) => setUserId(parseInt(e.target.value))}
            className="w-full h-2 bg-[#DAC3FF] rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <div className="mb-4">
          <button 
            onClick={() => processActiveUser(userId)}
            className="bg-[#27AE60] hover:bg-[#219653] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
          >
            Process User
          </button>
          <button 
            onClick={() => setShowExplanation(!showExplanation)}
            className="bg-[#9B51E0] hover:bg-[#8A41D0] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
          </button>
        </div>
        
        {/* Execution Flow Visualization */}
        {executionTracker.getUserDataCalled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <h4 className="font-semibold text-[#29314D] mb-2">Execution Flow:</h4>
            
            <div className="bg-[#F1F6F1] p-3 rounded-lg mb-2">
              <p className="text-[#29314D]">
                <span className="font-mono text-[#27AE60]">1. get_user_data({userId})</span> was called
              </p>
              <p className="text-[#29314D] mt-1">
                <span className="font-mono">→ Returned: </span>
                <code className="bg-[#E6E6E6] px-1 rounded">
                  {executionTracker.returnedValue === null ? 'null' : JSON.stringify(executionTracker.returnedValue)}
                </code>
              </p>
            </div>
            
            <div className="bg-[#F1F6F1] p-3 rounded-lg mb-2">
              <p className="text-[#29314D]">
                <span className="font-mono text-[#6E61FF]">2. if (user)</span>
                <span className="ml-2">
                  {executionTracker.returnedValue !== null ? 
                    <span className="text-[#27AE60]">→ truthy, continue</span> : 
                    <span className="text-[#F14E3A]">→ falsy, skip rest of condition</span>}
                </span>
              </p>
            </div>
            
            {executionTracker.secondConditionEvaluated && (
              <div className="bg-[#F1F6F1] p-3 rounded-lg mb-2">
                <p className="text-[#29314D]">
                  <span className="font-mono text-[#F2C94C]">3. user.active</span>
                  <span className="ml-2">
                    {executionTracker.finalResult ? 
                      <span className="text-[#27AE60]">→ true</span> : 
                      <span className="text-[#F14E3A]">→ false</span>}
                  </span>
                </p>
              </div>
            )}
            
            <div className="bg-[#F1F6F1] p-3 rounded-lg">
              <p className="text-[#29314D]">
                <span className="font-mono font-bold">Final result: </span>
                <span className={executionTracker.finalResult ? "text-[#27AE60] font-bold" : "text-[#F14E3A] font-bold"}>
                  {executionTracker.finalResult ? 'TRUE' : 'FALSE'}
                </span>
              </p>
            </div>
          </motion.div>
        )}
        
        {/* Short Circuit Explanation */}
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.5 }}
            className="bg-[#DAC3FF] p-4 rounded-lg mt-4"
          >
            <h4 className="text-lg font-semibold text-[#29314D] mb-2">
              How Short-Circuit Evaluation Works:
            </h4>
            
            <p className="text-[#29314D] mb-3">
              In Boolean expressions like <code className="bg-white px-1 rounded">A && B</code> or <code className="bg-white px-1 rounded">A || B</code>:
            </p>
            
            <ul className="list-disc list-inside text-[#29314D] space-y-3 ml-4">
              <li>
                <strong>AND (&&):</strong> If A is false, B is not evaluated because the result will be false regardless.
              </li>
              <li>
                <strong>OR (||):</strong> If A is true, B is not evaluated because the result will be true regardless.
              </li>
            </ul>
            
            <p className="text-[#29314D] mt-3">
              In our example, <code className="bg-white px-1 rounded">if (user && user.active)</code> prevents trying to access
              the <code className="bg-white px-1 rounded">active</code> property on a null reference, avoiding an error.
            </p>
          </motion.div>
        )}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="bg-[#F2994A] p-4 rounded-lg"
      >
        <h3 className="text-lg font-semibold text-[#29314D] mb-2">💡 Common Use Cases:</h3>
        <ul className="list-disc list-inside text-[#29314D] space-y-2 ml-4">
          <li>Null checking before accessing object properties</li>
          <li>Avoiding unnecessary expensive computations</li>
          <li>Implementing guard clauses in functions</li>
          <li>Default value assignment: <code className="bg-white px-1 rounded">const name = user?.name || "Guest"</code></li>
          <li>Conditional function execution: <code className="bg-white px-1 rounded">isAdmin && showAdminPanel()</code></li>
        </ul>
      </motion.div>
    </motion.section>
  );
};

export default ShortCircuit;