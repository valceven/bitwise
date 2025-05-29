import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Trophy,
  Target,
  Clock,
  Award,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import EditBackground from "../../../components/EditBackgroud";
import { studentAssessmentApi } from "../../../api/studentAssessment/studentAssessmentApi";

// Component imports
import HistoricalAssessment from "../../../components/sections/lesson1/assessment1/BooleanAlgebraHistorical";
import LogicGateExplorer from "../../../components/sections/lesson1/assessment2/LogicGateExplorerAssessment";
import TruthTableConstructionAssessment from "../../../components/sections/lesson1/assessment3/TruthTableAssessment";
import BooleanLawsAssessment from "../../../components/sections/lesson2/assessment4/BooleanLawsAssessment";
import BooleanRace from "../../../components/sections/lesson2/assessment5/BooleanRace";
import CodeDetectiveGamez from "../../../components/sections/lesson3/assessment7/CodeDetectiveGame";
import LogicGateDetectiveAcademy from "../../../components/sections/lesson4/assesment8/LogicGateDetectiveAcademy";
import CircuitBuilderAcademyMain from "../../../components/sections/lesson4/assessment9/CircuitBuilderAcademyMain";

// Assessment titles and descriptions
const ASSESSMENT_CONFIG = {
  1: {
    component: HistoricalAssessment,
    title: "Boolean Algebra History",
    description:
      "Explore the fascinating history of Boolean Algebra and its impact on modern computing",
  },
  2: {
    component: LogicGateExplorer,
    title: "Logic Gate Explorer",
    description:
      "Learn to identify and understand different types of logic gates",
  },
  3: {
    component: TruthTableConstructionAssessment,
    title: "Truth Table Construction",
    description:
      "Master the art of building truth tables for Boolean expressions",
  },
  4: {
    component: BooleanLawsAssessment,
    title: "Boolean Laws Detective",
    description: "Identify and apply Boolean laws in various scenarios",
  },
  5: {
    component: BooleanRace,
    title: "Boolean Race: SOP vs POS",
    description:
      "Speed challenge converting between Sum of Products and Product of Sums",
  },
  7: {
    component: CodeDetectiveGamez,
    title: "Code Debug Detective",
    description: "Debug Boolean logic errors in real code scenarios",
  },
  8: {
    component: LogicGateDetectiveAcademy,
    title: "Logic Gate Detective Academy",
    description: "Solve digital circuit mysteries using logic gate knowledge",
  },
  9: {
    component: CircuitBuilderAcademyMain,
    title: "Circuit Builder Academy",
    description: "Build functional digital circuits from Boolean expressions",
  },
};

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="relative">
      <div className="animate-spin h-12 w-12 border-4 border-blue-200 rounded-full"></div>
      <div className="absolute top-0 animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
    </div>
  </div>
);

const AssessmentNotFound = ({ assessmentId, onReturn }) => (
  <div className="bg-white rounded-lg shadow p-8 text-center">
    <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
      <Target className="w-8 h-8 text-gray-400" />
    </div>
    <h2 className="text-xl font-semibold text-gray-800 mb-2">
      Assessment Not Found
    </h2>
    <p className="text-gray-600 mb-6">
      Assessment {assessmentId} could not be loaded. Please try again or select
      another.
    </p>
    <button
      onClick={onReturn}
      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Return to Lessons
    </button>
  </div>
);

const MaxAttemptsReached = ({ assessmentStats, onReturn, onReset }) => (
  <div className="bg-white rounded-lg shadow p-8 text-center">
    <div className="w-16 h-16 bg-red-100 rounded-full mx-auto flex items-center justify-center mb-4">
      <AlertTriangle className="w-8 h-8 text-red-500" />
    </div>
    <h2 className="text-xl font-semibold text-gray-800 mb-2">
      Maximum Attempts Reached
    </h2>
    <p className="text-gray-600 mb-4">
      You have used all 3 attempts for this assessment.
    </p>

    {assessmentStats.bestScore && (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center space-x-2">
          <Trophy className="w-5 h-5 text-green-600" />
          <span className="text-lg font-semibold text-green-800">
            Your Best Score: {assessmentStats.bestScore}%
          </span>
        </div>
      </div>
    )}

    <div className="space-x-4">
      <button
        onClick={onReturn}
        className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Return to Lessons
      </button>
    </div>
  </div>
);

const AssessmentView = () => {
  const { topicId, assessmentId, classCode } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [assessmentStats, setAssessmentStats] = useState({
    attempts: 0,
    bestScore: null,
    lastScore: null,
  });

  const location = useLocation();
  const passedAssessmentData = location.state?.assessmentData;
  const studentAssessmentId = passedAssessmentData?.studentAssessmentId;
  const attempts = passedAssessmentData?.attempts;

  const currentAssessmentId = useMemo(
    () => assessmentId || topicId,
    [assessmentId, topicId]
  );
  
  const config = ASSESSMENT_CONFIG[currentAssessmentId];
  const maxAttempts = 3;

  useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);
  
      return () => clearTimeout(timer);
    }, [currentAssessmentId]);

  // SIMPLIFIED - Single function handles everything
  const handleAssessmentComplete = async (assessmentData) => {
    try {
      console.log("Assessment completed:", assessmentData);
    

      // Submit to API if available (non-blocking)
      if (studentAssessmentId) {
        const apiData = {
          score: assessmentData.percentage,
          studentAssessmentId: studentAssessmentId,
        };

        try {
          const response = await studentAssessmentApi.finishAssessment(apiData);
          console.log('Assessment submitted successfully:', response);
        } catch (apiError) {
          console.error('API submission failed:', apiError);
          // Continue anyway - don't block the user
        }
      }

      // Navigate back to classroom
      navigate(`/app/classroom/student/${classCode}`, {
        replace: true,
      });

    } catch (error) {
      console.error('Error completing assessment:', error);
      alert('Failed to save assessment. Please try again.');
    }
  };

  const handleReturn = () =>
    navigate(`/app/classroom/student/${classCode}`, { replace: true });

  const handleResetAttempts = () => {
    assessmentDataHook.resetAttempts();
    setAssessmentStats({ attempts: 0, bestScore: null, lastScore: null });
  };

  const hasExceededAttempts = assessmentStats.attempts >= maxAttempts;
  const canTakeAssessment = !hasExceededAttempts;

  const renderAssessment = () => {
    if (!config) {
      return (
        <AssessmentNotFound
          assessmentId={currentAssessmentId}
          onReturn={handleReturn}
        />
      );
    }

    if (hasExceededAttempts) {
      return (
        <MaxAttemptsReached
          assessmentStats={assessmentStats}
          onReturn={handleReturn}
          onReset={handleResetAttempts}
        />
      );
    }

    const Component = config.component;
    return (
      <Component
        onComplete={handleAssessmentComplete}  // SIMPLIFIED - Single callback
        attemptsRemaining={maxAttempts - assessmentStats.attempts}
        currentAttempt={assessmentStats.attempts + 1}
        maxAttempts={maxAttempts}
        studentAssessmentId={studentAssessmentId}
      />
    );
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen relative">
      <EditBackground />

      <div className="relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="py-6">
            <button
              onClick={handleReturn}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Lessons
            </button>

            <AssessmentStats
              stats={assessmentStats}
              maxAttempts={maxAttempts}
              canRetry={canTakeAssessment}
            />
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {renderAssessment()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentView;