import { WiSunrise, WiSunset } from 'react-icons/wi'
import { useWeather } from '../../context/WeatherContext'

const SunriseSunset = () => {
  const { forecast } = useWeather()

  if (!forecast?.forecast?.forecastday?.[0]?.astro) return null

  const astro = forecast.forecast.forecastday[0].astro

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl p-4 sm:p-6 shadow-lg">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Sun & Moon
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Sunrise */}
        <div className="bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <WiSunrise className="text-4xl text-orange-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sunrise</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{astro.sunrise}</p>
        </div>

        {/* Sunset */}
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <WiSunset className="text-4xl text-purple-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sunset</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{astro.sunset}</p>
        </div>

        {/* Moon Phase */}
        <div className="col-span-2 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Moon Phase</span>
              <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">{astro.moon_phase}</p>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Illumination</span>
              <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">{astro.moon_illumination}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SunriseSunset
