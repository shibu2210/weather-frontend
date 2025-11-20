import { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentWeather, getForecast, getWeatherByCoordinates, getAqiByCoordinates, getAqiByStationUid } from '../services/weatherService'
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
      
      // For regular city/location searches, show as WeatherAPI for clarity
      // (even though backend merges AQICN data in the background)
      if (weatherData.location) {
        weatherData.location.aqiSource = 'WeatherAPI'
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
          
          // If no station UID, this is a Google Place, show as WeatherAPI
          if (!stationUid) {
            console.log('Setting aqiSource to WeatherAPI (Google Place)')
            weatherData.location.aqiSource = 'WeatherAPI'
          } else {
            console.log('Station UID exists, will set aqiSource to AQICN later')
          }
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
      fetchWeatherData(location.name)
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
        fetchWeatherData(lastLoc.name)
        return
      }
      
      // Otherwise, try to get user's current location
      if ('geolocation' in navigator) {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              timeout: 5000,
              maximumAge: 300000 // 5 minutes
            })
          })
          
          const { latitude, longitude } = position.coords
          fetchWeatherByCoords(latitude, longitude)
        } catch (error) {
          // If geolocation fails, fall back to default location
          console.log('Geolocation not available, using default location')
          fetchWeatherData(DEFAULT_LOCATION)
        }
      } else {
        // Geolocation not supported, use default
        fetchWeatherData(DEFAULT_LOCATION)
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
