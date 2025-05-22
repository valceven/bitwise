import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HistoricalAssessment from '../../../components/sections/lesson1/assessment1/BooleanAlgebraHistorical';
import LogicGateExplorer from '../../../components/sections/lesson1/assessment2/LogicGateExplorerAssessment';
import TruthTableConstructionAssessment from '../../../components/sections/lesson1/assessment3/TruthTableAssessment';
import BooleanLawsAssessment from '../../../components/sections/lesson2/assessment4/BooleanLawsAssessment';
import BooleanRace from '../../../components/sections/lesson2/assessment5/BooleanRace';
import CodeDetectiveGamez from '../../../components/sections/lesson3/assessment7/CodeDetectiveGame';

export const AssessmentView = () => {
  const { topicId, assessmentId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [assessmentData, setAssessmentData] = useState(null);

  const { classCode } = useParams();
  
  // Use assessmentId if provided, otherwise default to topicId
  // This ensures backward compatibility while adding support for specific assessments
  const currentAssessmentId = assessmentId || topicId;
  
  useEffect(() => {
    // Simulate loading assessment data
    const fetchAssessmentData = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/assessments/${currentAssessmentId}`);
        // const data = await response.json();
        
        // Placeholder data for now
        const data = {
          topicId: topicId,
          assessmentId: currentAssessmentId,
          title: getAssessmentTitle(currentAssessmentId),
          description: getAssessmentDescription(currentAssessmentId),
          lastAttemptScore: localStorage.getItem(`assessment-last-score-${currentAssessmentId}`) 
            ? parseInt(localStorage.getItem(`assessment-last-score-${currentAssessmentId}`)) 
            : null,
          bestScore: localStorage.getItem(`assessment-best-score-${currentAssessmentId}`) 
            ? parseInt(localStorage.getItem(`assessment-best-score-${currentAssessmentId}`)) 
            : null,
          attempts: localStorage.getItem(`assessment-attempts-${currentAssessmentId}`) 
            ? parseInt(localStorage.getItem(`assessment-attempts-${currentAssessmentId}`)) 
            : 0,
          maxAttempts: 3
        };
        
        setAssessmentData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching assessment data:', error);
        setLoading(false);
      }
    };
    
    fetchAssessmentData();
  }, [currentAssessmentId, topicId]);
  
  // Helper functions to get assessment titles and descriptions based on assessmentId
  const getAssessmentTitle = (id) => {
    const titles = {
      '1': 'Boolean Algebra: Origins and Significance',
      '2': 'Truth Tables and Boolean Operations',
      '3': 'Boolean Logic Applications',
      '4': 'Circuit Design with Boolean Logic',
      // Add more assessments as needed
    };
    return titles[id] || 'Assessment';
  };
  
  const getAssessmentDescription = (id) => {
    const descriptions = {
      '1': 'Test your knowledge of Boolean Algebra history',
      '2': 'Demonstrate your understanding of Truth Tables and Boolean operations',
      '3': 'Apply Boolean Logic to solve real-world problems',
      '4': 'Design digital circuits using Boolean Algebra',
      // Add more assessments as needed
    };
    return descriptions[id] || 'Complete this assessment to test your knowledge';
  };
  
  // Handle assessment completion and score updates
  const handleScoreUpdate = (score, totalQuestions, percentage) => {
    // Update attempts count in localStorage
    const currentAttempts = assessmentData.attempts + 1;
    localStorage.setItem(`assessment-attempts-${currentAssessmentId}`, currentAttempts);
    
    // Save last score
    localStorage.setItem(`assessment-last-score-${currentAssessmentId}`, percentage);
    
    // Update best score in localStorage if this score is better
    const currentBestScore = localStorage.getItem(`assessment-best-score-${currentAssessmentId}`);
    if (!currentBestScore || parseInt(currentBestScore) < percentage) {
      localStorage.setItem(`assessment-best-score-${currentAssessmentId}`, percentage);
    }
    
    // Mark as completed in localStorage
    localStorage.setItem(`assessment-completed-${currentAssessmentId}`, 'true');
    
    // In a real implementation, you would send this data to your backend:
    console.log('Assessment completed:', {
      topicId,
      assessmentId: currentAssessmentId,
      score,
      totalQuestions,
      percentage,
      attempts: currentAttempts
    });
    
    // Refresh assessment data to show updated stats
    setAssessmentData({
      ...assessmentData,
      attempts: currentAttempts,
      bestScore: Math.max(percentage, currentBestScore || 0),
      lastAttemptScore: percentage
    });
  };
  
  const handleReturn = () => {
    navigate('/app/lessonview');
  };
  
  const renderAssessment = () => {
    console.log(`Rendering assessment ID: ${currentAssessmentId}`);
    
    switch(currentAssessmentId) {
      case '1':
        return <HistoricalAssessment onComplete={handleScoreUpdate} />;
      case '2':
        return <LogicGateExplorer onComplete={handleScoreUpdate} />;
      case '3':
        return <TruthTableConstructionAssessment onComplete={handleScoreUpdate} />;
      case '4':
        return  <BooleanLawsAssessment onComplete={handleScoreUpdate} />;
      case '5':
        return <BooleanRace onComplete={handleScoreUpdate} />
      case '7': 
        return <CodeDetectiveGamez onComplete={handleScoreUpdate} />;
      default:
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <p>Assessment {currentAssessmentId} not found. Please select a valid assessment.</p>
            <button 
              onClick={handleReturn}
              className="mt-4 px-4 py-2 bg-bluez text-white rounded-lg">
              Return to Lessons
            </button>
          </div>
        );
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bluez"></div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col w-full">
      {/* Assessment Header */}
      <div className="bg-white p-4 mb-4 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-grayz">{assessmentData.title}</h1>
            <p className="text-sm text-gray-500">{assessmentData.description}</p>
          </div>
          <button 
            onClick={handleReturn}
            className="px-4 py-2 bg-grayz text-white rounded-lg hover:bg-opacity-90 transition-all">
            Return to Lesson
          </button>
        </div>
        
        {/* Previous Attempts Info (if available) */}
        {assessmentData.attempts > 0 && (
          <div className="mt-4 p-3 bg-offwhite rounded-lg text-sm">
            <p>Previous attempts: {assessmentData.attempts}/{assessmentData.maxAttempts}</p>
            {assessmentData.bestScore && (
              <p>Best score: {assessmentData.bestScore}%</p>
            )}
            {assessmentData.lastAttemptScore && (
              <p>Last attempt: {assessmentData.lastAttemptScore}%</p>
            )}
          </div>
        )}
      </div>
      
      {/* Main Assessment Component */}
      {renderAssessment()}
    </div>
  );
};

export default AssessmentView;