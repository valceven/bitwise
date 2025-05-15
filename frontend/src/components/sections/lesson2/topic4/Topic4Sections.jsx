import React from 'react'
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import BooleanLaws from './BooleanLaws';

export const topic4Sections = [
  {
    title: (<h1 className="ml-2 text-2xl font-bold">📘 Laws of Boolean Algebra</h1>),
    content: (
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className='p-4 rounded-lg bg-[#F1F6F1] shadow-md'
      >
        <h1 className="text-xl font-bold text-[#29314D] my-4">🎯 In this lesson, you will:</h1>
        <ul className="list-disc list-inside text-[#29314D] space-y-3">
          <motion.li 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <strong>Understand</strong> the 10 fundamental Laws of Boolean Algebra and their applications.
          </motion.li>
          <motion.li 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <strong>Identify</strong> where and how to apply these laws to simplify Boolean expressions.
          </motion.li>
          <motion.li 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <strong>Practice</strong> simplifying complex Boolean equations through step-by-step methods.
          </motion.li>
          <motion.li 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <strong>Develop</strong> logical thinking through interactive examples and visual demonstrations.
          </motion.li>
        </ul>

        <motion.div
          className="mt-6 bg-[#F2C94C] bg-opacity-30 p-4 rounded-xl border-l-4 border-[#F2C94C] shadow-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1 }}
          whileHover={{ boxShadow: "0px 0px 12px 3px rgba(242, 201, 76, 0.5)" }}
        >
          <span className="text-[#031926] flex items-start gap-2">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              whileHover={{ scale: 1.1, rotate: [0, 10, -10, 0] }}
            >
              <h1 className='text-2xl'>💡</h1>
            </motion.span>

            <span className="text-sm md:text-base">
              <Typewriter
                words={[
                  "Tip: Each Boolean law is like a puzzle piece. Learn how they fit together, and you'll transform complex logic expressions into elegant, simple solutions!",
                ]}
                loop={false}
                cursor
                cursorStyle="|"
                typeSpeed={40}
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
    title: "🧠 Introduction to Boolean Algebra",
    content: (
      <motion.div
        className="p-4 bg-[#F1F6F1] rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-base leading-relaxed text-[#29314D]">
          Boolean Algebra forms the mathematical foundation of all digital systems and is named after mathematician George Boole. It operates on <strong>binary values</strong> (0 and 1, or True and False) using three primary operations:
        </p>
        
        <motion.ul 
          className="mt-4 space-y-3 text-[#29314D]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.li 
            className="flex items-center"
            whileHover={{ x: 5 }}
          >
            <span className="text-[#27AE60] font-bold mr-2">AND (∙):</span> Returns 1 only when both inputs are 1
          </motion.li>
          <motion.li 
            className="flex items-center"
            whileHover={{ x: 5 }}
          >
            <span className="text-[#6E61FF] font-bold mr-2">OR (+):</span> Returns 1 when at least one input is 1
          </motion.li>
          <motion.li 
            className="flex items-center"
            whileHover={{ x: 5 }}
          >
            <span className="text-[#F14E3A] font-bold mr-2">NOT ('):</span> Inverts the input (0 becomes 1, 1 becomes 0)
          </motion.li>
        </motion.ul>
  
        <motion.div
          className="mt-6 bg-[#6E61FF] bg-opacity-20 p-4 rounded-xl border-l-4 border-[#6E61FF] shadow-sm"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-[#29314D] font-semibold">
            <Typewriter
              words={[
                "Boolean Algebra isn't just mathematical theory—it's the language of computers!",
                "From simple logic gates to complex CPUs, these laws govern how every digital system works.",
              ]}
              loop={false}
              cursor
              cursorStyle="|"
              typeSpeed={40}
              deleteSpeed={0}
              delaySpeed={2000}>
            </Typewriter>
          </p>
        </motion.div>
      </motion.div>
    )
  },
  {
    title: "🔍 The Ten Laws of Boolean Algebra",
    content: (
      <motion.div
        className="p-4 flex flex-col space-y-6 bg-[#F1F6F1] rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-base leading-relaxed text-[#29314D]">
          The foundation of Boolean Algebra is built upon <strong>10 essential laws</strong> that help us manipulate, simplify, and optimize logical expressions. These laws are universal principles that apply to all Boolean operations—whether you're working with hardware design, programming, or mathematical logic.
        </p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, staggerChildren: 0.1 }}
        >
          {[
            { name: "Identity", color: "#27AE60" },
            { name: "Nullification", color: "#F14E3A" },
            { name: "Idempotent", color: "#F2C94C" },
            { name: "Complement", color: "#9B51E0" },
            { name: "Double Negation", color: "#56CCF2" },
            { name: "Commutative", color: "#F2994A" },
            { name: "Associative", color: "#6E61FF" },
            { name: "Distributive", color: "#DAC3FF" },
            { name: "DeMorgan's", color: "#F14E3A" },
            { name: "Absorption", color: "#27AE60" }
          ].map((law, index) => (
            <motion.div
              key={index}
              className="p-3 rounded-lg shadow-sm text-white font-medium"
              style={{ backgroundColor: law.color }}
              whileHover={{ scale: 1.05, y: -5 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
            >
              {law.name} Law
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="bg-[#DAC3FF] bg-opacity-30 p-4 rounded-xl border-l-4 border-[#9B51E0] shadow-md text-sm md:text-base text-[#29314D]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 1 }}
          whileHover={{ scale: 1.01 }}
        >
          <span className="flex items-start gap-2">
            <span className="text-xl">💡</span>
            <span className="flex-1">
              <Typewriter
                words={[
                  "Think of these laws as your toolkit for digital logic. Just like physical tools help you build physical objects, these logical laws help you construct and optimize digital systems!"
                ]}
                cursor
                cursorStyle="|"
                typeSpeed={35}
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
        className="p-4 bg-[#F1F6F1] rounded-lg shadow-md"
      >
        {/* Identity Law */}
        <div className="text-[#29314D] py-2 space-y-3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-bold flex items-center text-[#27AE60]">
              <span className="mr-2">✓</span> Identity Law
            </h3>
            <p className="text-sm italic mb-3 text-[#29314D]">
              The Identity Law defines how variables interact with neutral elements (1 for AND, 0 for OR).
            </p>
          </motion.div>
    
          <div className="space-y-4">
            <motion.div
              className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-[#27AE60]"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-lg">A · 1 = A</span>
                <span className="bg-[#27AE60] text-white px-2 py-1 rounded text-xs">AND Identity</span>
              </div>
              <p className="mt-2 text-sm">When we AND any value with 1, the result remains unchanged. 1 is neutral for AND operations.</p>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div className="bg-[#F1F6F1] p-2 rounded">1 · 1 = 1</div>
                <div className="bg-[#F1F6F1] p-2 rounded">0 · 1 = 0</div>
              </div>
            </motion.div>
            
            <motion.div
              className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-[#27AE60]"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-lg">A + 0 = A</span>
                <span className="bg-[#27AE60] text-white px-2 py-1 rounded text-xs">OR Identity</span>
              </div>
              <p className="mt-2 text-sm">When we OR any value with 0, the result remains unchanged. 0 is neutral for OR operations.</p>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div className="bg-[#F1F6F1] p-2 rounded">1 + 0 = 1</div>
                <div className="bg-[#F1F6F1] p-2 rounded">0 + 0 = 0</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Nullification Law */}
        <div className="text-[#29314D] py-2 space-y-3 mt-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-lg font-bold flex items-center text-[#F14E3A]">
              <span className="mr-2">❌</span> Nullification Law
            </h3>
            <p className="text-sm italic mb-3 text-[#29314D]">
              The Nullification Law shows how variables interact with dominating elements (0 for AND, 1 for OR).
            </p>
          </motion.div>
    
          <div className="space-y-4">
            <motion.div
              className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-[#F14E3A]"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.0 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-lg">A · 0 = 0</span>
                <span className="bg-[#F14E3A] text-white px-2 py-1 rounded text-xs">AND Nullification</span>
              </div>
              <p className="mt-2 text-sm">When we AND any value with 0, the result is always 0. 0 dominates in AND operations.</p>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div className="bg-[#F1F6F1] p-2 rounded">1 · 0 = 0</div>
                <div className="bg-[#F1F6F1] p-2 rounded">0 · 0 = 0</div>
              </div>
            </motion.div>
            
            <motion.div
              className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-[#F14E3A]"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-lg">A + 1 = 1</span>
                <span className="bg-[#F14E3A] text-white px-2 py-1 rounded text-xs">OR Nullification</span>
              </div>
              <p className="mt-2 text-sm">When we OR any value with 1, the result is always 1. 1 dominates in OR operations.</p>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div className="bg-[#F1F6F1] p-2 rounded">1 + 1 = 1</div>
                <div className="bg-[#F1F6F1] p-2 rounded">0 + 1 = 1</div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="mt-5 bg-[#F2C94C] bg-opacity-20 p-3 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <p className="text-sm text-[#29314D]">
            <span className="font-bold">🔑 Key insight:</span> These laws are crucial for circuit simplification. If you see A·0 anywhere in an expression, you can immediately replace it with 0!
          </p>
        </motion.div>
      </motion.div>
    )
  },
  {
    title: "🔄 Idempotent & Complement Laws",
    content: (
      <motion.div 
        className="p-4 bg-[#F1F6F1] rounded-lg shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Idempotent Law */}
        <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-lg font-bold text-[#F2C94C] flex items-center">
              <span className="mr-2">🔁</span> Idempotent Law
            </h2>
            <p className="text-[#29314D]">
              The Idempotent Law states that applying the same variable to itself with AND or OR has no effect:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-[#F2C94C]"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg">A · A = A</span>
                  <span className="bg-[#F2C94C] text-[#29314D] px-2 py-1 rounded text-xs">AND Idempotence</span>
                </div>
                <p className="mt-2 text-sm">ANDing a value with itself returns the original value.</p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-[#F1F6F1] p-2 rounded">1 · 1 = 1</div>
                  <div className="bg-[#F1F6F1] p-2 rounded">0 · 0 = 0</div>
                </div>
              </motion.div>
              
              <motion.div
                className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-[#F2C94C]"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg">A + A = A</span>
                  <span className="bg-[#F2C94C] text-[#29314D] px-2 py-1 rounded text-xs">OR Idempotence</span>
                </div>
                <p className="mt-2 text-sm">ORing a value with itself returns the original value.</p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-[#F1F6F1] p-2 rounded">1 + 1 = 1</div>
                  <div className="bg-[#F1F6F1] p-2 rounded">0 + 0 = 0</div>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              className="text-sm bg-[#F2C94C] bg-opacity-20 p-3 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <p>
                <span className="font-bold">💡 Application:</span> This law helps eliminate redundancy. If you see expressions like (A + A), you can simplify them to just A.
              </p>
            </motion.div>
        </motion.div>

        {/* Complement Law */}
        <motion.div
            className="space-y-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
        >
            <h2 className="text-lg font-bold text-[#9B51E0] flex items-center">
              <span className="mr-2">⚖️</span> Complement Law
            </h2>
            <p className="text-[#29314D]">
              The Complement Law describes what happens when you combine a variable with its negation (opposite):
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-[#9B51E0]"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg">A · A' = 0</span>
                  <span className="bg-[#9B51E0] text-white px-2 py-1 rounded text-xs">AND Complement</span>
                </div>
                <p className="mt-2 text-sm">ANDing a value with its complement always gives 0.</p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-[#F1F6F1] p-2 rounded">1 · 0 = 0</div>
                  <div className="bg-[#F1F6F1] p-2 rounded">0 · 1 = 0</div>
                </div>
              </motion.div>
              
              <motion.div
                className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-[#9B51E0]"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg">A + A' = 1</span>
                  <span className="bg-[#9B51E0] text-white px-2 py-1 rounded text-xs">OR Complement</span>
                </div>
                <p className="mt-2 text-sm">ORing a value with its complement always gives 1.</p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-[#F1F6F1] p-2 rounded">1 + 0 = 1</div>
                  <div className="bg-[#F1F6F1] p-2 rounded">0 + 1 = 1</div>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              className="text-white text-sm bg-[#9B51E0] bg-opacity-20 p-3 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              <p>
                <span className="font-bold">🔄 Real-world analogy:</span> Think of a light switch—it's either ON or OFF. It can't be both simultaneously (A · A' = 0), and it must be one or the other (A + A' = 1).
              </p>
            </motion.div>
        </motion.div>
      </motion.div>
    )
  },
  {
    title: "🔁 Distributive Law",
    content: (
      <motion.div 
        className="p-4 bg-[#F1F6F1] rounded-lg shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-lg font-bold text-[#DAC3FF] flex items-center">
              <span className="mr-2">🔀</span> Distributive Law
            </h2>
            <p className="text-[#29314D]">
              The Distributive Law shows how AND and OR operations can distribute over each other, similar to distributive property in regular algebra:
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              <motion.div
                className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-[#DAC3FF]"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg">A · (B + C) = (A · B) + (A · C)</span>
                  <span className="bg-[#DAC3FF] text-[#29314D] px-2 py-1 rounded text-xs">AND Distribution</span>
                </div>
                <p className="mt-2 text-sm">AND distributes over OR, similar to multiplication over addition in regular algebra.</p>
                <div className="mt-3 p-3 bg-[#F1F6F1] rounded-lg">
                  <p className="text-sm font-semibold">Example:</p>
                  <p className="text-sm mt-1">A · (B + C) = (A · B) + (A · C)</p>
                  <p className="text-sm mt-1">If A=1, B=0, C=1:</p>
                  <p className="text-sm mt-1">1 · (0 + 1) = (1 · 0) + (1 · 1)</p>
                  <p className="text-sm mt-1">1 · 1 = 0 + 1</p>
                  <p className="text-sm mt-1">1 = 1 ✓</p>
                </div>
              </motion.div>
              
              <motion.div
                className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-[#DAC3FF]"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg">A + (B · C) = (A + B) · (A + C)</span>
                  <span className="bg-[#DAC3FF] text-[#29314D] px-2 py-1 rounded text-xs">OR Distribution</span>
                </div>
                <p className="mt-2 text-sm">OR distributes over AND, a property unique to Boolean algebra.</p>
                <div className="mt-3 p-3 bg-[#F1F6F1] rounded-lg">
                  <p className="text-sm font-semibold">Example:</p>
                  <p className="text-sm mt-1">A + (B · C) = (A + B) · (A + C)</p>
                  <p className="text-sm mt-1">If A=0, B=1, C=1:</p>
                  <p className="text-sm mt-1">0 + (1 · 1) = (0 + 1) · (0 + 1)</p>
                  <p className="text-sm mt-1">0 + 1 = 1 · 1</p>
                  <p className="text-sm mt-1">1 = 1 ✓</p>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              className="text-sm bg-[#DAC3FF] bg-opacity-30 p-3 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <p>
                <span className="font-bold">🛠️ Practical use:</span> The distributive law is essential for transforming complex expressions into simpler forms. It can convert a product-of-sums to a sum-of-products (or vice versa), which is crucial for implementing logic using specific types of gates.
              </p>
            </motion.div>
        </motion.div>
    </motion.div>
    )
  },
  {
    title: "De Morgan's Law",
    content: (
    <motion.div
        className="p-4 bg-[#F1F6F1] rounded-lg shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
    >
        <motion.div
            className="space-y-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
        >
            <h2 className="text-lg font-bold text-[#F14E3A] flex items-center">
              <span className="mr-2">🔄</span> De Morgan's Laws
            </h2>
            <p className="text-[#29314D]">
              De Morgan's Laws are powerful tools that show how to distribute negation over AND and OR operations:
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              <motion.div
                className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-[#F14E3A]"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.0 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg">(A · B)' = A' + B'</span>
                  <span className="bg-[#F14E3A] text-white px-2 py-1 rounded text-xs">First De Morgan's Law</span>
                </div>
                <p className="mt-2 text-sm">The negation of an AND expression equals the OR of the negated inputs.</p>
                <div className="mt-3 p-3 bg-[#F1F6F1] rounded-lg">
                  <p className="text-sm font-semibold">In words:</p>
                  <p className="text-sm mt-1">"NOT (A AND B)" is the same as "(NOT A) OR (NOT B)"</p>
                  <div className="mt-2 grid grid-cols-1 gap-2 text-sm">
                    <p className="font-semibold">Example:</p>
                    <p>If A=1, B=0:</p>
                    <p>(1 · 0)' = 1' + 0'</p>
                    <p>0' = 0 + 1</p>
                    <p>1 = 1 ✓</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-[#F14E3A]"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg">(A + B)' = A' · B'</span>
                  <span className="bg-[#F14E3A] text-white px-2 py-1 rounded text-xs">Second De Morgan's Law</span>
                </div>
                <p className="mt-2 text-sm">The negation of an OR expression equals the AND of the negated inputs.</p>
                <div className="mt-3 p-3 bg-[#F1F6F1] rounded-lg">
                  <p className="text-sm font-semibold">In words:</p>
                  <p className="text-sm mt-1">"NOT (A OR B)" is the same as "(NOT A) AND (NOT B)"</p>
                  <div className="mt-2 grid grid-cols-1 gap-2 text-sm">
                    <p className="font-semibold">Example:</p>
                    <p>If A=1, B=0:</p>
                    <p>(1 + 0)' = 1' · 0'</p>
                    <p>1' = 0 · 1</p>
                    <p>0 = 0 ✓</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              className="text-sm bg-[#F14E3A] bg-opacity-20 p-3 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <p className='text-white'>
                <span className="text-white font-bold">🌐 Real-world application:</span> De Morgan's Laws are essential in circuit design, allowing engineers to replace NAND gates with OR gates of inverted inputs (and vice versa). This flexibility is crucial when specific gate types are more readily available or efficient.
              </p>
            </motion.div>
        </motion.div>
      </motion.div>
    )
  },
  {
    title: "🔗 Absorption & Double Negation Laws",
    content: (
      <motion.div 
        className="p-4 bg-[#F1F6F1] rounded-lg shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Absorption Law */}
        <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-lg font-bold text-[#27AE60] flex items-center">
              <span className="mr-2">🔗</span> Absorption Law
            </h2>
            <p className="text-[#29314D]">
              The Absorption Law allows us to simplify expressions where a variable appears both alone and with other terms:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-[#27AE60]"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg">A + (A · B) = A</span>
                  <span className="bg-[#27AE60] text-white px-2 py-1 rounded text-xs">First Absorption Law</span>
                </div>
                <p className="mt-2 text-sm">When a term appears both alone and ANDed with another term in an OR operation, it "absorbs" the second term.</p>
                <div className="mt-2 p-3 bg-[#F1F6F1] rounded-lg">
                  <p className="text-sm">Proof using values:</p>
                  <p className="text-sm mt-1">If A=1, B=1: 1 + (1 · 1) = 1 + 1 = 1</p>
                  <p className="text-sm mt-1">If A=1, B=0: 1 + (1 · 0) = 1 + 0 = 1</p>
                  <p className="text-sm mt-1">If A=0, B=1: 0 + (0 · 1) = 0 + 0 = 0</p>
                  <p className="text-sm mt-1">If A=0, B=0: 0 + (0 · 0) = 0 + 0 = 0</p>
                </div>
              </motion.div>
              
              <motion.div
                className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-[#27AE60]"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg">A · (A + B) = A</span>
                  <span className="bg-[#27AE60] text-white px-2 py-1 rounded text-xs">Second Absorption Law</span>
                </div>
                <p className="mt-2 text-sm">When a term appears both alone and ORed with another term in an AND operation, it "absorbs" the second term.</p>
                <div className="mt-2 p-3 bg-[#F1F6F1] rounded-lg">
                  <p className="text-sm">Proof using values:</p>
                  <p className="text-sm mt-1">If A=1, B=1: 1 · (1 + 1) = 1 · 1 = 1</p>
                  <p className="text-sm mt-1">If A=1, B=0: 1 · (1 + 0) = 1 · 1 = 1</p>
                  <p className="text-sm mt-1">If A=0, B=1: 0 · (0 + 1) = 0 · 1 = 0</p>
                  <p className="text-sm mt-1">If A=0, B=0: 0 · (0 + 0) = 0 · 0 = 0</p>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              className="text-sm bg-[#27AE60] bg-opacity-20 p-3 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <p>
                <span className="font-bold">⚡ Power tip:</span> The Absorption Law is exceptionally useful for circuit minimization. When you spot patterns like A + (A · B), you can immediately replace them with just A, reducing the number of gates needed.
              </p>
            </motion.div>
        </motion.div>

        {/* Double Negation Law */}
        <motion.div
            className="space-y-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
        >
            <h2 className="text-lg font-bold text-[#56CCF2] flex items-center">
              <span className="mr-2">🔄</span> Double Negation Law
            </h2>
            <p className="text-[#29314D]">
              The Double Negation Law states that negating a value twice returns the original value:
            </p>
            
            <motion.div
              className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-[#56CCF2]"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-lg">(A')' = A</span>
                <span className="bg-[#56CCF2] text-[#29314D] px-2 py-1 rounded text-xs">Double Negation</span>
              </div>
              <p className="mt-2 text-sm">Applying NOT twice to any Boolean value returns the original value.</p>
              <div className="mt-3 p-3 bg-[#F1F6F1] rounded-lg">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="font-semibold">For value 1:</p>
                    <p>(1')' = (0)' = 1 ✓</p>
                  </div>
                  <div>
                    <p className="font-semibold">For value 0:</p>
                    <p>(0')' = (1)' = 0 ✓</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="text-sm bg-[#56CCF2] bg-opacity-20 p-3 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <p>
                <span className="font-bold">💻 Programming parallel:</span> In many programming languages, the NOT operator (!) works the same way: <code>!!x</code> is equivalent to <code>x</code> for any Boolean value. This is often used to convert values to their Boolean equivalent.
              </p>
            </motion.div>
        </motion.div>
      </motion.div>
    )
  },
  {
    title: "🔄 Associative & Commutative Laws",
    content: (
      <motion.div 
        className="p-4 bg-[#F1F6F1] rounded-lg shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Associative Law */}
        <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-lg font-bold text-[#6E61FF] flex items-center">
              <span className="mr-2">🔄</span> Associative Law
            </h2>
            <p className="text-[#29314D]">
              The Associative Law states that the grouping of operations doesn't affect the result:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-[#6E61FF]"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg">(A · B) · C = A · (B · C)</span>
                  <span className="bg-[#6E61FF] text-white px-2 py-1 rounded text-xs">AND Association</span>
                </div>
                <p className="mt-2 text-sm">The grouping of AND operations doesn't change the result.</p>
                <div className="mt-2 p-3 bg-[#F1F6F1] rounded-lg">
                  <p className="text-sm">Consider A=1, B=0, C=1:</p>
                  <p className="text-sm mt-1">(1 · 0) · 1 = 0 · 1 = 0</p>
                  <p className="text-sm mt-1">1 · (0 · 1) = 1 · 0 = 0</p>
                  <p className="text-sm mt-1">Both equal 0 ✓</p>
                </div>
              </motion.div>
              
              <motion.div
                className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-[#6E61FF]"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg">(A + B) + C = A + (B + C)</span>
                  <span className="bg-[#6E61FF] text-white px-2 py-1 rounded text-xs">OR Association</span>
                </div>
                <p className="mt-2 text-sm">The grouping of OR operations doesn't change the result.</p>
                <div className="mt-2 p-3 bg-[#F1F6F1] rounded-lg">
                  <p className="text-sm">Consider A=1, B=0, C=1:</p>
                  <p className="text-sm mt-1">(1 + 0) + 1 = 1 + 1 = 1</p>
                  <p className="text-sm mt-1">1 + (0 + 1) = 1 + 1 = 1</p>
                  <p className="text-sm mt-1">Both equal 1 ✓</p>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              className="text-sm bg-[#6E61FF] bg-opacity-20 p-3 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <p className='text-white'>
                <span className="font-bold">🛠️ Practical value:</span> The Associative Law allows us to rearrange complex expressions to simplify circuit design. It's especially valuable when implementing multi-input logic gates.
              </p>
            </motion.div>
        </motion.div>

        {/* Commutative Law */}
        <motion.div
            className="space-y-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
        >
            <h2 className="text-lg font-bold text-[#F2994A] flex items-center">
              <span className="mr-2">🔄</span> Commutative Law
            </h2>
            <p className="text-[#29314D]">
              The Commutative Law states that the order of operations doesn't affect the result:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-[#F2994A]"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg">A · B = B · A</span>
                  <span className="bg-[#F2994A] text-white px-2 py-1 rounded text-xs">AND Commutation</span>
                </div>
                <p className="mt-2 text-sm">The order of AND operations doesn't change the result.</p>
                <div className="mt-2 p-3 bg-[#F1F6F1] rounded-lg">
                  <p className="text-sm">For all possible values:</p>
                  <p className="text-sm mt-1">0 · 0 = 0 · 0 = 0</p>
                  <p className="text-sm mt-1">0 · 1 = 1 · 0 = 0</p>
                  <p className="text-sm mt-1">1 · 0 = 0 · 1 = 0</p>
                  <p className="text-sm mt-1">1 · 1 = 1 · 1 = 1</p>
                </div>
              </motion.div>
              
              <motion.div
                className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-[#F2994A]"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg">A + B = B + A</span>
                  <span className="bg-[#F2994A] text-white px-2 py-1 rounded text-xs">OR Commutation</span>
                </div>
                <p className="mt-2 text-sm">The order of OR operations doesn't change the result.</p>
                <div className="mt-2 p-3 bg-[#F1F6F1] rounded-lg">
                  <p className="text-sm">For all possible values:</p>
                  <p className="text-sm mt-1">0 + 0 = 0 + 0 = 0</p>
                  <p className="text-sm mt-1">0 + 1 = 1 + 0 = 1</p>
                  <p className="text-sm mt-1">1 + 0 = 0 + 1 = 1</p>
                  <p className="text-sm mt-1">1 + 1 = 1 + 1 = 1</p>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              className="text-sm bg-[#F2994A] bg-opacity-20 p-3 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              <p>
                <span className="font-bold">💡 Why it matters:</span> The Commutative Law gives us flexibility in how we arrange inputs to logic gates, allowing for more efficient circuit layouts and optimizations.
              </p>
            </motion.div>
        </motion.div>
      </motion.div>
    )
  },
  {
    title: "",
    content: (
        <motion.div
            className="p-6 bg-[#F1F6F1] rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
        >
        <h2 className="text-2xl font-bold text-center text-[#29314D] mb-3">💪 Why Boolean Laws Matter</h2>
            <motion.div
            className="mt-8 bg-[#F1F6F1] p-5 rounded-xl border-2 border-[#29314D] shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            whileHover={{ scale: 1.01 }}
            >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                <h3 className="font-bold text-[#27AE60]">Circuit Optimization</h3>
                <p>Fewer gates means less power consumption, lower costs, and faster operation in digital circuits.</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                <h3 className="font-bold text-[#F2994A]">Software Efficiency</h3>
                <p>Optimized boolean expressions lead to more efficient code execution and cleaner logic.</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                <h3 className="font-bold text-[#6E61FF]">Problem Solving</h3>
                <p>These laws give you tools to break down and solve complex logical problems systematically.</p>
                </div>
            </div>
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