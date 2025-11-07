export default function CurrentWeatherCard({
  weather,
  translateWeatherCondition,
}) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl mb-8 border border-white/20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold">
            {weather.location.name}
          </h2>
          <p className="text-blue-100 mb-2">
            {weather.location.region && `${weather.location.region}, `}
            {weather.location.country}
          </p>
          <p className="text-sm text-blue-200">
            🕒{" "}
            {new Date(weather.location.localtime).toLocaleString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <img
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
            className="w-20 h-20"
          />
          <div className="text-center">
            <h3 className="text-5xl md:text-6xl font-bold">
              {Math.round(weather.current.temp_c)}°C
            </h3>
            <p className="text-lg capitalize">
              {translateWeatherCondition(weather.current.condition.text)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm ">
          <p className="text-blue-200 mb-1">💨 Kecepatan Angin</p>
          <p className="text-xl font-semibold">
            {weather.current.wind_kph} km/h
          </p>
        </div>
        <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
          <p className="text-blue-200 mb-1">💧 Kelembapan</p>
          <p className="text-xl font-semibold">{weather.current.humidity}%</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
          <p className="text-blue-200 mb-1">☀️ UV Index</p>
          <p className="text-xl font-semibold">{weather.current.uv}</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
          <p className="text-blue-200 mb-1">🌡️ Terasa Seperti</p>
          <p className="text-xl font-semibold">
            {Math.round(weather.current.feelslike_c)}°C
          </p>
        </div>
      </div>
    </div>
  );
}
