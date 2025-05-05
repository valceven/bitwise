import React, { useState } from 'react';
import { motion } from 'framer-motion';

const IdentityNullificationLaws = () => {
  const [A, setA] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  const handleToggle = () => setA(prev => (prev === 1 ? 0 : 1));

  const and1 = A && 1; // A · 1
  const or0 = A || 0;  // A + 0
  const and0 = A && 0; // A · 0
  const or1 = A || 1;  // A + 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Identity Law */}
      <div className="text-gray-700 py-2 space-y-2 p-2">
        <p className="text-base font-semibold">✔ Identity Law</p>
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm italic"
        >
          The Identity Law states that combining a Boolean variable with 1 using AND keeps its value, 
          and OR with 0 also keeps its value.
        </motion.p>
  
        <ul className="list-inside ml-4 flex flex-col gap-2">
          <motion.li
            className="bg-gray-100 max-w-fit p-4 rounded-xl"
            key={`and1-${A}`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            ( A ⋅ 1 ) = {A} ⋅ 1 = <strong>{and1}</strong>
          </motion.li>
          <motion.li
            className="bg-gray-100 max-w-fit p-4 rounded-xl"
            key={`or0-${A}`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            ( A + 0 ) = {A} + 0 = <strong>{or0}</strong>
          </motion.li>
        </ul>
  
        {/* Nullification Law */}
        <p className="mt-4 text-base font-semibold">❌ Nullification Law</p>
        <motion.p
          className="text-sm italic mb-2"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          The Nullification Law means that AND with 0 always gives 0, and OR with 1 always gives 1—regardless of A.
        </motion.p>
  
        <ul className="list-inside ml-4 flex flex-col gap-2">
          <motion.li
            className="bg-gray-100 max-w-fit p-4 rounded-xl"
            key={`and0-${A}`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            ( A ⋅ 0 ) = {A} ⋅ 0 = <strong>{and0}</strong>
          </motion.li>
          <motion.li
            className="bg-gray-100 max-w-fit p-4 rounded-xl"
            key={`or1-${A}`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            ( A + 1 ) = {A} + 1 = <strong>{or1}</strong>
          </motion.li>
        </ul>
      </div>
  
      {/* Toggle Button */}
      <motion.div
        className="flex items-center space-x-2 ml-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        >
        {isClicked ? (
            <motion.button
            onClick={handleToggle}
            className="px-4 py-2 bg-darkpurple text-white rounded-lg hover:bg-purple-700 transition hover:cursor"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            >
            Toggle A (Current A = {A})
            </motion.button>
        ) : (
            <motion.div
            className="px-4 py-2 bg-darkpurple text-white rounded-lg hover:bg-purple-700 transition hover:cursor"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsClicked(true)}
            initial={{ scale: 1}}
            animate={{ scale: [1, 1.05, 0.8]}}
            transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            >
            Click Me!
            </motion.div>
        )}
        </motion.div>

  
      {/* Tip Appears Only After First Toggle */}
      {A !== 0 && (
        <motion.div
          className="bg-yellow-100 text-yellow-800 p-3 rounded-md text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, }}
        >
          💡 You just toggled A to {A}. Watch how the expressions instantly update based on Boolean logic laws!
        </motion.div>
      )}
    </motion.div>
  );  
}

const IdempotentComplementLaws = () => {
    const [A, setA] = useState(0);
    const [isClicked, setIsClicked] = useState(false);

    const handleToggle = () => setA(prev => (prev === 1 ? 0 : 1));

    const andA = A && A; // A · A
    const orA = A || A;  // A + A
    const notA = A === 0 ? 1 : 0; // A'
    const andNotA = A && notA; // A · A'
    const orNotA = A || notA;  // A + A'

    return (
        <motion.div className="p-4">
        {/* Idempotent Law */}
        <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-lg font-bold text-gray-800">🔁 Idempotent Law</h2>
            <motion.p>
            The Idempotent Law states that repeating a variable in an AND or OR operation doesn't change the result:
            </motion.p>
            <ul className="list-disc list-inside text-gray-700">
            <li>A · A = {A} · {A} = <strong>{andA}</strong></li>
            <li>A + A = {A} + {A} = <strong>{orA}</strong></li>
            </ul>
        </motion.div>

        {/* Complement Law */}
        <motion.div
            className="space-y-4 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-lg font-bold text-gray-800">🔄 Complement Law</h2>
            <motion.p>
            The Complement Law states that a variable ANDed with its inverse results in `0`, while ORed results in `1`:
            </motion.p>
            <ul className="list-disc list-inside text-gray-700">
            <li>A · A' = {A} · {notA} = <strong>{andNotA}</strong></li>
            <li>A + A' = {A} + {notA} = <strong>{orNotA}</strong></li>
            </ul>
        </motion.div>

        {/* Toggle Button */}
        <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {isClicked ? (
            <motion.button
                onClick={handleToggle}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Toggle A (Current A = {A})
            </motion.button>
            ) : (
            <motion.div
                className="cursor-pointer text-blue-600 font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsClicked(true)}
            >
                Click Me!
            </motion.div>
            )}
        </motion.div>
        </motion.div>
    );
}

const DistributiveDeMorganLaws = () => {
    const [A, setA] = useState(0);
    const [isClicked, setIsClicked] = useState(false);

    const handleToggle = () => setA(prev => (prev === 1 ? 0 : 1));

    const andA = A && A; // A · A
    const orA = A || A;  // A + A
    const notA = A === 0 ? 1 : 0; // A'
    const andNotA = A && notA; // A · A'
    const orNotA = A || notA;  // A + A'

    // Distributive Law
    const andOr = A && (A || notA);  // A · (A + A')
    const orAnd = A || (A && notA);  // A + (A · A')

    // De Morgan's Law
    const deMorgan1 = !(A && notA);  // (A · A')'
    const deMorgan2 = !(A || notA);  // (A + A')'

    return (
        <motion.div className="p-4">
        {/* Distributive Law */}
        <motion.div
            className="space-y-4 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-lg font-bold text-gray-800">🔄 Distributive Law</h2>
            <motion.p>
            The Distributive Law describes how AND and OR operations can be distributed over each other:
            </motion.p>
            <ul className="list-disc list-inside text-gray-700">
            <li>A · (A + A') = {A} · ({A} + {notA}) = <strong>{andOr}</strong></li>
            <li>A + (A · A') = {A} + ({A} · {notA}) = <strong>{orAnd}</strong></li>
            </ul>
        </motion.div>

        {/* De Morgan's Law */}
        <motion.div
            className="space-y-4 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-lg font-bold text-gray-800">🔄 De Morgan's Law</h2>
            <motion.p>
            De Morgan's Law explains how negating AND or OR operations works:
            </motion.p>
            <ul className="list-disc list-inside text-gray-700">
            <li>(A · A')' = {`(${A} · ${notA})`}' = <strong>{deMorgan1}</strong></li>
            <li>(A + A')' = {`(${A} + ${notA})`}' = <strong>{deMorgan2}</strong></li>
            </ul>
        </motion.div>

        {/* Toggle Button */}
        <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {isClicked ? (
            <motion.button
                onClick={handleToggle}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Toggle A (Current A = {A})
            </motion.button>
            ) : (
            <motion.div
                className="cursor-pointer text-blue-600 font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsClicked(true)}
            >
                Click Me!
            </motion.div>
            )}
        </motion.div>
        </motion.div>
    );
}

const AbsorptionDoubleNegationLaws = () => {
    const [A, setA] = useState(0);
    const [isClicked, setIsClicked] = useState(false);

    const handleToggle = () => setA(prev => (prev === 1 ? 0 : 1));

    const notA = A === 0 ? 1 : 0; // A'  // A + A'

    // Absorption Law
    const orAndA = A || (A && notA);  // A + (A · A')
    const andOrA = A && (A || notA);  // A · (A + A')

    // Double Negation Law
    const doubleNegA = !(notA);  // (A')'

    return (
        <motion.div className="p-4">

        {/* Absorption Law */}
        <motion.div
            className="space-y-4 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-lg font-bold text-gray-800">🔄 Absorption Law</h2>
            <motion.p>
            The Absorption Law shows that combining a variable with itself ANDed or ORed with another doesn't change its value:
            </motion.p>
            <ul className="list-disc list-inside text-gray-700">
            <li>A + (A · A') = {A} + ({A} · {notA}) = <strong>{orAndA}</strong></li>
            <li>A · (A + A') = {A} · ({A} + {notA}) = <strong>{andOrA}</strong></li>
            </ul>
        </motion.div>

        {/* Double Negation Law */}
        <motion.div
            className="space-y-4 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-lg font-bold text-gray-800">🔄 Double Negation Law</h2>
            <motion.p>
            The Double Negation Law states that negating a negated value brings back the original value:
            </motion.p>
            <ul className="list-disc list-inside text-gray-700">
            <li>(A')' = {`(${notA})`} = <strong>{doubleNegA}</strong></li>
            </ul>
        </motion.div>

        {/* Toggle Button */}
        <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {isClicked ? (
            <motion.button
                onClick={handleToggle}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Toggle A (Current A = {A})
            </motion.button>
            ) : (
            <motion.div
                className="cursor-pointer text-blue-600 font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsClicked(true)}
            >
                Click Me!
            </motion.div>
            )}
        </motion.div>
        </motion.div>
    );
}

const AssociativeCommutativeLaws = () => {
    const [A, setA] = useState(0);
    const [B, setB] = useState(1);
    const [C, setC] = useState(0);
    const [isClicked, setIsClicked] = useState(false);

    const handleToggle = () => setA(prev => (prev === 1 ? 0 : 1));

    // Associative Law
    const assocAnd = (A && B) && C === A && (B && C); // (A · B) · C = A · (B · C)
    const assocOr = (A || B) || C === A || (B || C); // (A + B) + C = A + (B + C)

    // Commutative Law
    const commutativeAnd = A && B === B && A; // A · B = B · A
    const commutativeOr = A || B === B || A;  // A + B = B + A

    return (
        <motion.div className="p-4">
        {/* Associative Law */}
        <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-lg font-bold text-gray-800">🔄 Associative Law</h2>
            <motion.p>
            The Associative Law shows that the grouping of terms doesn't change the result:
            </motion.p>
            <ul className="list-disc list-inside text-gray-700">
            <li>(A · B) · C = <strong>{(A && B) && C ? "True" : "False"}</strong></li>
            <li>A · (B · C) = <strong>{A && (B && C) ? "True" : "False"}</strong></li>
            <li>(A + B) + C = <strong>{(A || B) || C ? "True" : "False"}</strong></li>
            <li>A + (B + C) = <strong>{A || (B || C) ? "True" : "False"}</strong></li>
            </ul>
        </motion.div>

        {/* Commutative Law */}
        <motion.div
            className="space-y-4 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-lg font-bold text-gray-800">🔄 Commutative Law</h2>
            <motion.p>
            The Commutative Law states that the order of operands doesn't affect the result:
            </motion.p>
            <ul className="list-disc list-inside text-gray-700">
            <li>A · B = <strong>{commutativeAnd ? "True" : "False"}</strong></li>
            <li>B · A = <strong>{commutativeAnd ? "True" : "False"}</strong></li>
            <li>A + B = <strong>{commutativeOr ? "True" : "False"}</strong></li>
            <li>B + A = <strong>{commutativeOr ? "True" : "False"}</strong></li>
            </ul>
        </motion.div>

        {/* Toggle Button */}
        <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {isClicked ? (
            <motion.button
                onClick={handleToggle}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Toggle A (Current A = {A})
            </motion.button>
            ) : (
            <motion.div
                className="cursor-pointer text-blue-600 font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsClicked(true)}
            >
                Click Me!
            </motion.div>
            )}
        </motion.div>
        </motion.div>
    );
}

export const BooleanLaws = {
    IdentityNullificationLaws,
    IdempotentComplementLaws,
    DistributiveDeMorganLaws,
    AbsorptionDoubleNegationLaws,
    AssociativeCommutativeLaws
};

