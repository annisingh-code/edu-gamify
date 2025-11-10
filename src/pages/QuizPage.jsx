import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import { mockQuizzes } from "../utils/mockQuizData";
import { useDispatch, useSelector } from "react-redux";
import { addPoints, setBadgeType, completeQuiz } from "../redux/userSlice";
import {
  setQuestions,
  answerQuestion,
  nextQuestion,
  resetQuiz,
} from "../redux/quizSlice";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import {
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Flame,
  Trophy,
  Award,
} from "lucide-react";

export default function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const autoAdvanceTimeoutRef = useRef(null); // Ref to hold timeout ID

  const { badges } = useSelector((state) => state.user);
  const { questions, currentIndex, score, isCompleted, currentStreak } =
    useSelector((state) => state.quiz);

  const [selectedOption, setSelectedOption] = useState("");
  const [timeLeft, setTimeLeft] = useState(15);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  const currentQuizDetails = mockQuizzes.find((q) => q.id === Number(id));
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions?.length || 0;

  useEffect(() => {
    if (currentQuizDetails)
      dispatch(setQuestions(currentQuizDetails.questions));
    return () => {
      dispatch(resetQuiz());
    };
  }, [id, dispatch, currentQuizDetails]);

  // Clear timeout on unmount or when moving to next question manually
  useEffect(() => {
    return () => {
      if (autoAdvanceTimeoutRef.current) {
        clearTimeout(autoAdvanceTimeoutRef.current);
      }
    };
  }, []);

  const proceedToNext = useCallback(() => {
    // Clear any pending auto-advance if user clicked manually
    if (autoAdvanceTimeoutRef.current) {
      clearTimeout(autoAdvanceTimeoutRef.current);
      autoAdvanceTimeoutRef.current = null;
    }

    if (currentIndex + 1 < totalQuestions) {
      dispatch(nextQuestion());
      setSelectedOption("");
      setTimeLeft(15);
      setIsWrong(false);
    } else {
      dispatch(nextQuestion());
      dispatch(addPoints(score));
      const maxPossibleScore = totalQuestions * 15;
      const percentage = (score / maxPossibleScore) * 100;
      dispatch(setBadgeType(percentage));

      if (currentQuizDetails) {
        dispatch(
          completeQuiz({
            quizId: currentQuizDetails.id,
            score: score,
            maxScore: maxPossibleScore,
            category: currentQuizDetails.category,
            difficulty: currentQuizDetails.difficulty,
          })
        );
      }
      setShowConfetti(true);
    }
  }, [currentIndex, totalQuestions, dispatch, score, currentQuizDetails]);

  // --- TIMER & AUTO-ADVANCE LOGIC ---
  useEffect(() => {
    if (isCompleted || selectedOption) return;

    // If time runs out
    if (timeLeft <= 0) {
      dispatch(
        answerQuestion({
          isCorrect: false,
          answerGiven: "TIMEOUT",
          timeTaken: 15,
        })
      );
      setSelectedOption("TIMEOUT");
      setIsWrong(true);

      // Set auto-advance timer and store in ref
      autoAdvanceTimeoutRef.current = setTimeout(() => {
        proceedToNext();
      }, 1500); // slightly longer delay to see the "timeout" state
      return;
    }

    // Normal countdown
    const timerId = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timerId);
  }, [timeLeft, isCompleted, selectedOption, dispatch, proceedToNext]);

  const handleOptionClick = (option) => {
    if (selectedOption) return;
    setSelectedOption(option);

    const isCorrect = option === currentQuestion.correctAnswer;
    if (!isCorrect) {
      setIsWrong(true);
      setTimeout(() => setIsWrong(false), 500);
    }
    dispatch(
      answerQuestion({
        isCorrect,
        answerGiven: option,
        timeTaken: 15 - timeLeft,
      })
    );
  };

  const progressPercent =
    totalQuestions > 0 ? (currentIndex / totalQuestions) * 100 : 0;

  if (isCompleted) {
    
    const latestBadge = badges[badges.length - 1];
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
        {showConfetti && (
          <Confetti recycle={false} numberOfPieces={500} gravity={0.2} />
        )}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] rounded-3xl shadow-2xl p-8 max-w-md w-full text-center relative overflow-hidden"
        >
          <Trophy size={64} className="mx-auto text-yellow-400 mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Quiz Completed!
          </h2>
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <p className="text-sm text-blue-600 font-semibold uppercase tracking-wider mb-1">
              Final Score
            </p>
            <p className="text-5xl font-extrabold text-blue-900">
              {score}{" "}
              <span className="text-lg text-blue-400">
                / {totalQuestions * 15}
              </span>
            </p>
          </div>
          {latestBadge && (
            <div className="flex items-center gap-3 bg-yellow-50 p-4 rounded-xl mb-8 text-left border border-yellow-100">
              <Award size={24} className="text-yellow-600" />
              <div>
                <p className="font-bold text-yellow-800">New Badge Unlocked!</p>
                <p className="text-sm text-yellow-700">
                  {typeof latestBadge === "object"
                    ? latestBadge.name
                    : latestBadge}
                </p>
              </div>
            </div>
          )}
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-gray-900 hover:bg-gray-800 transition-colors text-white font-bold py-4 rounded-xl"
          >
            Back to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  if (!currentQuestion)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 font-medium">
        Loading Quiz...
      </div>
    );

  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      opacity: 1,
      transition: { duration: 0.4 },
    },
    steady: { x: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-100 flex flex-col items-center pt-10 px-4">
      <div className="w-full max-w-3xl">
        <div className="bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] rounded-2xl shadow-sm p-4 mb-6 flex items-center justify-between relative overflow-hidden">
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
          >
            <XCircle size={24} className="text-gray-400" />
          </button>
          <div className="flex items-center gap-6 z-10">
            <div
              className={`flex items-center gap-1 font-bold transition-colors ${
                currentStreak > 1 ? "text-orange-500" : "text-gray-300"
              }`}
            >
              <Flame
                size={20}
                className={currentStreak > 1 ? "animate-pulse" : ""}
                fill={currentStreak > 1 ? "currentColor" : "none"}
              />
              <span>{currentStreak}</span>
            </div>
            <div
              className={`flex items-center gap-1.5 font-mono font-bold transition-colors ${
                timeLeft <= 5 ? "text-red-500 animate-pulse" : "text-blue-600"
              }`}
            >
              <Clock size={18} />
              {timeLeft}s
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={isWrong ? "shake" : "steady"} // Use "steady" variant instead of raw object for better consistency
            exit={{ opacity: 0, x: -50 }}
            variants={shakeVariants}
            transition={{ duration: 0.3 }}
            className="bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] rounded-3xl shadow-lg p-6 md:p-10"
          >
            <div className="mb-6">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Question {currentIndex + 1} of {totalQuestions}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2 leading-tight">
                {currentQuestion.question}
              </h2>
            </div>
            <div className="grid gap-3 md:gap-4">
              {currentQuestion.options.map((option, i) => {
                let style =
                  "border-2 border-gray-100 hover:border-blue-300 hover:bg-blue-50 text-gray-700";
                let icon = null;
                if (selectedOption) {
                  if (option === currentQuestion.correctAnswer) {
                    style =
                      "border-green-500 bg-green-50 text-green-700 font-medium";
                    icon = <CheckCircle size={20} className="text-green-500" />;
                  } else if (selectedOption === option) {
                    style = "border-red-500 bg-red-50 text-red-700 font-medium";
                    icon = <AlertCircle size={20} className="text-red-500" />;
                  } else if (option === currentQuestion.correctAnswer) {
                    style =
                      "border-green-500 bg-green-50 text-green-700 font-medium opacity-50";
                    icon = <CheckCircle size={20} className="text-green-500" />;
                  } else {
                    style = "opacity-50 border-gray-100";
                  }
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleOptionClick(option)}
                    disabled={!!selectedOption}
                    className={`relative p-4 md:p-5 rounded-xl text-left text-base md:text-lg font-medium transition-all flex items-center justify-between ${style} ${
                      !selectedOption && "active:scale-[0.99]"
                    }`}
                  >
                    <span>{option}</span>
                    {icon}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-end h-14">
          {selectedOption && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={proceedToNext}
              className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-bold py-3 px-10 rounded-xl shadow-lg hover:shadow-xl active:scale-95"
            >
              {currentIndex + 1 === totalQuestions
                ? "Finish Quiz"
                : "Next Question"}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
