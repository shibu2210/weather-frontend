import { useState, useEffect, useCallback } from 'react'

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

export const useGooglePlaces = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [autocompleteService, setAutocompleteService] = useState(null)
  const [placesService, setPlacesService] = useState(null)

  useEffect(() => {
    if (window.google?.maps?.places) {
      setIsLoaded(true)
      setAutocompleteService(new window.google.maps.places.AutocompleteService())
      // Create a dummy div for PlacesService (it requires a map or div)
      const dummyDiv = document.createElement('div')
      setPlacesService(new window.google.maps.places.PlacesService(dummyDiv))
      return
    }

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`
    script.async = true
    script.defer = true
    
    script.onload = () => {
      setIsLoaded(true)
      setAutocompleteService(new window.google.maps.places.AutocompleteService())
      const dummyDiv = document.createElement('div')
      setPlacesService(new window.google.maps.places.PlacesService(dummyDiv))
    }

    document.head.appendChild(script)

    return () => {
      // Cleanup if needed
    }
  }, [])

  const searchPlaces = useCallback(async (input) => {
    if (!autocompleteService || !input) {
      return []
    }

    return new Promise((resolve) => {
      autocompleteService.getPlacePredictions(
        {
          input,
          types: ['locality', 'sublocality'],
        },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
            resolve(predictions)
          } else {
            resolve([])
          }
        }
      )
    })
  }, [autocompleteService])

  const getPlaceDetails = useCallback(async (placeId) => {
    if (!placesService || !placeId) {
      return null
    }

    return new Promise((resolve) => {
      placesService.getDetails(
        {
          placeId,
          fields: ['geometry', 'name', 'formatted_address', 'address_components']
        },
        (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
            resolve(place)
          } else {
            resolve(null)
          }
        }
      )
    })
  }, [placesService])

  const reverseGeocode = useCallback(async (lat, lng) => {
    if (!isLoaded) {
      return null
    }

    return new Promise((resolve) => {
      const geocoder = new window.google.maps.Geocoder()
      geocoder.geocode(
        { location: { lat, lng } },
        (results, status) => {
          if (status === 'OK' && results && results.length > 0) {
            // Find the most specific result (usually the first one)
            // Prefer locality, sublocality, or neighborhood
            const bestResult = results.find(r => 
              r.types.includes('locality') || 
              r.types.includes('sublocality') ||
              r.types.includes('neighborhood')
            ) || results[0]
            
            resolve({
              name: bestResult.address_components[0]?.long_name || bestResult.formatted_address,
              formatted_address: bestResult.formatted_address,
              lat,
              lng
            })
          } else {
            resolve(null)
          }
        }
      )
    })
  }, [isLoaded])

  return {
    isLoaded,
    searchPlaces,
    getPlaceDetails,
    reverseGeocode
  }
}
