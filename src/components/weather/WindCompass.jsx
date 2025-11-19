import { useWeather } from '../../context/WeatherContext'

const WindCompass = () => {
  const { currentWeather, units } = useWeather()

  if (!currentWeather?.current) return null

  const { wind_degree, wind_dir, wind_kph, wind_mph, gust_kph, gust_mph } = currentWeather.current
  const windSpeed = units === 'metric' ? wind_kph : wind_mph
  const gustSpeed = units === 'metric' ? gust_kph : gust_mph
  const speedUnit = units === 'metric' ? 'km/h' : 'mph'

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl p-4 sm:p-6 shadow-lg">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Wind Details
      </h3>
      
      <div className="flex flex-col items-center">
        {/* Compass */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 mb-4">
          {/* Compass circle */}
          <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"></div>
          
          {/* Cardinal directions */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              <span className="absolute top-2 left-1/2 -translate-x-1/2 text-sm font-bold text-gray-700 dark:text-gray-300">N</span>
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-bold text-gray-700 dark:text-gray-300">S</span>
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-700 dark:text-gray-300">W</span>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-700 dark:text-gray-300">E</span>
            </div>
          </div>
          
          {/* Wind arrow */}
          <div 
            className="absolute inset-0 flex items-center justify-center transition-transform duration-500"
            style={{ transform: `rotate(${wind_degree}deg)` }}
          >
            <div className="w-1 h-16 bg-gradient-to-t from-blue-500 to-blue-600 rounded-full relative">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-blue-600"></div>
            </div>
          </div>
          
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          </div>
        </div>

        {/* Wind info */}
        <div className="text-center space-y-2">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Direction</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{wind_dir}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">{wind_degree}°</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Speed</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{Math.round(windSpeed)}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">{speedUnit}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Gusts</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{Math.round(gustSpeed)}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">{speedUnit}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WindCompass
