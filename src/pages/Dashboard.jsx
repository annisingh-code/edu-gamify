import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import QuizCard from "../components/QuizCard";
import BadgeDisplay from "../components/BadgeDisplay";
import AIRecommender from "../components/AIRecommender";
import { mockQuizzes } from "../utils/mockQuizData";
import { Flame, Star, Trophy, TrendingUp, Award, Target } from "lucide-react";

export default function Dashboard() {
  const { user, totalPoints, level, xp, badges } = useSelector(
    (state) => state.user
  );
  const { bestStreak } = useSelector((state) => state.quiz);

  const xpForNextLevel = 100;
  const currentLevelXp = xp % xpForNextLevel;
  const progressPercent = (currentLevelXp / xpForNextLevel) * 100;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-100 p-4 md:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[1800px] mx-auto space-y-8"
      >
     
        <motion.header
          variants={itemVariants}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-sm border border-white/50"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              Hi, {user?.displayName || "Learner"}! 👋
            </h1>
            <p className="text-gray-600 mt-2 flex items-center gap-2 text-sm md:text-base">
              <Target size={18} className="text-blue-500" />
              Ready to reach Level {level + 1} today?
            </p>
          </div>
          <div className="flex items-center gap-4 bg-blue-50/50 p-4 rounded-2xl min-w-[280px] lg:w-1/3 border border-blue-100/50">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl md:text-2xl shadow-lg rotate-3">
              {level}
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-xs font-bold text-blue-700 mb-1 uppercase tracking-wider">
                <span>Current Level</span>
                <span>
                  {currentLevelXp} / {xpForNextLevel} XP
                </span>
              </div>
              <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                />
              </div>
            </div>
          </div>
        </motion.header>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <motion.div variants={itemVariants}>
            <StatsCard
              icon={
                <Star
                  size={24}
                  className="text-yellow-500"
                  fill="currentColor"
                />
              }
              label="Total XP"
              value={xp}
              color="yellow"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatsCard
              icon={<Trophy size={24} className="text-purple-500" />}
              label="Quiz Points"
              value={totalPoints}
              color="purple"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatsCard
              icon={
                <Flame
                  size={24}
                  className="text-orange-500"
                  fill="currentColor"
                />
              }
              label="Best Streak"
              value={bestStreak}
              color="orange"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatsCard
              icon={<Award size={24} className="text-blue-500" />}
              label="Badges"
              value={badges.length}
              color="blue"
            />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-stretch">
          <div className="xl:col-span-2 h-full">
            <AIRecommender />
          </div>
          <motion.div variants={itemVariants} className="xl:col-span-1 h-full">
            <BadgeDisplay badges={badges} />
          </motion.div>
          <motion.div variants={itemVariants} className="xl:col-span-1 h-full">
            {/* Leaderboard with Texture */}
            <div className="bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] backdrop-blur-md rounded-2xl shadow-sm border border-white/50 overflow-hidden h-full flex flex-col">
              <div className="p-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <h3 className="font-bold flex items-center gap-2 text-lg">
                  <Trophy size={20} className="text-yellow-300" /> Top Learners
                </h3>
              </div>
              <div className="p-4 flex-1 overflow-auto">
                <ul className="space-y-3">
                  <LeaderboardRow
                    rank={1}
                    name="Alex J."
                    xp={2450}
                    emoji="🥇"
                  />
                  <LeaderboardRow
                    rank={2}
                    name="Maria G."
                    xp={2320}
                    emoji="🥈"
                  />
                  <LeaderboardRow rank={3} name="Sam W." xp={2105} emoji="🥉" />
                  <li className="flex items-center justify-between p-3 rounded-xl bg-blue-50 border border-blue-100 mt-4">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-blue-800 w-6 text-center">
                        9th
                      </span>
                      <span className="font-semibold text-blue-900">You</span>
                    </div>
                    <span className="font-bold text-blue-600">{xp} XP</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="pt-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-6">
            <TrendingUp className="text-blue-600" size={28} />
            Available Challenges
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {mockQuizzes.map((quiz, i) => (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <QuizCard quiz={quiz} bestScore={undefined} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function StatsCard({ icon, label, value, color }) {
  const colors = {
    yellow:
      "bg-yellow-50/80 text-yellow-700 border-yellow-100 hover:bg-yellow-100",
    purple:
      "bg-purple-50/80 text-purple-700 border-purple-100 hover:bg-purple-100",
    orange:
      "bg-orange-50/80 text-orange-700 border-orange-100 hover:bg-orange-100",
    blue: "bg-blue-50/80 text-blue-700 border-blue-100 hover:bg-blue-100",
  };
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className={`p-5 rounded-3xl border backdrop-blur-sm ${colors[color]} flex flex-col items-center justify-center gap-1 shadow-sm transition-all cursor-default`}
    >
      <div className="p-2.5 bg-white rounded-full shadow-sm mb-1">{icon}</div>
      <span className="text-2xl font-extrabold">{value}</span>
      <span className="text-[10px] font-bold opacity-70 uppercase tracking-widest">
        {label}
      </span>
    </motion.div>
  );
}

function LeaderboardRow({ rank, name, xp, emoji }) {
  return (
    <li className="flex items-center justify-between p-2">
      <div className="flex items-center gap-3">
        <span className="text-lg">{emoji}</span>
        <span className="font-medium text-gray-700">{name}</span>
      </div>
      <span className="font-bold text-gray-500 text-sm">{xp} XP</span>
    </li>
  );
}
