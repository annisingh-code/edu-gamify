import { useNavigate } from "react-router-dom";
import { Play, Award, Clock } from "lucide-react";

export default function QuizCard({ quiz, bestScore }) {
  const navigate = useNavigate();

  // Calculate estimated time (e.g., 1 minute per question)
  const estimatedTime = quiz.questions ? `${quiz.questions.length} min` : 'N/A';

  return (
    <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:-translate-y-1 overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500" />

      <div className="relative z-10">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
          {quiz.title}
        </h3>
        <p className="text-gray-500 text-sm mb-6 line-clamp-2">
          {quiz.description || "Test your knowledge with this exciting quiz!"}
        </p>

        {/* Quiz Details (Gamification Elements) */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
          <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1 rounded-full text-blue-700 font-medium">
            <Award size={16} />
            <span>{quiz.questions.length * 10} Pts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={16} className="text-gray-400" />
            <span>{estimatedTime}</span>
          </div>
        </div>

        {/* Best Score Badge (if available) */}
        {bestScore !== undefined && (
          <div className="mb-4 text-sm font-medium text-green-600 flex items-center gap-1">
            <Award size={16} />
            Your Best: {bestScore} pts
          </div>
        )}

        <button
          onClick={() => navigate(`/quiz/${quiz.id}`)}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all active:scale-95 focus:ring-4 focus:ring-blue-200"
        >
          <Play size={18} fill="currentColor" />
          Start Challenge
        </button>
      </div>
    </div>
  );
}