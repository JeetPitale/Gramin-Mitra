import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Features() {
  const { t } = useLanguage();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      <section className="py-16 px-6 md:px-20 bg-white">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            {t('features_heading_1')} <span className="text-green-600">{t('features_heading_2')}</span>
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            {t('features_subheading')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-[0_0_25px_3px_rgba(34,197,94,0.35)] transition duration-300 bg-white">
            <div className="mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-green-50">
                🌱
              </div>
            </div>
            <h3 className="text-lg font-semibold text-slate-800">{t('feat_soil_title')}</h3>
            <p className="mt-2 text-slate-600 text-sm">
              {t('feat_soil_desc')}
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-[0_0_25px_3px_rgba(34,197,94,0.35)] transition duration-300 bg-white">
            <div className="mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-green-50">
                📅
              </div>
            </div>
            <h3 className="text-lg font-semibold text-slate-800">{t('feat_crop_title')}</h3>
            <p className="mt-2 text-slate-600 text-sm">
              {t('feat_crop_desc')}
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-[0_0_25px_3px_rgba(34,197,94,0.35)] transition duration-300 bg-white">
            <div className="mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-green-50">
                🌦️
              </div>
            </div>
            <h3 className="text-lg font-semibold text-slate-800">{t('feat_weather_title')}</h3>
            <p className="mt-2 text-slate-600 text-sm">
              {t('feat_weather_desc')}
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-[0_0_25px_3px_rgba(34,197,94,0.35)] transition duration-300 bg-white">
            <div className="mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-green-50">
                💹
              </div>
            </div>
            <h3 className="text-lg font-semibold text-slate-800">{t('feat_market_title')}</h3>
            <p className="mt-2 text-slate-600 text-sm">
              {t('feat_market_desc')}
            </p>
          </div>

          {/* Feature 5 */}
          <div className="p-6 rounded-xl shadow-sm border border-slate-200 bg-white transition duration-300 hover:shadow-[0_0_25px_3px_rgba(34,197,94,0.35)]">
            <div className="mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-green-50">
                🩺
              </div>
            </div>
            <h3 className="text-lg font-semibold text-slate-800">{t('feat_ai_title')}</h3>
            <p className="mt-2 text-slate-600 text-sm">
              {t('feat_ai_desc')}
            </p>
          </div>



        </div>
        <div className="mt-6 flex items-center justify-center gap-4">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
            {t('explore_features')}
          </button>
        </div>

      </section>
    </>
  );
}
