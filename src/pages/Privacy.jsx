import { Link } from 'react-router-dom'
import { FiShield, FiEye, FiLock, FiDatabase } from 'react-icons/fi'
import Header from '../components/common/Header'

const Privacy = () => {
  const sections = [
    {
      icon: <FiDatabase className="text-3xl text-blue-500" />,
      title: 'Information We Collect',
      content: 'We collect minimal information to provide our weather services. This includes your search queries, location data (only when you explicitly allow it), and basic usage analytics to improve our service.'
    },
    {
      icon: <FiEye className="text-3xl text-green-500" />,
      title: 'How We Use Your Information',
      content: 'Your data is used solely to provide accurate weather information for your requested locations. We do not sell, rent, or share your personal information with third parties for marketing purposes.'
    },
    {
      icon: <FiLock className="text-3xl text-purple-500" />,
      title: 'Data Security',
      content: 'We implement industry-standard security measures to protect your data. All communications are encrypted, and we regularly update our security protocols to ensure your information remains safe.'
    },
    {
      icon: <FiShield className="text-3xl text-orange-500" />,
      title: 'Your Rights',
      content: 'You have the right to access, modify, or delete your data at any time. Location data is stored locally in your browser and can be cleared through your browser settings.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 transition-colors flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
            Your privacy is important to us
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Last updated: November 19, 2025
          </p>
        </div>

        {/* Key Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {sections.map((section, index) => (
            <div 
              key={index}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Policy */}
        <div className="space-y-6">
          <PolicySection 
            title="1. Information Collection"
            content="Weather AQI collects minimal information necessary to provide weather services. This includes location data (when you grant permission), search queries, and anonymous usage statistics. We use browser localStorage to save your preferences and recent searches locally on your device."
          />
          
          <PolicySection 
            title="2. Location Data"
            content="When you use the 'Current Location' feature, we request access to your device's location. This data is used only to fetch weather information for your area and is not stored on our servers. You can revoke location permissions at any time through your browser settings."
          />
          
          <PolicySection 
            title="3. Cookies and Local Storage"
            content="We use browser localStorage to save your preferences (theme, temperature units) and recent searches. This data remains on your device and is not transmitted to our servers. You can clear this data through your browser settings."
          />
          
          <PolicySection 
            title="4. Third-Party Services"
            content="We use Open-Meteo for weather data and AQICN (World Air Quality Index Project) for air quality data. Please refer to their respective privacy policies for information about how they handle data. We do not share your personal information with any other third parties."
          />
          
          <PolicySection 
            title="5. Data Retention"
            content="We do not store personal data on our servers. All preferences and search history are stored locally in your browser. Weather data is cached temporarily to improve performance but is not associated with any personal information."
          />
          
          <PolicySection 
            title="6. Children's Privacy"
            content="Our service is available to users of all ages. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately."
          />
          
          <PolicySection 
            title="7. Changes to This Policy"
            content="We may update this privacy policy from time to time. We will notify users of any material changes by updating the 'Last updated' date at the top of this policy."
          />
          
          <PolicySection 
            title="8. Contact Us"
            content="If you have any questions about this privacy policy or our data practices, please contact us at privacy@weatheraqi.com"
          />
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
          <p className="text-sm">Weather data by <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Open-Meteo</a> • Air quality data by <a href="https://aqicn.org/" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">AQICN</a></p>
          <p className="text-xs mt-2">© 2025 Weather AQI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

const PolicySection = ({ title, content }) => (
  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-3">
      {title}
    </h2>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
      {content}
    </p>
  </div>
)

export default Privacy
