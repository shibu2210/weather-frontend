import { useState, useEffect } from 'react'
import { useWeather } from '../../context/WeatherContext'
import { getHealthScore } from '../../services/weatherService'
import { FiHeart, FiActivity, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'

const HealthScore = () => {
  const { location } = useWeather()
  const [healthData, setHealthData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHealthData = async () => {
      if (!location) return
      
      try {
        setLoading(true)
        const locationQuery = location.lat && location.lon 
          ? `${location.lat},${location.lon}` 
          : location.name
        const data = await getHealthScore(locationQuery)
        setHealthData(data)
      } catch (error) {
        console.error('Error fetching health score:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHealthData()
  }, [location])

  if (loading) {
    return (
      <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-xl border border-green-100 dark:border-gray-700 animate-pulse">
        <div className="h-8 bg-green-200 dark:bg-gray-700 rounded w-48 mb-4"></div>
        <div className="h-40 bg-green-200 dark:bg-gray-700 rounded"></div>
      </div>
    )
  }

  if (!healthData) {
    return (
      <div className="relative overflow-hidden bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-xl border border-red-100 dark:border-gray-700">
        <div className="text-center">
          <div className="text-4xl mb-2">⚠️</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Health Score unavailable. Make sure backend is running.
          </p>
        </div>
      </div>
    )
  }

  const getScoreGradient = (score) => {
    if (score >= 80) return 'from-green-400 to-emerald-500'
    if (score >= 60) return 'from-lime-400 to-green-500'
    if (score >= 40) return 'from-yellow-400 to-orange-400'
    if (score >= 20) return 'from-orange-500 to-red-500'
    return 'from-red-500 to-pink-600'
  }

  const getScoreIcon = (score) => {
    if (score >= 60) return <FiCheckCircle className="text-white" />
    return <FiAlertCircle className="text-white" />
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-800 dark:via-gray-850 dark:to-gray-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-green-100 dark:border-gray-700 group">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-200/30 to-emerald-200/30 dark:from-green-500/10 dark:to-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald-200/30 to-teal-200/30 dark:from-emerald-500/10 dark:to-teal-500/10 rounded-full blur-2xl"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-lg">
              <FiHeart className="text-2xl text-white" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                Health Impact Score
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Outdoor Safety Index</p>
            </div>
          </div>
        </div>

        {/* Main Score Display */}
        <div className="relative mb-6">
          <div className={`bg-gradient-to-br ${getScoreGradient(healthData.score)} rounded-2xl p-8 shadow-lg transform transition-transform duration-300 group-hover:scale-[1.02]`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-7xl font-black text-white drop-shadow-lg">
                    {healthData.score}
                  </div>
                  <div className="text-3xl text-white/80">/100</div>
                </div>
                <div className="flex items-center gap-2">
                  {getScoreIcon(healthData.score)}
                  <div className="text-2xl font-bold text-white/90">
                    {healthData.level}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <FiActivity className="text-6xl text-white/30" />
              </div>
            </div>
            
            {/* Summary */}
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-white/90 leading-relaxed">
                {healthData.summary}
              </p>
            </div>
          </div>
        </div>

        {/* Factors Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {healthData.factors?.map((factor, index) => (
            <div 
              key={index}
              className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-3 border border-green-200/50 dark:border-gray-600/50"
            >
              <div className="text-xl mb-1">{factor.icon}</div>
              <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                {factor.name}
              </div>
              <div className="flex items-center gap-2">
                <div className="text-lg font-bold text-gray-800 dark:text-white">
                  {factor.score}
                </div>
                <div className={`text-xs px-2 py-0.5 rounded-full ${
                  factor.status === 'Good' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                  factor.status === 'Moderate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {factor.status}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="space-y-2 mb-4">
          {healthData.recommendations?.map((rec, index) => (
            <div 
              key={index}
              className="flex items-start gap-3 p-3 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl border border-green-200/50 dark:border-gray-600/50"
            >
              <div className="flex-shrink-0 text-base">💡</div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {rec}
              </p>
            </div>
          ))}
        </div>

        {/* Best Time */}
        {healthData.bestTimeForOutdoor && (
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 backdrop-blur-sm rounded-xl p-4 border border-blue-200/50 dark:border-blue-700/50">
            <div className="flex items-center gap-3">
              <div className="text-xl">⏰</div>
              <div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Best Time for Outdoor Activities
                </p>
                <p className="text-lg font-bold text-gray-800 dark:text-white">
                  {healthData.bestTimeForOutdoor}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HealthScore
