import { GraduationCap } from "lucide-react";

export default function Logo({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Icon with a subtle gradient background shape for pop */}
      <div className="relative">
        <div className="absolute -inset-1 bg-purple-500/20 rounded-full blur-sm"></div>
        <GraduationCap className="relative z-10 text-purple-600" size={32} />
      </div>

      {/* Brand Name */}
      <span className="text-2xl font-extrabold tracking-tight">
        <span className="text-yellow-500">Edu</span>
        <span className="text-gray-800">Gamify</span>
      </span>
    </div>
  );
}
