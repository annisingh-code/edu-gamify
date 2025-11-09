import { motion } from "framer-motion";
import { Award, Lock } from "lucide-react";

export default function BadgeDisplay({ badges }) {
  const coreBadges = [
    { id: 'bronze', name: 'Bronze', icon: '🥉', color: 'from-orange-100 to-orange-50 border-orange-200' },
    { id: 'silver', name: 'Silver', icon: '🥈', color: 'from-gray-100 to-gray-50 border-gray-300' },
    { id: 'gold', name: 'Gold', icon: '🥇', color: 'from-yellow-100 to-yellow-50 border-yellow-300' },
  ];

  return (
    <div className="bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] backdrop-blur-sm rounded-2xl shadow-sm p-5 border border-white/50 h-full flex flex-col">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Award className="text-blue-500" size={20} />
        Achievements
      </h3>

      <div className="flex flex-col gap-3 flex-1 justify-around">
        {coreBadges.map((badge) => {
          const isUnlocked = badges.some(b => (typeof b === 'string' ? b.toLowerCase() === badge.id : b.id === badge.id));
          return (
            <motion.div key={badge.id} whileHover={{ scale: 1.02 }} className={`relative p-3 rounded-xl flex items-center gap-4 transition-all ${isUnlocked ? `bg-gradient-to-r ${badge.color} border shadow-sm` : "bg-gray-50/80 border border-dashed border-gray-200 opacity-60"}`}>
              <div className={`w-12 h-12 flex items-center justify-center rounded-full text-2xl ${isUnlocked ? 'bg-white/80' : 'bg-gray-100'}`}>{isUnlocked ? badge.icon : <Lock size={18} className="text-gray-300" />}</div>
              <div className="flex-1"><h4 className={`font-bold ${isUnlocked ? "text-gray-900" : "text-gray-400"}`}>{badge.name} Medal</h4><p className="text-xs text-gray-500">{isUnlocked ? "Unlocked!" : "Locked"}</p></div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}