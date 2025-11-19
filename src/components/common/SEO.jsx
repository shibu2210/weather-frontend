import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SEO = ({ 
  title = 'Weather AQI - Real-time Weather & Air Quality Index',
  description = 'Get accurate real-time weather forecasts and air quality index (AQI) for any location worldwide. Check temperature, humidity, wind, and pollution levels instantly.',
  keywords = 'weather, air quality, AQI, weather forecast, pollution, PM2.5, temperature',
  ogImage = '/og-image.png',
  canonical
}) => {
  const location = useLocation()
  const baseUrl = 'https://weather-aqi.vercel.app'
  const currentUrl = canonical || `${baseUrl}${location.pathname}`

  useEffect(() => {
    // Update title
    document.title = title

    // Update meta tags
    updateMetaTag('name', 'description', description)
    updateMetaTag('name', 'keywords', keywords)
    updateMetaTag('property', 'og:title', title)
    updateMetaTag('property', 'og:description', description)
    updateMetaTag('property', 'og:url', currentUrl)
    updateMetaTag('property', 'og:image', `${baseUrl}${ogImage}`)
    updateMetaTag('property', 'twitter:title', title)
    updateMetaTag('property', 'twitter:description', description)
    updateMetaTag('property', 'twitter:image', `${baseUrl}${ogImage}`)

    // Update canonical link
    updateCanonicalLink(currentUrl)
  }, [title, description, keywords, currentUrl, ogImage])

  const updateMetaTag = (attr, key, content) => {
    let element = document.querySelector(`meta[${attr}="${key}"]`)
    if (element) {
      element.setAttribute('content', content)
    } else {
      element = document.createElement('meta')
      element.setAttribute(attr, key)
      element.setAttribute('content', content)
      document.head.appendChild(element)
    }
  }

  const updateCanonicalLink = (url) => {
    let link = document.querySelector('link[rel="canonical"]')
    if (link) {
      link.setAttribute('href', url)
    } else {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      link.setAttribute('href', url)
      document.head.appendChild(link)
    }
  }

  return null
}

export default SEO
