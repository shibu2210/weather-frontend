const PollutantDetails = ({ airQuality }) => {
  const pollutants = [
    { name: 'PM2.5', value: airQuality.pm2_5, unit: 'µg/m³', description: 'Fine Particulate Matter' },
    { name: 'PM10', value: airQuality.pm10, unit: 'µg/m³', description: 'Particulate Matter' },
    { name: 'CO', value: airQuality.co, unit: 'µg/m³', description: 'Carbon Monoxide' },
    { name: 'NO₂', value: airQuality.no2, unit: 'µg/m³', description: 'Nitrogen Dioxide' },
    { name: 'SO₂', value: airQuality.so2, unit: 'µg/m³', description: 'Sulfur Dioxide' },
    { name: 'O₃', value: airQuality.o3, unit: 'µg/m³', description: 'Ozone' }
  ]

  return (
    <div>
      <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Pollutant Levels
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {pollutants.map((pollutant, index) => (
          <div 
            key={index}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3"
          >
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                {pollutant.name}
              </span>
              <span className="text-base sm:text-lg font-bold text-gray-800 dark:text-white">
                {pollutant.value?.toFixed(1) || 'N/A'}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {pollutant.unit}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 hidden sm:block">
              {pollutant.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PollutantDetails
