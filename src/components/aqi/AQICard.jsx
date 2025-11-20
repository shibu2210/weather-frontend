import { useWeather } from '../../context/WeatherContext'
import { calculateAQIFromPollutants, getAQICategory, getAQIRecommendation } from '../../utils/aqiCalculator'
import AQIGauge from './AQIGauge'
import PollutantDetails from './PollutantDetails'

const AQICard = () => {
  const { currentWeather } = useWeather()

  if (!currentWeather?.current?.air_quality) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Air Quality Index
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Air quality data not available for this location
        </p>
      </div>
    )
  }

  const aqi = currentWeather.current.air_quality
  // Use the actual AQI value from AQICN API if available, otherwise calculate from pollutants
  const aqiValue = aqi.aqi || calculateAQIFromPollutants(aqi)
  const aqiLevel = getAQICategory(aqiValue)
  const recommendation = getAQIRecommendation(aqiValue)

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-gray-200/50 dark:border-gray-700/50">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
        Air Quality Index
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex justify-center items-center">
          <AQIGauge value={aqiValue} level={aqiLevel} />
        </div>
        
        <div className="flex flex-col justify-center space-y-3">
          <div className={`px-4 py-2 rounded-lg ${aqiLevel?.bgColor} text-white font-bold text-base sm:text-lg text-center`}>
            {aqiLevel?.level}
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {recommendation}
          </p>
        </div>
      </div>

      <PollutantDetails airQuality={aqi} />
    </div>
  )
}

export default AQICard
