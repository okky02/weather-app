import { translateWeatherCondition } from "../utils/translateWeatherCondition";

export default function WeekForecast({ weather }) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
      <h2 className="text-xl font-semibold mb-6 flex items-center justify-center md:justify-start">
        Prakiraan Cuaca 7 Hari ke Depan
      </h2>

      <div className="flex overflow-x-auto pb-4 gap-4 custom-scrollbar px-4 -mx-4 py-4">
        {weather.forecast.forecastday.map((day, index) => {
          const date = new Date(day.date);
          const today = new Date();
          const isToday = date.toDateString() === today.toDateString();
          const currentHour = new Date(weather.location.localtime).getHours();

          return (
            <div
              key={index}
              className={`flex-shrink-0 w-80 bg-white/15 backdrop-blur-sm rounded-2xl p-5 transition-transform hover:scale-[1.02] hover:bg-white/20 border transition-all duration-300 ${
                isToday
                  ? "border-2 border-yellow-400 bg-white/20 shadow-lg"
                  : "border-white/10"
              }`}
            >

              <div className="text-center mb-4">
                <p className="font-semibold text-lg capitalize">
                  {date.toLocaleDateString("id-ID", { weekday: "long" })}
                </p>
                <p className="text-sm opacity-80">
                  {date.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 mb-4">
                <img
                  src={day.day.condition.icon}
                  alt={day.day.condition.text}
                  className="w-16 h-16"
                />
                <div>
                  <p className="text-2xl font-bold">
                    {Math.round(day.day.avgtemp_c)}°C
                  </p>
                  <p className="text-sm capitalize opacity-90">
                    {translateWeatherCondition(day.day.condition.text)}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>🌡️ Maks:</span>
                  <span className="font-medium">
                    {Math.round(day.day.maxtemp_c)}°C
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>🌙 Min:</span>
                  <span className="font-medium">
                    {Math.round(day.day.mintemp_c)}°C
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>💧 Kelembapan:</span>
                  <span className="font-medium">{day.day.avghumidity}%</span>
                </div>
                <div className="flex justify-between">
                  <span>💨 Angin:</span>
                  <span className="font-medium">
                    {day.day.maxwind_kph} km/h
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <div className="mt-2 pt-2 border-t border-white/20">
                  <div className="flex overflow-x-auto space-x-2 pb-2 custom-scrollbar">
                    {day.hour
                      .filter((hourData) => {
                        if (isToday) {
                          const hour = new Date(hourData.time).getHours();
                          return hour >= currentHour;
                        }
                        return true;
                      })
                      .map((hourData, hIndex) => {
                        const hour = new Date(hourData.time).getHours();
                        const displayHour = `${hour
                          .toString()
                          .padStart(2, "0")}:00`;
                        const isCurrentHour = isToday && hour === currentHour;

                        return (
                          <div
                            key={hIndex}
                            className={`flex-shrink-0 rounded-lg p-2 min-w-[60px] text-center transition-all duration-300 ${
                              isCurrentHour
                                ? "bg-white/30 shadow-lg border-2 border-yellow-400"
                                : "bg-white/10 hover:bg-white/20"
                            }`}
                          >
                            <p className="text-xs font-medium">{displayHour}</p>
                            <img
                              src={hourData.condition.icon}
                              alt={hourData.condition.text}
                              className="mx-auto w-6 h-6 my-1"
                            />
                            <p className="text-xs font-semibold">
                              {Math.round(hourData.temp_c)}°C
                            </p>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
