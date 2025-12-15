import { useState, useEffect } from 'react'
import { useWeather } from '../../context/WeatherContext'
import { getPrecipitationMinutely } from '../../services/weatherService'
import { WiRain, WiRaindrops } from 'react-icons/wi'
import { FiDroplet, FiClock } from 'react-icons/fi'

const PrecipitationRadar = () => {
  const { location, weather } = useWeather()
  const [precipData, setPrecipData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPrecipData = async () => {
      if (!location) return
      
      try {
        setLoading(true)
        const locationQuery = location.lat && location.lon 
          ? `${location.lat},${location.lon}` 
          : location.name
        const data = await getPrecipitationMinutely(locationQuery)
        setPrecipData(data)
      } catch (error) {
        console.error('Error fetching precipitation data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPrecipData()
  }, [location])
  
  // Check if current weather indicates rain
  const isCurrentlyRaining = () => {
    if (!weather?.current) return false
    const condition = weather.current.condition?.text?.toLowerCase() || ''
    const precipMm = weather.current.precip_mm || 0
    const rainKeywords = ['rain', 'drizzle', 'shower', 'thunderstorm', 'storm', 'precipitation']
    return rainKeywords.some(keyword => condition.includes(keyword)) || precipMm > 0
  }

  if (loading) {
    return (
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-xl border border-blue-100 dark:border-gray-700 animate-pulse">
        <div className="h-6 bg-blue-200 dark:bg-gray-700 rounded w-40 mb-4"></div>
        <div className="h-32 bg-blue-200 dark:bg-gray-700 rounded"></div>
      </div>
    )
  }

  if (!precipData?.minutely_15) return null

  const { time, precipitation } = precipData.minutely_15
  
  // Find the current time slot index
  const now = new Date()
  let startIndex = 0
  
  // Find the first time slot that is >= current time
  for (let i = 0; i < time.length; i++) {
    const slotTime = new Date(time[i])
    if (slotTime >= now) {
      startIndex = i
      break
    }
    // If we've gone through all and none are in the future, use the last few
    if (i === time.length - 1) {
      startIndex = Math.max(0, time.length - 4)
    }
  }
  
  // Get next 4 intervals starting from current time
  const relevantTimes = time.slice(startIndex, startIndex + 4)
  const relevantPrecip = precipitation.slice(startIndex, startIndex + 4)
  
  // Format the time data
  const nextHourData = relevantTimes.map((t, i) => {
    const date = new Date(t)
    
    // Format time in 12-hour format with AM/PM
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const displayHours = hours % 12 || 12
    const displayMinutes = minutes.toString().padStart(2, '0')
    
    return {
      time: `${displayHours}:${displayMinutes} ${ampm}`,
      precip: relevantPrecip[i] || 0
    }
  })

  const maxPrecip = Math.max(...relevantPrecip, 0.1)
  const forecastShowsRain = relevantPrecip.some(p => p > 0)
  const currentRaining = isCurrentlyRaining()
  // Show rain if either forecast predicts it OR current weather shows rain
  const willRain = forecastShowsRain || currentRaining
  const totalPrecip = relevantPrecip.reduce((sum, p) => sum + (p || 0), 0)
  // If currently raining but forecast shows 0, use current precip value
  const displayTotal = totalPrecip > 0 ? totalPrecip : (currentRaining ? (weather?.current?.precip_mm || 0.1) : 0)

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50 dark:from-gray-800 dark:via-gray-850 dark:to-gray-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-100 dark:border-gray-700 group">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 dark:from-blue-500/10 dark:to-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-200/30 to-blue-200/30 dark:from-cyan-500/10 dark:to-blue-500/10 rounded-full blur-2xl"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl shadow-lg ${
              willRain 
                ? 'bg-gradient-to-br from-blue-400 to-cyan-500' 
                : 'bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700'
            }`}>
              {willRain ? (
                <WiRain className="text-2xl text-white" />
              ) : (
                <WiRaindrops className="text-2xl text-white" />
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
              Precipitation Radar
            </h3>
          </div>
          <div className="px-3 py-1 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-full">
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">15min</span>
          </div>
        </div>

        {/* Status Card */}
        <div className={`rounded-2xl p-5 mb-6 shadow-lg transform transition-transform duration-300 group-hover:scale-[1.02] ${
          willRain 
            ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
            : 'bg-gradient-to-r from-green-400 to-emerald-500'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl mb-1">
                {willRain ? '🌧️' : '☀️'}
              </div>
              <p className="text-lg font-bold text-white mb-1">
                {currentRaining ? 'Currently Raining' : (forecastShowsRain ? 'Rain Expected' : 'Clear Skies')}
              </p>
              <p className="text-sm text-white/80">
                {currentRaining 
                  ? 'Rain detected in your area' 
                  : (forecastShowsRain ? 'Next hour' : 'No rain in next hour')}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black text-white">
                {displayTotal.toFixed(1)}
              </div>
              <div className="text-xs text-white/80">mm {currentRaining && !forecastShowsRain ? 'now' : 'total'}</div>
            </div>
          </div>
        </div>

        {/* Timeline Header */}
        <div className="flex items-center gap-2 mb-4">
          <FiClock className="text-gray-600 dark:text-gray-400" />
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Next Hour Timeline</p>
        </div>

        {/* Precipitation Bars */}
        <div className="space-y-3 mb-6">
          {nextHourData.map((data, index) => (
            <div key={index} className="group/item">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 w-16 whitespace-nowrap">
                  {data.time}
                </span>
                <div className="flex-1 relative">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-8 overflow-hidden shadow-inner">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2 ${
                        data.precip > 0.1 
                          ? 'bg-gradient-to-r from-blue-400 to-blue-600' 
                          : 'bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700'
                      }`}
                      style={{ width: `${Math.max((data.precip / maxPrecip) * 100, 5)}%` }}
                    >
                      {data.precip > 0.1 && (
                        <FiDroplet className="text-white text-xs" />
                      )}
                    </div>
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-800 dark:text-white w-14 text-right">
                  {data.precip.toFixed(1)}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 w-8">mm</span>
              </div>
            </div>
          ))}
        </div>

        {/* Info Card */}
        <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-4 border border-blue-200/50 dark:border-gray-600/50">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 text-xl">💧</div>
            <div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                About Precipitation Data
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Showing rainfall intensity in 15-minute intervals. Values above 0.1mm indicate measurable precipitation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrecipitationRadar
