import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1";

export const getWeatherByCity = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/current.json`, {
      params: {
        key: API_KEY,
        q: city,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error saat mengambil data cuaca:", error);
    throw error;
  }
};

export const getWeatherByCoords = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/current.json`, {
      params: {
        key: API_KEY,
        q: `${lat},${lon}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error saat mengambil data cuaca:", error);
    throw error;
  }
};
