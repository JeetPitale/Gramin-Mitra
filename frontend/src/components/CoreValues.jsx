import React from "react";

const values = [
  {
    icon: (
      <svg className="h-12 w-12 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="10" strokeWidth="2" stroke="currentColor" />
        <circle cx="12" cy="12" r="4" strokeWidth="2" stroke="currentColor" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
    title: "Innovation",
    desc: "Continuously pushing the boundaries of agricultural technology to solve real-world challenges."
  },
  {
    icon: (
      <svg className="h-12 w-12 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M12 19C7 20 4 16 4 12v-1c0-4 4-7 8-7s8 3 8 7v1c0 4-3 8-8 7z" strokeWidth="2" stroke="currentColor" />
        <path d="M9 14s.5-2 3-2 3 2 3 2" strokeWidth="2" stroke="currentColor" />
      </svg>
    ),
    title: "Sustainability",
    desc: "Promoting environmentally responsible farming practices for a healthier planet."
  },
  {
    icon: (
      <svg className="h-12 w-12 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="7" r="4" strokeWidth="2" stroke="currentColor" />
        <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" strokeWidth="2" stroke="currentColor" />
      </svg>
    ),
    title: "Community",
    desc: "Building a supportive network of farmers, experts, and innovators working together."
  }
];

export default function CoreValues() {
  return (
    <section className="bg-white-50 w-full py-16 px-4 lg:px-20 text-center">
      <h2 className="text-3xl lg:text-4xl font-extrabold mb-12 text-gray-800 relative inline-block">
        Our Core Values
        <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-24 h-1 rounded-full bg-gradient-to-r from-green-400 to-green-600"></span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {values.map((val) => (
          <div
            key={val.title}
            className="bg-white rounded-xl shadow-lg border border-gray-100 px-6 py-10 hover:shadow-[0_0_25px_3px_rgba(34,197,94,0.35)] transform hover:-translate-y-2 transition-all duration-300"
          >
            <div className="mb-5">{val.icon}</div>
            <h3 className="font-bold text-xl text-gray-800 mb-3">{val.title}</h3>
            <p className="text-gray-600 text-base">{val.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
