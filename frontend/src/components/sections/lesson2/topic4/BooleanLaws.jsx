import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom Typewriter component for better text animations
const Typewriter = ({ text, delay = 40, className = "" }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, delay);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);
  
  return <span className={className}>{displayText}</span>;
};

// Card component for consistent styling
const Card = ({ title, children, accentColor = "bg-indigo-500" }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 mb-6 border-l-4 hover:shadow-xl transition-shadow"
      style={{ borderLeftColor: accentColor.replace('bg-', '') === 'indigo-500' ? '#6366f1' : '#8b5cf6' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-xl font-bold mb-3 flex items-center">
        <div className={`w-3 h-3 rounded-full ${accentColor} mr-2`}></div>
        {title}
      </h2>
      {children}
    </motion.div>
  );
};

// Formula display component
const Formula = ({ label, formula, result, highlight = false }) => {
  return (
    <motion.div 
      className={`py-3 px-4 rounded-lg ${highlight ? 'bg-indigo-50 border-l-2 border-indigo-400' : 'bg-gray-50'} mb-2`}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="font-mono text-gray-800">
          {label}: {formula}
        </div>
        <motion.div 
          className={`font-bold ${typeof result === 'boolean' ? (result ? 'text-green-600' : 'text-red-600') : (result === 1 ? 'text-green-600' : 'text-red-600')}`}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          = {result === 1 || result === true ? "1 (True)" : "0 (False)"}
        </motion.div>
      </div>
    </motion.div>
  );
};

// Main component for Identity and Nullification Laws
const IdentityNullificationLaws = () => {
  const [A, setA] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const and1 = A && 1; // A · 1
  const or0 = A || 0;  // A + 0
  const and0 = A && 0; // A · 0
  const or1 = A || 1;  // A + 1

  const toggleA = () => setA(prev => (prev === 1 ? 0 : 1));

  useEffect(() => {
    // Reset explanation when A changes to trigger animation
    setShowExplanation(false);
    const timer = setTimeout(() => setShowExplanation(true), 300);
    return () => clearTimeout(timer);
  }, [A]);
  
  return (
    <Card title="Identity & Nullification Laws" accentColor="bg-indigo-500">
      <div className="mb-4">
        <motion.div 
          className="bg-indigo-50 p-4 rounded-lg mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {showExplanation && (
            <Typewriter 
              text="Identity laws preserve the value of A when combined with neutral elements, while nullification laws result in fixed outputs regardless of A's value."
              className="text-sm text-gray-700"
            />
          )}
        </motion.div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-indigo-700">✓ Identity Laws</h3>
          <Formula label="A · 1" formula={`${A} · 1`} result={and1} highlight={true} />
          <Formula label="A + 0" formula={`${A} + 0`} result={or0} highlight={true} />
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-purple-700">✗ Nullification Laws</h3>
          <Formula label="A · 0" formula={`${A} · 0`} result={and0} />
          <Formula label="A + 1" formula={`${A} + 1`} result={or1} />
        </div>
      </div>

      <motion.div className="flex flex-col items-center justify-center mt-6">
        <motion.button
          onClick={toggleA}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          Toggle A (Current Value: {A})
        </motion.button>
        
        <AnimatePresence>
          {A === 1 && (
            <motion.div
              className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mt-4 rounded text-sm"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <strong>💡 Observation:</strong> Notice how Identity Laws preserve A's value ({A}), 
              while Nullification Laws force specific outputs regardless of A.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Card>
  );
};

// Idempotent and Complement Laws component
const IdempotentComplementLaws = () => {
  const [A, setA] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const toggleA = () => setA(prev => (prev === 1 ? 0 : 1));

  const andA = A && A; // A · A
  const orA = A || A;  // A + A
  const notA = A === 0 ? 1 : 0; // A'
  const andNotA = A && notA; // A · A'
  const orNotA = A || notA;  // A + A'

  useEffect(() => {
    setShowExplanation(false);
    const timer = setTimeout(() => setShowExplanation(true), 300);
    return () => clearTimeout(timer);
  }, [A]);

  return (
    <Card title="Idempotent & Complement Laws" accentColor="bg-purple-500">
      <div className="mb-4">
        <motion.div 
          className="bg-purple-50 p-4 rounded-lg mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {showExplanation && (
            <Typewriter 
              text="Idempotent laws show that repeating a variable has no effect, while complement laws show the interaction between a variable and its negation."
              className="text-sm text-gray-700"
            />
          )}
        </motion.div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-indigo-700">🔄 Idempotent Laws</h3>
          <Formula label="A · A" formula={`${A} · ${A}`} result={andA} highlight={true} />
          <Formula label="A + A" formula={`${A} + ${A}`} result={orA} highlight={true} />
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-purple-700">🔄 Complement Laws</h3>
          <Formula label="A · A'" formula={`${A} · ${notA}`} result={andNotA} />
          <Formula label="A + A'" formula={`${A} + ${notA}`} result={orNotA} />
        </div>
      </div>

      <motion.div className="flex flex-col items-center justify-center mt-6">
        <motion.button
          onClick={toggleA}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          Toggle A (Current Value: {A})
        </motion.button>
        
        <AnimatePresence>
          {A === 1 && (
            <motion.div
              className="bg-blue-50 border-l-4 border-blue-400 p-3 mt-4 rounded text-sm"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <strong>💡 Note:</strong> A + A' is always 1 and A · A' is always 0, 
              regardless of A's value. This is fundamental to Boolean logic!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Card>
  );
};

// Distributive and De Morgan's Laws component
const DistributiveDeMorganLaws = () => {
  const [A, setA] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const toggleA = () => setA(prev => (prev === 1 ? 0 : 1));

  const notA = A === 0 ? 1 : 0; // A'

  // Distributive Law
  const andOr = A && (A || notA);  // A · (A + A')
  const orAnd = A || (A && notA);  // A + (A · A')

  // De Morgan's Law
  const deMorgan1 = !(A && notA);  // (A · A')'
  const deMorgan2 = !(A || notA);  // (A + A')'

  useEffect(() => {
    setShowExplanation(false);
    const timer = setTimeout(() => setShowExplanation(true), 300);
    return () => clearTimeout(timer);
  }, [A]);
  
  return (
    <Card title="Distributive & De Morgan's Laws" accentColor="bg-indigo-500">
      <div className="mb-4">
        <motion.div 
          className="bg-indigo-50 p-4 rounded-lg mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {showExplanation && (
            <Typewriter 
              text="Distributive laws show how AND and OR operations interact when nested, while De Morgan's laws show how negation works on compound expressions."
              className="text-sm text-gray-700"
            />
          )}
        </motion.div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-indigo-700">📐 Distributive Laws</h3>
          <Formula label="A · (A + A')" formula={`${A} · (${A} + ${notA})`} result={andOr} highlight={true} />
          <Formula label="A + (A · A')" formula={`${A} + (${A} · ${notA})`} result={orAnd} highlight={true} />
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-purple-700">🔄 De Morgan's Laws</h3>
          <Formula label="(A · A')'" formula={`(${A} · ${notA})'`} result={deMorgan1} />
          <Formula label="(A + A')'" formula={`(${A} + ${notA})'`} result={deMorgan2} />
        </div>
      </div>

      <motion.div className="flex flex-col items-center justify-center mt-6">
        <motion.button
          onClick={toggleA}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          Toggle A (Current Value: {A})
        </motion.button>
        
        <AnimatePresence>
          {A === 1 && (
            <motion.div
              className="bg-green-50 border-l-4 border-green-400 p-3 mt-4 rounded text-sm"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <strong>💡 Remember:</strong> De Morgan's laws state that the negation of AND is OR of negations,
              and the negation of OR is AND of negations.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Card>
  );
};

// Absorption and Double Negation Laws component
const AbsorptionDoubleNegationLaws = () => {
  const [A, setA] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const toggleA = () => setA(prev => (prev === 1 ? 0 : 1));

  const notA = A === 0 ? 1 : 0; // A'

  // Absorption Law
  const orAndA = A || (A && notA);  // A + (A · A')
  const andOrA = A && (A || notA);  // A · (A + A')

  // Double Negation Law
  const doubleNegA = !(notA);  // (A')'

  useEffect(() => {
    setShowExplanation(false);
    const timer = setTimeout(() => setShowExplanation(true), 300);
    return () => clearTimeout(timer);
  }, [A]);
  
  return (
    <Card title="Absorption & Double Negation Laws" accentColor="bg-purple-500">
      <div className="mb-4">
        <motion.div 
          className="bg-purple-50 p-4 rounded-lg mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {showExplanation && (
            <Typewriter 
              text="Absorption laws simplify expressions where a variable appears in multiple parts, while double negation shows that negating twice returns the original value."
              className="text-sm text-gray-700"
            />
          )}
        </motion.div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-indigo-700">🧩 Absorption Laws</h3>
          <Formula label="A + (A · A')" formula={`${A} + (${A} · ${notA})`} result={orAndA} highlight={true} />
          <Formula label="A · (A + A')" formula={`${A} · (${A} + ${notA})`} result={andOrA} highlight={true} />
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-purple-700">🔄 Double Negation Law</h3>
          <Formula label="(A')'" formula={`(${notA})'`} result={doubleNegA} />
        </div>
      </div>

      <motion.div className="flex flex-col items-center justify-center mt-6">
        <motion.button
          onClick={toggleA}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          Toggle A (Current Value: {A})
        </motion.button>
        
        <AnimatePresence>
          {A === 1 && (
            <motion.div
              className="bg-purple-50 border-l-4 border-purple-400 p-3 mt-4 rounded text-sm"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <strong>💡 Insight:</strong> Double negation (A')' = A is similar to how a double 
              negative in natural language often equals a positive.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Card>
  );
};

// Associative and Commutative Laws component
const AssociativeCommutativeLaws = () => {
  const [A, setA] = useState(0);
  const [B, setB] = useState(1); 
  const [C, setC] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const toggleA = () => setA(prev => (prev === 1 ? 0 : 1));
  const toggleB = () => setB(prev => (prev === 1 ? 0 : 1));
  const toggleC = () => setC(prev => (prev === 1 ? 0 : 1));

  // Associative Law
  const assocAnd1 = (A && B) && C;
  const assocAnd2 = A && (B && C);
  const assocOr1 = (A || B) || C;
  const assocOr2 = A || (B || C);

  // Commutative Law
  const commAnd1 = A && B;
  const commAnd2 = B && A;
  const commOr1 = A || B;
  const commOr2 = B || A;

  useEffect(() => {
    setShowExplanation(false);
    const timer = setTimeout(() => setShowExplanation(true), 300);
    return () => clearTimeout(timer);
  }, [A, B, C]);
  
  return (
    <Card title="Associative & Commutative Laws" accentColor="bg-indigo-500">
      <div className="mb-4">
        <motion.div 
          className="bg-indigo-50 p-4 rounded-lg mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {showExplanation && (
            <Typewriter 
              text="Associative laws show that grouping doesn't matter, while commutative laws show that order doesn't matter in Boolean operations."
              className="text-sm text-gray-700"
            />
          )}
        </motion.div>

        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-4">
            <h3 className="text-lg font-semibold mb-2 text-indigo-700">🔀 Associative Laws</h3>
            <div className="bg-indigo-50 p-3 rounded-lg mb-3">
              <div className="text-sm mb-1 font-medium">AND Operation:</div>
              <Formula label="(A·B)·C" formula={`(${A}·${B})·${C}`} result={assocAnd1} />
              <Formula label="A·(B·C)" formula={`${A}·(${B}·${C})`} result={assocAnd2} />
              <div className="text-xs mt-1 text-gray-600">Are they equal? {assocAnd1 === assocAnd2 ? "✓ Yes" : "✗ No"}</div>
            </div>
            <div className="bg-indigo-50 p-3 rounded-lg">
              <div className="text-sm mb-1 font-medium">OR Operation:</div>
              <Formula label="(A+B)+C" formula={`(${A}+${B})+${C}`} result={assocOr1} />
              <Formula label="A+(B+C)" formula={`${A}+(${B}+${C})`} result={assocOr2} />
              <div className="text-xs mt-1 text-gray-600">Are they equal? {assocOr1 === assocOr2 ? "✓ Yes" : "✗ No"}</div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 px-2 mb-4">
            <h3 className="text-lg font-semibold mb-2 text-purple-700">🔄 Commutative Laws</h3>
            <div className="bg-purple-50 p-3 rounded-lg mb-3">
              <div className="text-sm mb-1 font-medium">AND Operation:</div>
              <Formula label="A·B" formula={`${A}·${B}`} result={commAnd1} />
              <Formula label="B·A" formula={`${B}·${A}`} result={commAnd2} />
              <div className="text-xs mt-1 text-gray-600">Are they equal? {commAnd1 === commAnd2 ? "✓ Yes" : "✗ No"}</div>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="text-sm mb-1 font-medium">OR Operation:</div>
              <Formula label="A+B" formula={`${A}+${B}`} result={commOr1} />
              <Formula label="B+A" formula={`${B}+${A}`} result={commOr2} />
              <div className="text-xs mt-1 text-gray-600">Are they equal? {commOr1 === commOr2 ? "✓ Yes" : "✗ No"}</div>
            </div>
          </div>
        </div>
      </div>

      <motion.div className="flex flex-wrap justify-center gap-2 mt-4">
        <motion.button
          onClick={toggleA}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Toggle A: {A}
        </motion.button>
        <motion.button
          onClick={toggleB}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Toggle B: {B}
        </motion.button>
        <motion.button
          onClick={toggleC}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Toggle C: {C}
        </motion.button>
      </motion.div>
    </Card>
  );
};

