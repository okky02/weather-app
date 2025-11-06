import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1";

export const getWeatherByCity = async (city) => {
  const response = await fetch(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`
  );
  if (!response.ok) {
    throw new Error("Gagal mengambil data cuaca");
  }
  return response.json();
};

export const getWeatherByCoords = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: `${lat},${lon}`,
        days: 7,
        aqi: "no",
        alerts: "no",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error saat mengambil data cuaca:", error);
    throw error;
  }
};
