// Contact.jsx

import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <main className="bg-white min-h-screen font-sans">
      <section className="max-w-7xl mx-auto px-4 lg:px-24 py-10">
        {/* Heading */}
        <div className="text-center mb-10">
          <button className="bg-green-100 text-green-900 font-medium rounded-full px-4 py-2 mb-4">{t('contact_badge')}</button>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3">
            {t('contact_heading_1')} <span className="text-green-500">{t('contact_heading_2')}</span>
          </h1>
          <p className="text-gray-700 text-base lg:text-lg">
            {t('contact_subheading')}
          </p>
        </div>
        {/* Main content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Contact Info */}
          <div className="flex-1">
            <h2 className="font-bold text-lg mb-6 text-gray-900">{t('get_in_touch')}</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 rounded-full p-3">
                  <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 8V7a4 4 0 0 0-4-4H7A4 4 0 0 0 3 7v1" /><rect width="18" height="13" x="3" y="8" rx="2" /><path d="M3 8l9 6 9-6" /></svg>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{t('email_us')}</div>
                  <div className="text-green-700">hello@greengo-crop.com</div>
                  <div className="text-gray-500 text-sm">Get in touch with our team</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 rounded-full p-3">
                  <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13.81.32 1.65.57 2.48a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6.91 6.91l1.6-1.6a2 2 0 0 1 2.11-.45c.83.25 1.67.44 2.48.57A2 2 0 0 1 22 16.92z" /></svg>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{t('call_us')}</div>
                  <div className="text-green-700">+1 (555) 123-4567</div>
                  <div className="text-gray-500 text-sm">Mon-Fri 9AM-6PM EST</div>
                </div>
              </div>
            </div>
          </div>
          {/* Right: Form */}
          <div className="flex-1 bg-white rounded-xl border shadow p-6">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); alert(t('contact_success')); }}>
              {/* First Name */}
              <div className="flex flex-col mb-3">
                <label className="text-gray-700 text-sm font-medium mb-1">{t('first_name')}</label>
                <input type="text" className="bg-gray-50 border rounded py-2 px-3 focus:outline-none" placeholder={t('first_name')} />
              </div>
              {/* Last Name */}
              <div className="flex flex-col mb-3">
                <label className="text-gray-700 text-sm font-medium mb-1">{t('last_name')}</label>
                <input type="text" className="bg-gray-50 border rounded py-2 px-3 focus:outline-none" placeholder={t('last_name')} />
              </div>
              {/* Email */}
              <div className="flex flex-col mb-3 md:col-span-1">
                <label className="text-gray-700 text-sm font-medium mb-1">{t('email')}</label>
                <input type="email" className="bg-gray-50 border rounded py-2 px-3 focus:outline-none" placeholder={t('email')} />
              </div>
              {/* Phone Number */}
              <div className="flex flex-col mb-3 md:col-span-1">
                <label className="text-gray-700 text-sm font-medium mb-1">{t('phone_number')}</label>
                <input type="text" className="bg-gray-50 border rounded py-2 px-3 focus:outline-none" placeholder={t('phone_number')} />
              </div>
              {/* Message (full width) */}
              <div className="flex flex-col mb-3 col-span-1 md:col-span-2">
                <label className="text-gray-700 text-sm font-medium mb-1">{t('message')}</label>
                <textarea rows={4} className="bg-gray-50 border rounded py-2 px-3 focus:outline-none" placeholder={t('message')}></textarea>
              </div>
              {/* Submit */}
              <div className="mt-2 col-span-1 md:col-span-2">
                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded px-6 py-2 w-full md:w-auto shadow transition-colors">
                  {t('send_message')} <span className="ml-2">✈️</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
