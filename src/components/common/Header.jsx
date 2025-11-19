import { WiDaySunny, WiNightClear } from 'react-icons/wi'
import { FiRefreshCw } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext'
import { useWeather } from '../../context/WeatherContext'
import UnitToggle from '../settings/UnitToggle'

const Header = () => {
  const { theme, toggleTheme } = useTheme()
  const { refreshWeather, loading } = useWeather()

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <WiDaySunny className="text-3xl md:text-4xl text-blue-500" />
            <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Weather AQI
            </h1>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3">
            <UnitToggle />
            
            <button
              onClick={refreshWeather}
              disabled={loading}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-105 active:scale-95"
              title="Refresh weather data"
            >
              <FiRefreshCw 
                className={`text-lg md:text-xl text-gray-600 dark:text-gray-300 ${loading ? 'animate-spin' : ''}`} 
              />
            </button>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-105 active:scale-95"
              title="Toggle theme"
            >
              {theme === 'light' ? (
                <WiNightClear className="text-xl md:text-2xl text-gray-600" />
              ) : (
                <WiDaySunny className="text-xl md:text-2xl text-yellow-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
