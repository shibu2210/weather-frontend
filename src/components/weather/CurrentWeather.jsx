import { WiHumidity, WiStrongWind, WiBarometer, WiDaySunny } from 'react-icons/wi'
import { useWeather } from '../../context/WeatherContext'
import { formatTemperature, getWeatherIcon, getWindSpeed, getPressure, getVisibility, getUVLevel } from '../../utils/helpers'

const CurrentWeather = () => {
  const { currentWeather, units } = useWeather()

  if (!currentWeather) return null

  const { location, current } = currentWeather
  const temp = units === 'metric' ? current.temp_c : current.temp_f
  const feelsLike = units === 'metric' ? current.feelslike_c : current.feelslike_f
  const uvLevel = getUVLevel(current.uv)

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 dark:from-blue-900 dark:via-blue-950 dark:to-cyan-950 rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 text-white shadow-2xl">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 -right-4 w-72 h-72 bg-cyan-300 rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Main Weather Info */}
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">
            {location.name}, {location.country}
          </h2>
          <p className="text-blue-100 text-sm md:text-base mb-4">{location.localtime}</p>
          
          <div className="flex items-center gap-4 mb-4">
            <img 
              src={getWeatherIcon(current.condition.icon)} 
              alt={current.condition.text}
              className="w-20 h-20 sm:w-24 sm:h-24"
            />
            <div>
              <div className="text-5xl sm:text-6xl font-bold leading-none">
                {formatTemperature(temp, units)}
              </div>
              <div className="text-base sm:text-xl text-blue-100 mt-1">
                Feels like {formatTemperature(feelsLike, units)}
              </div>
            </div>
          </div>
          
          <p className="text-lg sm:text-xl md:text-2xl font-medium">{current.condition.text}</p>
        </div>

        {/* Weather Stats Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:w-80">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-2">
              <WiHumidity className="text-3xl flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium">Humidity</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold">{current.humidity}%</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-2">
              <WiStrongWind className="text-3xl flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium">Wind</span>
            </div>
            <p className="text-lg sm:text-xl font-bold leading-tight">
              {Math.round(units === 'metric' ? current.wind_kph : current.wind_mph)} {units === 'metric' ? 'km/h' : 'mph'}
            </p>
            <p className="text-xs sm:text-sm mt-1">{current.wind_dir}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-2">
              <WiBarometer className="text-3xl flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium">Pressure</span>
            </div>
            <p className="text-lg sm:text-xl font-bold">
              {Math.round(current.pressure_mb)} mb
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-2">
              <WiDaySunny className="text-3xl flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium">UV Index</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold">{current.uv}</p>
            <p className="text-xs sm:text-sm mt-1">{uvLevel.label}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather
