import React from "react";
import { BadgeCheck, Info, Users, BookOpen, ExternalLink, Calendar } from "lucide-react";
import Navbar from "../components/Navbar";

// Sample schemes data
const schemes = [
  {
    status: "active",
    hindi: "प्रधानमंत्री किसान सम्मान निधि",
    english: "PM-KISAN",
    description: "सभी किसानों को ₹6000 सालाना / ₹6000 annual for all farmers",
    amount: "₹6,000",
    eligibility: "सभी किसान / All farmers",
    detailsUrl: "https://pmkisan.gov.in/",
    applyUrl: "https://pmkisan.gov.in/"
  },
  {
    status: "active",
    hindi: "फसल बीमा योजना",
    english: "Crop Insurance Scheme",
    description: "फसल नुकसान की सुरक्षा / Protection against crop loss",
    amount: "प्रीमियम का 2% / 2% premium",
    eligibility: "सभी किसान / All farmers",
    detailsUrl: "https://pmfby.gov.in/",
    applyUrl: "https://pmfby.gov.in/"
  },
  {
    status: "active",
    hindi: "कृषि यंत्र अनुदान",
    english: "Farm Equipment Subsidy",
    description: "कृषि उपकरण पर सब्सिडी / Subsidy on farm equipment",
    amount: "50% तक / Upto 50%",
    eligibility: "छोटे किसान / Small farmers",
    detailsUrl: "https://farmer.mpdage.org/Home/Index",
    applyUrl: "https://farmer.mpdage.org/Home/Index"
  },
  {
    status: "new",
    hindi: "जैविक खेती प्रोत्साहन",
    english: "Organic Farming Incentive",
    description: "जैविक खेती को बढ़ावा / Promote organic farming",
    amount: "₹31,000 /हेक्टेयर",
    eligibility: "प्रमाणित किसान / Certified farmers",
    detailsUrl: "https://onlinedbtagriservice.bihar.gov.in/OrganicPromotion/",
    applyUrl: "https://onlinedbtagriservice.bihar.gov.in/OrganicPromotion/"
  }
];

// Application Info docs
const applicationDocs = [
  "आधार कार्ड / Aadhaar Card",
  "बैंक पासबुक / Bank Passbook",
  "भूमि के कागजात / Land Documents",
  "पासपोर्ट साइज फोटो / Passport Size Photo"
];

const Schemes = () => (
  <>
  <Navbar/>
  <div className="p-4 pb-20 space-y-8">
    {/* Title */}
    <div className="text-center mb-3">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">सरकारी योजनाएं</h1>
      <p className="text-muted-foreground">Government Schemes for Farmers</p>
    </div>

    {/* Latest Schemes Hero Card */}
    <div className="bg-gradient-to-tr from-green-100 via-blue-50 to-transparent rounded-xl px-6 py-4 mb-6">
      <div className="flex items-center gap-2 mb-1 font-bold text-xl text-green-800">
        <BadgeCheck className="h-5 w-5 text-green-600" />
        नई योजनाएं / Latest Schemes
      </div>
      <p className="text-gray-700 text-sm">
        किसानों के लिए नवीनतम सरकारी योजनाओं की जानकारी प्राप्त करें <br />
        <span className="text-muted-foreground">Get information about latest government schemes for farmers</span>
      </p>
    </div>

    {/* List of schemes */}
    <div className="space-y-5">
      {schemes.map((scheme, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl border shadow-sm px-5 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative"
        >
          {/* Status badge */}
          <span className={`absolute right-6 top-6 text-xs px-3 py-1 rounded-full font-semibold
            ${scheme.status === "active" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-700"}`}>
            {scheme.status === "active" ? "सक्रिय" : "नई"}
          </span>
          {/* Main Info */}
          <div className="flex-1">
            <h2 className="font-bold text-lg md:text-xl mb-1">{scheme.hindi}</h2>
            <div className="text-sm text-muted-foreground font-semibold mb-2">{scheme.english}</div>
            <div className="mb-2">{scheme.description}</div>
            <div className="flex flex-wrap gap-8 mb-2">
              <div>
                <div className="text-xs text-gray-500 mb-0.5">राशि / Amount</div>
                <div className="font-bold text-green-700">{scheme.amount}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-0.5">पात्रता / Eligibility</div>
                <div className="flex items-center gap-2 font-semibold">
                  <Users className="h-4 w-4 text-primary" />
                  {scheme.eligibility}
                </div>
              </div>
            </div>
          </div>
          {/* Actions */}
          <div className="flex flex-row gap-3 md:flex-col md:items-end md:gap-2">
            <a href={scheme.detailsUrl} className="text-green-700 hover:underline flex items-center gap-1 font-medium text-sm">
              <BookOpen className="h-5 w-5" />
              विवरण / Details
            </a>
            <a
              href={scheme.applyUrl}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded transition flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
              आवेदन / Apply
            </a>
          </div>
        </div>
      ))}
    </div>

    {/* Application Info Card */}
    <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-6 py-6 mt-8 mb-20 max-w-3xl mx-auto">
      <div className="flex items-center gap-2 font-bold text-lg mb-2 text-yellow-900">
        <Calendar className="h-5 w-5 text-yellow-700" />
        आवेदन की जानकारी / Application Info
      </div>
      <div className="text-sm mb-2 text-gray-800">आवेदन के लिए आवश्यक दस्तावेज:</div>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        {applicationDocs.map((doc, i) => (
          <li key={i}>{doc}</li>
        ))}
      </ul>
      <a
        href="#"
        className="block w-full bg-gradient-to-r from-green-700 via-yellow-600 to-green-400 text-white text-center font-bold py-3 rounded mt-2 transition hover:from-green-600 hover:via-yellow-500"
      >
        <BookOpen className="inline h-5 w-5 mr-2" />
        आवेदन गाइड डाउनलोड करें / Download Application Guide
      </a>
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
      <div className="text-center text-green-700">
        <span className="block text-xl mb-1">📖</span>
        <span className="text-xs">योजनाएँ<br />Schemes</span>
      </div>
    </nav>
  </div>
  </>
);

export default Schemes;
