import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Preloader from "./components/Preloader";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FarmingGuide from "./pages/FarmingGuide";
import FarmerDashboard from "./pages/FarmerDashboard";
import WholesaleDashboard from "./pages/WholesaleDashboard";

import Weather from "./pages/Weather";
import Crops from "./pages/Crops";
import Schemes from "./pages/Schemes";
import DiseaseDetector from "./pages/DiseaseDetector";
import SmartPlanning from "./pages/SmartPlanner";



const Main = () => {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true); // Initial load

  useEffect(() => {
    // Only trigger preloader on initial mount
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4500); // adjusted time to match new preloader length
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Preloader />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/farming-guide" element={<FarmingGuide />} />

        {/* Protected Routes - Farmer */}
        <Route
          path="/farmer-dashboard"
          element={
            <ProtectedRoute allowedRoles={['farmer']}>
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes - Wholesale */}
        <Route
          path="/wholesale-dashboard"
          element={
            <ProtectedRoute allowedRoles={['wholesale']}>
              <WholesaleDashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Feature Routes */}
        <Route path="/weather" element={<ProtectedRoute><Weather /></ProtectedRoute>} />
        <Route path="/crops" element={<ProtectedRoute><Crops /></ProtectedRoute>} />
        <Route path="/schemes" element={<ProtectedRoute><Schemes /></ProtectedRoute>} />
        <Route path="/diseasedetector" element={<ProtectedRoute><DiseaseDetector /></ProtectedRoute>} />
        <Route path="/smartplanning" element={<ProtectedRoute><SmartPlanning /></ProtectedRoute>} />


        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </LanguageProvider>
  )
}

export default App;