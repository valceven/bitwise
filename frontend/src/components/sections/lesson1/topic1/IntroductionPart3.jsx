import React, { useState, useEffect } from 'react';

// Animation for entering elements
const FadeIn = ({ children, delay = 0, duration = 500 }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div 
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`
      }}
    >
      {children}
    </div>
  );
};

// Smart Home Component - Interactive Example
const SmartHomeExample = () => {
  const [motionDetected, setMotionDetected] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isNight, setIsNight] = useState(true);
  const [override, setOverride] = useState(false);
  
  // Boolean logic for smart lighting
  const lightsOn = override || (motionDetected && isDark && isNight);
  
  return (
    <div className="bg-gray-100 rounded-xl p-6 my-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Smart Home Lighting System</h3>

      <div className="mt-6 mb-6">
            <div className="bg-indigo-100 p-4 rounded-lg">
              <h4 className="font-medium text-bluez mb-2">Boolean Logic Expression:</h4>
              <code className="bg-white p-2 rounded block text-indigo-900">
                LightsOn = Override OR (MotionDetected AND IsDark AND IsNight)
              </code>
            </div>
          </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
              <div>
                <span className="font-medium">Motion Detected</span>
                <p className="text-sm text-gray-500">Is someone in the room?</p>
              </div>
              <div 
                className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors ${motionDetected ? 'bg-green-500' : 'bg-gray-300'}`}
                onClick={() => setMotionDetected(!motionDetected)}
              >
                <div 
                  className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${motionDetected ? 'translate-x-6' : ''}`}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
              <div>
                <span className="font-medium">Low Light Conditions</span>
                <p className="text-sm text-gray-500">Is it dark in the room?</p>
              </div>
              <div 
                className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors ${isDark ? 'bg-green-500' : 'bg-gray-300'}`}
                onClick={() => setIsDark(!isDark)}
              >
                <div 
                  className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${isDark ? 'translate-x-6' : ''}`}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
              <div>
                <span className="font-medium">Night Mode Active</span>
                <p className="text-sm text-gray-500">Is it between 7PM and 7AM?</p>
              </div>
              <div 
                className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors ${isNight ? 'bg-green-500' : 'bg-gray-300'}`}
                onClick={() => setIsNight(!isNight)}
              >
                <div 
                  className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${isNight ? 'translate-x-6' : ''}`}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
              <div>
                <span className="font-medium">Manual Override</span>
                <p className="text-sm text-gray-500">Force lights on regardless of conditions</p>
              </div>
              <div 
                className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors ${override ? 'bg-green-500' : 'bg-gray-300'}`}
                onClick={() => setOverride(!override)}
              >
                <div 
                  className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${override ? 'translate-x-6' : ''}`}
                />
              </div>
            </div>
          </div>
          
          
        </div>
        
        <div className="flex flex-col justify-center items-center">
          <div 
            className={`w-40 h-40 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 ${lightsOn ? 'bg-yellow-300 shadow-lg' : 'bg-gray-300'}`}
          >
            <div className="w-36 h-36 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
                {lightsOn ? (
                  <svg className="w-16 h-16 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                  </svg>
                ) : (
                  <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </div>
            </div>
          </div>
          <h3 className={`text-xl font-bold ${lightsOn ? 'text-yellow-600' : 'text-gray-700'}`}>
            {lightsOn ? 'Lights ON' : 'Lights OFF'}
          </h3>
          <p className="text-gray-500 text-center mt-2">
            Toggle the switches to see how Boolean logic controls your smart home!
          </p>
        </div>
      </div>
    </div>
  );
};



// Main Component for Boolean Logic in Everyday Life
export default function BooleanAlgebraLessonPart3() {
  const [activeExample, setActiveExample] = useState(null);
  
  useEffect(() => {
    // Start with the first example after a short delay
    const timer = setTimeout(() => {
      setActiveExample('smartHome');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-2xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-bluez mb-4">Boolean Logic in Everyday Life</h1>
      
      </div>
      
      <FadeIn delay={300}>
        <div className="prose max-w-none mb-8">
          <p>
            Boolean logic isn't just a theoretical concept used in computer science and electronics. 
            It's all around us, working behind the scenes in many everyday technologies and decision-making processes.
          </p>
        
        </div>
      </FadeIn>
      
     
      
      {activeExample === 'smartHome' && (
        <FadeIn>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Smart Home Automation</h2>
            <p className="text-gray-600 mb-4">
              Modern smart homes use Boolean logic to automate lighting, security, and climate control. 
              In this example, see how a smart lighting system decides when to turn on lights based on multiple conditions.
            </p>
            <SmartHomeExample />
          </div>
        </FadeIn>
      )}
      
      
      
      <FadeIn delay={600}>
        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
          <h2 className="text-xl font-bold text-bluez mb-4">Why Boolean Logic Matters</h2>
          <p className="text-gray-700 mb-3">
            Boolean logic provides a systematic way to make decisions based on multiple conditions. 
            Its simplicity and effectiveness make it the backbone of:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">✓</span>
              <span>Search engines when processing your queries</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">✓</span>
              <span>Social media algorithms determining what content to show you</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">✓</span>
              <span>Banking systems approving transactions based on security checks</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">✓</span>
              <span>Automotive safety systems deciding when to engage features</span>
            </li>
          </ul>
        </div>
      </FadeIn>
    </div>
  );
}