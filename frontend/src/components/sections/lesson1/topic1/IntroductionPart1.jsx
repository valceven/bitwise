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

// Main component for Part 1 of the Boolean Algebra lesson
export default function BooleanAlgebraLessonPart1() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (stage < 2) {
        setStage(stage + 1);
      }
    }, stage === 0 ? 100 : 400);

    return () => clearTimeout(timer);
  }, [stage]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-2xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-bluez mb-4">Boolean Algebra</h1>
      </div>

      {stage >= 1 && (
        <Section title="What is Boolean Algebra?" delay={0}>
          <div className="text-gray-700 leading-relaxed">
            <p className="mb-4">
              Boolean Algebra is a mathematical structure used to analyze and simplify logical statements. It serves as the foundation of digital electronics and computer science, forming the basis for binary operations in everything from simple electronic devices like calculators to highly advanced technologies such as supercomputers, artificial intelligence, and data encryption.
            </p>
            <p className="font-medium">
              But before we dive into how it works, it's important to know where it all began.
            </p>
          </div>
        </Section>
      )}

      {stage >= 2 && (
        <Section title="The History" delay={0}>
          <div className="text-gray-700 leading-relaxed">
            <p className="mb-4">
              Boolean Algebra was invented by George Boole, a British mathematician and logician, in the mid-1800s. His goal was to find a way to express human reasoning using mathematical symbols.
            </p>

            <div className="flex justify-center my-6">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-indigo-200">
                <img src="/src/assets/GeorgeBoole.png" alt="George Boole" className="object-cover" />
              </div>
            </div>

            <p className="mb-4">
              In 1854, he published a book titled <em>An Investigation of the Laws of Thought</em>, where he outlined a new system of logic based entirely on binary values: true and false.
            </p>

            <p>
              At the time, his work was viewed as abstract and philosophical, but decades later, his system turned out to be perfect for designing electronic circuits. As electrical engineers began building computers in the 20th century, they needed a system that could operate using only two voltage levels: ON and OFF. Boolean Algebra fit the bill exactly.
            </p>
          </div>
        </Section>
      )}
    </div>
  );
}
