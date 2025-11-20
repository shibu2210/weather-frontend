import { useState, useEffect, useRef } from 'react'
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
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const suggestionRefs = useRef([])
  const dropdownRef = useRef(null)
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
    setSelectedIndex(-1) // Reset selection when query changes
  }, [query])

  // Auto-scroll to selected item
  useEffect(() => {
    if (selectedIndex >= 0 && suggestionRefs.current[selectedIndex] && dropdownRef.current) {
      const selectedElement = suggestionRefs.current[selectedIndex]
      const dropdown = dropdownRef.current
      
      const elementTop = selectedElement.offsetTop
      const elementBottom = elementTop + selectedElement.offsetHeight
      const dropdownTop = dropdown.scrollTop
      const dropdownBottom = dropdownTop + dropdown.clientHeight
      
      // Scroll if element is not fully visible
      if (elementTop < dropdownTop) {
        dropdown.scrollTop = elementTop
      } else if (elementBottom > dropdownBottom) {
        dropdown.scrollTop = elementBottom - dropdown.clientHeight
      }
    }
  }, [selectedIndex])

  // Get all suggestions in a flat array for keyboard navigation
  const getAllSuggestions = () => {
    return [
      ...suggestions.googlePlaces.slice(0, 5).map(item => ({ type: 'google', data: item })),
      ...suggestions.cities.map(item => ({ type: 'city', data: item })),
      ...suggestions.stations.slice(0, 8).map(item => ({ type: 'station', data: item }))
    ]
  }

  const handleKeyDown = (e) => {
    const allSuggestions = getAllSuggestions()
    
    if (!showSuggestions || allSuggestions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < allSuggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < allSuggestions.length) {
          const selected = allSuggestions[selectedIndex]
          if (selected.type === 'google') {
            handleSelectGooglePlace(selected.data)
          } else if (selected.type === 'city') {
            handleSelectCity(selected.data)
          } else if (selected.type === 'station') {
            handleSelectStation(selected.data)
          }
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        setSelectedIndex(-1)
        break
      default:
        break
    }
  }

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
            onBlur={() => setTimeout(() => {
              setShowSuggestions(false)
              setSelectedIndex(-1)
            }, 200)}
            onKeyDown={handleKeyDown}
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
        <div 
          ref={dropdownRef}
          className="absolute z-20 w-full mt-2 bg-white/95 dark:bg-gray-700/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-600/50 max-h-96 overflow-y-auto"
        >
          {/* Google Places Section */}
          {suggestions.googlePlaces.length > 0 && (
            <div>
              <div className="px-3 md:px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wide sticky top-0 flex items-center gap-2">
                <MdLocationOn className="text-sm text-blue-600 dark:text-blue-400" />
                <span>Google Places (Precise Locations)</span>
              </div>
              {suggestions.googlePlaces.slice(0, 5).map((place, index) => {
                const globalIndex = index
                const isSelected = selectedIndex === globalIndex
                return (
                  <button
                    key={`google-${index}`}
                    ref={(el) => (suggestionRefs.current[globalIndex] = el)}
                    onClick={() => handleSelectGooglePlace(place)}
                    className={`w-full px-3 md:px-4 py-2 md:py-3 text-left transition-all duration-150 border-b border-gray-100 dark:border-gray-600 ${
                      isSelected 
                        ? 'bg-blue-100 dark:bg-blue-900/50' 
                        : 'hover:bg-blue-50 dark:hover:bg-gray-600'
                    }`}
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
                )
              })}
            </div>
          )}

          {/* Cities Section */}
          {suggestions.cities.length > 0 && (
            <div>
              <div className="px-3 md:px-4 py-2 bg-gray-100 dark:bg-gray-600 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide sticky top-0">
                📍 Cities
              </div>
              {suggestions.cities.map((location, index) => {
                const googlePlacesCount = Math.min(suggestions.googlePlaces.length, 5)
                const globalIndex = googlePlacesCount + index
                const isSelected = selectedIndex === globalIndex
                return (
                  <button
                    key={`city-${index}`}
                    ref={(el) => (suggestionRefs.current[globalIndex] = el)}
                    onClick={() => handleSelectCity(location)}
                    className={`w-full px-3 md:px-4 py-2 md:py-3 text-left transition-all duration-150 border-b border-gray-100 dark:border-gray-600 ${
                      isSelected 
                        ? 'bg-blue-100 dark:bg-blue-900/50' 
                        : 'hover:bg-blue-50 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="text-sm md:text-base font-medium text-gray-800 dark:text-white">
                      {location.name}
                    </div>
                    <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      {location.region}, {location.country}
                    </div>
                  </button>
                )
              })}
            </div>
          )}

          {/* AQI Stations Section */}
          {suggestions.stations.length > 0 && (
            <div>
              <div className="px-3 md:px-4 py-2 bg-gray-100 dark:bg-gray-600 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide sticky top-0 flex items-center gap-2">
                <MdFactory className="text-sm" />
                <span>AQI Monitoring Stations</span>
              </div>
              {suggestions.stations.slice(0, 8).map((station, index) => {
                const googlePlacesCount = Math.min(suggestions.googlePlaces.length, 5)
                const citiesCount = suggestions.cities.length
                const globalIndex = googlePlacesCount + citiesCount + index
                const isSelected = selectedIndex === globalIndex
                return (
                  <button
                    key={`station-${index}`}
                    ref={(el) => (suggestionRefs.current[globalIndex] = el)}
                    onClick={() => handleSelectStation(station)}
                    className={`w-full px-3 md:px-4 py-2 md:py-3 text-left transition-all duration-150 border-b border-gray-100 dark:border-gray-600 last:border-b-0 ${
                      isSelected 
                        ? 'bg-blue-100 dark:bg-blue-900/50' 
                        : 'hover:bg-blue-50 dark:hover:bg-gray-600'
                    }`}
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
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar
