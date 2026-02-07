import { useState } from "react";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaCloudSun, FaSeedling, FaBookOpen, FaComments, FaUserCircle, FaBars, FaTimes, FaTractor } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import LanguageSelector from "./LanguageSelector";

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (user?.role === 'farmer') return '/farmer-dashboard';
    if (user?.role === 'wholesale') return '/wholesale-dashboard';
    return '/';
  };

  return (
    <nav className="w-full bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-green-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="Gramin Mitra Logo" className="h-12 w-auto transform group-hover:scale-105 transition-transform duration-300" />
            <div className="hidden lg:flex flex-col">
              <span className="text-xl font-bold text-green-800 leading-tight">Gramin Mitra</span>
              <span className="text-xs text-green-600 tracking-wider uppercase">Kisan ka Saathi</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/weather" icon={<FaCloudSun />} label={t('weather')} />
            <NavLink to="/crops" icon={<FaSeedling />} label={t('crops')} />
            <NavLink to="/diseasedetector" icon={<FaComments />} label={t('disease_detector')} />
            <NavLink to="/schemes" icon={<FaBookOpen />} label={t('schemes')} />
            <NavLink to="/farming-guide" icon={<FaTractor />} label={t('farming_guide')} />
          </div>

          {/* Right Section (Auth & Lang) */}
          <div className="hidden md:flex items-center gap-4">
            <div className="h-8 w-px bg-gray-200"></div>

            <LanguageSelector />

            {user ? (
              <div className="flex items-center gap-3 pl-2">
                <Link
                  to={getDashboardLink()}
                  className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full font-semibold hover:bg-green-100 transition-colors"
                >
                  <FaUserCircle size={18} />
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-500 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                  title={t('logout')}
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-gray-600 font-medium hover:text-green-700 transition px-3 py-2">
                  {t('login')}
                </Link>
                <Link to="/signup" className="bg-green-600 text-white px-5 py-2.5 rounded-full font-bold shadow-lg shadow-green-200 hover:bg-green-700 hover:shadow-xl transition-all transform hover:-translate-y-0.5">
                  {t('signup')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-green-700 p-2 rounded-md focus:outline-none transition-colors"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full left-0 animate-fade-in-down z-40">
          <div className="flex flex-col p-6 space-y-4">
            <LanguageSelector className="w-full mb-2" />

            <MobileNavLink to="/weather" icon={<FaCloudSun />} label={t('weather')} onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink to="/crops" icon={<FaSeedling />} label={t('crops')} onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink to="/diseasedetector" icon={<FaComments />} label={t('disease_detector')} onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink to="/schemes" icon={<FaBookOpen />} label={t('schemes')} onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink to="/farming-guide" icon={<FaTractor />} label={t('farming_guide')} onClick={() => setMobileMenuOpen(false)} />

            <div className="border-t border-gray-100 pt-4 mt-2">
              {user ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 mb-2 px-4 py-2 bg-green-50 rounded-lg">
                    <FaUserCircle className="text-green-600" size={24} />
                    <div>
                      <p className="font-bold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                  </div>
                  <Link
                    to={getDashboardLink()}
                    className="w-full bg-green-600 text-white py-3 rounded-lg text-center font-bold shadow-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('dashboard')}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full border border-red-200 text-red-500 py-3 rounded-lg font-medium hover:bg-red-50 transition"
                  >
                    {t('logout')}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link to="/login" className="w-full py-3 text-center border border-green-600 text-green-700 rounded-lg font-bold hover:bg-green-50" onClick={() => setMobileMenuOpen(false)}>
                    {t('login')}
                  </Link>
                  <Link to="/signup" className="w-full py-3 text-center bg-green-600 text-white rounded-lg font-bold shadow-md hover:bg-green-700" onClick={() => setMobileMenuOpen(false)}>
                    {t('signup')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// Helper Components
const NavLink = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-600 font-medium hover:bg-green-50 hover:text-green-700 transition-all duration-300 group"
  >
    <span className="text-lg text-gray-400 group-hover:text-green-600 transition-colors">{icon}</span>
    <span>{label}</span>
  </Link>
);

const MobileNavLink = ({ to, icon, label, onClick }) => (
  <Link
    to={to}
    className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-green-50 hover:text-green-700 transition-colors"
    onClick={onClick}
  >
    <span className="text-xl text-green-500 bg-green-100 p-2 rounded-lg">{icon}</span>
    <span className="text-lg">{label}</span>
  </Link>
);
