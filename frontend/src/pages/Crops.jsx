import React, { useState } from "react";
import { Sprout, Info, Droplet, TrendingUp } from "lucide-react";
import Navbar from "../components/Navbar";

// ✅ Crop recommendations with Hindi + English names & profit
const cropRecommendations = {
  "Clay Soil": {
    Kharif: [
      { name: "चावल / Rice", profit: "लाभ ₹40,000/एकड़ / Profit ₹40,000/acre", priority: 1 },
      { name: "सोयाबीन / Soybean", profit: "लाभ ₹28,000/एकड़ / Profit ₹28,000/acre", priority: 2 },
      { name: "मूंगफली / Groundnut", profit: "लाभ ₹25,000/एकड़ / Profit ₹25,000/acre", priority: 3 },
    ],
    Rabi: [
      { name: "गेहूं / Wheat", profit: "लाभ ₹30,000/एकड़ / Profit ₹30,000/acre", priority: 1 },
      { name: "सरसों / Mustard", profit: "लाभ ₹26,000/एकड़ / Profit ₹26,000/acre", priority: 2 },
      { name: "मटर / Peas", profit: "लाभ ₹22,000/एकड़ / Profit ₹22,000/acre", priority: 3 },
    ],
    Zaid: [
      { name: "तरबूज / Watermelon", profit: "लाभ ₹35,000/एकड़ / Profit ₹35,000/acre", priority: 1 },
      { name: "खीरा / Cucumber", profit: "लाभ ₹20,000/एकड़ / Profit ₹20,000/acre", priority: 2 },
    ],
  },
  "Sandy Soil": {
    Kharif: [
      { name: "बाजरा / Bajra", profit: "लाभ ₹18,000/एकड़ / Profit ₹18,000/acre", priority: 2 },
      { name: "मक्का / Maize", profit: "लाभ ₹22,000/एकड़ / Profit ₹22,000/acre", priority: 1 },
    ],
    Rabi: [
      { name: "चना / Gram", profit: "लाभ ₹24,000/एकड़ / Profit ₹24,000/acre", priority: 1 },
      { name: "जौ / Barley", profit: "लाभ ₹20,000/एकड़ / Profit ₹20,000/acre", priority: 2 },
    ],
    Zaid: [{ name: "कद्दू / Pumpkin", profit: "लाभ ₹25,000/एकड़ / Profit ₹25,000/acre", priority: 1 }],
  },
};

const soilTypes = [
  { value: "Clay Soil", label: "चिकनी मिट्टी / Clay Soil" },
  { value: "Sandy Soil", label: "रेतीली मिट्टी / Sandy Soil" },
  { value: "Loamy Soil", label: "दोमट मिट्टी / Loamy Soil" },
  { value: "Red Soil", label: "लाल मिट्टी / Red Soil" },
  { value: "Black Soil", label: "काली मिट्टी / Black Soil" },
];

const seasons = [
  { value: "Kharif", label: "खरीफ (जून-अक्टूबर) / Kharif" },
  { value: "Rabi", label: "रबी (नवंबर-मार्च) / Rabi" },
  { value: "Zaid", label: "जायद (अप्रैल-जून) / Zaid" },
];

const soilHealthTips = [
  {
    icon: <Info className="h-5 w-5 text-orange-600" />,
    tip: "नियमित मिट्टी जांच करें / Regular soil testing recommended",
  },
  {
    icon: <Sprout className="h-5 w-5 text-green-600" />,
    tip: "जैविक खाद का उपयोग करें / Use organic fertilizers",
  },
  {
    icon: <Droplet className="h-5 w-5 text-blue-600" />,
    tip: "पानी की बचत करें / Practice water conservation",
  },
];

const Crops = () => {
  const [soilType, setSoilType] = useState("");
  const [season, setSeason] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleRecommend = () => {
    if (soilType && season) {
      const recs = cropRecommendations[soilType]?.[season] || [];
      const sorted = [...recs].sort((a, b) => a.priority - b.priority);
      setSuggestions(sorted);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="bg-gray-50 min-h-screen p-4 pb-24 ">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
          🌾 फसल सलाह / Crop Advisor
        </h1>
        <p className="text-gray-600 mt-1">
          मिट्टी का प्रकार और मौसम चुनें • Choose soil type and season for best crops.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-3xl mx-auto space-y-5">
        <h2 className="text-xl font-bold flex items-center gap-2 text-green-700">
          <Info className="text-orange-500" /> मिट्टी विश्लेषण / Soil Analysis
        </h2>

        <div>
          <label className="block font-semibold mb-1">मिट्टी का प्रकार / Soil Type</label>
          <select
            className="w-full border rounded-lg px-3 py-2"
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
          >
            <option value="">मिट्टी चुनें / Select Soil</option>
            {soilTypes.map((soil) => (
              <option key={soil.value} value={soil.value}>
                {soil.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">मौसम / Season</label>
          <select
            className="w-full border rounded-lg px-3 py-2"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
          >
            <option value="">मौसम चुनें / Select Season</option>
            {seasons.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <button
          className="w-full mt-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 hover:from-green-700 hover:to-green-600 transition"
          onClick={handleRecommend}
        >
          <Sprout className="h-5 w-5" /> फसल सुझाव देखें / View Crop Suggestions
        </button>
      </div>

      {/* Recommendations */}
      {suggestions.length > 0 && (
        <div className="max-w-4xl mx-auto mt-10 space-y-4">
          <h3 className="text-2xl font-bold text-green-700 text-center mb-4">
            📊 अनुशंसित फसलें / Recommended Crops
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            {suggestions.map((crop, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition border-t-4 border-green-500"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold text-green-700 flex items-center gap-2">
                    <Sprout className="text-green-600" /> {crop.name}
                  </h4>
                  <span className="text-sm text-gray-500">Priority #{crop.priority}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <TrendingUp className="text-green-600" />
                  {crop.profit}
                </div>
                {idx === 0 && (
                  <p className="mt-2 text-sm text-green-600 font-medium">
                    ⭐ सर्वोत्तम विकल्प / Top Choice!
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto mt-10">
        <h2 className="text-xl font-bold text-green-700 mb-4">
          🌱 मिट्टी स्वास्थ्य सुझाव / Soil Health Tips
        </h2>
        <ul className="space-y-3">
          {soilHealthTips.map((tip, i) => (
            <li
              key={i}
              className="flex items-center gap-3 bg-green-50 rounded-lg px-3 py-2 hover:bg-green-100 transition"
            >
              {tip.icon}
              <span className="text-gray-800">{tip.tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default Crops;
