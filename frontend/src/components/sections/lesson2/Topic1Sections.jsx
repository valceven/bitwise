import React from 'react'
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import BooleanLaws from './BooleanLaws';

export const lesson2Topic1Sections = [
  {
    title: (<h1 className="ml-2 text-2xl">📘 Laws of Boolean Algebra</h1>),
    content: (
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className='p-4'
      >
        <h1 className="text-xl font-bold text-gray-800 my-4">🎯 In this lesson, you will:</h1>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>Understand</strong> the 10 fundamental Laws of Boolean Algebra.</li>
          <li><strong>Identify</strong> where and how to apply these laws in Boolean expressions.</li>
          <li><strong>Practice</strong> simplifying complex Boolean equations step-by-step.</li>
          <li><strong>Develop</strong> logical thinking through interactive activities and examples.</li>
        </ul>

        <motion.div
          className="mt-6 bg-yellow-100 p-4 rounded-xl border-l-4 border-yellow-400 shadow-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1 }}
          whileHover={{ boxShadow: "0px 0px 8px 3px rgba(251, 191, 36, 0.6)" }}
        >
          <span className="text-black italic flex items-start gap-2">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              whileHover={{ scale: 1 }}
            >
              <h1 className='text-2xl'>💡</h1>
            </motion.span>

            <span className="text-sm md:text-base">
              <Typewriter
                words={[
                  "Tip: Each law you learn is a powerful tool in reducing and understanding logic expressions.Try to visualize their effects using truth tables or circuit analogies!",
                ]}
                loop={false}
                cursor
                cursorStyle="|"
                typeSpeed={30}
                deleteSpeed={0}
                delaySpeed={2000}
              />
            </span>
          </span>
        </motion.div>
      </motion.section>
    )
  },
  {
    title: "🧠 Introduction",
    content: (
      <motion.div
        className="p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-base leading-relaxed text-gray-800">
          Boolean Algebra isn't just about <strong>operators</strong> — it's also built upon a powerful
          set of <strong>laws</strong> that govern how Boolean values behave under various operations.
          <br /><br />
          These laws allow us to <strong>simplify logic circuits</strong>,
          <strong> optimize conditional logic</strong>, and 
          <strong> make smarter decisions</strong> — in both hardware systems and software design.
        </p>
  
        <motion.div
          className="mt-6 bg-blue-100 p-4 rounded-xl border-l-4 border-blue-400 shadow-sm"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-blue-800 font-semibold">
            <Typewriter
              words={[
                "Ready to dive into the core of logic?",
                "Let’s unravel how these laws shape everything from gates to code!",
              ]}
              loop={false}
              cursor
              cursorStyle="|"
              typeSpeed={30}
              deleteSpeed={0}
              delaySpeed={2000}>
            </Typewriter>
          </p>
        </motion.div>
      </motion.div>
    )
  },
  {
    title: "🔍 Understanding the Laws of Boolean Algebra",
    content: (
      <motion.div
        className="p-4 flex flex-col space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-base leading-relaxed text-gray-800">
          Before diving into complex logic circuits or digital system designs,
          it's essential to master the <strong>10 foundational laws</strong> of Boolean Algebra.
          These laws act as the core tools that allow us to manipulate,
          simplify, and optimize Boolean expressions — a vital skill in both
          programming and hardware logic.
        </p>

        <motion.div
          className="bg-green-100 p-4 rounded-xl border-l-4 border-green-400 shadow-md text-sm md:text-base italic text-gray-800"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 5, duration: 2 }}
          whileHover={{ scale: 1 }}
        >
          <span className="flex items-start gap-2">
            <span className="text-xl">💡</span>
            <span className="flex-1">
              <Typewriter
                words={[
                  "Tip: Think of each law like a mathematical shortcut — once you understand them, patterns and simplifications will naturally begin to appear!"
                ]}
                cursor
                cursorStyle="|"
                typeSpeed={25}
                deleteSpeed={0}
                delaySpeed={1000}
              />
            </span>
          </span>
        </motion.div>

      </motion.div>
    )
  },
  {
    title: "🔢 Identity & Nullification Laws",
    content: (
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
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              ( A ⋅ 1 ) = A ⋅ 1 = <strong>A</strong>
            </motion.li>
            <motion.li
              className="bg-gray-100 max-w-fit p-4 rounded-xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              ( A + 0 ) = A + 0 = <strong>A</strong>
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
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              ( A ⋅ 0 ) = A ⋅ 0 = <strong>0</strong>
            </motion.li>
            <motion.li
              className="bg-gray-100 max-w-fit p-4 rounded-xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              ( A + 1 ) = A + 1 = <strong>1</strong>
            </motion.li>
          </ul>
        </div>

      </motion.div>
    )
  },
  {
    title: "🔄 Idempotent & Complement Laws",
    content: (
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
            <li>A · A = 1 · 1 = <strong>A</strong></li>
            <li>A + A = 1 + 1 = <strong>A</strong></li>
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
            <li>A · A' = 1 · 0 = <strong>1</strong></li>
            <li>A + A' = 1 + 0 = <strong>0</strong></li>
            </ul>
        </motion.div>
      </motion.div>
    )
  },
  {
    title: "🔁 Distributive & DeMorgan's Laws",
    content: (
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
            <li>A · (A + A') = 1 · (1 + 0) = <strong>1</strong></li>
            <li>A + (A · A') = 1 + (1 · 0) = <strong>0</strong></li>
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
            <li>(A · A')' = {`(1 · 0)`}' = <strong>1</strong></li>
            <li>(A + A')' = {`(1 + 0)`}' = <strong>2</strong></li>
            </ul>
        </motion.div>
      </motion.div>
    )
  },
  {
    title: "🔗 Absorption & Double Negation Laws",
    content: (
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
            <li>A + (A · A') = 1 + (1 · 0) = <strong>1</strong></li>
            <li>A · (A + A') = 1 · (1 + 0) = <strong>1</strong></li>
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
            <li>(A')' = {`1`} = <strong>1</strong></li>
            </ul>
        </motion.div>
      </motion.div>
    )
  },
  {
    title: "🔄 Associative & Commutative Laws",
    content: (
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
            {/* <li>(A · B) · C = <strong>{(1 && 0) && C ? "True" : "False"}</strong></li>
            <li>A · (B · C) = <strong>{1 && (B && C) ? "True" : "False"}</strong></li>
            <li>(A + B) + C = <strong>{(1 || B) || C ? "True" : "False"}</strong></li>
            <li>A + (B + C) = <strong>{1 || (B || C) ? "True" : "False"}</strong></li> */}
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
            {/* <li>A · B = <strong>{commutativeAnd ? "True" : "False"}</strong></li>
            <li>B · A = <strong>{commutativeAnd ? "True" : "False"}</strong></li>
            <li>A + B = <strong>{commutativeOr ? "True" : "False"}</strong></li>
            <li>B + A = <strong>{commutativeOr ? "True" : "False"}</strong></li> */}
            </ul>
        </motion.div>
      </motion.div>
    )
  },
  {
    title: "",
    content: (
        <BooleanLaws />
    )
  }
];
