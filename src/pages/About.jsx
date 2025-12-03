import { Link } from 'react-router-dom'
import { WiDaySunny, WiCloud, WiStrongWind, WiHumidity } from 'react-icons/wi'
import { FiGithub, FiMail, FiExternalLink } from 'react-icons/fi'
import Header from '../components/common/Header'

const About = () => {
  const features = [
    {
      icon: <WiDaySunny className="text-5xl text-yellow-500" />,
      title: 'Real-time Weather',
      description: 'Get accurate, up-to-date weather information for any location worldwide.'
    },
    {
      icon: <WiCloud className="text-5xl text-blue-500" />,
      title: 'Air Quality Index',
      description: 'Monitor air quality with detailed pollutant levels and health recommendations.'
    },
    {
      icon: <WiStrongWind className="text-5xl text-cyan-500" />,
      title: '16-Day Forecast',
      description: 'Plan ahead with accurate weather forecasts for up to 16 days.'
    },
    {
      icon: <WiHumidity className="text-5xl text-purple-500" />,
      title: 'Detailed Metrics',
      description: 'Access comprehensive data including humidity, pressure, wind, and UV index.'
    }
  ]

  const technologies = [
    { name: 'React 18', category: 'Frontend Framework' },
    { name: 'Spring Boot 3', category: 'Backend Framework' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'Open-Meteo', category: 'Weather Data' },
    { name: 'AQICN', category: 'Air Quality Data' },
    { name: 'Google Maps', category: 'Location Services' },
    { name: 'Vite', category: 'Build Tool' },
    { name: 'Java 17', category: 'Backend Language' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 transition-colors flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            About Weather AQI
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Your comprehensive weather and air quality monitoring platform
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
            Weather AQI is dedicated to providing accurate, real-time weather information and air quality data 
            to help people make informed decisions about their daily activities. We believe that access to 
            reliable environmental data should be simple, beautiful, and accessible to everyone.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Built With Modern Technology
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {technologies.map((tech, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-4 text-center hover:scale-105 transition-transform duration-200"
              >
                <p className="font-bold text-gray-800 dark:text-white mb-1">
                  {tech.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {tech.category}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Data Sources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Open-Meteo */}
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 dark:from-blue-900 dark:to-cyan-950 rounded-2xl p-6 shadow-lg text-white">
            <h2 className="text-2xl font-bold mb-3">
              Weather Data
            </h2>
            <p className="text-blue-50 mb-4 leading-relaxed text-sm">
              Comprehensive weather information including temperature, humidity, wind, pressure, and up to 16-day forecasts 
              provided by Open-Meteo - a free, open-source weather API with high-quality data from national weather services.
            </p>
            <a 
              href="https://open-meteo.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 text-sm"
            >
              Visit Open-Meteo
              <FiExternalLink />
            </a>
          </div>

          {/* AQICN */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 dark:from-purple-900 dark:to-pink-950 rounded-2xl p-6 shadow-lg text-white">
            <h2 className="text-2xl font-bold mb-3">
              Air Quality Data
            </h2>
            <p className="text-purple-50 mb-4 leading-relaxed text-sm">
              Real-time air quality measurements from actual monitoring stations worldwide, provided by 
              AQICN (World Air Quality Index Project) - backed by EPA and government agencies.
            </p>
            <a 
              href="https://aqicn.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 text-sm"
            >
              Visit AQICN.org
              <FiExternalLink />
            </a>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Get in Touch
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="https://github.com/shibu2210" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105"
            >
              <FiGithub className="text-2xl" />
              <span className="font-medium text-gray-800 dark:text-white">GitHub</span>
            </a>
            <a 
              href="mailto:shivamwork.2210@gmail.com"
              className="flex items-center gap-3 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105"
            >
              <FiMail className="text-2xl text-blue-600 dark:text-blue-400" />
              <span className="font-medium text-gray-800 dark:text-white">Email Us</span>
            </a>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
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
          <p className="text-sm">Weather data by <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Open-Meteo</a> • Air quality data by <a href="https://aqicn.org/" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">AQICN</a></p>
          <p className="text-xs mt-2">© 2025 Weather AQI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default About
