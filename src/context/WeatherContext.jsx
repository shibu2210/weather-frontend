import { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentWeather, getForecast, getWeatherByCoordinates, getAqiByStationUid } from '../services/weatherService'
import { getLastLocation, setLastLocation, getUnits, setUnits as saveUnits } from '../services/storageService'
import { DEFAULT_LOCATION } from '../utils/constants'

const WeatherContext = createContext()

export const useWeather = () => {
  const context = useContext(WeatherContext)
  if (!context) {
    throw new Error('useWeather must be used within WeatherProvider')
  }
  return context
}

export const WeatherProvider = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(true) // Start with true for initial load
  const [error, setError] = useState(null)
  const [location, setLocation] = useState(null)
  const [units, setUnits] = useState(getUnits())

  const fetchWeatherData = async (locationQuery) => {
    setLoading(true)
    setError(null)
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(locationQuery),
        getForecast(locationQuery, 7)
      ])
      
      // Backend always merges AQICN data, so show AQICN as the source
      if (weatherData.location) {
        weatherData.location.aqiSource = 'AQICN'
      }
      
      setCurrentWeather(weatherData)
      setForecast(forecastData)
      setLocation(weatherData.location)
      setLastLocation(weatherData.location)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather data')
      console.error('Error fetching weather:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchWeatherByCoords = async (lat, lon, locationName = null, stationUid = null, preserveLocationName = false) => {
    setLoading(true)
    setError(null)
    
    try {
      const promises = [
        getWeatherByCoordinates(lat, lon),
        getForecast(`${lat},${lon}`, 7)
      ]
      
      // If this is from an AQI station with UID, fetch the exact station's data
      if (stationUid) {
        console.log('Fetching AQICN data for station UID:', stationUid)
        promises.push(
          getAqiByStationUid(stationUid).catch(err => {
            console.error('Failed to fetch AQICN data by UID:', err)
            return null // Return null instead of failing
          })
        )
      } else {
        console.log('No station UID provided, skipping AQICN fetch')
      }
      
      const results = await Promise.all(promises)
      const weatherData = results[0]
      const forecastData = results[1]
      const aqicnData = results[2] // Will be undefined/null if not fetched or failed
      
      console.log('AQICN data received:', aqicnData)
      
      // If location name provided and we want to preserve it, override WeatherAPI's name
      if (locationName) {
        if (preserveLocationName) {
          // Override the main location name (for Google Places and AQI stations)
          weatherData.location.name = locationName
          
          // Backend always merges AQICN data, so always show AQICN
          console.log('Setting aqiSource to AQICN (backend merges AQICN data)')
          weatherData.location.aqiSource = 'AQICN'
        } else {
          // Add as station name (legacy, not currently used)
          weatherData.location.stationName = locationName
        }
      }
      
      // If we have AQICN data, override the weather API's AQI with accurate station data
      if (aqicnData) {
        console.log('Overriding WeatherAPI AQI with AQICN station data:', {
          stationUid,
          stationName: aqicnData.stationName,
          weatherApiAqi: weatherData.current?.air_quality?.aqi,
          aqicnAqi: aqicnData.aqi
        })
        
        // Ensure air_quality object exists (note: underscore, not camelCase!)
        if (!weatherData.current.air_quality) {
          weatherData.current.air_quality = {}
        }
        
        // Override with accurate AQICN data
        console.log('Before override - AQI:', weatherData.current.air_quality.aqi)
        weatherData.current.air_quality.aqi = aqicnData.aqi
        weatherData.current.air_quality.usEpaIndex = aqicnData.aqi
        console.log('After override - AQI:', weatherData.current.air_quality.aqi)
        
        // Update pollutant data if available
        if (aqicnData.pollutants) {
          if (aqicnData.pollutants.pm25) weatherData.current.air_quality.pm2_5 = aqicnData.pollutants.pm25
          if (aqicnData.pollutants.pm10) weatherData.current.air_quality.pm10 = aqicnData.pollutants.pm10
          if (aqicnData.pollutants.o3) weatherData.current.air_quality.o3 = aqicnData.pollutants.o3
          if (aqicnData.pollutants.no2) weatherData.current.air_quality.no2 = aqicnData.pollutants.no2
          if (aqicnData.pollutants.so2) weatherData.current.air_quality.so2 = aqicnData.pollutants.so2
          if (aqicnData.pollutants.co) weatherData.current.air_quality.co = aqicnData.pollutants.co
        }
        
        // Store AQICN metadata for reference
        weatherData.aqicnData = {
          stationName: aqicnData.stationName,
          category: aqicnData.category,
          dominantPollutant: aqicnData.dominantPollutant,
          lastUpdated: aqicnData.lastUpdated
        }
        
        // Mark that user explicitly selected an AQI monitoring station
        console.log('Setting aqiSource to AQICN (monitoring station)')
        weatherData.location.aqiSource = 'AQICN'
      } else if (stationUid) {
        // If we have a station UID but no AQICN data (error case), still mark as AQICN
        console.log('Station UID exists but no AQICN data, still setting to AQICN')
        weatherData.location.aqiSource = 'AQICN'
      }
      
      setCurrentWeather(weatherData)
      setForecast(forecastData)
      setLocation(weatherData.location)
      setLastLocation(weatherData.location)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather data')
      console.error('Error fetching weather by coordinates:', err)
    } finally {
      setLoading(false)
    }
  }

  const refreshWeather = () => {
    if (location) {
      // If we have a location with coordinates, use them for accuracy
      if (location.lat && location.lon) {
        fetchWeatherByCoords(location.lat, location.lon, location.name, null, true)
      } else {
        fetchWeatherData(location.name)
      }
    } else {
      // If no location (error on initial load), try default location
      const lastLoc = getLastLocation()
      if (lastLoc?.name) {
        // If saved location has coordinates, use them
        if (lastLoc.lat && lastLoc.lon) {
          fetchWeatherByCoords(lastLoc.lat, lastLoc.lon, lastLoc.name, null, true)
        } else {
          fetchWeatherData(lastLoc.name)
        }
      } else {
        fetchWeatherData(DEFAULT_LOCATION)
      }
    }
  }

  const changeUnits = (newUnits) => {
    setUnits(newUnits)
    saveUnits(newUnits)
  }

  useEffect(() => {
    const initializeLocation = async () => {
      const lastLoc = getLastLocation()
      
      // If user has a saved location, use it
      if (lastLoc?.name) {
        console.log('Using saved location:', lastLoc.name)
        // If saved location has coordinates, use them for better accuracy
        if (lastLoc.lat && lastLoc.lon) {
          console.log('Using saved coordinates:', lastLoc.lat, lastLoc.lon)
          fetchWeatherByCoords(lastLoc.lat, lastLoc.lon, lastLoc.name, null, true)
        } else {
          fetchWeatherData(lastLoc.name)
        }
        return
      }
      
      // For first-time users, start with default location immediately
      // This prevents showing random IP-based locations
      console.log('No saved location, loading default location first:', DEFAULT_LOCATION)
      fetchWeatherData(DEFAULT_LOCATION)
      
      // Then try to get user's actual location in the background
      if ('geolocation' in navigator) {
        console.log('Requesting geolocation permission...')
        
        // Request geolocation with reasonable timeout
        const geolocationPromise = new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 15000, // 15 seconds for user to respond to permission prompt
            maximumAge: 0,
            enableHighAccuracy: true
          })
        })
        
        try {
          const position = await geolocationPromise
          const { latitude, longitude } = position.coords
          console.log('Got geolocation:', latitude, longitude)
          
          // Try to use Google's reverse geocoding for accurate location name
          try {
            // Wait for Google Maps to load (with timeout)
            const googleLoadPromise = new Promise((resolve) => {
              const checkGoogle = () => {
                if (window.google?.maps?.Geocoder) {
                  resolve(true)
                } else {
                  setTimeout(checkGoogle, 100)
                }
              }
              checkGoogle()
            })
            
            const googleTimeout = new Promise((resolve) => setTimeout(() => resolve(false), 2000))
            const googleLoaded = await Promise.race([googleLoadPromise, googleTimeout])
            
            if (googleLoaded && window.google?.maps?.Geocoder) {
              const geocoder = new window.google.maps.Geocoder()
              const result = await new Promise((resolve) => {
                geocoder.geocode(
                  { location: { lat: latitude, lng: longitude } },
                  (results, status) => {
                    if (status === 'OK' && results && results.length > 0) {
                      const bestResult = results.find(r => 
                        r.types.includes('locality') || 
                        r.types.includes('sublocality') ||
                        r.types.includes('neighborhood')
                      ) || results[0]
                      
                      resolve({
                        name: bestResult.address_components[0]?.long_name || bestResult.formatted_address
                      })
                    } else {
                      resolve(null)
                    }
                  }
                )
              })
              
              if (result?.name) {
                console.log('Updating to Google geocoded location:', result.name)
                fetchWeatherByCoords(latitude, longitude, result.name, null, true)
                return
              }
            }
          } catch (geoError) {
            console.warn('Google geocoding failed:', geoError)
          }
          
          // Fallback to coordinates if Google geocoding fails
          console.log('Updating to coordinates-based location')
          fetchWeatherByCoords(latitude, longitude)
        } catch (error) {
          // Geolocation failed, denied, or timed out - keep showing default location
          console.log('Geolocation failed, keeping default location:', error.message)
          // Don't do anything - default location is already loaded
        }
      } else {
        console.log('Geolocation not supported, keeping default location')
      }
    }
    
    initializeLocation()
  }, [])

  const value = {
    currentWeather,
    forecast,
    loading,
    error,
    location,
    units,
    fetchWeatherData,
    fetchWeatherByCoords,
    refreshWeather,
    changeUnits
  }

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  )
}
