import { Link } from 'react-router-dom'
import { useWeather } from '../context/WeatherContext'
import Header from '../components/common/Header'
import SearchBar from '../components/search/SearchBar'
import CurrentWeather from '../components/weather/CurrentWeather'
import HourlyForecast from '../components/weather/HourlyForecast'
import DailyForecast from '../components/weather/DailyForecast'
import AQICard from '../components/aqi/AQICard'
import SunriseSunset from '../components/weather/SunriseSunset'
import WindCompass from '../components/weather/WindCompass'
import UvIndex from '../components/weather/UvIndex'
import PrecipitationRadar from '../components/weather/PrecipitationRadar'
import HealthScore from '../components/health/HealthScore'
import WeatherInsights from '../components/health/WeatherInsights'
import PollenForecast from '../components/health/PollenForecast'
import SkeletonLoader from '../components/common/SkeletonLoader'
import ErrorMessage from '../components/common/ErrorMessage'

const Dashboard = () => {
  const { loading, error, refreshWeather } = useWeather()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 transition-colors flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
        <div className="mb-6 sm:mb-8">
          <SearchBar />
        </div>

        {loading && <SkeletonLoader />}
        
        {error && (
          <ErrorMessage 
            message={error} 
            onRetry={refreshWeather}
          />
        )}

        {!loading && !error && (
          <div className="space-y-6">
            {/* Main Weather Card */}
            <CurrentWeather />
            
            {/* Health Score & AI Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HealthScore />
              <WeatherInsights />
            </div>
            
            {/* Hourly Forecast & AQI */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HourlyForecast />
              <AQICard />
            </div>
            
            {/* UV Index, Precipitation & Pollen */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <UvIndex />
              <PrecipitationRadar />
              <PollenForecast />
            </div>
            
            {/* Wind & Sun/Moon Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <WindCompass />
              <SunriseSunset />
            </div>
            
            {/* 16-Day Forecast */}
            <DailyForecast />
          </div>
        )}
      </main>

      <footer className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm mt-auto py-6 border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-sm">
              <Link 
                to="/about"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                About
              </Link>
              <span className="text-gray-400">•</span>
              <Link 
                to="/contact"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Contact
              </Link>
              <span className="text-gray-400">•</span>
              <Link 
                to="/faq"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                FAQ
              </Link>
              <span className="text-gray-400">•</span>
              <Link 
                to="/privacy"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Privacy
              </Link>
              <span className="text-gray-400">•</span>
              <Link 
                to="/terms"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Terms
              </Link>
              <span className="text-gray-400">•</span>
              <Link 
                to="/license"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                License
              </Link>
            </div>
            <div className="text-center text-gray-600 dark:text-gray-400">
              <p className="text-sm">Weather data by <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Open-Meteo</a> • Air quality data by <a href="https://aqicn.org/" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">AQICN</a></p>
              <p className="text-xs mt-1">© 2025 Weather AQI. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Dashboard
