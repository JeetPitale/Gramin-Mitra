import React, { useState } from "react";
import { Sprout as Seedling, BarChart2, TrendingUp, Info } from "lucide-react";

// Sample market trend and prediction logic
const cropMarketTrends = {
  Wheat: 2100, // ₹/quintal
  Rice: 2800,
  Cotton: 6700,
  Tomato: 1900,
  Onion: 1150,
  Soybean: 4000,
};

const soilCropSuitability = {
  "Clay Soil": ["Rice", "Soybean", "Groundnut", "Wheat", "Barley", "Oats"],
  "Sandy Soil": ["Carrot", "Potatoes", "Radishes", "Bajra", "Maize", "Gram"],
  "Loamy Soil": ["Millets","Sugarcane", "Mustard", "Cotton"],
  "Red Soil": ["Jowar","Ragi","Bajra","Millets", "Groundnut", "Lentil"],
  "Black Soil": ["Cotton","Jowar", "Soybean", "Sunflower","Corn","Tabacco"],
};

const selectedCropsLabels = {
  Wheat: "गेहूं / Wheat",
  Rice: "धान / Rice",
  Cotton: "कपास / Cotton",
  Tomato: "टमाटर / Tomato",
  Onion: "प्याज / Onion",
  Soybean: "सोयाबीन / Soybean"
};

const questions = [
  { key: "location", label: "आपका स्थान / Your Location", type: "text", placeholder: "स्थान दर्ज करें / Enter your location" },
  { key: "soilType", label: "मिट्टी का प्रकार / Soil Type", type: "select", options: [
    "चिकनी मिट्टी / Clay Soil", "रेतीली मिट्टी / Sandy Soil", "दोमट मिट्टी / Loamy Soil", "लाल मिट्टी / Red Soil", "काली मिट्टी / Black Soil"
  ]},
  { key: "area", label: "कुल क्षेत्रफल (एकड़ में) / Total Area (in Acres)", type: "number", placeholder: "उदाहरण: 5" },
  { key: "season", label: "मौसम / Season", type: "select", options: [
    "खरीफ / Kharif", "रबी / Rabi", "जायद / Zaid"
  ]}
];

