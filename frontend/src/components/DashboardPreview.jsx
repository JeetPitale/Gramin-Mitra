import React from "react";
import dashboard from "../images/dashboard.jpg"

export default function DashboardPreview() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      <section className="py-20 px-6 md:px-20 bg-white">
        {/* Badge */}
        <div className="flex justify-center mb-4">
          <span className="flex items-center gap-2 px-4 py-1 text-sm rounded-full bg-green-50 border border-green-200 text-slate-700 font-medium">
            📊 Dashboard Preview
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800">
          Your Farm at a <span className="text-green-600">Glance</span>
        </h2>
        <p className="mt-4 text-center text-slate-600 max-w-2xl mx-auto">
          Monitor all your farm operations from one intuitive dashboard. Real-time data, actionable insights, 
          and predictive analytics at your fingertips.
        </p>

        {/* Content */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Dashboard Image */}
          <div className="relative">
            <img
              src={dashboard} // Replace with your actual dashboard image path
              alt="Dashboard Preview"
              className="rounded-xl shadow-lg"
            />
            {/* Status Card Overlay */}
            <div className="absolute top-6 left-6 bg-white border border-slate-200 rounded-xl shadow-md px-4 py-3">
              <p className="text-sm text-slate-700 font-medium flex items-center gap-2">
                <span className="text-green-500">✔</span> Field Status
              </p>
              <p className="text-2xl font-bold text-green-600">98%</p>
              <p className="text-xs text-slate-500">Healthy crops</p>
            </div>
          </div>

          {/* Feature Points */}
          <div className="space-y-8">
            {/* Real-time Monitoring */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-50">
                  🌡️
                </div>
                <h3 className="text-lg font-semibold text-slate-800">
                  Real-time Monitoring
                </h3>
              </div>
              <p className="text-slate-600 text-sm ml-13">
                Track temperature, humidity, soil conditions, and crop health with live sensor data.
              </p>
              <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-green-50 border border-green-200 text-slate-700">
                Live Data
              </span>
            </div>

            {/* Predictive Analytics */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-50">
                  📈
                </div>
                <h3 className="text-lg font-semibold text-slate-800">
                  Predictive Analytics
                </h3>
              </div>
              <p className="text-slate-600 text-sm ml-13">
                AI-powered forecasts for yield prediction, optimal harvest timing, and resource planning.
              </p>
              <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-green-50 border border-green-200 text-slate-700">
                AI Powered
              </span>
            </div>

            {/* Smart Alerts */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-50">
                  🔔
                </div>
                <h3 className="text-lg font-semibold text-slate-800">
                  Smart Alerts
                </h3>
              </div>
              <p className="text-slate-600 text-sm ml-13">
                Receive instant notifications for weather changes, pest risks, and irrigation needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
 