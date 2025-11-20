import { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentWeather, getForecast, getWeatherByCoordinates } from '../services/weatherService'
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

  const fetchWeatherByCoords = async (lat, lon, stationName = null) => {
    setLoading(true)
    setError(null)
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        getWeatherByCoordinates(lat, lon),
        getForecast(`${lat},${lon}`, 7)
      ])
      
      // If station name provided, add it to location
      if (stationName) {
        weatherData.location.stationName = stationName
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
