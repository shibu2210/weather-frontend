import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMail, FiGithub, FiTwitter, FiSend } from 'react-icons/fi'
import Header from '../components/common/Header'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would send this to a backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Send us a message
            </h2>
            
            {submitted ? (
              <div className="bg-green-100 dark:bg-green-900/30 border border-green-500 rounded-lg p-6 text-center">
                <div className="text-green-600 dark:text-green-400 text-5xl mb-4">✓</div>
                <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">
                  Message Sent!
                </h3>
                <p className="text-green-700 dark:text-green-400">
                  Thank you for contacting us. We'll get back to you soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  <FiSend />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Get in touch
              </h2>
              <div className="space-y-4">
                <ContactMethod 
                  icon={<FiMail className="text-2xl" />}
                  title="Email"
                  value="contact@weatheraqi.com"
                  link="mailto:contact@weatheraqi.com"
                />
                <ContactMethod 
                  icon={<FiGithub className="text-2xl" />}
                  title="GitHub"
                  value="github.com/weatheraqi"
                  link="https://github.com"
                />
                <ContactMethod 
                  icon={<FiTwitter className="text-2xl" />}
                  title="Twitter"
                  value="@weatheraqi"
                  link="https://twitter.com"
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 dark:from-blue-900 dark:to-cyan-950 rounded-2xl p-6 sm:p-8 shadow-lg text-white">
              <h3 className="text-xl font-bold mb-3">Office Hours</h3>
              <p className="text-blue-50 mb-4">
                We typically respond to inquiries within 24-48 hours during business days.
              </p>
              <div className="space-y-2 text-sm text-blue-100">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday - Sunday: Closed</p>
                <p className="text-xs mt-4">* Times are in UTC</p>
              </div>
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
