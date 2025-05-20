import React, { useState } from 'react';
import { motion } from 'framer-motion';

const StateManagement = () => {
  // State for the UserAccount simulation
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasPremium, setHasPremium] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginAttempt, setLoginAttempt] = useState(false);
  
  // Handle login simulation
  const handleLogin = () => {
    // Simple validation
    if (username.length >= 3 && password.length >= 3) {
      setIsLoggedIn(true);
      setLoginAttempt(true);
    } else {
      setLoginAttempt(true);
      setIsLoggedIn(false);
    }
  };
  
  // Determine dashboard access based on Boolean conditions
  const canAccessDashboard = isLoggedIn && (isAdmin || hasPremium);
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="p-6 rounded-lg bg-[#F1F6F1] shadow-md"
    >
      <h2 className="text-2xl font-bold text-[#29314D] mb-4">
        <span className="text-[#F2C94C]">3. Boolean Flags and State Management</span>
      </h2>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-6 text-[#29314D]"
      >
        <p className="mb-4">
          Programs often use Boolean variables to track states and control access to features.
          These Boolean flags become the building blocks for complex permission systems and 
          application logic.
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
{`class UserAccount:
    def __init__(self):
        self.is_logged_in = False
        self.is_admin = False
        self.has_premium = False
    
    def login(self, username, password):
        # Authentication logic here
        self.is_logged_in = True  # Set flag if authentication succeeds
    
    def can_access_dashboard(self):
        return self.is_logged_in and (self.is_admin or self.has_premium)`}
          </code>
        </pre>
      </motion.div>
      
      {/* Interactive User Account Simulation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="bg-[#FFFFFF] p-4 rounded-lg shadow-md mb-6"
      >
        <h3 className="text-xl font-semibold text-[#6E61FF] mb-3">🎮 User Account Simulation</h3>
        
        <div className="mb-4">
          <label className="block text-[#29314D] mb-2">Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-[#DAC3FF] rounded-md"
            placeholder="Enter username (min 3 characters)"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-[#29314D] mb-2">Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-[#DAC3FF] rounded-md"
            placeholder="Enter password (min 3 characters)"
          />
        </div>
        
        <div className="mb-4">
          <button 
            onClick={handleLogin}
            className="bg-[#27AE60] hover:bg-[#219653] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
        
        {loginAttempt && !isLoggedIn && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#F14E3A] text-white p-2 rounded mb-4"
          >
            Login failed. Username and password must be at least 3 characters.
          </motion.div>
        )}
        
        <div className="mb-4 flex flex-col gap-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="admin-checkbox"
              checked={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
              className="mr-2 h-4 w-4"
              disabled={!isLoggedIn}
            />
            <label htmlFor="admin-checkbox" className={`text-[#29314D] ${!isLoggedIn ? 'opacity-50' : ''}`}>
              Admin Account
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="premium-checkbox"
              checked={hasPremium}
              onChange={() => setHasPremium(!hasPremium)}
              className="mr-2 h-4 w-4"
              disabled={!isLoggedIn}
            />
            <label htmlFor="premium-checkbox" className={`text-[#29314D] ${!isLoggedIn ? 'opacity-50' : ''}`}>
              Premium Account
            </label>
          </div>
        </div>
      </motion.div>
      
      {/* State Visualization */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      >
        <div className={`p-4 rounded-lg shadow-inner ${isLoggedIn ? 'bg-[#27AE60]' : 'bg-[#F14E3A]'}`}>
          <h4 className="font-bold text-white">is_logged_in</h4>
          <div className="bg-[#FFFFFF] p-2 rounded mt-2 font-mono">
            <div className="text-[#29314D]">{isLoggedIn ? 'True' : 'False'}</div>
          </div>
        </div>
        
        <div className={`p-4 rounded-lg shadow-inner ${isAdmin ? 'bg-[#27AE60]' : 'bg-[#F14E3A]'}`}>
          <h4 className="font-bold text-white">is_admin</h4>
          <div className="bg-[#FFFFFF] p-2 rounded mt-2 font-mono">
            <div className="text-[#29314D]">{isAdmin ? 'True' : 'False'}</div>
          </div>
        </div>
        
        <div className={`p-4 rounded-lg shadow-inner ${hasPremium ? 'bg-[#27AE60]' : 'bg-[#F14E3A]'}`}>
          <h4 className="font-bold text-white">has_premium</h4>
          <div className="bg-[#FFFFFF] p-2 rounded mt-2 font-mono">
            <div className="text-[#29314D]">{hasPremium ? 'True' : 'False'}</div>
          </div>
        </div>
      </motion.div>
      
      {/* Dashboard Access Visualization */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className={`p-6 rounded-lg shadow-md ${canAccessDashboard ? 'bg-[#27AE60]' : 'bg-[#F14E3A]'}`}
      >
        <h3 className="text-xl font-bold text-white mb-2">Dashboard Access</h3>
        <div className="bg-[#FFFFFF] p-4 rounded">
          <p className="text-[#29314D] font-mono mb-2">
            can_access_dashboard() = is_logged_in AND (is_admin OR has_premium)
          </p>
          <p className="text-[#29314D] font-mono">
            {isLoggedIn.toString()} AND ({isAdmin.toString()} OR {hasPremium.toString()}) = {canAccessDashboard.toString()}
          </p>
        </div>
        
        {canAccessDashboard ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-4 bg-[#FFFFFF] p-4 rounded"
          >
            <h4 className="text-[#27AE60] font-bold mb-2">✅ Access Granted</h4>
            <p className="text-[#29314D]">
              The dashboard is accessible when a user is logged in AND either has admin rights OR a premium account.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-4 bg-[#FFFFFF] p-4 rounded"
          >
            <h4 className="text-[#F14E3A] font-bold mb-2">❌ Access Denied</h4>
            <p className="text-[#29314D]">
              One or more required conditions are not met. Try logging in and enabling either admin or premium status.
            </p>
          </motion.div>
        )}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="mt-6 bg-[#DAC3FF] p-4 rounded-lg"
      >
        <h3 className="text-lg font-semibold text-[#29314D] mb-2">💡 Real-world Applications:</h3>
        <ul className="list-disc list-inside text-[#29314D] space-y-2 ml-4">
          <li>User authentication and permission systems</li>
          <li>Feature toggles in software development</li>
          <li>State management in web applications</li>
          <li>Settings and preferences management</li>
          <li>Controlling access to premium features</li>
        </ul>
      </motion.div>
    </motion.section>
  );
};

export default StateManagement;