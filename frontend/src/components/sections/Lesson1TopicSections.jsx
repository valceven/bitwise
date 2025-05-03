import React from 'react'


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

 export const topic2Sections = [{
    title: "Topic 2",
    content: (
        <p>
            Content for Topic 2
        </p>
    )
}]


