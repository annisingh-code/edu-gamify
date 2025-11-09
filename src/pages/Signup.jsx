import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Make sure this path matches your project structure
import { signupUser } from "../firebase/authFunctions";
import { setUser, setError, setLoading } from "../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, UserPlus, ArrowRight } from "lucide-react";
import Logo from "../components/Logo";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Get loading state from Redux for consistent UI feedback
  const { loading } = useSelector((state) => state.user);

  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const user = await signupUser(email, password);
      dispatch(setUser({ email: user.email, uid: user.uid, displayName: user.displayName || "New Gamer" }));
      navigate("/dashboard");
    } catch (error) {
      dispatch(setError(error.message));
      alert(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-100 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
        // Matches Login.jsx exactly with texture and glassmorphism
        className="bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] backdrop-blur-xl p-8 md:p-10 rounded-[32px] shadow-xl w-full max-w-md border border-white/60"
      >
        <div className="flex flex-col items-center mb-10">
           {/* Logo with same animation as Login */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.2, duration: 0.5 }}
            className="scale-150 mb-6"
          >
            <Logo />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-500 text-sm font-medium mt-1">Join us and start your learning adventure!</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400" size={20} />
              <input 
                type="email" 
                placeholder="name@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-indigo-100 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none font-medium text-gray-700 placeholder-gray-400" 
              />
            </div>
          </div>

          <div className="space-y-2">
             <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400" size={20} />
              <input 
                type="password" 
                placeholder="Create a strong password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-indigo-100 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none font-medium placeholder-gray-400" 
              />
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgb(79 70 229 / 0.4)" }} 
            whileTap={{ scale: 0.98 }} 
            type="submit" 
            disabled={loading} 
            className={`w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-lg rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
               "Creating account..."
            ) : (
               <>
                 Sign Up Free <ArrowRight size={20} />
               </>
            )}
          </motion.button>
        </form>

        <p className="text-center text-gray-600 mt-8 font-medium">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}