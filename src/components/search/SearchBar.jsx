import { useState, useEffect } from 'react'
import { FiSearch, FiMapPin } from 'react-icons/fi'
import { MdFactory, MdLocationOn } from 'react-icons/md'
import { searchEnhanced } from '../../services/weatherService'
import { useWeather } from '../../context/WeatherContext'
import { addRecentSearch } from '../../services/storageService'
import { debounce } from '../../utils/helpers'
import { useGeolocation } from '../../hooks/useGeolocation'
import { useGooglePlaces } from '../../hooks/useGooglePlaces'

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState({ cities: [], stations: [], googlePlaces: [] })
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [searching, setSearching] = useState(false)
  const { fetchWeatherData, fetchWeatherByCoords } = useWeather()
  const { location, error: geoError, loading: geoLoading, getCurrentLocation } = useGeolocation()
  const { isLoaded: googleLoaded, searchPlaces, getPlaceDetails } = useGooglePlaces()

  const fetchSuggestions = debounce(async (searchQuery) => {
    if (searchQuery.length < 2) {
      setSuggestions({ cities: [], stations: [], googlePlaces: [] })
      return
    }

    setSearching(true)
    try {
      // Fetch from all sources in parallel
      const [apiResults, googleResults] = await Promise.all([
        searchEnhanced(searchQuery),
        googleLoaded ? searchPlaces(searchQuery) : Promise.resolve([])
      ])

      console.log('API results:', apiResults)
      console.log('Google Places:', googleResults?.length || 0)

      setSuggestions({
        cities: apiResults.cities || [],
        stations: apiResults.stations || [],
        googlePlaces: googleResults || []
      })
    } catch (error) {
      console.error('Search error:', error)
      setSuggestions({ cities: [], stations: [], googlePlaces: [] })
    } finally {
      setSearching(false)
    }
  }, 300)

  useEffect(() => {
    fetchSuggestions(query)
  }, [query])

  const handleSelectCity = (location) => {
    const locationData = {
      name: location.name,
      region: location.region,
      country: location.country
    }
    addRecentSearch(locationData)
    fetchWeatherData(location.name)
    setQuery('')
    setSuggestions({ cities: [], stations: [], googlePlaces: [] })
    setShowSuggestions(false)
  }

  const handleSelectStation = (station) => {
    const [lat, lon] = station.station.geo
    const locationData = {
      name: station.station.name,
      region: 'AQI Station',
      country: ''
    }
    addRecentSearch(locationData)
    fetchWeatherByCoords(lat, lon, station.station.name)
    setQuery('')
    setSuggestions({ cities: [], stations: [], googlePlaces: [] })
    setShowSuggestions(false)
  }

  const handleSelectGooglePlace = async (place) => {
    try {
      const details = await getPlaceDetails(place.place_id)
      if (details && details.geometry) {
        const lat = details.geometry.location.lat()
        const lon = details.geometry.location.lng()
        
        const locationData = {
          name: details.name,
          region: place.structured_formatting?.secondary_text || '',
          country: ''
        }
        addRecentSearch(locationData)
        fetchWeatherByCoords(lat, lon, details.name)
        setQuery('')
        setSuggestions({ cities: [], stations: [], googlePlaces: [] })
        setShowSuggestions(false)
      }
    } catch (error) {
      console.error('Error getting place details:', error)
    }
  }

  const getAqiColor = (aqi) => {
    const aqiNum = parseInt(aqi)
    if (aqiNum <= 50) return 'text-green-600 dark:text-green-400'
    if (aqiNum <= 100) return 'text-yellow-600 dark:text-yellow-400'
    if (aqiNum <= 150) return 'text-orange-600 dark:text-orange-400'
    if (aqiNum <= 200) return 'text-red-600 dark:text-red-400'
    if (aqiNum <= 300) return 'text-purple-600 dark:text-purple-400'
    return 'text-red-900 dark:text-red-500'
  }

  const getAqiLabel = (aqi) => {
    const aqiNum = parseInt(aqi)
    if (aqiNum <= 50) return 'Good'
    if (aqiNum <= 100) return 'Moderate'
    if (aqiNum <= 150) return 'Unhealthy for Sensitive'
    if (aqiNum <= 200) return 'Unhealthy'
    if (aqiNum <= 300) return 'Very Unhealthy'
    return 'Hazardous'
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
            placeholder="Search for a city or area..."
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

      {showSuggestions && (suggestions.cities.length > 0 || suggestions.stations.length > 0 || suggestions.googlePlaces.length > 0) && (
        <div className="absolute z-20 w-full mt-2 bg-white/95 dark:bg-gray-700/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-600/50 max-h-96 overflow-y-auto">
          {/* Google Places Section */}
          {suggestions.googlePlaces.length > 0 && (
            <div>
              <div className="px-3 md:px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wide sticky top-0 flex items-center gap-2">
                <MdLocationOn className="text-sm text-blue-600 dark:text-blue-400" />
                <span>Google Places (Precise Locations)</span>
              </div>
              {suggestions.googlePlaces.slice(0, 5).map((place, index) => (
                <button
                  key={`google-${index}`}
                  onClick={() => handleSelectGooglePlace(place)}
                  className="w-full px-3 md:px-4 py-2 md:py-3 text-left hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-150 border-b border-gray-100 dark:border-gray-600"
                >
                  <div className="flex items-start gap-2">
                    <MdLocationOn className="text-blue-500 dark:text-blue-400 mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm md:text-base font-medium text-gray-800 dark:text-white">
                        {place.structured_formatting?.main_text || place.description}
                      </div>
                      <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                        {place.structured_formatting?.secondary_text || ''}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Cities Section */}
          {suggestions.cities.length > 0 && (
            <div>
              <div className="px-3 md:px-4 py-2 bg-gray-100 dark:bg-gray-600 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide sticky top-0">
                📍 Cities
              </div>
              {suggestions.cities.map((location, index) => (
                <button
                  key={`city-${index}`}
                  onClick={() => handleSelectCity(location)}
                  className="w-full px-3 md:px-4 py-2 md:py-3 text-left hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-150 border-b border-gray-100 dark:border-gray-600"
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

          {/* AQI Stations Section */}
          {suggestions.stations.length > 0 && (
            <div>
              <div className="px-3 md:px-4 py-2 bg-gray-100 dark:bg-gray-600 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide sticky top-0 flex items-center gap-2">
                <MdFactory className="text-sm" />
                <span>AQI Monitoring Stations</span>
              </div>
              {suggestions.stations.slice(0, 8).map((station, index) => (
                <button
                  key={`station-${index}`}
                  onClick={() => handleSelectStation(station)}
                  className="w-full px-3 md:px-4 py-2 md:py-3 text-left hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-150 border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm md:text-base font-medium text-gray-800 dark:text-white truncate">
                        {station.station.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        Monitoring Station
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <div className={`text-sm md:text-base font-bold ${getAqiColor(station.aqi)}`}>
                        AQI {station.aqi}
                      </div>
                      <div className={`text-xs ${getAqiColor(station.aqi)}`}>
                        {getAqiLabel(station.aqi)}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar
