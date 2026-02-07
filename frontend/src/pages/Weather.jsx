import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { FaSearch, FaMapMarkerAlt, FaTint, FaWind, FaCloudRain, FaThermometerHalf } from "react-icons/fa";

const API_KEY = "27d9836aca2228f23b391220af6e2798";

export default function Weather() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Ref to handle clicking outside suggestions
  const searchRef = useRef(null);

  useEffect(() => {
    // Click outside to close suggestions
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    
    // Initial Geolocation Fetch
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
        () => setError("Location access denied. Please search manually.")
      );
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Logic Section ---

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      setError("");
      setShowSuggestions(false);

      // 1. Fetch Current Weather
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      if (!weatherRes.ok) throw new Error("Weather fetch failed");
      const weatherData = await weatherRes.json();
      setWeather(weatherData);

      // 2. Fetch Forecast
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      if (!forecastRes.ok) throw new Error("Forecast fetch failed");
      const forecastData = await forecastRes.json();

      processForecastData(forecastData.list);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch weather data. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const processForecastData = (list) => {
    const dailyMap = {};
    
    list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0]; // YYYY-MM-DD
      if (!dailyMap[date]) {
        dailyMap[date] = { temps: [], rain: 0, icon: item.weather[0].icon, description: item.weather[0].main };
      }
      dailyMap[date].temps.push(item.main.temp);
      // Update icon to the one at noon if available, otherwise keep first
      if (item.dt_txt.includes("12:00:00")) {
        dailyMap[date].icon = item.weather[0].icon;
        dailyMap[date].description = item.weather[0].main;
      }
      if (item.rain && item.rain["3h"]) {
        dailyMap[date].rain += item.rain["3h"];
      }
    });

    // Convert map to array and limit to 5 days (API limit)
    const dailyArray = Object.keys(dailyMap).slice(0, 5).map((date) => {
      const { temps, rain, icon, description } = dailyMap[date];
      const avgTemp = temps.reduce((sum, t) => sum + t, 0) / temps.length;
      
      return {
        date: new Date(date),
        dayName: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
        fullDate: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        temp: Math.round(avgTemp),
        rain: rain > 0 ? `${rain.toFixed(1)} mm` : "0 mm",
        icon,
        description
      };
    });

    setForecast(dailyArray);
  };

  const fetchSuggestions = async (query) => {
    setLocation(query);
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
      );
      const data = await res.json();
      setSuggestions(data);
      setShowSuggestions(true);
    } catch {
      setSuggestions([]);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!location.trim()) return;
    
    try {
      setLoading(true);
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`
      );
      const geoData = await geoRes.json();
      
      if (!geoData[0]) {
        setError("City not found. Please try another name.");
        setLoading(false);
        return;
      }
      fetchWeatherByCoords(geoData[0].lat, geoData[0].lon);
    } catch {
      setError("Search failed.");
      setLoading(false);
    }
  };

  // --- Render Section ---

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center p-4 md:p-8">
        
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-down">
          <h2 className="text-green-800 text-3xl md:text-4xl font-extrabold mb-2">
             Weather Forecast
          </h2>
          <p className="text-gray-500">Real-time weather updates for your farm.</p>
        </div>

        {/* Search Bar Container */}
        <div className="w-full max-w-lg relative mb-10 z-50" ref={searchRef}>
          <form onSubmit={handleSearch} className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-green-500" />
            </div>
            <input
              type="text"
              placeholder="Search your city / गाँव या शहर खोजें..."
              value={location}
              onChange={(e) => fetchSuggestions(e.target.value)}
              onFocus={() => location.length >= 3 && setShowSuggestions(true)}
              className="w-full pl-11 pr-4 py-4 bg-white border-2 border-green-100 rounded-full shadow-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
            />
            <button 
              type="submit"
              className="absolute right-2 top-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-semibold shadow-md transition-all active:scale-95"
            >
              Search
            </button>
          </form>

          {/* Autocomplete Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in">
              <ul>
                {suggestions.map((s, index) => (
                  <li
                    key={`${s.lat}-${s.lon}-${index}`}
                    className="px-5 py-3 hover:bg-green-50 cursor-pointer flex items-center gap-3 transition-colors border-b border-gray-50 last:border-none"
                    onClick={() => {
                      setLocation(s.name);
                      fetchWeatherByCoords(s.lat, s.lon);
                    }}
                  >
                    <FaMapMarkerAlt className="text-red-400" />
                    <div>
                      <span className="font-semibold text-gray-800">{s.name}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        {s.state ? `${s.state}, ` : ""}{s.country}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Loading & Error States */}
        {loading && (
           <div className="flex flex-col items-center justify-center my-10">
             <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
             <p className="mt-4 text-green-700 font-medium">Fetching forecast...</p>
           </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-sm mb-8 max-w-lg w-full">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Weather Content */}
        {weather && !loading && (
          <div className="w-full max-w-5xl animate-fade-in-up">
            
            {/* Main Current Weather Card */}
            <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-3xl p-8 md:p-12 shadow-2xl text-white mb-10 relative overflow-hidden">
               {/* Decorative Circles */}
               <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
               <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-48 h-48 bg-yellow-400 opacity-10 rounded-full blur-2xl"></div>

               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                 
                 {/* Left: Location & Temp */}
                 <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2 text-green-100">
                      <FaMapMarkerAlt />
                      <h3 className="text-2xl font-bold tracking-wide">{weather.name}, {weather.sys.country}</h3>
                    </div>
                    <p className="text-green-200 text-sm mb-6">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    
                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <h1 className="text-7xl md:text-8xl font-bold tracking-tighter">
                        {Math.round(weather.main.temp)}°
                      </h1>
                      <div className="flex flex-col items-center md:items-start">
                        <span className="text-xl font-medium capitalize">{weather.weather[0].description}</span>
                        <span className="text-green-200">Feels like {Math.round(weather.main.feels_like)}°</span>
                      </div>
                    </div>
                 </div>

                 {/* Right: Icon & Details Grid */}
                 <div className="flex flex-col items-center">
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                      alt="weather icon"
                      className="w-40 h-40 drop-shadow-lg"
                    />
                    
                    <div className="grid grid-cols-2 gap-4 mt-4 bg-white/20 backdrop-blur-md p-4 rounded-xl border border-white/10">
                      <div className="flex items-center gap-3 px-4">
                        <FaTint className="text-blue-300 text-xl" />
                        <div className="text-left">
                          <p className="text-xs text-green-100">Humidity</p>
                          <p className="font-bold">{weather.main.humidity}%</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 px-4 border-l border-white/20">
                        <FaWind className="text-gray-300 text-xl" />
                        <div className="text-left">
                          <p className="text-xs text-green-100">Wind</p>
                          <p className="font-bold">{Math.round(weather.wind.speed)} km/h</p>
                        </div>
                      </div>
                    </div>
                 </div>
               </div>
            </div>

            {/* 5-Day Forecast Section */}
            {forecast.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FaThermometerHalf className="text-green-600"/> 5-Day Forecast
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {forecast.map((day, idx) => (
                    <div 
                      key={idx}
                      className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 flex flex-col items-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                    >
                      <p className="text-gray-400 text-sm font-medium">{day.dayName}</p>
                      <p className="text-gray-800 font-bold mb-3">{day.fullDate}</p>
                      
                      <div className="bg-green-50 rounded-full p-2 mb-3">
                        <img
                          src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                          alt="forecast"
                          className="w-12 h-12"
                        />
                      </div>
                      
                      <p className="text-2xl font-bold text-gray-800 mb-1">{day.temp}°</p>
                      <p className="text-xs text-gray-500 capitalize mb-2">{day.description}</p>
                      
                      <div className="flex items-center gap-1 text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-md">
                        <FaCloudRain /> {day.rain}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </main>
    </div>
  );
}