import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

export const lesson2Topic2Sections = [
    {   
        title: (<h1 className="ml-2 text-2xl"> 🔄Boolean Algebra Is Not Always One-Way </h1>),
        content: (
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="p-4"
            >
            <p className="mb-3 text-gray-800">
                In Boolean Algebra, there isn’t always just one way to solve or express something — <strong>and that’s okay</strong>.  
                What truly matters is that the logical meaning stays consistent. 
                You might choose different laws or a different order of steps and still arrive at a valid equivalent expression.
            </p>
            <p className="mb-4 text-gray-800">
                In fact, sometimes a longer or “unsimplified” form can be more useful, especially when it better matches a specific circuit or design.
            </p>
            <motion.div 
            className="flex items-start gap-2 bg-yellow-100 border-l-4 border-yellow-400 p-3 rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "easeOut", delay: 4 }}
            >
                <span className="text-yellow-500 text-xl">💡</span>
                <motion.p 
                className="text-gray-800 text-base"
                transition={{ type: "spring", delay: 4}}>
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

            <motion.p className="text-gray-700">
                When working with Boolean expressions, especially in designing digital logic circuits, there are two common ways to represent them:
            </motion.p>

            {/* SOP Section */}
            <motion.div
                className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
            >
                <h3 className="text-lg font-bold text-blue-700">🔹 Sum of Products (SOP)</h3>
                <p className="text-gray-800 mt-2">
                In SOP, the Boolean expression is a <strong>sum (OR)</strong> of product terms (ANDed literals).
                </p>

                <details className="mt-2">
                <summary className="cursor-pointer font-medium text-blue-600">📘 How it works</summary>
                <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
                    <li>Each product term (like <code>A·B'</code>) represents a condition where the output is <strong>true (1)</strong>.</li>
                    <li>The output is <strong>true</strong> if **any** of the product terms is satisfied.</li>
                </ul>
                </details>

                <div className="mt-3 bg-white rounded p-3 border border-blue-200 shadow-sm">
                <strong>✅ Example:</strong> <code>F(A, B) = A'·B + A·B' + A·B</code>
                <p className="text-sm mt-1 text-gray-600">
                    F is true when:
                    <br />
                    – A is 0 and B is 1, <br />
                    – or A is 1 and B is 0, <br />
                    – or A is 1 and B is 1.
                </p>
                </div>
            </motion.div>

            {/* POS Section */}
            <motion.div
                className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
            >
                <h3 className="text-lg font-bold text-orange-700">🔸 Product of Sums (POS)</h3>
                <p className="text-gray-800 mt-2">
                In POS, the Boolean expression is a <strong>product (AND)</strong> of sum terms (ORed literals).
                </p>

                <details className="mt-2">
                <summary className="cursor-pointer font-medium text-orange-600">📘 How it works</summary>
                <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
                    <li>Each sum term (like <code>A + B'</code>) represents a condition where the output is <strong>false (0)</strong>.</li>
                    <li>The output is <strong>false</strong> unless **all** sum conditions are satisfied.</li>
                </ul>
                </details>

                <div className="mt-3 bg-white rounded p-3 border border-orange-200 shadow-sm">
                <strong>✅ Example:</strong> <code>F(A, B) = (A + B) · (A + B')</code>
                <p className="text-sm mt-1 text-gray-600">
                    F is false only when both sum conditions are true —
                    corresponding to specific input combinations.
                </p>
                </div>
            </motion.div>

            {/* Summary Tip */}
            <motion.div
                className="bg-yellow-100 border-l-4 border-yellow-400 p-3 mt-6 rounded flex gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 5 }}
            >
                <span className="text-yellow-600 text-xl">💡</span>
                <p className="text-gray-800">
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
              <motion.ul className="list-disc space-y-4 p-4 text-gray-800">
                <motion.li
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", delay: 1 }}
                >
                  🔧 <strong>SOP</strong> and <strong>POS</strong> are standard forms that bring structure to Boolean expressions —
                  helping both students and engineers understand logic clearly.
                </motion.li>
          
                <motion.li
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", delay: 3 }}
                >
                  💡 These forms directly map to physical circuits, making it easier to design logic using combinations of
                  <strong> AND</strong>, <strong> OR</strong>, and <strong> NOT</strong> gates.
                </motion.li>
          
                <motion.li
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", delay: 5 }}
                >
                  ⚡ In real-world applications, engineers rely on SOP and POS when using CAD tools or circuit simulators —
                  because standardized expressions lead to <strong>cleaner, more efficient digital systems</strong>.
                </motion.li>
              </motion.ul>
            </div>
        )
    },
]