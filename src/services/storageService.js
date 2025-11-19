const STORAGE_KEYS = {
  RECENT_SEARCHES: 'weather_recent_searches',
  FAVORITES: 'weather_favorites',
  LAST_LOCATION: 'weather_last_location',
  THEME: 'weather_theme',
  UNITS: 'weather_units'
}

export const getRecentSearches = () => {
  try {
    const searches = localStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES)
    return searches && searches !== 'undefined' ? JSON.parse(searches) : []
  } catch (error) {
    console.error('Error parsing recent searches:', error)
    return []
  }
}

export const addRecentSearch = (location) => {
  const searches = getRecentSearches()
  const filtered = searches.filter(s => s.name !== location.name)
  const updated = [location, ...filtered].slice(0, 5)
  localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(updated))
}

export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem(STORAGE_KEYS.FAVORITES)
    return favorites && favorites !== 'undefined' ? JSON.parse(favorites) : []
  } catch (error) {
    console.error('Error parsing favorites:', error)
    return []
  }
}

export const addFavorite = (location) => {
  const favorites = getFavorites()
  if (!favorites.find(f => f.name === location.name)) {
    favorites.push(location)
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites))
  }
}

export const removeFavorite = (locationName) => {
  const favorites = getFavorites()
  const updated = favorites.filter(f => f.name !== locationName)
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated))
}

export const isFavorite = (locationName) => {
  const favorites = getFavorites()
  return favorites.some(f => f.name === locationName)
}

export const getLastLocation = () => {
  try {
    const location = localStorage.getItem(STORAGE_KEYS.LAST_LOCATION)
    return location && location !== 'undefined' && location !== 'null' ? JSON.parse(location) : null
  } catch (error) {
    console.error('Error parsing last location:', error)
    return null
  }
}

export const setLastLocation = (location) => {
  localStorage.setItem(STORAGE_KEYS.LAST_LOCATION, JSON.stringify(location))
}

export const getTheme = () => {
  return localStorage.getItem(STORAGE_KEYS.THEME) || 'light'
}

export const setTheme = (theme) => {
  localStorage.setItem(STORAGE_KEYS.THEME, theme)
}

export const getUnits = () => {
  return localStorage.getItem(STORAGE_KEYS.UNITS) || 'metric'
}

export const setUnits = (units) => {
  localStorage.setItem(STORAGE_KEYS.UNITS, units)
}
