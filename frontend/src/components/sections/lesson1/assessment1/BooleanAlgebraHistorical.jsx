import React, { useState, useEffect } from 'react';
import { Line } from 'rc-progress';

const HistoricalAssessment = () => {
  // Assessment states
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Timeline animation
  const [timelineVisible, setTimelineVisible] = useState(false);
  
  useEffect(() => {
    // Show timeline with slight delay for animation effect
    const timer = setTimeout(() => {
      setTimelineVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Assessment content structured as a journey
  const assessmentSteps = [
    {
      type: 'intro',
      title: 'The Origins of Boolean Algebra',
      content: 'In this assessment, you will explore the fascinating history of Boolean Algebra, from its philosophical beginnings to its revolutionary impact on modern computing.',
      image: '/api/placeholder/600/300',
      imageAlt: 'Boolean Algebra representation'
    },
    {
      type: 'timelineExploration',
      title: 'Key Moments in Boolean History',
      events: [
        { 
          year: 1854, 
          title: 'An Investigation of the Laws of Thought', 
          description: 'George Boole publishes his groundbreaking work establishing Boolean logic.',
          image: '/api/placeholder/150/150'
        },
        { 
          year: 1938, 
          title: 'Shannon\'s Thesis', 
          description: 'Claude Shannon applies Boolean Algebra to electrical circuits in his Master\'s thesis.',
          image: '/api/placeholder/150/150'
        },
        { 
          year: 1945, 
          title: 'First Electronic Computers', 
          description: 'Boolean logic used in the design of early electronic computers.',
          image: '/api/placeholder/150/150'
        },
        { 
          year: 1970, 
          title: 'Integrated Circuits', 
          description: 'Boolean logic becomes fundamental to building complex integrated circuits.',
          image: '/api/placeholder/150/150'
        },
        { 
          year: 'Today', 
          title: 'Everywhere Computing', 
          description: 'Boolean Algebra powers all modern digital devices and search algorithms.',
          image: '/api/placeholder/150/150'
        }
      ],
      question: 'Which development made Boolean Algebra practical for electrical engineering?',
      options: [
        'George Boole\'s original publication',
        'Claude Shannon\'s application to electrical circuits',
        'The invention of the transistor',
        'The development of search algorithms'
      ],
      correctAnswer: 1
    },
    {
      type: 'contextMatching',
      title: 'Boolean Algebra in Context',
      description: 'Connect these historical developments with how they relate to Boolean Algebra.',
      pairs: [
        { 
          context: 'Mathematical Logic', 
          booleanRelation: 'Boolean Algebra provided a way to express logical statements mathematically',
          id: 'logic'
        },
        { 
          context: 'Electronic Switching', 
          booleanRelation: 'ON/OFF states in circuits directly map to Boolean 1/0 values',
          id: 'switching'
        },
        { 
          context: 'Computer Programming', 
          booleanRelation: 'IF-THEN statements in code rely on Boolean true/false conditions',
          id: 'programming' 
        },
        { 
          context: 'Search Engines', 
          booleanRelation: 'Search queries use Boolean operators like AND, OR, and NOT',
          id: 'search'
        }
      ],
      question: 'Which historical context was the FIRST to make use of Boolean Algebra?',
      options: ['Mathematical Logic', 'Electronic Switching', 'Computer Programming', 'Search Engines'],
      correctAnswer: 0
    },
    {
      type: 'applicationSpotting',
      title: 'Boolean Algebra in Everyday Life',
      description: 'Boolean logic is all around us! Can you identify where it appears in these everyday scenarios?',
      scenarios: [
        {
          scenario: 'Using a search engine to find "laptops AND affordable NOT gaming"',
          hasBoolean: true,
          explanation: 'This uses Boolean operators to filter search results'
        },
        {
          scenario: 'A light controlled by two switches that both need to be ON',
          hasBoolean: true,
          explanation: 'This is an AND operation: Light = Switch1 AND Switch2'
        },
        {
          scenario: 'Setting your phone alarm to wake you up at 7:00 AM',
          hasBoolean: false,
          explanation: 'This is a simple time trigger, not a Boolean operation'
        },
        {
          scenario: 'A security system that activates if the door OR window is opened',
          hasBoolean: true,
          explanation: 'This uses the OR operation: Alarm = Door OR Window'
        }
      ],
      question: 'Which scenario does NOT directly use Boolean logic?',
      options: [
        'Search engine filtering',
        'Light controlled by two switches',
        'Setting an alarm clock',
        'Security system activation'
      ],
      correctAnswer: 2
    },
    {
      type: 'pioneersFocus',
      title: 'Pioneers of Boolean Logic',
      description: 'George Boole transformed logic from philosophy to mathematics, but many others expanded on his work.',
      pioneers: [
        {
          name: 'George Boole',
          contribution: 'Created Boolean Algebra as a system of logical thought',
          years: '1815-1864',
          image: '/api/placeholder/150/150'
        },
        {
          name: 'Claude Shannon',
          contribution: 'Applied Boolean Algebra to electrical circuit design',
          years: '1916-2001',
          image: '/api/placeholder/150/150'
        },
        {
          name: 'John Venn',
          contribution: 'Created Venn diagrams to visualize Boolean operations',
          years: '1834-1923',
          image: '/api/placeholder/150/150'
        }
      ],
      question: 'What was George Boole\'s most significant contribution?',
      options: [
        'Inventing the electronic computer',
        'Creating a mathematical system for logical reasoning',
        'Designing the first electronic circuits',
        'Developing search algorithms'
      ],
      correctAnswer: 1
    },
    {
      type: 'reflection',
      title: 'The Impact of Boolean Algebra',
      description: 'Boolean Algebra\'s journey from abstract mathematics to the foundation of computing represents one of the most impactful mathematical innovations in history.',
      reflectionPoints: [
        'Boolean values (1/0, true/false) are the most fundamental unit of all digital systems',
        'Every decision in programming relies on Boolean conditions',
        'Boolean searching powers how we find information online',
        'Complex computers ultimately operate using millions of simple Boolean operations'
      ],
      question: 'Why is Boolean Algebra considered fundamental to modern computing?',
      options: [
        'It allows computers to perform calculations with very large numbers',
        'It forms the basis of all programming languages',
        'It enables computers to operate using binary (ON/OFF) states',
        'It was the first mathematical system ever developed'
      ],
      correctAnswer: 2
    },
    {
      type: 'completion',
      title: 'Assessment Complete!',
      content: 'You\'ve completed your journey through the history and significance of Boolean Algebra.',
    }
  ];

  // Calculate progress percentage
  const progress = ((currentStep + 1) / assessmentSteps.length) * 100;
  
  // Handle answer selection
  const handleAnswerSelect = (questionIndex, answerIndex) => {
    const newAnswers = { ...answers, [questionIndex]: answerIndex };
    setAnswers(newAnswers);
    
    // Check if current answer is correct and show feedback
    const currentQuestion = assessmentSteps[currentStep];
    if (currentQuestion.correctAnswer === answerIndex) {
      setFeedback('Correct! Well done.');
      setScore(score + 1);
    } else {
      setFeedback(`Not quite. The correct answer is: ${currentQuestion.options[currentQuestion.correctAnswer]}`);
    }
    setShowFeedback(true);
  };

  // Handle navigation between steps
  const handleNext = () => {
    if (currentStep < assessmentSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setShowFeedback(false);
    } else {
      finishAssessment();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowFeedback(false);
    }
  };

  // Complete the assessment and send score to API
  const finishAssessment = () => {
    setIsCompleted(true);
    
    // Placeholder for API call to update scores
    console.log('Assessment completed with score:', score);
    // TODO: Replace with actual API call
    // const response = await fetch('/api/updateScore', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     topicId: 1,
    //     score: score,
    //     totalQuestions: assessmentSteps.length - 2 // Exclude intro and completion steps
    //   })
    // });
  };

  // Render different content based on step type
  const renderStepContent = () => {
    const step = assessmentSteps[currentStep];
    
    switch(step.type) {
      case 'intro':
        return (
          <div className="flex flex-col items-center space-y-6 text-center">
            <h2 className="text-2xl font-bold text-grayz">{step.title}</h2>
            <img src={step.image} alt={step.imageAlt} className="rounded-lg shadow-md w-full max-w-2xl" />
            <p className="text-lg text-grayz">{step.content}</p>
            <button 
              onClick={handleNext}
              className="mt-6 px-6 py-2 bg-bluez text-white rounded-lg hover:bg-opacity-90 transition-all">
              Begin Journey
            </button>
          </div>
        );

      case 'timelineExploration':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-grayz">{step.title}</h2>
            
            {/* Interactive Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute h-1 bg-lightpurple top-8 left-0 right-0 z-0"></div>
              
              {/* Timeline events */}
              <div className={`flex justify-between relative z-10 transition-opacity duration-1000 ${timelineVisible ? 'opacity-100' : 'opacity-0'}`}>
                {step.events.map((event, index) => (
                  <div key={index} className="flex flex-col items-center transition-all transform hover:scale-105 cursor-pointer w-24">
                    <div className="w-4 h-4 rounded-full bg-darkpurple mb-1"></div>
                    <p className="font-bold text-sm">{event.year}</p>
                    <img src={event.image} alt={event.title} className="w-16 h-16 rounded-full my-2 object-cover border-2 border-bluez" />
                    <p className="text-xs font-semibold text-center">{event.title}</p>
                    <div className="absolute top-20 opacity-0 hover:opacity-100 bg-white p-2 rounded-lg shadow-lg text-xs w-48 text-center transition-opacity">
                      {event.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Question */}
            <div className="mt-12 p-6 bg-offwhite rounded-lg shadow">
              <h3 className="font-bold mb-4">{step.question}</h3>
              <div className="space-y-3">
                {step.options.map((option, idx) => (
                  <div 
                    key={idx}
                    onClick={() => handleAnswerSelect(currentStep, idx)}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      answers[currentStep] === idx 
                        ? 'bg-bluez text-white border-bluez' 
                        : 'bg-white hover:bg-lightpurple border-gray-200'
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
            
            {renderNavigation()}
          </div>
        );

      case 'contextMatching':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-grayz">{step.title}</h2>
            <p className="text-grayz">{step.description}</p>
            
            {/* Context cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {step.pairs.map((pair, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-all">
                  <h3 className="font-bold text-bluez">{pair.context}</h3>
                  <p className="text-sm mt-2">{pair.booleanRelation}</p>
                </div>
              ))}
            </div>
            
            {/* Question */}
            <div className="mt-8 p-6 bg-offwhite rounded-lg shadow">
              <h3 className="font-bold mb-4">{step.question}</h3>
              <div className="space-y-3">
                {step.options.map((option, idx) => (
                  <div 
                    key={idx}
                    onClick={() => handleAnswerSelect(currentStep, idx)}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      answers[currentStep] === idx 
                        ? 'bg-bluez text-white border-bluez' 
                        : 'bg-white hover:bg-lightpurple border-gray-200'
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
            
            {renderNavigation()}
          </div>
        );

      case 'applicationSpotting':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-grayz">{step.title}</h2>
            <p className="text-grayz">{step.description}</p>
            
            {/* Application scenarios */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {step.scenarios.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-lg shadow cursor-pointer transition-all hover:shadow-md ${
                    item.hasBoolean ? 'border-l-4 border-bluez' : 'border-l-4 border-grayz'
                  }`}
                >
                  <p className="font-medium">{item.scenario}</p>
                  <div className="mt-2 text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.explanation}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Question */}
            <div className="mt-8 p-6 bg-offwhite rounded-lg shadow">
              <h3 className="font-bold mb-4">{step.question}</h3>
              <div className="space-y-3">
                {step.options.map((option, idx) => (
                  <div 
                    key={idx}
                    onClick={() => handleAnswerSelect(currentStep, idx)}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      answers[currentStep] === idx 
                        ? 'bg-bluez text-white border-bluez' 
                        : 'bg-white hover:bg-lightpurple border-gray-200'
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
            
            {renderNavigation()}
          </div>
        );

      case 'pioneersFocus':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-grayz">{step.title}</h2>
            <p className="text-grayz">{step.description}</p>
            
            {/* Pioneers gallery */}
            <div className="flex flex-wrap justify-center gap-6">
              {step.pioneers.map((pioneer, idx) => (
                <div key={idx} className="w-64 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
                  <img src={pioneer.image} alt={pioneer.name} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-bluez">{pioneer.name}</h3>
                    <p className="text-xs text-gray-500">{pioneer.years}</p>
                    <p className="mt-2 text-sm">{pioneer.contribution}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Question */}
            <div className="mt-8 p-6 bg-offwhite rounded-lg shadow">
              <h3 className="font-bold mb-4">{step.question}</h3>
              <div className="space-y-3">
                {step.options.map((option, idx) => (
                  <div 
                    key={idx}
                    onClick={() => handleAnswerSelect(currentStep, idx)}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      answers[currentStep] === idx 
                        ? 'bg-bluez text-white border-bluez' 
                        : 'bg-white hover:bg-lightpurple border-gray-200'
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
            
            {renderNavigation()}
          </div>
        );

      case 'reflection':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-grayz">{step.title}</h2>
            <p className="text-grayz">{step.description}</p>
            
            {/* Reflection points */}
            <div className="bg-offwhite p-6 rounded-lg">
              <h3 className="font-semibold mb-4">Key Takeaways:</h3>
              <ul className="space-y-2">
                {step.reflectionPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-greenz flex items-center justify-center mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="ml-2">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Question */}
            <div className="mt-8 p-6 bg-offwhite rounded-lg shadow">
              <h3 className="font-bold mb-4">{step.question}</h3>
              <div className="space-y-3">
                {step.options.map((option, idx) => (
                  <div 
                    key={idx}
                    onClick={() => handleAnswerSelect(currentStep, idx)}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      answers[currentStep] === idx 
                        ? 'bg-bluez text-white border-bluez' 
                        : 'bg-white hover:bg-lightpurple border-gray-200'
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
            
            {renderNavigation()}
          </div>
        );

      case 'completion': {
        const totalQuestions = assessmentSteps.length - 2; // Exclude intro and completion
        const finalScore = (score / totalQuestions) * 100;
        
        return (
          <div className="flex flex-col items-center space-y-8 text-center">
            <h2 className="text-2xl font-bold text-grayz">{step.title}</h2>
            
            <div className="w-32 h-32 rounded-full bg-lightpurple flex items-center justify-center">
              <span className="text-3xl font-bold text-darkpurple">{Math.round(finalScore)}%</span>
            </div>
            
            <div className="max-w-md">
              <p className="text-lg mb-4">{step.content}</p>
              <p className="font-semibold">You answered {score} out of {totalQuestions} questions correctly.</p>
              
              {finalScore >= 80 ? (
                <p className="mt-4 text-greenz font-medium">Excellent work! You have a strong understanding of Boolean Algebra's history and significance.</p>
              ) : finalScore >= 60 ? (
                <p className="mt-4 text-bluez font-medium">Good job! You understand many key aspects of Boolean Algebra's history.</p>
              ) : (
                <p className="mt-4 text-orangez font-medium">You might benefit from reviewing the material again to strengthen your understanding.</p>
              )}
            </div>
            
            <div className="flex space-x-4">
              <button 
                onClick={() => setCurrentStep(0)}
                className="px-6 py-2 bg-bluez text-white rounded-lg hover:bg-opacity-90 transition-all">
                Restart Assessment
              </button>
              <button 
                className="px-6 py-2 bg-greenz text-white rounded-lg hover:bg-opacity-90 transition-all">
                Continue to Next Topic
              </button>
            </div>
          </div>
        );
      }
        
      default:
        return <div>Loading...</div>;
    }
  };

  // Render navigation buttons
  const renderNavigation = () => {
    // Don't show navigation for intro and completion
    if (assessmentSteps[currentStep].type === 'intro' || assessmentSteps[currentStep].type === 'completion') {
      return null;
    }
    
    return (
      <div className="mt-8">
        {/* Feedback message */}
        {showFeedback && (
          <div className={`p-4 mb-4 rounded-lg ${feedback.startsWith('Correct') ? 'bg-greenz bg-opacity-10 text-greenz' : 'bg-orangez bg-opacity-10 text-orangez'}`}>
            {feedback}
          </div>
        )}
        
        <div className="flex justify-between">
          <button 
            onClick={handlePrevious}
            disabled={currentStep <= 0}
            className={`px-6 py-2 rounded-lg transition-all ${currentStep <= 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-grayz text-white hover:bg-opacity-90'}`}>
            Previous
          </button>
          
          <button 
            onClick={handleNext}
            disabled={answers[currentStep] === undefined && assessmentSteps[currentStep].options}
            className={`px-6 py-2 rounded-lg transition-all ${
              answers[currentStep] === undefined && assessmentSteps[currentStep].options 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-bluez text-white hover:bg-opacity-90'
            }`}>
            {currentStep >= assessmentSteps.length - 2 ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full md:w-3/4 mx-auto pb-16 px-4">
      {/* Progress bar */}
      <div className="p-4 mb-4">
        <Line percent={progress} strokeWidth={1} strokeColor="#27ae60" />
      </div>
      
      {/* Main content */}
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        {renderStepContent()}
      </div>
    </div>
  );
};

export default HistoricalAssessment;