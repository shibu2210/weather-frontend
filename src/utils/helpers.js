import { AQI_LEVELS, UV_INDEX_LEVELS } from './constants'

export const getAQILevel = (aqiValue) => {
  if (!aqiValue) return null
  
  for (const level of Object.values(AQI_LEVELS)) {
    if (aqiValue >= level.min && aqiValue <= level.max) {
      return level
    }
  }
  return AQI_LEVELS.HAZARDOUS
}

export const getUVLevel = (uvValue) => {
  if (!uvValue) return UV_INDEX_LEVELS.LOW
  
  for (const level of Object.values(UV_INDEX_LEVELS)) {
    if (uvValue >= level.min && uvValue <= level.max) {
      return level
    }
  }
  return UV_INDEX_LEVELS.EXTREME
}

export const formatTemperature = (temp, unit = 'metric') => {
  if (temp === null || temp === undefined) return '--'
  return unit === 'metric' ? `${Math.round(temp)}°C` : `${Math.round(temp)}°F`
}

export const formatTime = (timeString) => {
  if (!timeString) return ''
  const date = new Date(timeString)
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

export const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

export const getWeatherIcon = (iconUrl) => {
  if (!iconUrl) return ''
  return iconUrl.startsWith('//') ? `https:${iconUrl}` : iconUrl
}

export const debounce = (func, delay) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export const getWindSpeed = (speedKph, speedMph, unit = 'metric') => {
  return unit === 'metric' ? `${speedKph} km/h` : `${speedMph} mph`
}

export const getPressure = (pressureMb, pressureIn, unit = 'metric') => {
  return unit === 'metric' ? `${pressureMb} mb` : `${pressureIn} inHg`
}

export const getVisibility = (visKm, visMiles, unit = 'metric') => {
  return unit === 'metric' ? `${visKm} km` : `${visMiles} miles`
}
