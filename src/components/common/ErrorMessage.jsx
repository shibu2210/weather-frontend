import { BiError } from 'react-icons/bi'

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
      <BiError className="text-6xl text-red-500 mb-4" />
      <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-red-600 dark:text-red-300 mb-4 text-center">
        {message || 'Failed to load weather data'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
