import React from 'react'
import { Typewriter } from 'react-simple-typewriter';
import { BooleanLaws } from './BooleanLaws.jsx';
import { motion } from 'framer-motion';
import { content } from '../../../tailwind.config.js';

 export const topic1Sections = [
    {
      title: "Introduction to Boolean Algebra",
      content: (
        <p>
          Boolean Algebra is a mathematical structure used to analyze and simplify logical statements. 
          It serves as the foundation of digital electronics and computer science, 
          forming the basis for binary operations in everything from simple electronic devices like calculators to highly advanced technologies such as supercomputers, artificial intelligence, and data encryption.
            <br /><br />
          But before we dive into how it works, it's important to know <b>where it all began </b>.
        </p>
      )
    },
    {
      title: "The Origin of Boolean Algebra",
      content: (
        <p>
          Boolean Algebra was invented by <strong>George Boole</strong>, a British mathematician and logician, in the mid-1800s. 
          His goal was to find a way to express human reasoning using mathematical symbols. 
          In 1854, he published a book titled <em>An Investigation of the Laws of Thought</em>, 
          where he outlined a new system of logic based entirely on binary values: <strong>true</strong> and <strong>false</strong>.
            <br /><br />
            At the time, his work was viewed as abstract and philosophical, but decades later, his system turned out to be perfect for designing electronic circuits.
             As electrical engineers began building computers in the 20th century, they needed a system that
              could operate using only two voltage levels: ON and OFF. Boolean Algebra fit the bill exactly.
        </p>
        
      )
    },
    {
      title: "What Boolean Algebra Really Is",
      content: (
        <>
          <p className="mb-2">
            At its core, Boolean Algebra works with binary values — specifically, <strong>1</strong> and <strong>0</strong>.
          </p>
          <ul className="list-disc list-inside mb-2">
            <li><strong>1</strong> represents: True, Yes, or High voltage</li>
            <li><strong>0</strong> represents: False, No, or Low voltage</li>
          </ul>
          <p>
            Unlike traditional algebra (which deals with numbers), Boolean Algebra focuses on logical values (true or false only).
          </p>
          <p>
          This kind of system is useful in all digital devices, where operations depend on whether a signal is present (1) or absent (0), whether a switch is on (1) or off (0), or whether a condition is true (1) or false (0).
          </p>
        </>
      )
    },
    {
        title: "Boolean Logic in Everyday Life",
        content: (
          <div className="space-y-4 text-gray-700 text-base leading-relaxed">
            <p>
              Boolean logic isn’t just for computers and engineers — it’s all around us, even in the simplest systems we use every day.
            </p>
      
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md shadow-sm">
              <p className="font-semibold text-yellow-700 mb-2">💡 Example: Two-Switch Light Circuit</p>
              <p>
                Imagine a room with a light that can only be turned on when both of its switches are ON. This setup follows a logical rule that can be represented using Boolean Algebra.
              </p>
            </div>
      
            <div className="bg-gray-100 p-3 rounded-md">
              <p className="font-medium">Let’s define the following:</p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li><code>Switch 1 = A</code></li>
                <li><code>Switch 2 = B</code></li>
                <li><code>Light = L</code></li>
              </ul>
            </div>
      
            <div>
              <p className="font-medium">In Boolean terms:</p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li><code>·</code> (dot) represents the <strong>AND</strong> operation.</li>
                <li>If <code>A = 1</code> and <code>B = 1</code>, then <code>L = 1</code> (light is <strong>ON</strong>).</li>
                <li>If either <code>A</code> or <code>B</code> is <code>0</code>, then <code>L = 0</code> (light is <strong>OFF</strong>).</li>
              </ul>
            </div>
          </div>
        )
      }
      
      ,
      {
        title: "Boolean Variables and Expressions",
        content: (
          <div className="space-y-3">
            <p>
              <strong>Boolean variables</strong> are fundamental units in logic systems, typically represented by letters like <code>A</code>, <code>B</code>, <code>X</code>, or <code>Y</code>. These variables can take on only two possible values:
            </p>
            <ul className="list-disc list-inside">
              <li><strong>1</strong>: representing <strong>true</strong>, <strong>yes</strong>, or <strong>ON</strong></li>
              <li><strong>0</strong>: representing <strong>false</strong>, <strong>no</strong>, or <strong>OFF</strong></li>
            </ul>
            <p>
              Using Boolean variables, we can construct <strong>Boolean expressions</strong>—combinations of variables and logical operations such as <code>AND (·)</code>, <code>OR (+)</code>, and <code>NOT (‾)</code>. These expressions are the language used to describe how digital systems behave based on different input conditions.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md shadow-sm">
              <p className="font-semibold text-yellow-700 mb-2">💡 Real-World Example:</p>
              <p>
              Let’s say you can only enter a building if you have both an ID card and a key. We can represent this rule using Boolean variables and logic:
            </p>
            </div>
        
           
            <ul className="list-disc list-inside">
              <li><code>A = 1</code> → You have an <strong>ID card</strong></li>
              <li><code>B = 1</code> → You have a <strong>key</strong></li>
              <li><code>Entry = A · B</code></li>
            </ul>
            <p>
              The dot (<code>·</code>) symbolizes the <strong>AND</strong> operation, meaning both <code>A</code> and <code>B</code> must be 1 for <code>Entry</code> to be 1.
            </p>
          </div>
        )
      }
      ,
      {
        title: "Why Boolean Algebra Matters in Computers",
        content: (
          <div className="space-y-4 text-base leading-relaxed">
            <div>
              <h3 className="text-lg font-semibold">🧠 The Logic Behind the Machine</h3>
              <p>
                Digital computers work using electrical signals that represent two states:
              </p>
              <ul className="list-disc list-inside ml-4">
                <li><strong>ON (1)</strong> – electricity is flowing</li>
                <li><strong>OFF (0)</strong> – no electricity is flowing</li>
              </ul>
              <p>
                These two states form the binary language of computers. Boolean Algebra provides a systematic method to manipulate these binary values using operations like:
              </p>
              <ul className="list-disc list-inside ml-4">
                <li><code>AND (·)</code></li>
                <li><code>OR (+)</code></li>
                <li><code>NOT (‾)</code></li>
              </ul>
              <p>
                Each operation models a type of logic that can be physically built into electronic circuits. Logic gates — the building blocks of processors — are direct hardware implementations of Boolean logic.
              </p>
            </div>
      
            <div>
              <h3 className="text-lg font-semibold">🔌 Example in Hardware</h3>
              <p>
                Consider this:
              </p>
              <p>
                You flip a light switch. That action translates into an electrical signal.
              </p>
              <p>
                The signal might pass through an <strong>AND gate</strong>, which checks if two conditions are met (e.g., the light is on <em>only</em> when the switch is up <em>and</em> the door is closed).
              </p>
              <p>
                Based on the output, the light turns on (<strong>1</strong>) or stays off (<strong>0</strong>).
              </p>
              <p>
                Multiply that logic by billions, and you get how CPUs perform everything from calculations to decision-making.
              </p>
            </div>
          </div>
        )
      }
      ,
      {
        title: "Learning Boolean Through Examples",
        content: (
          <div className="p-6 rounded-lg ">
           

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md shadow-sm">
              <p className="font-semibold text-yellow-700 mb-2">✅ Happiness and Treats</p>
              <p>
              Imagine you’re asked, <i>“What makes you happy?”</i> You might say, <i>“Pizza or ice cream.”</i>
              <br />
              In Boolean logic, this situation can be described using the <strong>OR</strong> operation. It means you don’t need both to be happy — just one is enough.
            </p>
            </div>

            <p className="text-base text-gray-700 mb-4 mt-4">
                  Let <strong>P = 1</strong> if you eat pizza.
                  <br />
                  Let <strong>I = 1</strong> if you eat ice cream.
                  <br />
                  Then: <strong>Happiness = P OR I</strong>
                  <br />
                  If you have either treat, your happiness is "true" — you’re smiling. This mirrors how the <strong>OR</strong> gate in digital logic works: if at least one input is "on," the output is also "on."
                </p>
            

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md shadow-sm">
              <p className="font-semibold text-yellow-700 mb-2">🔌 Fan Functionality</p>
              <p>
              Now think about a fan. It doesn’t run just because it's plugged in — you also have to press the switch.
              <br />
              This is a classic case for the <strong>AND</strong> operation: both conditions must be met.
            </p>
            </div>


            <p className="text-base text-gray-700 mb-4 mt-4">
                    Let <strong>P = 1</strong> if power is on.
                    <br />
                    Let <strong>S = 1</strong> if the switch is pressed.
                    <br />
                    Then: <strong>Fan = P AND S</strong>
                    <br />
                    If even one of these is missing — the fan won’t turn on. That’s the nature of the <strong>AND</strong> logic: it needs <strong>everything</strong> to be true before it activates.
                  </p>
        
         
      
            <h2 className="text-xl font-semibold text-purple-600 mb-3 ">🧠 Why These Examples Matter</h2>
            <p className="text-base text-gray-700">
              These examples aren’t just cute analogies — they mirror exactly how computers, electronics, and digital circuits make decisions.
              <br />
              Boolean Algebra gives us the <strong>language</strong> to describe these decisions. From checking if a password is correct, to determining whether a machine should turn on, it's all built on combinations of <strong>AND</strong>, <strong>OR</strong>, and <strong>NOT</strong> operations.
              
            </p>
          </div>
        )
      }
      
  ];



