import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

const useAssessmentData = (assessmentId) => {
  const key = (k) => `assessment-${k}-${assessmentId}`;
  const parse = (val) => (val ? parseInt(val) : null);

  const getLastScore = () => parse(localStorage.getItem(key("last-score")));
  const getBestScore = () => parse(localStorage.getItem(key("best-score")));
  const getAttempts = () => parse(localStorage.getItem(key("attempts"))) || 0;
  const isCompleted = () => localStorage.getItem(key("completed")) === "true";

  const updateScore = (score, percentage) => {
    const attempts = getAttempts() + 1;
    const best = getBestScore();

    localStorage.setItem(key("attempts"), attempts);
    localStorage.setItem(key("last-score"), percentage);
    localStorage.setItem(key("completed"), "true");

    if (!best || percentage > best) {
      localStorage.setItem(key("best-score"), percentage);
    }

    return {
      attempts,
      bestScore: Math.max(percentage, best || 0),
      lastScore: percentage,
    };
  };

  const resetAttempts = () => {
    localStorage.removeItem(key("attempts"));
    localStorage.removeItem(key("last-score"));
    localStorage.removeItem(key("best-score"));
    localStorage.removeItem(key("completed"));
  };

  return {
    getLastScore,
    getBestScore,
    getAttempts,
    updateScore,
    resetAttempts,
    isCompleted,
  };
};

// UI Subcomponents
const ScoreDisplay = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-center space-x-2">
    <Icon className={`w-4 h-4 ${color}`} />
    <span className="text-sm text-gray-700">{label}:</span>
    <span className={`text-sm font-semibold ${color}`}>{value}</span>
  </div>
);

const AssessmentStats = ({ stats, maxAttempts = 3, canRetry = true }) => {
  const attemptsRemaining = maxAttempts - stats.attempts;
  const isMaxedOut = stats.attempts >= maxAttempts;

  return stats.attempts > 0 ? (
    <div
      className={`border rounded-lg p-4 ${
        isMaxedOut ? "bg-red-50 border-red-200" : "bg-blue-50 border-blue-100"
      }`}
    >
      <h3 className="text-sm font-semibold text-gray-800 mb-3">
        Your Progress
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <ScoreDisplay
          icon={Clock}
          label="Attempts"
          value={`${stats.attempts}/${maxAttempts}`}
          color={isMaxedOut ? "text-red-600" : "text-blue-600"}
        />
        {stats.bestScore !== null && (
          <ScoreDisplay
            icon={Trophy}
            label="Best Score"
            value={`${stats.bestScore}%`}
            color="text-green-600"
          />
        )}
        {stats.lastScore !== null && (
          <ScoreDisplay
            icon={Target}
            label="Last Score"
            value={`${stats.lastScore}%`}
            color="text-orange-600"
          />
        )}
      </div>

      {isMaxedOut && (
        <div className="mt-3 p-3 bg-red-100 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
            <span className="text-sm font-medium text-red-800">
              Maximum attempts reached. Contact your instructor to reset your
              attempts.
            </span>
          </div>
        </div>
      )}

      {canRetry && !isMaxedOut && attemptsRemaining > 0 && (
        <div className="mt-3 p-3 bg-blue-100 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-800">
              You have {attemptsRemaining} attempt
              {attemptsRemaining !== 1 ? "s" : ""} remaining.
            </span>
          </div>
        </div>
      )}
    </div>
  ) : null;
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

      {/* Optional: Add a reset button for development/testing */}
      {process.env.NODE_ENV === "development" && (
        <button
          onClick={onReset}
          className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Reset Attempts (Dev Only)
        </button>
      )}
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

  const currentAssessmentId = useMemo(
    () => assessmentId || topicId,
    [assessmentId, topicId]
  );
  const config = ASSESSMENT_CONFIG[currentAssessmentId];
  const assessmentData = useAssessmentData(currentAssessmentId);
  const maxAttempts = 3;

  useEffect(() => {
    const loadStats = async () => {
      await new Promise((res) => setTimeout(res, 300));
      setAssessmentStats({
        attempts: assessmentData.getAttempts(),
        bestScore: assessmentData.getBestScore(),
        lastScore: assessmentData.getLastScore(),
      });
      setLoading(false);
    };
    loadStats();
  }, [currentAssessmentId]);

  const handleScoreUpdate = (score, totalQuestions, percentage) => {
    const updated = assessmentData.updateScore(score, percentage);
    setAssessmentStats(updated);
    console.log("Assessment Result:", {
      topicId,
      assessmentId: currentAssessmentId,
      score,
      totalQuestions,
      percentage,
      attempts: updated.attempts,
    });
  };

  // Universal handleFinish function that respects attempt limits
  const handleFinish = () => {
    // Check if user has reached max attempts
    if (assessmentStats.attempts >= maxAttempts) {
      // Show a message or redirect with completion status
      console.log("Assessment completed with max attempts reached");
    }

    // Navigate back to classroom with assessment completion status
    navigate(`/app/classroom/student/${classCode}`, {
      replace: true,
      state: {
        assessmentCompleted: currentAssessmentId,
        finalScore: assessmentStats.bestScore || assessmentStats.lastScore,
        attemptsUsed: assessmentStats.attempts,
        maxAttemptsReached: assessmentStats.attempts >= maxAttempts,
      },
    });
  };

  const handleReturn = () =>
    navigate(`/app/classroom/student/${classCode}`, { replace: true });

  const handleResetAttempts = () => {
    assessmentData.resetAttempts();
    setAssessmentStats({ attempts: 0, bestScore: null, lastScore: null });
  };

  // Check if user has exceeded maximum attempts
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
        onComplete={handleScoreUpdate}
        onFinish={handleFinish}
        attemptsRemaining={maxAttempts - assessmentStats.attempts}
        currentAttempt={assessmentStats.attempts + 1}
        maxAttempts={maxAttempts}
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
