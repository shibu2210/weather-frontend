import { useWeather } from '../../context/WeatherContext'

const UnitToggle = () => {
  const { units, changeUnits } = useWeather()

  return (
    <div className="flex items-center gap-2 bg-white/10 dark:bg-gray-700/50 backdrop-blur-sm rounded-lg p-1">
      <button
        onClick={() => changeUnits('metric')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          units === 'metric'
            ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
        }`}
      >
        °C
      </button>
      <button
        onClick={() => changeUnits('imperial')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          units === 'imperial'
            ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
        }`}
      >
        °F
      </button>
    </div>
  )
}

export default UnitToggle
