import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Crown, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useSelector } from "react-redux";

const mockLeaderboardData = [
  { id: 1, name: "Alex Johnson", points: 2450, avatar: "👨‍🎓", trend: "up" },
  { id: 2, name: "Maria Garcia", points: 2320, avatar: "👩‍🔬", trend: "same" },
  { id: 3, name: "Sam Wilson", points: 2105, avatar: "🧑‍💻", trend: "up" },
  { id: 4, name: "Priya Patel", points: 1950, avatar: "👩‍🚀", trend: "down" },
  { id: 5, name: "Chen Wei", points: 1800, avatar: "🧑‍🎨", trend: "up" },
];

export default function Leaderboard() {
  const { user, totalPoints } = useSelector((state) => state.user);
  const [timeframe, setTimeframe] = useState("allTime");
  const topThree = mockLeaderboardData.slice(0, 3);
  const restOfList = mockLeaderboardData.slice(3);

  return (
    // ✨ NEW UNIFIED GRADIENT BACKGROUND ✨
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-100 p-6 md:p-10 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center gap-3">
            <Trophy className="text-yellow-400" size={40} /> Leaderboard
          </h1>
          <p className="text-gray-500 mt-3 font-medium">See who's leading the pack!</p>
          <div className="inline-flex bg-white/50 backdrop-blur-sm p-1 rounded-2xl mt-6 shadow-sm border border-white/50">
            {["weekly", "monthly", "allTime"].map((t) => (
              <button key={t} onClick={() => setTimeframe(t)} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${timeframe === t ? "bg-white text-blue-600 shadow-md" : "text-gray-500 hover:bg-white/50"}`}>
                {t === "weekly" ? "This Week" : t === "monthly" ? "This Month" : "All Time"}
              </button>
            ))}
          </div>
        </div>

        {/* PODIUM */}
        <div className="flex justify-center items-end gap-4 mb-12 h-64 md:h-80">
          {/* 2nd Place */}
          <PodiumStep rank={2} user={topThree[1]} delay={0.2} height="h-3/4" color="from-gray-200 to-gray-300" icon={<Medal size={32} className="text-gray-500" />} />
          {/* 1st Place */}
          <PodiumStep rank={1} user={topThree[0]} delay={0} height="h-full" color="from-yellow-200 to-yellow-400" icon={<Crown size={40} className="text-yellow-600" />} isFirst />
          {/* 3rd Place */}
          <PodiumStep rank={3} user={topThree[2]} delay={0.4} height="h-2/3" color="from-orange-200 to-orange-300" icon={<Medal size={32} className="text-orange-600" />} />
        </div>

        {/* LIST */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 overflow-hidden">
          <div className="p-6 space-y-2">
            {restOfList.map((learner, index) => (
              <LeaderboardItem key={learner.id} rank={index + 4} learner={learner} isCurrentUser={false} />
            ))}
             {/* Current User Fixed at Bottom if not in top list */}
            <div className="border-t-2 border-dashed border-gray-100 my-4 pt-4">
               <LeaderboardItem rank={99} learner={{ name: user?.displayName || "You", points: totalPoints, avatar: "👤", trend: "same" }} isCurrentUser={true} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function PodiumStep({ rank, user, delay, height, color, icon, isFirst = false }) {
    return (
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, type: "spring" }} className={`flex flex-col items-center ${isFirst ? 'z-10 -mx-2 md:mx-0' : ''} w-1/3 max-w-[160px]`}>
            <div className="mb-3 text-center relative">
               {isFirst && <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute -top-12 left-0 right-0 flex justify-center">{icon}</motion.div>}
               <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-4 ${isFirst ? 'border-yellow-400' : 'border-white'} shadow-lg overflow-hidden bg-white flex items-center justify-center text-3xl md:text-4xl`}>{user.avatar}</div>
               <p className={`font-bold mt-2 text-sm md:text-base ${isFirst ? 'text-gray-900' : 'text-gray-600'} truncate w-full`}>{user.name}</p>
               <p className="text-xs font-semibold text-blue-600">{user.points} XP</p>
            </div>
            <div className={`w-full ${height} bg-gradient-to-t ${color} rounded-t-2xl shadow-inner flex items-start justify-center pt-4`}>
               <span className={`text-2xl md:text-4xl font-black ${isFirst ? 'text-yellow-700 opacity-50' : 'text-gray-600 opacity-30'}`}>{rank}</span>
            </div>
        </motion.div>
    )
}

function LeaderboardItem({ rank, learner, isCurrentUser }) {
    return (
        <motion.div whileHover={{ scale: 1.01 }} className={`flex items-center p-4 rounded-2xl transition-all ${isCurrentUser ? 'bg-blue-600 text-white shadow-lg transform scale-105' : 'bg-gray-50 hover:bg-blue-50'}`}>
            <span className={`font-bold text-lg w-8 text-center ${isCurrentUser ? 'text-blue-200' : 'text-gray-400'}`}>{rank}</span>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-sm mx-4">{learner.avatar}</div>
            <div className="flex-1"><p className="font-bold">{learner.name} {isCurrentUser && "(You)"}</p></div>
            <div className="flex items-center gap-4">
                <span className={`font-bold ${isCurrentUser ? 'text-white' : 'text-blue-600'}`}>{learner.points} XP</span>
                {learner.trend === 'up' && <TrendingUp size={18} className="text-green-500" />}
                {learner.trend === 'down' && <TrendingDown size={18} className="text-red-400" />}
                {learner.trend === 'same' && <Minus size={18} className="text-gray-300" />}
            </div>
        </motion.div>
    )
}