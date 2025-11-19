import { useState, useEffect } from 'react'
import { FiSearch, FiMapPin } from 'react-icons/fi'
import { searchLocation } from '../../services/weatherService'
import { useWeather } from '../../context/WeatherContext'
import { addRecentSearch } from '../../services/storageService'
import { debounce } from '../../utils/helpers'
import { useGeolocation } from '../../hooks/useGeolocation'

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [searching, setSearching] = useState(false)
  const { fetchWeatherData } = useWeather()
  const { location, error: geoError, loading: geoLoading, getCurrentLocation } = useGeolocation()

  const fetchSuggestions = debounce(async (searchQuery) => {
    if (searchQuery.length < 2) {
      setSuggestions([])
      return
    }

    setSearching(true)
    try {
      const results = await searchLocation(searchQuery)
      setSuggestions(results)
    } catch (error) {
      console.error('Search error:', error)
      setSuggestions([])
    } finally {
      setSearching(false)
    }
  }, 300)

  useEffect(() => {
    fetchSuggestions(query)
  }, [query])

  const handleSelectLocation = (location) => {
    const locationData = {
      name: location.name,
      region: location.region,
      country: location.country
    }
    addRecentSearch(locationData)
    fetchWeatherData(location.name)
    setQuery('')
    setSuggestions([])
    setShowSuggestions(false)
  }

  const handleCurrentLocation = () => {
    getCurrentLocation()
  }

  useEffect(() => {
    if (location) {
      fetchWeatherData(`${location.latitude},${location.longitude}`)
    }
  }, [location])

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg md:text-xl z-10" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Search for a city..."
            className="w-full pl-10 md:pl-12 pr-10 md:pr-4 py-3 md:py-3.5 text-sm md:text-base rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
          />
          {searching && (
            <div className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2">
              <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        
        <button
          onClick={handleCurrentLocation}
          disabled={geoLoading}
          className="flex-shrink-0 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Use current location"
        >
          <FiMapPin className={`text-lg md:text-xl ${geoLoading ? 'animate-pulse' : ''}`} />
        </button>
      </div>
      
      {geoError && (
        <p className="text-xs text-red-500 dark:text-red-400 mt-2">
          {geoError}
        </p>
      )}

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-20 w-full mt-2 bg-white/95 dark:bg-gray-700/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-600/50 max-h-64 overflow-y-auto">
          {suggestions.map((location, index) => (
            <button
              key={index}
              onClick={() => handleSelectLocation(location)}
              className="w-full px-3 md:px-4 py-2 md:py-3 text-left hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-150 border-b border-gray-100 dark:border-gray-600 last:border-b-0 first:rounded-t-xl last:rounded-b-xl"
            >
              <div className="text-sm md:text-base font-medium text-gray-800 dark:text-white">
                {location.name}
              </div>
              <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                {location.region}, {location.country}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
