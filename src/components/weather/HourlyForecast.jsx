import { useWeather } from '../../context/WeatherContext'
import { formatTime, formatTemperature, getWeatherIcon } from '../../utils/helpers'

const HourlyForecast = () => {
  const { forecast, units } = useWeather()

  if (!forecast?.forecast?.forecastday?.[0]?.hour) return null

  const hours = forecast.forecast.forecastday[0].hour.slice(0, 24)

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-gray-200/50 dark:border-gray-700/50">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Hourly Forecast
      </h3>
      
      <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide -mx-1 px-1">
        {hours.map((hour, index) => {
          const temp = units === 'metric' ? hour.temp_c : hour.temp_f
          
          return (
            <div 
              key={index}
              className="flex-shrink-0 bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center w-20 sm:w-24 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-105 cursor-pointer"
            >
              <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-2 whitespace-nowrap">
                {formatTime(hour.time)}
              </p>
              <img 
                src={getWeatherIcon(hour.condition.icon)} 
                alt={hour.condition.text}
                className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2"
              />
              <p className="text-base sm:text-lg font-bold text-gray-800 dark:text-white mb-1">
                {formatTemperature(temp, units)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {hour.chance_of_rain}%
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HourlyForecast
