import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../firebase/authFunctions";
import { clearUser } from "../redux/userSlice";
import { Menu, X, LogOut, LayoutDashboard, Trophy, UserCircle, LogIn, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// ✨ IMPORT THE LOGO
import Logo from "./Logo";

export default function Navbar() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Optional: Hide navbar on login/signup pages for a cleaner look
  if (["/login", "/signup"].includes(location.pathname)) return null;

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(clearUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const NavItem = ({ to, icon: Icon, children }) => (
    <NavLink to={to} onClick={closeMobileMenu} className={({ isActive }) => `flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-semibold ${isActive ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}>
      {Icon && <Icon size={18} />}
      {children}
    </NavLink>
  );

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* ✨ USE LOGO COMPONENT HERE ✨ */}
            <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate(user ? "/dashboard" : "/")}>
              <Logo textClassName="text-xl" />
            </div>

            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <>
                  <NavItem to="/dashboard" icon={LayoutDashboard}>Dashboard</NavItem>
                  <NavItem to="/leaderboard" icon={Trophy}>Leaderboard</NavItem>
                  <NavItem to="/profile" icon={UserCircle}>Profile</NavItem>
                  <div className="h-6 w-px bg-gray-200 mx-2"></div>
                  <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-600 hover:bg-red-50 transition-all font-semibold">
                    <LogOut size={18} /> Logout
                  </button>
                </>
              ) : (
                <>
                  <NavItem to="/login" icon={LogIn}>Login</NavItem>
                  <NavItem to="/signup" icon={UserPlus}>Signup</NavItem>
                </>
              )}
            </div>

            <div className="flex items-center md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="md:hidden fixed inset-x-0 top-16 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-lg p-4">
            <div className="flex flex-col gap-2">
              {user ? (
                <>
                  <NavItem to="/dashboard" icon={LayoutDashboard}>Dashboard</NavItem>
                  <NavItem to="/leaderboard" icon={Trophy}>Leaderboard</NavItem>
                  <NavItem to="/profile" icon={UserCircle}>Profile</NavItem>
                  <hr className="my-2 border-gray-100" />
                  <button onClick={() => { handleLogout(); closeMobileMenu(); }} className="flex items-center gap-2 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all font-semibold w-full text-left"><LogOut size={18} /> Logout</button>
                </>
              ) : (
                <>
                  <NavItem to="/login" icon={LogIn}>Login</NavItem>
                  <NavItem to="/signup" icon={UserPlus}>Signup</NavItem>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}