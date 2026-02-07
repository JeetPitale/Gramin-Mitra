// Footer.jsx

import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white w-full border-t font-sans">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 lg:px-20 py-10 flex flex-col md:flex-row gap-10">
        {/* Logo & About */}
        <div className="flex-1 min-w-[200px]">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-green-100 rounded-full p-2">
              <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-bold text-lg text-gray-800">GreenGo Crop Helper</span>
          </div>
          <p className="text-gray-600 mb-5 text-base">
            {t('footer_desc')}
          </p>
          <div className="flex gap-3">
            {/* Social icons here (omitted for brevity) */}
          </div>
        </div>
        {/* Quick Links */}
        <div className="flex-[2] grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Product */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3">{t('product')}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-700 hover:text-green-600">{t('features')}</a></li>
              <li><a href="#" className="text-gray-700 hover:text-green-600">{t('dashboard')}</a></li>
              <li><a href="#" className="text-gray-700 hover:text-green-600">{t('pricing')}</a></li>
              <li><a href="#" className="text-gray-700 hover:text-green-600">{t('api')}</a></li>
            </ul>
          </div>
          {/* Company */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3">{t('company')}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-700 hover:text-green-600">{t('about')}</a></li>
              <li><a href="#" className="text-gray-700 hover:text-green-600">{t('contact')}</a></li>
              <li><a href="#" className="text-gray-700 hover:text-green-600">{t('careers')}</a></li>
              <li><a href="#" className="text-gray-700 hover:text-green-600">{t('blog')}</a></li>
            </ul>
          </div>
          {/* Resources */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3">{t('resources')}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-700 hover:text-green-600">{t('documentation')}</a></li>
              <li><a href="#" className="text-gray-700 hover:text-green-600">{t('help_center')}</a></li>
              <li><a href="#" className="text-gray-700 hover:text-green-600">{t('community')}</a></li>
              <li><a href="#" className="text-gray-700 hover:text-green-600">{t('webinars')}</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Subscribe Bar */}
      <div className="max-w-5xl mx-auto border-t pt-10 pb-10 px-4 text-center">
        <h3 className="font-extrabold text-xl mb-4 text-gray-900">{t('subscribe_title')}</h3>
        <p className="text-gray-600 mb-5">
          {t('subscribe_desc')}
        </p>

        {/* ✅ Subscription Form w/ Translation */}
        <form
          className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const email = e.target.email.value;
              const res = await fetch(
                "https://jeetzo.app.n8n.cloud/webhook/a3d6ce33-3013-41bb-9757-f0c96de64723",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email }),
                }
              );
              if (!res.ok) throw new Error("Request failed: " + res.status);
              alert(t('subs_success'));
              e.target.reset(); // Clear the input
            } catch (err) {
              console.error(err);
              alert("Subscription failed: " + err.message);
            }
          }}
        >
          <input
            type="email"
            name="email"
            className="h-12 px-4 rounded border w-full sm:w-2/3 focus:outline-none focus:ring-green-500"
            placeholder={t('enter_email')}
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-3 rounded font-semibold mt-2 sm:mt-0 hover:bg-green-600 transition"
          >
            {t('subscribe')}
          </button>
        </form>

      </div>
    </footer>
  );
}