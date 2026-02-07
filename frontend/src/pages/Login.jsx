import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import LanguageSelector from '../components/LanguageSelector';
import Preloader from '../components/Preloader';

const Login = () => {
  const { login, loading } = useAuth(); // AuthContext loading state
  const { t } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('farmer'); // Default role
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const result = await login(email, password, role);
      if (!result.success) {
        setError(result.message);
      }
      // If success, redirect happens in login function
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Preloader />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-64 bg-primary rounded-b-[50%] scale-x-150 -z-10 shadow-xl"></div>

      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100 backdrop-blur-sm bg-white/90">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-primary mb-2">{t('login_title')}</h2>
          <p className="text-gray-500">Welcome back to Gramin Mitra</p>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded shadow-sm" role="alert">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-bold mb-2 ml-1">{t('email')}</label>
            <input
              type="email"
              className="input-field"
              placeholder="example@farm.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2 ml-1">{t('password')}</label>
            <input
              type="password"
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2 ml-1">{t('role_select')}</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole('farmer')}
                className={`py-2 px-4 rounded-lg font-bold border-2 transition-all cursor-pointer ${role === 'farmer' ? 'bg-primary text-white border-primary shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-primary'}`}
              >
                {t('farmer')}
              </button>
              <button
                type="button"
                onClick={() => setRole('wholesale')}
                className={`py-2 px-4 rounded-lg font-bold border-2 transition-all cursor-pointer ${role === 'wholesale' ? 'bg-secondary-dark text-white border-secondary-dark shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-secondary-dark'}`}
              >
                {t('wholesale')}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full btn-primary mt-6 text-lg group"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('loading') : t('submit')}
            {!isSubmitting && <span className="group-hover:translate-x-1 transition-transform">→</span>}
          </button>
        </form>

        <div className="mt-8 text-center text-gray-600">
          <Link to="/signup" className="hover:text-primary font-bold underline decoration-2 underline-offset-4 transition-colors">
            {t('new_user')}
          </Link>
        </div>
      </div>

      <footer className="mt-8 text-gray-500 text-sm">
        &copy; 2026 Gramin Mitra
      </footer>
    </div>
  );
};

export default Login;