// Main BooleanLaws component
const BooleanLaws = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sections = [
    { name: "Identity & Nullification", component: <IdentityNullificationLaws /> },
    { name: "Idempotent & Complement", component: <IdempotentComplementLaws /> },
    { name: "Distributive & De Morgan's", component: <DistributiveDeMorganLaws /> },
    { name: "Absorption & Double Negation", component: <AbsorptionDoubleNegationLaws /> },
    { name: "Associative & Commutative", component: <AssociativeCommutativeLaws /> }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <motion.div 
        className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white p-6 rounded-xl shadow-lg mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Interactive Boolean Algebra Laws</h1>
        <p className="opacity-90">Explore the fundamental laws of Boolean logic with this interactive demonstrator</p>
      </motion.div>

      <div className="flex flex-wrap mb-6 gap-2">
        {sections.map((section, index) => (
          <motion.button
            key={index}
            className={`px-4 py-2 rounded-lg ${
              activeSection === index
                ? "bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-medium shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } transition-all`}
            onClick={() => setActiveSection(index)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {section.name}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {sections[activeSection].component}
        </motion.div>
      </AnimatePresence>

      <motion.div 
        className="mt-8 p-4 bg-gray-50 rounded-lg text-center text-sm text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Interactive Boolean Laws Demonstrator • Click the buttons to toggle values and see how laws apply
      </motion.div>
    </div>
  );
};

export default BooleanLaws;