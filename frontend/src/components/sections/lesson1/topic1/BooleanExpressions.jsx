import { useState, useEffect } from 'react';
import { Check, X, RotateCw, Key, CreditCard, LogIn, Info } from 'lucide-react';

export default function BooleanLessonExpressions() {
  const [boolA, setBoolA] = useState(false);
  const [boolB, setBoolB] = useState(false);
  const [flipAnimation, setFlipAnimation] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [pulseEffect, setPulseEffect] = useState(false);
  
  // Animation handling
  const animateFlip = (value) => {
    setFlipAnimation(value);
    setTimeout(() => setFlipAnimation(""), 1000);
    
    // Add pulse effect to result when inputs change
    setPulseEffect(true);
    setTimeout(() => setPulseEffect(false), 1000);
  };
  
  // Calculate entry permission based on ID card (A) and key (B)
  const canEnterBuilding = boolA && boolB;
  
  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-indigo-700  mb-3">Boolean Variables and Expressions</h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
      </div>
      
      {/* Introduction */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 border-l-4 border-indigo-500">
        <p className="mb-4 leading-relaxed text-gray-700">
          Boolean variables are typically written using letters like A, B, X, or Y, and they can only take the value 0 or 1. 
          Using these variables, we can write <strong className="text-blue-800">Boolean expressions</strong>, which are 
          combinations of variables and logical operations. These expressions tell us the output of a digital system based on its inputs.
        </p>
        
        <div className="bg-gray-50 p-5 rounded-lg shadow-sm mb-4 border border-gray-100">
          <h3 className="font-semibold text-indigo-700  mb-2 flex items-center">
            <Info size={18} className="mr-2 text-indigo-700 " />
            Example:
          </h3>
          <p className="mb-2">You're allowed to enter a building <strong>only if you have an ID card AND a key.</strong> Let's define:</p>
          <ul className="list-disc pl-8 my-3 space-y-1 text-gray-700">
            <li>A = 1 if you have an ID card</li>
            <li>B = 1 if you have a key</li>
            <li>Entry = A · B</li>
          </ul>
          <p>In this case, Entry = 1 (allowed) only when both A and B are 1.</p>
        </div>
        
        <p className="text-gray-700">
          Boolean expressions like these are used in <strong className="text-indigo-700">digital circuits</strong>, 
          <strong className="text-indigo-700 "> logic gates</strong>, <strong className="text-indigo-700 ">software decisions</strong>, 
          and many other applications.
        </p>
      </div>
      
      {/* Interactive Building Entry Example */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="flex items-center justify-center mb-6">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <LogIn size={20} className="text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold text-blue-700"> Building Entry Example</h2>
        </div>
        
        <p className="text-center mb-8 text-gray-600 max-w-2xl mx-auto">
          Try toggling whether you have an ID card and a key to see if you're allowed to enter the building. 
          This demonstrates the Boolean AND operation in action.
        </p>
        
        {/* Container for interactive elements */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-inner">
          {/* Interactive toggles */}
          <div className="flex flex-col md:flex-row justify-center items-center md:space-x-16 space-y-8 md:space-y-0 mb-10">
            {/* ID Card Toggle */}
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-3 rounded-xl mb-3 flex items-center">
                <CreditCard size={20} className="text-blue-700 mr-2" />
                <p className="text-lg font-semibold text-blue-800">ID Card (A)</p>
              </div>
              
              <button 
                className={`w-32 h-32 rounded-2xl flex items-center justify-center transition-all duration-300 transform ${boolA ? 'bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg' : 'bg-gradient-to-br from-red-400 to-red-600 text-white shadow-lg'} ${flipAnimation === 'A' ? 'scale-110 rotate-6' : ''}`}
                onClick={() => {
                  setBoolA(!boolA);
                  animateFlip('A');
                }}
              >
                {boolA ? 
                  <div className="flex flex-col items-center">
                    <Check size={40} className="mb-1" />
                    <span className="text-sm font-medium">HAVE</span>
                  </div> : 
                  <div className="flex flex-col items-center">
                    <X size={40} className="mb-1" />
                    <span className="text-sm font-medium">DON'T HAVE</span>
                  </div>
                }
              </button>
              
              <div className="mt-4 p-2 bg-gray-100 rounded-lg w-16 text-center shadow-inner">
                <p className="font-mono font-bold text-lg">{boolA ? "1" : "0"}</p>
              </div>
            </div>
            
            {/* Key Toggle */}
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-3 rounded-xl mb-3 flex items-center">
                <Key size={20} className="text-blue-700 mr-2" />
                <p className="text-lg font-semibold text-blue-800">Key (B)</p>
              </div>
              
              <button 
                className={`w-32 h-32 rounded-2xl flex items-center justify-center transition-all duration-300 transform ${boolB ? 'bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg' : 'bg-gradient-to-br from-red-400 to-red-600 text-white shadow-lg'} ${flipAnimation === 'B' ? 'scale-110 rotate-6' : ''}`}
                onClick={() => {
                  setBoolB(!boolB);
                  animateFlip('B');
                }}
              >
                {boolB ? 
                  <div className="flex flex-col items-center">
                    <Check size={40} className="mb-1" />
                    <span className="text-sm font-medium">HAVE</span>
                  </div> : 
                  <div className="flex flex-col items-center">
                    <X size={40} className="mb-1" />
                    <span className="text-sm font-medium">DON'T HAVE</span>
                  </div>
                }
              </button>
              
              <div className="mt-4 p-2 bg-gray-100 rounded-lg w-16 text-center shadow-inner">
                <p className="font-mono font-bold text-lg">{boolB ? "1" : "0"}</p>
              </div>
            </div>
          </div>
          
          {/* Boolean Expression */}
          <div className="flex justify-center mb-6">
            <div className="py-3 px-6 bg-blue-100 rounded-xl">
              <span className="font-mono text-xl">
                Entry = A · B = {boolA ? "1" : "0"} · {boolB ? "1" : "0"} = {canEnterBuilding ? "1" : "0"}
              </span>
            </div>
          </div>
          
          {/* Entry Result */}
          <div className="flex flex-col items-center mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Building Entry Result:</h3>
            <div 
              className={`w-64 h-40 flex items-center justify-center rounded-xl transition-all duration-500 shadow-lg ${pulseEffect ? 'animate-pulse' : ''} 
                ${canEnterBuilding ? 'bg-gradient-to-br from-green-400 to-green-600 text-white' : 'bg-gradient-to-br from-red-400 to-red-600 text-white'}`}
            >
              <div className="text-center p-4">
                <div className="text-4xl mb-3">
                  {canEnterBuilding ? <Check size={56} /> : <X size={56} />}
                </div>
                <p className="text-2xl font-bold mb-1">
                  {canEnterBuilding ? "ACCESS GRANTED" : "ACCESS DENIED"}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Boolean Logic Truth Table */}
        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-blue-700 flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                <span className="font-bold text-blue-700">&&</span>
              </div>
              Boolean AND Operation Truth Table
            </h3>
            <button 
              className="bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-800 py-2 px-4 rounded-lg flex items-center text-sm transition-colors"
              onClick={() => setShowExplanation(!showExplanation)}
            >
              <Info size={16} className="mr-1" />
              {showExplanation ? "Hide Explanation" : "Show Explanation"}
            </button>
          </div>
          
          {showExplanation && (
            <div className="bg-blue-50 p-5 rounded-xl shadow-sm mb-6 transition-all border-l-4 border-blue-400">
              <p className="text-gray-700">The AND operation (represented by "·" or "&&") returns 1 (true) only when both inputs are 1 (true). Otherwise, it returns 0 (false).</p>
              <p className="mt-2 text-gray-700">This is why you need <strong>both</strong> an ID card <strong>and</strong> a key to enter the building.</p>
            </div>
          )}
          
          <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
            <table className="w-full text-center">
              <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
                <tr>
                  <th className="p-3 border-b border-r border-gray-200 font-bold text-blue-800">A</th>
                  <th className="p-3 border-b border-r border-gray-200 font-bold text-blue-800">B</th>
                  <th className="p-3 border-b border-gray-200 font-bold text-blue-800">A · B (AND)</th>
                </tr>
              </thead>
              <tbody>
                <tr className={`transition-colors ${!boolA && !boolB ? 'bg-blue-50' : ''}`}>
                  <td className="p-3 border-r border-b border-gray-200">0</td>
                  <td className="p-3 border-r border-b border-gray-200">0</td>
                  <td className="p-3 border-b border-gray-200">0</td>
                </tr>
                <tr className={`transition-colors ${!boolA && boolB ? 'bg-blue-50' : ''}`}>
                  <td className="p-3 border-r border-b border-gray-200">0</td>
                  <td className="p-3 border-r border-b border-gray-200">1</td>
                  <td className="p-3 border-b border-gray-200">0</td>
                </tr>
                <tr className={`transition-colors ${boolA && !boolB ? 'bg-blue-50' : ''}`}>
                  <td className="p-3 border-r border-b border-gray-200">1</td>
                  <td className="p-3 border-r border-b border-gray-200">0</td>
                  <td className="p-3 border-b border-gray-200">0</td>
                </tr>
                <tr className={`transition-colors ${boolA && boolB ? 'bg-blue-50' : ''}`}>
                  <td className="p-3 border-r border-gray-200">1</td>
                  <td className="p-3 border-r border-gray-200">1</td>
                  <td className="p-3 border-gray-200 font-bold">1</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-3 text-sm text-gray-500 text-center">
            <p>Your current state is highlighted in the table above</p>
          </div>
        </div>
      </div>
      
      {/* Real-world Applications */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="font-semibold text-xl text-blue-700 mb-4 flex items-center">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
            <Info size={18} className="text-blue-600" />
          </div>
          Real-world Applications
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg shadow-sm border border-blue-100">
            <h4 className="font-semibold text-blue-800 mb-2">Digital Circuits</h4>
            <p className="text-gray-700">Boolean expressions define how electronic circuits process signals, forming the foundation of all digital systems.</p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg shadow-sm border border-blue-100">
            <h4 className="font-semibold text-blue-800 mb-2">Logic Gates</h4>
            <p className="text-gray-700">Physical implementations of basic boolean operations (AND, OR, NOT) that process binary inputs in hardware.</p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg shadow-sm border border-blue-100">
            <h4 className="font-semibold text-blue-800 mb-2">Programming</h4>
            <p className="text-gray-700">Conditional statements (if/else) use boolean expressions to control program flow and make decisions.</p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg shadow-sm border border-blue-100">
            <h4 className="font-semibold text-blue-800 mb-2">Security Systems</h4>
            <p className="text-gray-700">Like our building example, security systems combine multiple conditions (credentials) for access control.</p>
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
          <button 
            onClick={() => {
              setBoolA(false);
              setBoolB(false);
              animateFlip('A');
              setTimeout(() => animateFlip('B'), 500);
            }}
            className="bg-gradient-to-r bg-bluez hover:bg-lightpurple text-white px-8 py-3 rounded-xl shadow-md hover:shadow-lg flex items-center transition-all"
          >
            <RotateCw className="mr-2 " size={18} />
            Reset Example
          </button>
        </div>
      </div>
    </div>
  );
}