import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { User, Mail, Trophy, Star, Award, TrendingUp } from "lucide-react";

export default function Profile() {
  const { user, totalPoints, xp, level, badges } = useSelector(
    (state) => state.user
  );
  const progressData = [
    { quiz: "Start", score: 0 },
    { quiz: "Math", score: 40 },
    { quiz: "Science", score: 110 },
    { quiz: "History", score: totalPoints },
  ];
  const xpForNextLevel = 100;
  const currentLevelXp = xp % xpForNextLevel;
  const progressPercent = (currentLevelXp / xpForNextLevel) * 100;

  const cardStyle =
    "bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] backdrop-blur-md rounded-3xl shadow-sm border border-white/50";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${cardStyle} p-8 flex flex-col md:flex-row items-center md:items-start gap-6`}
        >
          <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg">
            <User size={48} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {user?.displayName || "Guest Learner"}
            </h1>
            <div className="flex flex-col md:flex-row gap-4 text-gray-500 text-sm">
              {user?.email && (
                <p className="flex items-center justify-center md:justify-start gap-2">
                  <Mail size={16} /> {user.email}
                </p>
              )}
              <p className="flex items-center justify-center md:justify-start gap-2">
                <Trophy size={16} className="text-yellow-500" /> {totalPoints}{" "}
                Total Points
              </p>
            </div>
          </div>
          <div className="text-center bg-blue-50/80 p-4 rounded-2xl border border-blue-100">
            <p className="text-blue-600 font-bold text-xl">Level {level}</p>
            <p className="text-xs text-blue-400 uppercase tracking-wider">
              Current Rank
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className={`${cardStyle} p-6`}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Star className="text-yellow-400" fill="currentColor" /> Level
              Progress
            </h3>
            <div className="mb-2 flex justify-between text-sm font-medium">
              <span className="text-gray-500">Level {level}</span>
              <span className="text-blue-600">
                {currentLevelXp} / {xpForNextLevel} XP
              </span>
            </div>
            <div className="h-6 bg-gray-100 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
            <p className="text-center text-sm text-gray-400 mt-4">
              {xpForNextLevel - currentLevelXp} XP needed for Level {level + 1}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`${cardStyle} p-6`}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Award className="text-orange-500" /> Badges Earned
            </h3>
            {badges.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {badges.map((badge, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="flex flex-col items-center p-3 bg-orange-50/50 rounded-2xl border border-orange-100"
                  >
                    <span
                      className="text-4xl mb-2"
                      role="img"
                      aria-label={
                        typeof badge === "object" ? badge.name : badge
                      }
                    >
                      {typeof badge === "object" ? badge.icon : "🏅"}
                    </span>
                    <span className="text-xs font-bold text-orange-800 text-center leading-tight">
                      {typeof badge === "object" ? badge.name : badge}
                    </span>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center p-6 text-gray-400 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                No badges yet. Start a quiz!
              </div>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`${cardStyle} p-6`}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp className="text-green-500" /> Performance History
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={progressData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="quiz" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#6366f1"
                  strokeWidth={4}
                  dot={{
                    fill: "#6366f1",
                    strokeWidth: 2,
                    r: 4,
                    stroke: "white",
                  }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