const SmartPlanner = () => {
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { value } = e.target;
    setAnswers({ ...answers, [questions[step].key]: value });
  };

  // Prediction logic
  const handleSubmit = () => {
    // Soil type mapping extraction
    const selectedSoilType = questions[1].options.find(
      o => o === answers.soilType
    );
    let soilTypeEng = "Clay Soil";
    if (selectedSoilType) {
      // Extract English part from ("चिकनी मिट्टी / Clay Soil")
      soilTypeEng = selectedSoilType.split("/")[1].trim();
    }
    // Suitable crops for soil
    const suitableCrops = soilCropSuitability[soilTypeEng] || [];
    // Find the crop in suitability with highest market price
    let bestCrop = suitableCrops[0];
    let bestPrice = 0;
    suitableCrops.forEach(crop => {
      if (cropMarketTrends[crop] && cropMarketTrends[crop] > bestPrice) {
        bestCrop = crop;
        bestPrice = cropMarketTrends[crop];
      }
    });
    setResult({
      location: answers.location,
      soilType: answers.soilType,
      area: answers.area,
      season: answers.season,
      bestCrop,
      marketPrice: cropMarketTrends[bestCrop] || "-",
      alternatives: suitableCrops,
    });
  };

  return (
    <div className="p-4 pb-20 space-y-8 max-w-2xl mx-auto">
      {/* Title */}
      <div className="text-center mb-3">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">स्मार्ट योजनाकार</h1>
        <p className="text-muted-foreground">Smart Planner for Farmers</p>
      </div>
      {/* Stepper and Questions */}
      <div className="bg-white rounded-xl shadow p-7">
        {!result ? (
          <>
            <div className="mb-6 text-xl font-bold flex gap-2">
              <BarChart2 className="h-5 w-5 text-primary" />
              कृपया जानकारी भरें / Please answer the questions
            </div>
            <form
              onSubmit={e => {
                e.preventDefault();
                if (step < questions.length - 1) setStep(step + 1);
                else handleSubmit();
              }}
            >
              <div className="mb-6">
                <label className="font-medium mb-2 block text-lg">{questions[step].label}</label>
                {questions[step].type === "text" && (
                  <input
                    type="text"
                    className="border rounded px-3 py-2 w-full"
                    value={answers[questions[step].key] || ""}
                    placeholder={questions[step].placeholder}
                    onChange={handleChange}
                    required
                  />
                )}
                {questions[step].type === "number" && (
                  <input
                    type="number"
                    className="border rounded px-3 py-2 w-full"
                    value={answers[questions[step].key] || ""}
                    placeholder={questions[step].placeholder}
                    onChange={handleChange}
                    required
                  />
                )}
                {questions[step].type === "select" && (
                  <select
                    className="border rounded px-3 py-2 w-full"
                    value={answers[questions[step].key] || ""}
                    onChange={handleChange}
                    required
                  >
                    <option value="">चुनें / Select</option>
                    {questions[step].options.map((o, i) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                )}
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white font-bold rounded px-6 py-2 w-full transition hover:bg-green-700"
              >
                {step < questions.length - 1 ? "अगला / Next" : "सुझाव देखें / See Suggestions"}
              </button>
              {step > 0 && (
                <button
                  type="button"
                  className="mt-3 text-gray-600 underline"
                  onClick={() => setStep(step - 1)}
                >
                  पिछला / Previous
                </button>
              )}
            </form>
          </>
        ) : (
          <div>
            <div className="mb-6 text-xl font-bold flex gap-2">
              <TrendingUp className="h-5 w-5 text-green-700" />
              आपके लिए सर्वश्रेष्ठ फसल / Best Crop for You
            </div>
            <div className="mb-4">
              <div>
                <strong>स्थान / Location:</strong> {result.location}
              </div>
              <div>
                <strong>मिट्टी / Soil Type:</strong> {result.soilType}
              </div>
              <div>
                <strong>क्षेत्र / Area:</strong> {result.area} एकड़ / Acre
              </div>
              <div>
                <strong>मौसम / Season:</strong> {result.season}
              </div>
            </div>
            <div className="border-t pt-4 mb-4">
              <h2 className="text-lg font-bold text-green-700">
                अनुशंसित फसल / Recommended Crop:
                <span className="ml-2">{selectedCropsLabels[result.bestCrop] || result.bestCrop}</span>
              </h2>
              <div className="text-base mt-1 mb-2">
                <strong>बाजार मूल्य / Market Price:</strong> ₹{result.marketPrice} प्रति क्विंटल / quintal
              </div>
              <div className="mb-2 text-gray-700">
                <Info className="inline h-4 w-4 text-blue-600 mr-1" />
                अन्य विकल्प / Other options: {result.alternatives.map(
                  crop => selectedCropsLabels[crop] || crop
                ).join(", ")}
              </div>
            </div>
            <button
              className="bg-gray-200 rounded px-4 py-2 mt-2 font-semibold text-primary"
              onClick={() => {
                setResult(null); setAnswers({}); setStep(0);
              }}
            >
              फिर से योजना बनाएं / Plan Again
            </button>
          </div>
        )}
      </div>
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow flex justify-around py-2 z-10 md:hidden">
        <div className="text-center text-muted-foreground hover:text-green-600">
          <span className="block text-xl mb-1">🏠</span>
          <span className="text-xs">होम<br />Home</span>
        </div>
        <div className="text-center text-gray-500">
          <span className="block text-xl mb-1">🌦️</span>
          <span className="text-xs">मौसम<br />Weather</span>
        </div>
        <div className="text-center text-gray-500">
          <span className="block text-xl mb-1">🌱</span>
          <span className="text-xs">फसल<br />Crops</span>
        </div>
        <div className="text-center text-gray-700">
          <span className="block text-xl mb-1">📖</span>
          <span className="text-xs">योजनाएँ<br />Schemes</span>
        </div>
        <div className="text-center text-green-700">
          <span className="block text-xl mb-1">🧮</span>
          <span className="text-xs">प्लानर<br />Planner</span>
        </div>
      </nav>
    </div>
  );
};

export default SmartPlanner;
