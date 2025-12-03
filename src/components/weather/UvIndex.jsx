import { useState, useEffect } from 'react'
import { useWeather } from '../../context/WeatherContext'
import { getUvIndex } from '../../services/weatherService'
import { WiDaySunny } from 'react-icons/wi'
import { FiSun, FiShield } from 'react-icons/fi'

const UvIndex = () => {
  const { location } = useWeather()
  const [uvData, setUvData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUvData = async () => {
      if (!location) return
      
      try {
        setLoading(true)
        const locationQuery = location.lat && location.lon 
          ? `${location.lat},${location.lon}` 
          : location.name
        const data = await getUvIndex(locationQuery)
        setUvData(data)
      } catch (error) {
        console.error('Error fetching UV data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUvData()
  }, [location])

  if (loading) {
    return (
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-xl border border-orange-100 dark:border-gray-700 animate-pulse">
        <div className="h-6 bg-orange-200 dark:bg-gray-700 rounded w-32 mb-4"></div>
        <div className="h-32 bg-orange-200 dark:bg-gray-700 rounded"></div>
      </div>
    )
  }

  if (!uvData) return null

  const getGradient = (level) => {
    switch(level) {
      case 'Low': return 'from-green-400 to-emerald-500'
      case 'Moderate': return 'from-yellow-400 to-orange-400'
      case 'High': return 'from-orange-500 to-red-500'
      case 'Very High': return 'from-red-500 to-pink-600'
      case 'Extreme': return 'from-purple-600 to-pink-600'
      default: return 'from-gray-400 to-gray-500'
    }
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 dark:from-gray-800 dark:via-gray-850 dark:to-gray-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-orange-100 dark:border-gray-700 group">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 dark:from-yellow-500/10 dark:to-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-200/30 to-yellow-200/30 dark:from-orange-500/10 dark:to-yellow-500/10 rounded-full blur-2xl"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg">
              <FiSun className="text-2xl text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
              UV Index
            </h3>
          </div>
          <div className="px-3 py-1 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-full">
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">Live</span>
          </div>
        </div>

        {/* Main UV Display */}
        <div className="relative mb-6">
          <div className={`bg-gradient-to-br ${getGradient(uvData.uvLevel)} rounded-2xl p-6 shadow-lg transform transition-transform duration-300 group-hover:scale-[1.02]`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-6xl sm:text-7xl font-black text-white mb-2 drop-shadow-lg">
                  {uvData.currentUv?.toFixed(1) || '0.0'}
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xl font-bold text-white/90">
                    {uvData.uvLevel}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <WiDaySunny className="text-7xl text-white/80" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Max Today */}
          <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-4 border border-orange-200/50 dark:border-gray-600/50">
            <div className="flex items-center gap-2 mb-1">
              <FiSun className="text-orange-500 dark:text-orange-400" />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Peak Today</span>
            </div>
            <div className="text-2xl font-bold text-gray-800 dark:text-white">
              {uvData.maxUvToday?.toFixed(1) || '0.0'}
            </div>
          </div>

          {/* Protection Level */}
          <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-4 border border-orange-200/50 dark:border-gray-600/50">
            <div className="flex items-center gap-2 mb-1">
              <FiShield className="text-blue-500 dark:text-blue-400" />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Protection</span>
            </div>
            <div className="text-sm font-semibold text-gray-800 dark:text-white">
              {uvData.uvLevel === 'Low' ? 'None Needed' : 
               uvData.uvLevel === 'Moderate' ? 'Recommended' : 
               'Essential'}
            </div>
          </div>
        </div>

        {/* Recommendation Card */}
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 backdrop-blur-sm rounded-xl p-4 border border-blue-200/50 dark:border-blue-700/50">
          <div className="flex gap-3">
            <div className="flex-shrink-0 text-2xl">💡</div>
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {uvData.recommendation}
            </p>
          </div>
        </div>

        {/* UV Scale */}
        <div className="mt-4 pt-4 border-t border-orange-200/50 dark:border-gray-700/50">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">UV Protection Scale</p>
          <div className="flex gap-1 h-3 rounded-full overflow-hidden shadow-inner">
            <div className="flex-1 bg-gradient-to-r from-green-400 to-green-500" title="Low (0-2)"></div>
            <div className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500" title="Moderate (3-5)"></div>
            <div className="flex-1 bg-gradient-to-r from-orange-400 to-orange-500" title="High (6-7)"></div>
            <div className="flex-1 bg-gradient-to-r from-red-500 to-red-600" title="Very High (8-10)"></div>
            <div className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600" title="Extreme (11+)"></div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">0</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">11+</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UvIndex
