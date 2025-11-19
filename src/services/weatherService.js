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
  return response.data
}

export const checkHealth = async () => {
  const response = await weatherApi.get('/weather/health')
  return response.data
}

export default weatherApi
