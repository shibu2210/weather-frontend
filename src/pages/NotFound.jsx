import { Link } from 'react-router-dom'
import { BiError } from 'react-icons/bi'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <BiError className="text-9xl text-gray-400 mx-auto mb-4" />
        <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Page not found
        </p>
        <Link 
          to="/"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors inline-block"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
