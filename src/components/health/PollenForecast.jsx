import { useState, useEffect } from 'react'
import { useWeather } from '../../context/WeatherContext'
import { getPollenForecast } from '../../services/weatherService'
import { FiWind } from 'react-icons/fi'

const PollenForecast = () => {
  const { location } = useWeather()
  const [pollenData, setPollenData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPollenData = async () => {
      if (!location) return
      
      try {
        setLoading(true)
        const locationQuery = location.lat && location.lon 
          ? `${location.lat},${location.lon}` 
          : location.name
        const data = await getPollenForecast(locationQuery)
        setPollenData(data)
      } catch (error) {
        console.error('Error fetching pollen data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPollenData()
  }, [location])

  if (loading) {
    return (
      <div className="relative overflow-hidden bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-xl border border-pink-100 dark:border-gray-700 animate-pulse">
        <div className="h-6 bg-pink-200 dark:bg-gray-700 rounded w-40 mb-4"></div>
        <div className="h-32 bg-pink-200 dark:bg-gray-700 rounded"></div>
      </div>
    )
  }

  // Hide completely if pollen data is unavailable (only available in Europe)
  if (!pollenData || pollenData.overallRisk === 'Data unavailable' || pollenData.overallRisk === 'Unknown') {
    return null
  }

  const getRiskGradient = (risk) => {
    switch(risk) {
      case 'Low': return 'from-green-400 to-emerald-500'
      case 'Moderate': return 'from-yellow-400 to-orange-400'
      case 'High': return 'from-orange-500 to-red-500'
      case 'Very High': return 'from-red-500 to-pink-600'
      default: return 'from-gray-400 to-gray-500'
    }
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 dark:from-gray-800 dark:via-gray-850 dark:to-gray-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-pink-100 dark:border-gray-700 group">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-pink-200/30 to-rose-200/30 dark:from-pink-500/10 dark:to-rose-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-rose-200/30 to-red-200/30 dark:from-rose-500/10 dark:to-red-500/10 rounded-full blur-2xl"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl shadow-lg">
              <FiWind className="text-2xl text-white" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                Pollen Forecast
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Allergy information</p>
            </div>
          </div>
        </div>

        {/* Overall Status */}
        <div className={`bg-gradient-to-r ${getRiskGradient(pollenData.overallRisk)} rounded-2xl p-6 shadow-lg mb-6 transform transition-transform duration-300 group-hover:scale-[1.02]`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-5xl font-black text-white mb-2 drop-shadow-lg">
                {pollenData.overallLevel}
              </div>
              <div className="text-xl font-bold text-white/90">
                {pollenData.overallRisk} Risk
              </div>
            </div>
            <div className="text-5xl">🌸</div>
          </div>
        </div>

        {/* Recommendation */}
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 backdrop-blur-sm rounded-xl p-4 border border-blue-200/50 dark:border-blue-700/50 mb-6">
          <div className="flex gap-3">
            <div className="flex-shrink-0 text-2xl">💡</div>
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {pollenData.recommendation}
            </p>
          </div>
        </div>

        {/* Pollen Types */}
        {pollenData.pollens && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.entries(pollenData.pollens).map(([key, pollen]) => (
              <div 
                key={key}
                className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-4 border border-pink-200/50 dark:border-gray-600/50"
              >
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                  {pollen.name}
                </p>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">
                    {pollen.level?.toFixed(0) || '0'}
                  </div>
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: pollen.color }}
                  ></div>
                </div>
                <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                  pollen.risk === 'Low' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                  pollen.risk === 'Moderate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                  pollen.risk === 'High' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {pollen.risk}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PollenForecast
