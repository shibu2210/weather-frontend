import { useWeather } from '../../context/WeatherContext'
import { formatDate, formatTemperature, getWeatherIcon } from '../../utils/helpers'

const DailyForecast = () => {
  const { forecast, units } = useWeather()

  if (!forecast?.forecast?.forecastday) return null

  const days = forecast.forecast.forecastday

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4">
        16-Day Forecast
      </h3>
      
      <div className="space-y-2 sm:space-y-3">
        {days.map((day, index) => {
          const maxTemp = units === 'metric' ? day.day.maxtemp_c : day.day.maxtemp_f
          const minTemp = units === 'metric' ? day.day.mintemp_c : day.day.mintemp_f
          
          return (
            <div 
              key={index}
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
            >
              {/* Date */}
              <div className="w-16 sm:w-20 flex-shrink-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap">
                  {index === 0 ? 'Today' : formatDate(day.date)}
                </p>
              </div>
              
              {/* Icon */}
              <img 
                src={getWeatherIcon(day.day.condition.icon)} 
                alt={day.day.condition.text}
                className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0"
              />
              
              {/* Condition */}
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 truncate">
                  {day.day.condition.text}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 sm:hidden">
                  {day.day.daily_chance_of_rain}% rain
                </p>
              </div>
              
              {/* Rain chance (desktop) */}
              <div className="hidden sm:block text-right w-16">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {day.day.daily_chance_of_rain}%
                </p>
              </div>
              
              {/* Temperature */}
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <span className="text-base sm:text-lg font-bold text-gray-800 dark:text-white">
                  {formatTemperature(maxTemp, units)}
                </span>
                <span className="text-gray-400">/</span>
                <span className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                  {formatTemperature(minTemp, units)}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DailyForecast
