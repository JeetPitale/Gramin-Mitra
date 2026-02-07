import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSelector = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="relative">
            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="appearance-none bg-green-50 text-green-700 py-2 pl-4 pr-8 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer font-semibold text-sm border border-transparent hover:border-green-200 transition-all"
                style={{ backgroundImage: 'none' }}
            >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="mr">मराठी</option>
                <option value="gu">ગુજરાતી</option>
                <option value="ml">മലയാളം</option>
                <option value="bn">বাংলা</option>
                <option value="ta">தமிழ்</option>
                <option value="te">తెలుగు</option>
                <option value="kn">ಕನ್ನಡ</option>
            </select>
            {/* Custom Arrow Icon */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-green-600">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
        </div>
    );
};

export default LanguageSelector;
