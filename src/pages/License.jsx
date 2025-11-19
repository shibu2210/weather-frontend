import { Link } from 'react-router-dom'
import { FiCheck, FiX } from 'react-icons/fi'
import Header from '../components/common/Header'

const License = () => {
  const permissions = [
    'Commercial use',
    'Modification',
    'Distribution',
    'Private use'
  ]

  const conditions = [
    'License and copyright notice',
    'State changes'
  ]

  const limitations = [
    'Liability',
    'Warranty'
  ]

  const dependencies = [
    { name: 'React', license: 'MIT', url: 'https://github.com/facebook/react' },
    { name: 'Spring Boot', license: 'Apache 2.0', url: 'https://spring.io/projects/spring-boot' },
    { name: 'Tailwind CSS', license: 'MIT', url: 'https://tailwindcss.com' },
    { name: 'React Router', license: 'MIT', url: 'https://reactrouter.com' },
    { name: 'Axios', license: 'MIT', url: 'https://axios-http.com' },
    { name: 'React Icons', license: 'MIT', url: 'https://react-icons.github.io/react-icons' },
    { name: 'Vite', license: 'MIT', url: 'https://vitejs.dev' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 transition-colors flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            License
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
            Open Source MIT License
          </p>
        </div>

        {/* MIT License Badge */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-900 dark:to-emerald-950 rounded-2xl p-6 sm:p-8 shadow-lg text-white mb-8 text-center">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg mb-4">
            <p className="text-2xl sm:text-3xl font-bold">MIT License</p>
          </div>
          <p className="text-green-50 max-w-2xl mx-auto">
            This project is licensed under the MIT License - one of the most permissive and widely-used 
            open source licenses.
          </p>
        </div>

        {/* License Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Permissions */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <FiCheck className="text-green-600 dark:text-green-400 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                Permissions
              </h3>
            </div>
            <ul className="space-y-2">
              {permissions.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <FiCheck className="text-green-600 dark:text-green-400 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Conditions */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <FiCheck className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                Conditions
              </h3>
            </div>
            <ul className="space-y-2">
              {conditions.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <FiCheck className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Limitations */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                <FiX className="text-red-600 dark:text-red-400 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                Limitations
              </h3>
            </div>
            <ul className="space-y-2">
              {limitations.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <FiX className="text-red-600 dark:text-red-400 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Full License Text */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Full License Text
          </h2>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6 font-mono text-sm text-gray-700 dark:text-gray-300 leading-relaxed overflow-x-auto">
            <p className="mb-4">MIT License</p>
            <p className="mb-4">Copyright (c) 2025 Weather AQI</p>
            <p className="mb-4">
              Permission is hereby granted, free of charge, to any person obtaining a copy
              of this software and associated documentation files (the "Software"), to deal
              in the Software without restriction, including without limitation the rights
              to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
              copies of the Software, and to permit persons to whom the Software is
              furnished to do so, subject to the following conditions:
            </p>
            <p className="mb-4">
              The above copyright notice and this permission notice shall be included in all
              copies or substantial portions of the Software.
            </p>
            <p>
              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
              IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
              FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
              AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
              LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
              SOFTWARE.
            </p>
          </div>
        </div>

        {/* Third-Party Licenses */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Third-Party Licenses
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This project uses the following open source packages:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dependencies.map((dep, index) => (
              <a
                key={index}
                href={dep.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900/70 transition-all duration-200 hover:scale-105"
              >
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">{dep.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{dep.license}</p>
                </div>
                <div className="text-blue-500 dark:text-blue-400">→</div>
              </a>
            ))}
          </div>
        </div>

        {/* Attribution */}
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 dark:from-blue-900 dark:to-cyan-950 rounded-2xl p-6 sm:p-8 shadow-lg text-white mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Attribution
          </h2>
          <p className="text-blue-50 mb-4">
            Weather data is provided by WeatherAPI.com. Please refer to their terms of service 
            and attribution requirements when using this application.
          </p>
          <a 
            href="https://www.weatherapi.com/terms.aspx" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
          >
            View WeatherAPI Terms
          </a>
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
          <p className="text-sm">Weather data provided by WeatherAPI.com</p>
          <p className="text-xs mt-2">© 2025 Weather AQI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default License
