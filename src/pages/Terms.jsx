import { Link } from 'react-router-dom'
import Header from '../components/common/Header'

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 transition-colors flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
            Please read these terms carefully
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Last updated: November 19, 2025
          </p>
        </div>

        <div className="space-y-6">
          <TermSection 
            title="1. Acceptance of Terms"
            content="By accessing and using Weather AQI, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our service."
          />
          
          <TermSection 
            title="2. Use of Service"
            content="Weather AQI provides weather and air quality information for personal, non-commercial use. You agree to use the service only for lawful purposes and in accordance with these terms."
          />
          
          <TermSection 
            title="3. Data Accuracy"
            content="While we strive to provide accurate weather and air quality information, we cannot guarantee the accuracy, completeness, or timeliness of the data. Weather data is provided by WeatherAPI.com and air quality data by AQICN. This information should not be relied upon for critical decisions without verification from official sources."
          />
          
          <TermSection 
            title="4. User Responsibilities"
            content="You are responsible for maintaining the confidentiality of your device and for all activities that occur through your use of the service. You agree not to misuse the service or help anyone else do so."
          />
          
          <TermSection 
            title="5. Intellectual Property"
            content="The service and its original content, features, and functionality are owned by Weather AQI and are protected by international copyright, trademark, and other intellectual property laws. Weather data is provided by WeatherAPI.com and air quality data by AQICN, both subject to their respective terms of service."
          />
          
          <TermSection 
            title="6. Third-Party Services"
            content="Our service uses WeatherAPI.com for weather data and AQICN for air quality data. Your use of this data is subject to their respective terms of service and privacy policies. We are not responsible for the content or practices of third-party services."
          />
          
          <TermSection 
            title="7. Limitation of Liability"
            content="Weather AQI shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service. This includes damages for loss of profits, data, or other intangibles."
          />
          
          <TermSection 
            title="8. Service Availability"
            content="We strive to maintain service availability but do not guarantee uninterrupted access. The service may be temporarily unavailable due to maintenance, updates, or circumstances beyond our control."
          />
          
          <TermSection 
            title="9. Modifications to Service"
            content="We reserve the right to modify or discontinue the service at any time without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service."
          />
          
          <TermSection 
            title="10. Changes to Terms"
            content="We reserve the right to update these terms at any time. We will notify users of any material changes by updating the 'Last updated' date. Your continued use of the service after changes constitutes acceptance of the new terms."
          />
          
          <TermSection 
            title="11. Governing Law"
            content="These terms shall be governed by and construed in accordance with applicable laws, without regard to its conflict of law provisions."
          />
          
          <TermSection 
            title="12. Contact Information"
            content="If you have any questions about these Terms of Service, please contact us at terms@weatheraqi.com"
          />
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 dark:from-blue-900 dark:to-cyan-950 rounded-2xl p-6 sm:p-8 shadow-lg text-white mt-8">
          <h2 className="text-2xl font-bold mb-3">Important Notice</h2>
          <p className="text-blue-50 leading-relaxed">
            By using Weather AQI, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. 
            If you do not agree with any part of these terms, you must not use our service.
          </p>
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
          <p className="text-sm">Weather data by <a href="https://www.weatherapi.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">WeatherAPI.com</a> • Air quality data by <a href="https://aqicn.org/" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">AQICN</a></p>
          <p className="text-xs mt-2">© 2025 Weather AQI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

const TermSection = ({ title, content }) => (
  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-3">
      {title}
    </h2>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
      {content}
    </p>
  </div>
)

export default Terms
