import { useSelector } from "react-redux";
import { mockQuizzes } from "../utils/mockQuizData";
import { Sparkles, BrainCircuit, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AIRecommender() {
  const navigate = useNavigate();
  const { quizHistory, user } = useSelector((state) => state.user);

  const getRecommendation = () => {
    if (!quizHistory || quizHistory.length === 0) {
      return {
        quiz: mockQuizzes.find(
          (q) => q.category === "Math" && q.difficulty === "Easy"
        ),
        reason: "Start your journey with some fundamental Math!",
      };
    }
    const lastQuiz = quizHistory[quizHistory.length - 1];
    const percentage = (lastQuiz.score / lastQuiz.maxScore) * 100;

    if (percentage < 60) {
      const easierQuiz = mockQuizzes.find(
        (q) =>
          q.category === lastQuiz.category &&
          q.difficulty === "Easy" &&
          q.id !== lastQuiz.quizId
      );
      if (easierQuiz)
        return {
          quiz: easierQuiz,
          reason: `Let's build your confidence in ${lastQuiz.category}.`,
        };
    } else if (percentage > 90) {
      const harderQuiz = mockQuizzes.find(
        (q) =>
          q.category === lastQuiz.category &&
          q.difficulty === "Hard" &&
          q.id !== lastQuiz.quizId
      );
      if (harderQuiz)
        return {
          quiz: harderQuiz,
          reason: `You're a ${lastQuiz.category} pro! Try this challenge.`,
        };
      const mediumQuiz = mockQuizzes.find(
        (q) =>
          q.category === lastQuiz.category &&
          q.difficulty === "Medium" &&
          q.id !== lastQuiz.quizId
      );
      if (mediumQuiz)
        return {
          quiz: mediumQuiz,
          reason: `Great job! Level up your ${lastQuiz.category} skills.`,
        };
    }
    const playedIds = quizHistory.slice(-3).map((h) => h.quizId);
    const newQuiz = mockQuizzes.find((q) => !playedIds.includes(q.id));
    return {
      quiz: newQuiz || mockQuizzes[0],
      reason: "Explore something new to expand your knowledge!",
    };
  };

  const recommendation = getRecommendation();
  if (!recommendation?.quiz) return null;

  return (
    // ✨ Added h-full so it stretches to match other cards in the row
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-1 shadow-xl h-full"
    >
      <div className="bg-white/10 backdrop-blur-lg rounded-[22px] p-6 text-white relative overflow-hidden h-full flex flex-col justify-center">
        <BrainCircuit className="absolute -right-10 -bottom-10 text-white/10 w-40 h-40" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-yellow-300" fill="currentColor" />
            <h3 className="font-bold text-lg tracking-wider uppercase">
              AI Recommended
            </h3>
          </div>
          <h4 className="text-2xl font-extrabold mb-2">
            {recommendation.quiz.title}
          </h4>
          <p className="text-indigo-100 mb-6 font-medium">
            {user?.displayName ? `${user.displayName}, ` : ""}
            {recommendation.reason}
          </p>
          <button
            onClick={() => navigate(`/quiz/${recommendation.quiz.id}`)}
            className="bg-white text-indigo-600 font-bold py-3 px-6 rounded-xl flex items-center gap-2 hover:bg-indigo-50 transition-colors active:scale-95"
          >
            Start Recommended Quiz <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
