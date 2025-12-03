import { useState, useEffect } from 'react'
import { useWeather } from '../../context/WeatherContext'
import { getWeatherInsights } from '../../services/weatherService'
import { FiZap, FiActivity, FiAlertTriangle, FiInfo } from 'react-icons/fi'

const WeatherInsights = () => {
  const { location } = useWeather()
  const [insights, setInsights] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInsights = async () => {
      if (!location) return
      
      try {
        setLoading(true)
        const locationQuery = location.lat && location.lon 
          ? `${location.lat},${location.lon}` 
          : location.name
        const data = await getWeatherInsights(locationQuery)
        setInsights(data)
      } catch (error) {
        console.error('Error fetching insights:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchInsights()
  }, [location])

  if (loading) {
    return (
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-xl border border-purple-100 dark:border-gray-700 animate-pulse">
        <div className="h-6 bg-purple-200 dark:bg-gray-700 rounded w-40 mb-4"></div>
        <div className="h-32 bg-purple-200 dark:bg-gray-700 rounded"></div>
      </div>
    )
  }

  if (!insights) {
    return (
      <div className="relative overflow-hidden bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-xl border border-red-100 dark:border-gray-700">
        <div className="text-center">
          <div className="text-4xl mb-2">⚠️</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            AI Insights unavailable. Make sure backend is running.
          </p>
        </div>
      </div>
    )
  }

  const getAlertIcon = (type) => {
    switch(type) {
      case 'warning': return <FiAlertTriangle className="text-orange-500" />
      case 'info': return <FiInfo className="text-blue-500" />
      default: return <FiZap className="text-green-500" />
    }
  }

  const getAlertStyle = (type) => {
    switch(type) {
      case 'warning': return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
      case 'info': return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
      default: return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
    }
  }

  const getSuitabilityColor = (suitability) => {
    switch(suitability) {
      case 'Excellent': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
      case 'Good': return 'text-lime-600 dark:text-lime-400 bg-lime-100 dark:bg-lime-900/30'
      case 'Fair': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30'
      default: return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30'
    }
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-gray-800 dark:via-gray-850 dark:to-gray-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-100 dark:border-gray-700 group">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-200/30 to-pink-200/30 dark:from-purple-500/10 dark:to-pink-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-200/30 to-rose-200/30 dark:from-pink-500/10 dark:to-rose-500/10 rounded-full blur-2xl"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl shadow-lg">
            <FiZap className="text-2xl text-white" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
              AI Weather Insights
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">Smart recommendations for you</p>
          </div>
        </div>

        {/* Briefing */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 shadow-lg mb-6 transform transition-transform duration-300 group-hover:scale-[1.02]">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🤖</div>
            <div>
              <p className="text-sm font-medium text-white/80 mb-2">Daily Briefing</p>
              <p className="text-white leading-relaxed">
                {insights.briefing}
              </p>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {insights.alerts && insights.alerts.length > 0 && (
          <div className="space-y-2 mb-6">
            {insights.alerts.map((alert, index) => (
              <div 
                key={index}
                className={`flex items-start gap-3 p-4 rounded-xl border ${getAlertStyle(alert.type)}`}
              >
                <div className="flex-shrink-0 text-xl">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {alert.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Activity Recommendations */}
        {insights.activities && insights.activities.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <FiActivity className="text-gray-600 dark:text-gray-400" />
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Activity Recommendations
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {insights.activities.map((activity, index) => (
                <div 
                  key={index}
                  className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-4 border border-purple-200/50 dark:border-gray-600/50 hover:scale-105 transition-transform duration-200"
                >
                  <div className="text-2xl mb-2">{activity.icon}</div>
                  <p className="font-semibold text-gray-800 dark:text-white mb-1">
                    {activity.activity}
                  </p>
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${getSuitabilityColor(activity.suitability)}`}>
                    {activity.suitability}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {activity.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Highlights */}
        {insights.highlights && insights.highlights.length > 0 && (
          <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-4 border border-purple-200/50 dark:border-gray-600/50">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-3">
              Key Highlights
            </p>
            <div className="space-y-2">
              {insights.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WeatherInsights
