import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Make sure this file exists locally exactly at this path:
import { loginUser } from "../firebase/authFunctions";
import { setUser, setError, setLoading } from "../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn } from "lucide-react";
// ✨ IMPORT NEW LOGO COMPONENT
import Logo from "../components/Logo";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const user = await loginUser(email, password);
      // Adjust this payload based on what your actual loginUser function returns
      dispatch(setUser({ email: user.email, uid: user.uid, displayName: user.displayName || "Gamer" }));
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      dispatch(setError(error.message));
      alert(error.message); 
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    // ✨ UPDATED BACKGROUND: Matches Dashboard & Profile consistency
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-100 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
        className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-md border border-white/60"
      >
        <div className="flex flex-col items-center mb-8">
          {/* ✨ NEW LOGO IMPLEMENTATION ✨ */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6 scale-125"
          >
            <Logo />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome Back!</h2>
          <p className="text-gray-500 mt-2 font-medium text-sm">Ready to get back in the game?</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" size={20} />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3.5 bg-blue-50/50 border border-blue-100 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none font-medium text-gray-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" size={20} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3.5 bg-blue-50/50 border border-blue-100 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none font-medium"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgb(79 70 229 / 0.4)" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg rounded-xl shadow-md transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
               "Logging in..."
            ) : (
               <>
                 Login <LogIn size={20} />
               </>
            )}
          </motion.button>
        </form>

        <p className="text-center text-gray-600 mt-8 font-medium">
          Don’t have an account yet?{' '}
          <Link to="/signup" className="font-bold text-blue-600 hover:text-blue-800 transition-colors">
            Sign Up Free
          </Link>
        </p>
      </motion.div>
    </div>
  );
}