import React, { useState, useEffect } from 'react';

// Interactive section component with animations
const Section = ({ title, children, delay = 0, interactive = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  if (!isVisible) return null;
  
  return (
    <div 
      className={`bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-bluez transition-all duration-500 ${isExpanded ? 'ring-2 ring-indigo-300' : ''}`}
      style={{ transform: isVisible ? 'translateY(0)' : 'translateY(20px)', opacity: isVisible ? 1 : 0 }}
    >
      <div 
        className="flex justify-between items-center cursor-pointer" 
        onClick={() => interactive && setIsExpanded(!isExpanded)}
      >
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        {interactive && (
          <button className="text-indigo-600 hover:text-indigo-800">
            {isExpanded ? '▲' : '▼'}
          </button>
        )}
      </div>
      
      <div className={`overflow-hidden transition-all duration-500 mt-3 ${interactive && !isExpanded ? 'max-h-0' : 'max-h-screen'}`}>
        {children}
      </div>
    </div>
  );
};

const BooleanOperation = ({ operation, truthTable }) => {
  const [activeRow, setActiveRow] = useState(null);
  
  return (
    <div className="mb-6">
      <h4 className="text-lg font-semibold mb-3 text-gray-700">{operation}</h4>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-indigo-600 text-white">
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
                className={`hover:bg-indigo-50 cursor-pointer transition-colors ${activeRow === i ? 'bg-indigo-100' : i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
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

const BinaryToggle = ({ value, onChange }) => {
  return (
    <div 
      className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors ${value ? 'bg-indigo-500' : 'bg-gray-300'}`}
      onClick={() => onChange(!value)}
    >
      <div 
        className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${value ? 'translate-x-8' : ''}`}
      />
    </div>
  );
};

export default function BooleanAlgebraLessonPart2() {
  const [stage, setStage] = useState(0);
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);

  const andResult = inputA && inputB;
  const orResult = inputA || inputB;
  const notA = !inputA;
  const xorResult = (inputA || inputB) && !(inputA && inputB);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (stage < 3) {
        setStage(stage + 1);
      }
    }, stage === 0 ? 100 : 300);
    
    return () => clearTimeout(timer);
  }, [stage]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-2xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-bluez mb-4">What Boolean Algebra really is</h1>
      </div>

      {stage >= 1 && (
        <Section title="Binary Values" delay={500}>
          <div className="text-gray-700 leading-relaxed">
            <p className="mb-4">Boolean Algebra operates on binary values, which can be represented in different ways:</p>
            <div className="grid grid-cols-2 gap-4 my-6">
              <div className="bg-indigo-50 p-4 rounded-lg text-center">
                <div className="text-xl font-bold mb-2">True</div>
                <div className="text-gray-600">Also represented as:</div>
                <div className="mt-2 flex flex-col gap-2">
                  <span className="bg-indigo-100 px-3 py-1 rounded">1</span>
                  <span className="bg-indigo-100 px-3 py-1 rounded">ON</span>
                  <span className="bg-indigo-100 px-3 py-1 rounded">HIGH</span>
                </div>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg text-center">
                <div className="text-xl font-bold mb-2">False</div>
                <div className="text-gray-600">Also represented as:</div>
                <div className="mt-2 flex flex-col gap-2">
                  <span className="bg-indigo-100 px-3 py-1 rounded">0</span>
                  <span className="bg-indigo-100 px-3 py-1 rounded">OFF</span>
                  <span className="bg-indigo-100 px-3 py-1 rounded">LOW</span>
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}

      {stage >= 2 && (
        <Section title="Basic Operations" delay={500} interactive={true}>
          <div className="text-gray-700 leading-relaxed">
            <p className="mb-4">Boolean Algebra consists of three fundamental operations:</p>
            <div className="space-y-8 mt-4">
              <div>
                <h3 className="text-lg font-semibold text-indigo-700">AND Operation</h3>
                <p className="mt-2">The AND operation returns TRUE only when both inputs are TRUE.</p>
                <BooleanOperation operation="AND Truth Table" truthTable={andTruthTable} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-indigo-700">OR Operation</h3>
                <p className="mt-2">The OR operation returns TRUE when at least one input is TRUE.</p>
                <BooleanOperation operation="OR Truth Table" truthTable={orTruthTable} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-indigo-700">NOT Operation</h3>
                <p className="mt-2">The NOT operation inverts the input value.</p>
                <div className="flex gap-8 mt-4">
                  <div className="text-center">
                    <div>NOT(0) = 1</div>
                  </div>
                  <div className="text-center">
                    <div>NOT(1) = 0</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}

     
    </div>
  );
}
