import { useState, useEffect } from "react";
import { getWeatherByCity } from "./api/weather";

import Header from "./components/Header";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import Tabs from "./components/Tabs";
import TodayForecast from "./components/TodayForecast";
import WeekForecast from "./components/WeekForecast";

import { translateWeatherCondition } from "./utils/translateWeatherCondition";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("today");
  const bgClass = "from-gray-500 via-slate-700 to-gray-600";

  // Search weather 
  const handleSearch = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
      setActiveTab("today");
    } catch {
      setError("Gagal mengambil data cuaca.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  //Search weather on enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Auto-detect user location
  useEffect(() => {
    const fetchLocationWeather = async () => {
      setLoading(true);
      try {
        const success = async (pos) => {
          const { latitude, longitude } = pos.coords;
          const data = await getWeatherByCity(`${latitude},${longitude}`);
          setWeather(data);
        };

        const error = async () => {
          // Fallback if user denies location permission
          const data = await getWeatherByCity("Jakarta");
          setWeather(data);
        };

        navigator.geolocation.getCurrentPosition(success, error);
      } catch (err) {
        console.log(err);
        setError("Gagal mendeteksi lokasi otomatis.");
      } finally {
        setLoading(false);
      }
    };
    fetchLocationWeather();
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col items-center text-white bg-gradient-to-br ${bgClass} transition-all duration-1000 p-4 md:p-6`}
    >
      {/* Header */}
      <Header
        city={city}
        setCity={setCity}
        handleSearch={handleSearch}
        handleKeyPress={handleKeyPress}
        loading={loading}
        error={error}
      />

      <main className="w-full max-w-6xl flex-1">
        {/* Current Weather Card */}
        {weather?.current && (
          <CurrentWeatherCard
            weather={weather}
            translateWeatherCondition={translateWeatherCondition}
          />
        )}

        {/* Tabs */}
        {weather?.forecast && (
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        )}

        {/* Today Forecast */}
        {activeTab === "today" && weather?.forecast && (
          <TodayForecast weather={weather} translateWeatherCondition={translateWeatherCondition}/>
        )}

        {/* Week Forecast */}
        {activeTab === "week" && weather?.forecast && (
          <WeekForecast weather={weather} translateWeatherCondition={translateWeatherCondition}/>
        )}

        {/* Empty State */}
        {!weather && !loading && !error && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⛅</div>
            <h3 className="text-2xl font-bold mb-2">
              Selamat Datang di Aplikasi Ramalan Cuaca
            </h3>
            <p className="text-blue-100 max-w-md mx-auto">
              Mohon tunggu sedang memproses data cuaca...
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mt-8 py-4 text-center text-blue-100 text-sm border-t border-white/10">
        <p>© Okky Dhelfilano 2025</p>
      </footer>

    </div>
  );
}
