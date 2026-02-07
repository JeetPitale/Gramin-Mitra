import React from "react";
import crops from "../images/crops.jpg"
import { FaHandHolding, FaZhihu } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full h-[85vh] flex flex-col justify-center items-start px-6 md:px-20 overflow-hidden">
      {/* Background SVG */}
      <img
        src={crops} // replace with your SVG path
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30 -z-10"
      />

      {/* Overlay (optional, for better text visibility) */}
      <div className="absolute inset-0 bg-gray/0 -z-0"></div>

      {/* Content */}
      <div className="relative z-10">
        <span className="text-green-600 text-sm font-medium mb-2 inline-block">
          {t('hero_tagline')}
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          {t('hero_title_1')} <span className="text-green-600">{t('hero_title_2')}</span>
        </h1>
        <p className="mt-4 text-gray-700 max-w-lg">
          {t('hero_desc')}
        </p>
        <div className="mt-6 flex items-center gap-4">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
            {t('get_started')}
          </button>
        </div>
      </div>

    </section>
  );
}
