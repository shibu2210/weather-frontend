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

  return {
    isLoaded,
    searchPlaces,
    getPlaceDetails
  }
}
