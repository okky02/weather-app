import { useRef } from "react";

export default function TodayForecast({ weather, translateWeatherCondition }) {
  const scrollContainerRef = useRef(null);
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
      <h2 className="text-xl font-semibold mb-4 flex items-center justify-center md:justify-start">
        Prakiraan Cuaca per Jam
      </h2>
      <div
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto pb-4 scroll-smooth custom-scrollbar"
      >
        {(() => {
          const hours = weather.forecast.forecastday[0].hour;
          const currentHour = new Date(weather.location.localtime).getHours();

          const upcomingHours = hours.filter((hourData) => {
            const hour = new Date(hourData.time).getHours();
            return hour >= currentHour;
          });

          return upcomingHours.map((hourData, index) => {
            const hour = new Date(hourData.time).getHours();
            const displayHour = `${hour.toString().padStart(2, "0")}:00`;

            const isCurrent = hour === currentHour;

            return (
              <div
                key={index}
                className={`flex-shrink-0 rounded-xl p-4 text-center min-w-[110px] transition-all duration-300 backdrop-blur-sm ${
                  isCurrent
                    ? "bg-white/30 shadow-lg border-2 border-yellow-400"
                    : "bg-white/15 hover:bg-white/20"
                }`}
              >
                <p className="font-medium">{displayHour}</p>
                <img
                  src={hourData.condition.icon}
                  alt={hourData.condition.text}
                  className="mx-auto w-12 h-12 my-2"
                />
                <p className="text-xl font-bold">
                  {Math.round(hourData.temp_c)}°C
                </p>
                <p className="text-sm mt-1 opacity-90 capitalize">
                  {translateWeatherCondition(hourData.condition.text)}
                </p>
                <div className="flex justify-center items-center mt-2 text-sm">
                  <span className="mr-1">💧</span>
                  <span>{hourData.humidity}%</span>
                </div>
              </div>
            );
          });
        })()}
      </div>
    </div>
  );
}
