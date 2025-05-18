import React, { useState, useEffect } from 'react';

// Custom Typewriter component for text animations
const Typewriter = ({ text, delay = 40, className = "", onComplete = () => {} }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, delay);
      
      return () => clearTimeout(timeout);
    } else {
      onComplete();
    }
  }, [currentIndex, delay, text, onComplete]);
  
  return <span className={className}>{displayText}</span>;
};

const BooleanAlgebraInComputers = () => {
  // State for interactive inputs
  const [input1, setInput1] = useState(false);
  const [input2, setInput2] = useState(false);
  const [activeTab, setActiveTab] = useState('intro');
  const [showAnimation, setShowAnimation] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [stage, setStage] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  
  // Calculate results for logic gates
  const andResult = input1 && input2;
  const orResult = input1 || input2;
  const notInput1 = !input1;
  const xorResult = (input1 || input2) && !(input1 && input2);
  
  // Toggle functions
  const toggleInput1 = () => {
    setInput1(!input1);
    setShowAnimation(true);
    setCurrentStep(0);
  };
  
  const toggleInput2 = () => {
    setInput2(!input2);
    setShowAnimation(true);
    setCurrentStep(0);
  };
  
  // Animation effect
  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => {
        if (currentStep < 3) {
          setCurrentStep(currentStep + 1);
        } else {
          setShowAnimation(false);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showAnimation, currentStep]);
  
  // Stage progression for typewriter effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (stage < 3 && !isTyping) {
        setStage(stage + 1);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [stage, isTyping]);
  
  // Section component
  const Section = ({ title, children, color = "bluez" }) => (
    <div className={`bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-${color}`}>
      <h3 className={`text-xl font-bold text-${color} mb-4`}>{title}</h3>
      <div className="mt-3">
        {children}
      </div>
    </div>
  );
  
  // Binary Toggle component
  const BinaryToggle = ({ value, onChange, color = "bluez" }) => {
    return (
      <div 
        className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors ${value ? `bg-${color}` : 'bg-grayz'}`}
        onClick={() => onChange(!value)}
      >
        <div 
          className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${value ? 'translate-x-8' : ''}`}
        />
      </div>
    );
  };
  
  // Logic gate component with animation
  const LogicGate = ({ name, result, symbol, description, color }) => {
    return (
      <div className={`p-4 rounded-lg bg-white shadow-md text-grayz transition-all duration-300`}>
        <div className="flex justify-between items-center mb-2">
          <div className={`font-bold text-lg text-${color}`}>{name} <span className="text-yellowz">{symbol}</span></div>
          <div className={`px-4 py-1 rounded-full font-bold transition-colors duration-300 text-white ${result ? 'bg-greenz' : 'bg-redz'}`}>
            {result ? '1' : '0'}
          </div>
        </div>
        <p className="text-grayz text-sm">{description}</p>
      </div>
    );
  };
  
  // Tab navigation component
  const TabNav = ({ activeTab, setActiveTab }) => {
    const tabs = [
      { id: 'intro', label: 'Introduction', color: 'bluez' },
      { id: 'operations', label: 'Operations', color: 'bluez' },
      { id: 'playground', label: 'Try It!', color: 'bluez' },
    ];
    
    return (
      <div className="flex flex-wrap mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`px-6 py-2 mr-2 mb-2 rounded-t-lg font-bold transition-colors duration-300 ${activeTab === tab.id ? `bg-${tab.color} text-white` : 'bg-offwhite text-grayz hover:bg-lightpurple'}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  };
  
  // Truth table for operations
  const BooleanOperation = ({ operation, truthTable, color }) => {
    const [activeRow, setActiveRow] = useState(null);
    
    const getHighlightedRow = () => {
      if (operation === "AND - True only when both inputs are true") {
        return input1 && input2 ? 3 : input1 ? 2 : input2 ? 1 : 0;
      } else if (operation === "OR - True when at least one input is true") {
        return input1 && input2 ? 3 : input1 ? 2 : input2 ? 1 : 0;
      }
      return null;
    };
    
    return (
      <div className="mb-6">
        <h4 className={`text-lg font-semibold mb-3 text-${color}`}>{operation}</h4>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className={`bg-${color} text-black`}>
              <tr>
                {Object.keys(truthTable[0]).map((key, i) => (
                  <th key={i} className="py-2 px-4 text-center">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {truthTable.map((row, i) => (
                <tr 
                  key={i}
                  className={`cursor-pointer transition-colors ${i === getHighlightedRow() ? `bg-${color} bg-opacity-20` : i % 2 === 0 ? 'bg-offwhite' : 'bg-white'}`}
                  onClick={() => setActiveRow(i === activeRow ? null : i)}
                >
                  {Object.values(row).map((value, j) => (
                    <td 
                      key={j} 
                      className="py-2 px-4 text-center"
                    >
                      {typeof value === 'boolean' ? (value ? '1' : '0') : value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  // Truth tables data
  const andTruthTable = [
    { A: false, B: false, "A AND B": false },
    { A: false, B: true, "A AND B": false },
    { A: true, B: false, "A AND B": false },
    { A: true, B: true, "A AND B": true }
  ];
  
  const orTruthTable = [
    { A: false, B: false, "A OR B": false },
    { A: false, B: true, "A OR B": true },
    { A: true, B: false, "A OR B": true },
    { A: true, B: true, "A OR B": true }
  ];
  
  return (
    <div className="max-w-4xl mx-auto font-sans bg-white p-6 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-bluez">Why Boolean Algebra Matters in Computers</h1>
      
      <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === 'intro' && (
        <div>
          <Section title="🧠 The Logic Behind the Machine" color="bluez">
            <Typewriter 
              text="Digital computers work using electrical signals that represent two states:"
              delay={0}
              className="block mb-4 text-grayz"
              onComplete={() => setIsTyping(false)}
            />
            
            <div className="flex flex-col md:flex-row mb-6">
              <div className="flex-1 p-4 bg-offwhite rounded-lg m-2 transform hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 mx-auto rounded-full bg-greenz flex items-center justify-center mb-2">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <p className="text-center text-grayz"><span className="font-bold text-greenz">ON</span> – electricity is flowing</p>
              </div>
              <div className="flex-1 p-4 bg-offwhite rounded-lg m-2 transform hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 mx-auto rounded-full bg-redz flex items-center justify-center mb-2">
                  <span className="text-3xl font-bold text-white">0</span>
                </div>
                <p className="text-center text-grayz"><span className="font-bold text-redz">OFF</span> – no electricity is flowing</p>
              </div>
            </div>
            
            {stage >= 1 && (
              <>
                <p className="mb-4 text-grayz">
                  These two states form the binary language of computers. Boolean Algebra provides 
                  a systematic method to manipulate these binary values using operations like:
                </p>
                
                <div className="flex flex-wrap justify-center mb-4">
                  <div className="p-3 m-2 bg-bluez rounded-lg transform hover:scale-105 transition-transform duration-300 text-white">
                    <span className="font-bold">AND (·)</span>
                  </div>
                  <div className="p-3 m-2 bg-greenz rounded-lg transform hover:scale-105 transition-transform duration-300 text-white">
                    <span className="font-bold">OR (+)</span>
                  </div>
                  <div className="p-3 m-2 bg-redz rounded-lg transform hover:scale-105 transition-transform duration-300 text-white">
                    <span className="font-bold">NOT (‾)</span>
                  </div>
                </div>
              </>
            )}
            
            {stage >= 2 && (
              <p className="text-grayz mt-4">
                Each operation models a type of logic that can be physically built into electronic circuits. 
                Logic gates — the building blocks of processors — are direct hardware implementations of Boolean logic.
              </p>
            )}
          </Section>
          
          {stage >= 3 && (
            <Section title="🔌 Example in Hardware" color="cyanz">
              <p className="mb-4 text-grayz">
                Consider this: You flip a light switch. That action translates into an electrical signal.
                The signal might pass through an <span className="font-bold text-bluez">AND gate</span>, 
                which checks if two conditions are met (e.g., the light is on <em>only</em> when 
                the switch is up <em>and</em> the door is closed).
              </p>
              <p className="mb-4 text-grayz">
                Based on the output, the light turns on (<span className="font-bold text-greenz">1</span>) 
                or stays off (<span className="font-bold text-redz">0</span>).
              </p>
              <p className="text-grayz">
                Multiply that logic by billions, and you get how CPUs perform everything from 
                calculations to decision-making.
              </p>
            </Section>
          )}
        </div>
      )}
      
      {activeTab === 'operations' && (
        <div>
          <Section title="Basic Boolean Operations" color="bluez">
            <p className="mb-6 text-grayz">
              Boolean Algebra consists of three fundamental operations that form the basis for computer logic:
            </p>
            
            <div className="space-y-8">
              <BooleanOperation 
                operation="AND - True only when both inputs are true" 
                truthTable={andTruthTable}
                color=""
                
              />
              
              <BooleanOperation 
                operation="OR - True when at least one input is true" 
                truthTable={orTruthTable}
                color=""
              />
              
              <div>
                <h4 className="text-lg font-semibold mb-3 text-redz">NOT - Inverts the input value</h4>
                <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-center border border-offwhite p-3 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-redz flex items-center justify-center mr-4">
                        <span className="text-white font-bold">0</span>
                      </div>
                      <span className="text-xl font-bold text-redz">→</span>
                      <div className="w-8 h-8 rounded-full bg-greenz flex items-center justify-center ml-4">
                        <span className="text-white font-bold">1</span>
                      </div>
                    </div>
                    <div className="text-grayz">NOT(0) = 1</div>
                  </div>
                  <div className="text-center border border-offwhite p-3 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-greenz flex items-center justify-center mr-4">
                        <span className="text-white font-bold">1</span>
                      </div>
                      <span className="text-xl font-bold text-redz">→</span>
                      <div className="w-8 h-8 rounded-full bg-redz flex items-center justify-center ml-4">
                        <span className="text-white font-bold">0</span>
                      </div>
                    </div>
                    <div className="text-grayz">NOT(1) = 0</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-3 text-cyanz">XOR - Exclusive OR - True when inputs are different</h4>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 border border-offwhite rounded-lg">
                      <div className="flex justify-center mb-2">
                        <span className="px-3 py-1 bg-redz text-white rounded-full mr-2">0</span>
                        <span className="px-3 py-1 bg-redz text-white rounded-full">0</span>
                      </div>
                      <div className="text-grayz">XOR = 0</div>
                    </div>
                    <div className="text-center p-3 border border-offwhite rounded-lg">
                      <div className="flex justify-center mb-2">
                        <span className="px-3 py-1 bg-redz text-white rounded-full mr-2">0</span>
                        <span className="px-3 py-1 bg-greenz text-white rounded-full">1</span>
                      </div>
                      <div className="text-grayz">XOR = 1</div>
                    </div>
                    <div className="text-center p-3 border border-offwhite rounded-lg">
                      <div className="flex justify-center mb-2">
                        <span className="px-3 py-1 bg-greenz text-white rounded-full mr-2">1</span>
                        <span className="px-3 py-1 bg-redz text-white rounded-full">0</span>
                      </div>
                      <div className="text-grayz">XOR = 1</div>
                    </div>
                    <div className="text-center p-3 border border-offwhite rounded-lg">
                      <div className="flex justify-center mb-2">
                        <span className="px-3 py-1 bg-greenz text-white rounded-full mr-2">1</span>
                        <span className="px-3 py-1 bg-greenz text-white rounded-full">1</span>
                      </div>
                      <div className="text-grayz">XOR = 0</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>
      )}
      
      {activeTab === 'playground' && (
        <div>
          <Section title="Try It Yourself!" color="bluez">
            <p className="mb-6 text-grayz">
              Experiment with Boolean operations by toggling the inputs below and observing the results.
            </p>
            
            <div className="bg-offwhite p-6 rounded-lg">
              <div className="flex flex-col space-y-8">
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-grayz">Input A:</div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-mono text-grayz">{input1 ? '1' : '0'}</span>
                    <BinaryToggle value={input1} onChange={toggleInput1} color="bluez" />
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-grayz">Input B:</div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-mono text-grayz">{input2 ? '1' : '0'}</span>
                    <BinaryToggle value={input2} onChange={toggleInput2} color="bluez" />
                  </div>
                </div>
                
                <div className="h-px bg-grayz my-2 opacity-20"></div>
                
                <div className="grid grid-cols-2 gap-6">
                  <LogicGate 
                    name="AND" 
                    symbol="·" 
                    result={andResult} 
                    description="True only when both inputs are true"
                    color="bluez"
                  />
                  
                  <LogicGate 
                    name="OR" 
                    symbol="+" 
                    result={orResult} 
                    description="True when at least one input is true"
                    color="greenz"
                  />
                  
                  <LogicGate 
                    name="NOT A" 
                    symbol="‾" 
                    result={notInput1} 
                    description="Inverts input A"
                    color="redz"
                  />
                  
                  <LogicGate 
                    name="XOR" 
                    symbol="⊕" 
                    result={xorResult} 
                    description="True when inputs are different"
                    color="cyanz"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-greenz font-medium">
                Try changing the inputs to see how different Boolean operations behave!
              </p>
            </div>
          </Section>
          
          <div className="bg-white bg-opacity-10 p-4 rounded-lg border border-bluez mt-8">
            <h2 className="text-lg font-bold mb-2 text-bluez">🖥️ From Logic Gates to Computing</h2>
            <p className="mb-2 text-grayz">
              Boolean algebra is the mathematical foundation of all digital computers. Every calculation, 
              decision, and operation in a computer ultimately breaks down to these simple logic operations.
            </p>
            <p className="text-grayz">
              By combining these basic gates in increasingly complex arrangements, engineers build processors 
              capable of running the applications and systems we use every day.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BooleanAlgebraInComputers;