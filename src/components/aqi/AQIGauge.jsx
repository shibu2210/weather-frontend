const AQIGauge = ({ value, level }) => {
  // Calculate percentage for visual display (cap at 500 for gauge)
  const displayValue = Math.min(value, 500)
  const percentage = (displayValue / 500) * 100

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 md:w-48 md:h-48">
        <svg className="transform -rotate-90 w-32 h-32 md:w-48 md:h-48">
          <circle
            cx="64"
            cy="64"
            r="52"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-gray-200 dark:text-gray-700 md:hidden"
          />
          <circle
            cx="64"
            cy="64"
            r="52"
            stroke={level?.color || '#00E400'}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={`${percentage * 3.27} 327`}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out md:hidden"
          />
          <circle
            cx="96"
            cy="96"
            r="80"
            stroke="currentColor"
            strokeWidth="16"
            fill="transparent"
            className="text-gray-200 dark:text-gray-700 hidden md:block"
          />
          <circle
            cx="96"
            cy="96"
            r="80"
            stroke={level?.color || '#00E400'}
            strokeWidth="16"
            fill="transparent"
            strokeDasharray={`${percentage * 5.03} 503`}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out hidden md:block"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white">
            {value}
          </span>
          <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
            AQI
          </span>
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        US EPA Standard
      </p>
    </div>
  )
}

export default AQIGauge
