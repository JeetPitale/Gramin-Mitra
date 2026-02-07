// DiseaseDetector.jsx
import React, { useState } from "react";
import { UploadCloud, Info, AlertTriangle } from "lucide-react";
import Navbar from "../components/Navbar";

const mockDetectionAPI = (cropImage, soilImage) => {
  // Mock detection logic: returns sample results
  return new Promise((resolve) => {
   
    setTimeout(() => {
      resolve({
        disease: "Leaf Blight / पत्ती की बर्बादी",
        severity: "Medium / मध्यम",
        precautions: [
          "Remove affected leaves / प्रभावित पत्तियां हटाएँ",
          "Avoid overwatering / अधिक पानी देने से बचें",
          "Use organic fungicide / जैविक फफूंदनाशक का उपयोग करें",
        ],
        nextSteps: [
          "Monitor daily / दैनिक निगरानी करें",
          "Maintain proper spacing / सही दूरी बनाए रखें",
          "Ensure sunlight exposure / पर्याप्त धूप दें",
        ],
      });
    }, 2000);
  });
};

const DiseaseDetector = () => {
  const [cropImage, setCropImage] = useState(null);
  const [soilImage, setSoilImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!cropImage && !soilImage) return;
    setLoading(true);
    setResult(null);
    const res = await mockDetectionAPI(cropImage, soilImage);
    setResult(res);
    setLoading(false);
  };

  return (
    <>
    <Navbar/>
    <div className="p-4 md:p-10 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-2">
          रोग पहचान / Disease Detector
        </h1>
        <p className="text-gray-600">
          Upload crop or soil images to detect disease and get steps / फसल या मिट्टी की छवि अपलोड करें और रोग पहचानें
        </p>
      </div>

      {/* Image Upload Section */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
        {/* Crop Image */}
        <div className="flex flex-col items-center bg-white rounded-xl shadow p-4 w-full md:w-1/2">
          <label className="flex flex-col items-center cursor-pointer">
            <UploadCloud className="h-10 w-10 text-green-600 mb-2" />
            <span className="text-gray-700 mb-2">Upload Crop Image / फसल छवि अपलोड करें</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setCropImage(e.target.files[0])}
            />
          </label>
          {cropImage && (
            <img
              src={URL.createObjectURL(cropImage)}
              alt="Crop Preview"
              className="mt-4 w-full h-40 object-cover rounded-lg shadow"
            />
          )}
        </div>

        {/* Soil Image */}
        <div className="flex flex-col items-center bg-white rounded-xl shadow p-4 w-full md:w-1/2">
          <label className="flex flex-col items-center cursor-pointer">
            <UploadCloud className="h-10 w-10 text-green-600 mb-2" />
            <span className="text-gray-700 mb-2">Upload Soil Image / मिट्टी छवि अपलोड करें</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setSoilImage(e.target.files[0])}
            />
          </label>
          {soilImage && (
            <img
              src={URL.createObjectURL(soilImage)}
              alt="Soil Preview"
              className="mt-4 w-full h-40 object-cover rounded-lg shadow"
            />
          )}
        </div>
      </div>

      {/* Analyze Button */}
      <div className="text-center">
        <button
          onClick={handleAnalyze}
          disabled={loading || (!cropImage && !soilImage)}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze / विश्लेषण करें"}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="bg-white shadow rounded-xl p-6 space-y-4">
          <h2 className="text-2xl font-bold text-green-700 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            Disease Detected / रोग पहचान
          </h2>
          <p className="text-gray-800">
            <span className="font-semibold">Disease / रोग:</span> {result.disease}
          </p>
          <p className="text-gray-800">
            <span className="font-semibold">Severity / गंभीरता:</span> {result.severity}
          </p>

          {/* Precautions */}
          <div>
            <h3 className="font-semibold text-green-600 mb-2">Precautions / सावधानियाँ:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {result.precautions.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>

          {/* Next Steps */}
          <div>
            <h3 className="font-semibold text-green-600 mb-2">Next Steps / अगले कदम:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {result.nextSteps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default DiseaseDetector;
