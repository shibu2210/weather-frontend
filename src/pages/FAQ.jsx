import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import Header from '../components/common/Header'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      category: 'General',
      questions: [
        {
          q: 'What is Weather AQI?',
          a: 'Weather AQI is a comprehensive weather and air quality monitoring platform that provides real-time weather information, forecasts, and air quality data for locations worldwide.'
        },
        {
          q: 'Is Weather AQI free to use?',
          a: 'Yes! Weather AQI is completely free to use. We provide weather and air quality information at no cost to our users.'
        },
        {
          q: 'Where does the weather data come from?',
          a: 'Our weather data is provided by WeatherAPI.com, a reliable weather data service that aggregates information from multiple sources to ensure accuracy.'
        }
      ]
    },
    {
      category: 'Features',
      questions: [
        {
          q: 'How do I search for a location?',
          a: 'Simply type the city name in the search bar at the top of the dashboard. As you type, suggestions will appear. Click on a suggestion to view weather for that location.'
        },
        {
          q: 'Can I use my current location?',
          a: 'Yes! Click the location icon next to the search bar. Your browser will ask for permission to access your location. Once granted, we\'ll show weather for your current area.'
        },
        {
          q: 'How do I switch between Celsius and Fahrenheit?',
          a: 'Use the °C/°F toggle in the top right corner of the page. Your preference will be saved automatically.'
        },
        {
          q: 'What is the Air Quality Index (AQI)?',
          a: 'AQI is a measure of air pollution levels. It ranges from 0-500, with lower values indicating better air quality. We show detailed pollutant levels and health recommendations.'
        }
      ]
    },
    {
      category: 'Technical',
      questions: [
        {
          q: 'Does Weather AQI work offline?',
          a: 'No, Weather AQI requires an internet connection to fetch real-time weather data. However, your preferences and recent searches are saved locally.'
        },
        {
          q: 'Which browsers are supported?',
          a: 'Weather AQI works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version for the best experience.'
        },
        {
          q: 'Is there a mobile app?',
          a: 'Currently, Weather AQI is a web application optimized for mobile browsers. You can add it to your home screen for a native app-like experience.'
        },
        {
          q: 'How often is the weather data updated?',
          a: 'Weather data is updated in real-time. You can manually refresh by clicking the refresh icon in the header or the data will auto-refresh periodically.'
        }
      ]
    },
    {
      category: 'Privacy & Data',
      questions: [
        {
          q: 'Do you collect my personal data?',
          a: 'We collect minimal data necessary to provide the service. Location data is only used when you explicitly grant permission. See our Privacy Policy for details.'
        },
        {
          q: 'Where is my data stored?',
          a: 'Your preferences and search history are stored locally in your browser using localStorage. We do not store personal data on our servers.'
        },
        {
          q: 'Can I delete my data?',
          a: 'Yes! Since data is stored locally, you can clear it through your browser settings. Go to Settings > Privacy > Clear browsing data.'
        }
      ]
    },
    {
      category: 'Troubleshooting',
      questions: [
        {
          q: 'Why can\'t I see weather data?',
          a: 'This could be due to: 1) No internet connection, 2) Invalid location name, 3) API service temporarily unavailable. Try refreshing the page or searching for a different location.'
        },
        {
          q: 'Location detection isn\'t working',
          a: 'Make sure you\'ve granted location permissions in your browser. Check your browser settings under Privacy > Location permissions.'
        },
        {
          q: 'The app looks broken or doesn\'t load properly',
          a: 'Try clearing your browser cache and refreshing the page. Make sure you\'re using a modern browser with JavaScript enabled.'
        }
      ]
    }
  ]

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 transition-colors flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
            Find answers to common questions
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((category, catIndex) => (
            <div key={catIndex}>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4">
                {category.category}
              </h2>
              <div className="space-y-3">
                {category.questions.map((faq, qIndex) => {
                  const index = `${catIndex}-${qIndex}`
                  const isOpen = openIndex === index
                  
                  return (
                    <div 
                      key={qIndex}
                      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-200 hover:shadow-xl"
                    >
                      <button
                        onClick={() => toggleQuestion(catIndex, qIndex)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <span className="font-semibold text-gray-800 dark:text-white pr-4">
                          {faq.q}
                        </span>
                        {isOpen ? (
                          <FiChevronUp className="text-blue-500 flex-shrink-0 text-xl" />
                        ) : (
                          <FiChevronDown className="text-gray-400 flex-shrink-0 text-xl" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4 text-gray-700 dark:text-gray-300 leading-relaxed border-t border-gray-200 dark:border-gray-700 pt-4">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 dark:from-blue-900 dark:to-cyan-950 rounded-2xl p-6 sm:p-8 shadow-lg text-white mt-12">
          <h2 className="text-2xl font-bold mb-3">Still have questions?</h2>
          <p className="text-blue-50 mb-4">
            Can't find the answer you're looking for? Feel free to reach out to us!
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 font-medium"
          >
            Contact Us
          </Link>
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            Back to Dashboard
          </Link>
        </div>
      </main>

      <footer className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm mt-auto py-6 border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400">
          <p className="text-sm">Weather data provided by WeatherAPI.com</p>
          <p className="text-xs mt-2">© 2025 Weather AQI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default FAQ
