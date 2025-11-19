import { Link } from 'react-router-dom'
import { FiMail, FiGithub } from 'react-icons/fi'
import Header from '../components/common/Header'

const Contact = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 transition-colors flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
            We'd love to hear from you
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 sm:p-12 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
              Get in touch
            </h2>
            <div className="space-y-6">
              <ContactMethod 
                icon={<FiMail className="text-2xl" />}
                title="Email"
                value="shivamwork.2210@gmail.com"
                link="mailto:shivamwork.2210@gmail.com"
              />
              <ContactMethod 
                icon={<FiGithub className="text-2xl" />}
                title="GitHub"
                value="github.com/shibu2210"
                link="https://github.com/shibu2210"
              />
            </div>
          </div>
        </div>

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
          <p className="text-sm">Weather data provided by WeatherAPI.com</p>
          <p className="text-xs mt-2">© 2025 Weather AQI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

const ContactMethod = ({ icon, title, value, link }) => (
  <a 
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-105"
  >
    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
      <p className="font-semibold text-gray-800 dark:text-white">{value}</p>
    </div>
  </a>
)

export default Contact
