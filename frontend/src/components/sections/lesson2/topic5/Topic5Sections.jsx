import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

export const topic5Sections = [
  {   
    title: (<h1 className="ml-2 text-2xl"> 🔄 Boolean Algebra Is Not Always One-Way </h1>),
    content: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="p-4"
      >
        <p className="mb-3 text-grayz">
          In Boolean Algebra, there isn't always just one way to solve or express something — <strong>and that's okay</strong>.  
          What truly matters is that the logical meaning stays consistent. 
          You might choose different laws or a different order of steps and still arrive at a valid equivalent expression.
        </p>
        <p className="mb-4 text-grayz">
          In fact, sometimes a longer or "unsimplified" form can be more useful, especially when it better matches a specific circuit or design.
        </p>
        <motion.div 
          className="flex items-start gap-2 bg-yellowz bg-opacity-20 border-l-4 border-yellowz p-3 rounded"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "easeOut", delay: 1 }}
        >
          <span className="text-yellowz text-xl">💡</span>
          <motion.p 
            className="text-grayz text-base"
            transition={{ type: "spring", delay: 1.2 }}>
            <Typewriter
              words={["Boolean Algebra is about flexibility, not just simplification.", "So don't worry if you don't get the simplest version as long as they still produce the same logic!"]}
              cursor
              loop={2}
              cursorStyle="|"
              typeSpeed={20}
              deleteSpeed={10}
              delaySpeed={5000}
            />
          </motion.p>
        </motion.div>
      </motion.div>
    )
  },
  {
    title: (<h1 className="ml-2 text-2xl">🧾 What Are SOP and POS in Boolean Algebra?</h1>),
    content: (
      <motion.div className="p-4 space-y-4">
        <motion.p className="text-grayz">
          When working with Boolean expressions, especially in designing digital logic circuits, there are two common ways to represent them:
        </motion.p>

        {/* SOP Section */}
        <motion.div
          className="bg-bluez bg-opacity-10 p-4 rounded-lg border-l-4 border-bluez"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-bold text-bluez">🔹 Sum of Products (SOP)</h3>
          <p className="text-grayz mt-2">
            In SOP, the Boolean expression is a <strong>sum (OR)</strong> of product terms (ANDed literals).
          </p>

          <details className="mt-2">
            <summary className="cursor-pointer font-medium text-bluez">📘 How it works</summary>
            <ul className="list-disc ml-6 mt-2 text-grayz space-y-1">
              <li>Each product term (like <code>A·B'</code>) represents a condition where the output is <strong>true (1)</strong>.</li>
              <li>The output is <strong>true</strong> if <strong>any</strong> of the product terms is satisfied.</li>
            </ul>
          </details>

          <div className="mt-3 bg-white rounded p-3 border border-bluez border-opacity-20 shadow-sm">
            <strong className="text-bluez">✅ Example:</strong> <code>F(A, B) = A'·B + A·B' + A·B</code>
            <p className="text-sm mt-1 text-grayz">
              F is true when:
              <br />
              – A is 0 and B is 1, <br />
              – or A is 1 and B is 0, <br />
              – or A is 1 and B is 1.
            </p>
          </div>

          <BooleanExpressionVisualizer expression="A'·B + A·B' + A·B" type="SOP" />
        </motion.div>

        {/* POS Section */}
        <motion.div
          className="bg-orangez bg-opacity-10 p-4 rounded-lg border-l-4 border-orangez"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-lg font-bold text-orangez">🔸 Product of Sums (POS)</h3>
          <p className="text-grayz mt-2">
            In POS, the Boolean expression is a <strong>product (AND)</strong> of sum terms (ORed literals).
          </p>

          <details className="mt-2">
            <summary className="cursor-pointer font-medium text-orangez">📘 How it works</summary>
            <ul className="list-disc ml-6 mt-2 text-grayz space-y-1">
              <li>Each sum term (like <code>A + B'</code>) represents a condition where the output is <strong>false (0)</strong>.</li>
              <li>The output is <strong>false</strong> unless <strong>all</strong> sum conditions are satisfied.</li>
            </ul>
          </details>

          <div className="mt-3 bg-white rounded p-3 border border-orangez border-opacity-20 shadow-sm">
            <strong className="text-orangez">✅ Example:</strong> <code>F(A, B) = (A + B) · (A + B')</code>
            <p className="text-sm mt-1 text-grayz">
              F is false only when both sum conditions are true —
              corresponding to specific input combinations.
            </p>
          </div>

          <BooleanExpressionVisualizer expression="(A + B) · (A + B')" type="POS" />
        </motion.div>

        {/* Summary Tip */}
        <motion.div
          className="bg-yellowz bg-opacity-20 border-l-4 border-yellowz p-3 mt-6 rounded flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="text-yellowz text-xl">💡</span>
          <p className="text-grayz">
            <strong>Tip:</strong> Whether you use SOP or POS, both are valid and useful. The choice depends on what makes your circuit simpler or easier to understand!
          </p>
        </motion.div>
      </motion.div>
    )
  },
  {
    title: (<h1 className="ml-2 text-2xl">🧠 Why SOP and POS Are Useful</h1>),
    content: (
      <div className="p-4">
        <motion.ul className="list-disc space-y-4 p-4 text-grayz">
          <motion.li
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", delay: 0.5 }}
          >
            🔧 <strong>SOP</strong> and <strong>POS</strong> are standard forms that bring structure to Boolean expressions —
            helping both students and engineers understand logic clearly.
          </motion.li>
    
          <motion.li
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", delay: 0.8 }}
          >
            💡 These forms directly map to physical circuits, making it easier to design logic using combinations of
            <strong className="text-bluez"> AND</strong>, <strong className="text-orangez"> OR</strong>, 
            and <strong className="text-redz"> NOT</strong> gates.
          </motion.li>
    
          <motion.li
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", delay: 1.1 }}
          >
            ⚡ In real-world applications, engineers rely on SOP and POS when using CAD tools or circuit simulators —
            because standardized expressions lead to <strong>cleaner, more efficient digital systems</strong>.
          </motion.li>
        </motion.ul>
      </div>
    )
  },
  {
    title: (<h1 className="ml-2 text-2xl">🧪 Interactive Truth Tables and Boolean Forms</h1>),
    content: (
      <div className="p-4">
        <motion.p 
          className="text-grayz mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Let's explore how truth tables can help us derive both SOP and POS forms. Try generating your own tables with different expressions!
        </motion.p>
        
        <TruthTable />
        
        <motion.div
          className="mt-6 p-4 bg-cyanz bg-opacity-20 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-xl font-semibold mb-3 text-cyanz">🧪 Using Truth Tables to Derive Forms</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-lg">
            <div>
              <h4 className="font-semibold text-bluez mb-2">For SOP Form:</h4>
              <ol className="list-decimal ml-5 text-grayz space-y-1">
                <li>Identify all rows where output is 1</li>
                <li>For each row, create a product term</li>
                <li>OR all these terms together</li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold text-orangez mb-2">For POS Form:</h4>
              <ol className="list-decimal ml-5 text-grayz space-y-1">
                <li>Identify all rows where output is 0</li>
                <li>For each row, create a sum term</li>
                <li>AND all these terms together</li>
              </ol>
            </div>
          </div>
        </motion.div>
      </div>
    )
  },
  {
    title: (<h1 className="ml-2 text-2xl">🧩 Simplifying Boolean Expressions</h1>),
    content: (
      <div className="p-4">
        <motion.p 
          className="text-grayz mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Boolean simplification is a critical skill that helps create efficient logic circuits. Try our interactive simplifier tool to see the steps!
        </motion.p>
        
        <ExpressionSimplifier />
        
        <motion.div
          className="mt-6 p-4 bg-greenz bg-opacity-10 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-xl font-semibold mb-3 text-greenz">🧠 Simplification Strategies</h3>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-grayz mb-2">Core Boolean Laws to Remember:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
              <div className="flex items-center">
                <span className="text-bluez mr-2">•</span>
                <p><strong>Identity:</strong> <code className="text-darkpurple">A·1 = A, A+0 = A</code></p>
              </div>
              <div className="flex items-center">
                <span className="text-bluez mr-2">•</span>
                <p><strong>Null:</strong> <code className="text-darkpurple">A·0 = 0, A+1 = 1</code></p>
              </div>
              <div className="flex items-center">
                <span className="text-bluez mr-2">•</span>
                <p><strong>Idempotent:</strong> <code className="text-darkpurple">A·A = A, A+A = A</code></p>
              </div>
              <div className="flex items-center">
                <span className="text-bluez mr-2">•</span>
                <p><strong>Complement:</strong> <code className="text-darkpurple">A·A' = 0, A+A' = 1</code></p>
              </div>
              <div className="flex items-center">
                <span className="text-bluez mr-2">•</span>
                <p><strong>Absorption:</strong> <code className="text-darkpurple">A·(A+B) = A, A+(A·B) = A</code></p>
              </div>
              <div className="flex items-center">
                <span className="text-bluez mr-2">•</span>
                <p><strong>Distributive:</strong> <code className="text-darkpurple">A·(B+C) = A·B + A·C</code></p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }
];