//  export const topic2Sections = [
//   {
//     title: "🎯 Learning Objective:",
//     content: (
//       <div>
//         <h1 className="text-2xl"><strong>By the end of this section, students should be able to:</strong></h1>
//         <ul className="list-disc ml-5">
//           <li className='text-lg my-2'>Define common logical operators.</li>
//           <li className="text-lg my-2">Explain how each operator works using binary logic.</li>
//           <li className='text-lg my-2'>Differentiate operators based on their behavior.</li>
//           <li className='text-lg my-2'>Recognize logic gate symbols associated with each operator.</li>
//         </ul>
//       </div>
//     )
//   },
//   {
//     title: "Differeny Ways of solving using Boolean Albebra Laws",
//     content: (  
//       <p>
//         Content for Differeny Ways of solving using Boolean Albebra Laws
//       </p>
//     )
//   },
// ]


export const topic2Sections = [
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
      <motion.div className="p-4">
        <BooleanLaws.IdentityNullificationLaws />
      </motion.div>
    )
  },
  {
    title: "🔄 Idempotent & Complement Laws",
    content: (
      <motion.div className="p-4">
        <BooleanLaws.IdempotentComplementLaws />
      </motion.div>
    )
  },
  {
    title: "🔁 Distributive & DeMorgan's Laws",
    content: (
      <motion.div className="p-4">
        <BooleanLaws.DistributiveDeMorganLaws />
      </motion.div>
    )
  },
  {
    title: "🔗 Absorption & Double Negation Laws",
    content: (
      <motion.div className="p-4">
        <BooleanLaws.AbsorptionDoubleNegationLaws />
      </motion.div>
    )
  },
  {
    title: "🔄 Associative & Commutative Laws",
    content: (
      <motion.div className="p-4">
        <BooleanLaws.AssociativeCommutativeLaws />
      </motion.div>
    )
  }
];