import React from 'react';
import BooleanAlgebraLesson from './IntroductionPart1';
import BooleanAlgebraLessonPart2 from './IntroductionPart2';
import BooleanAlgebraLessonPart1 from './IntroductionPart1';
import BooleanLogicInEverydayLife from './BooleanLogicInEverydayLife';
import BooleanLessonExpressions from './BooleanExpressions';

 export const topic1Sections = [
    {
      title: "",
      content: (
        <BooleanAlgebraLessonPart1/>
      )
    },
    
    {
      title: "",
      content: (
        <BooleanAlgebraLessonPart2/>
      )
    },
    {
        title: "",
        content: (
          <BooleanLogicInEverydayLife/>
        )
      }
      
      ,
      {
        title: "",
        content: (
          <BooleanLessonExpressions/>
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
