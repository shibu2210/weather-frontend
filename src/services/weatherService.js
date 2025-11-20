import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

const weatherApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
weatherApi.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method.toUpperCase(), config.url)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
weatherApi.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export const getCurrentWeather = async (location) => {
  const response = await weatherApi.get('/weather/current', {
    params: { location }
  })
  return response.data
}

export const getForecast = async (location, days = 3) => {
  const response = await weatherApi.get('/weather/forecast', {
    params: { location, days }
  })
  return response.data
}

export const searchLocation = async (query) => {
  const response = await weatherApi.get('/weather/search', {
    params: { query }
  })
  // Handle both array and object responses
  return Array.isArray(response.data) ? response.data : (response.data.value || response.data || [])
}

export const getWeatherByCoordinates = async (lat, lon) => {
  const response = await weatherApi.get('/weather/by-coordinates', {
    params: { lat, lon }
  })
  return response.data
}

export const searchAqiStations = async (keyword) => {
  const response = await weatherApi.get('/aqi/search', {
    params: { keyword }
  })
  return response.data
}

export const searchEnhanced = async (query) => {
  try {
    const [weatherResults, aqiResults] = await Promise.all([
      searchLocation(query).catch(() => []),
      searchAqiStations(query).catch(() => ({ data: [] }))
    ])
    
    return {
      cities: weatherResults || [],
      stations: aqiResults.data || []
    }
  } catch (error) {
    console.error('Enhanced search error:', error)
    return { cities: [], stations: [] }
  }
}

export const checkHealth = async () => {
  const response = await weatherApi.get('/weather/health')
  return response.data
}

export default weatherApi
