import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import LanguageSelector from '../components/LanguageSelector';
import axios from "axios";



const Signup = () => {
  const { Signup } = useAuth();
  const { t } = useLanguage();

  const [name, setName] = useState('');
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
      const res = await axios.post("http://localhost:5001/signup", {
        name,
        email,
        password,
        role
      });

      // Show success message and redirect to login
      alert(res.data.message + " Please login with your credentials.");
      window.location.href = '/login';
    }
    catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || "Server error. Please try again.";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl -z-10"></div>

      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-primary mb-2">{t('signup_title')}</h2>
          <p className="text-gray-500">Join the Gramin Mitra community</p>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded shadow-sm">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-1 ml-1">{t('name')}</label>
            <input
              type="text"
              className="input-field"
              placeholder="Ram Patil"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-1 ml-1">{t('email')}</label>
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
            <label className="block text-gray-700 font-bold mb-1 ml-1">{t('password')}</label>
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
            className="w-full btn-primary mt-6 text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('loading') : t('signup')}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-600">
          <Link to="/login" className="hover:text-primary font-bold underline decoration-2 underline-offset-4 transition-colors">
            {t('already_user')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;