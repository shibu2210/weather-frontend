const SkeletonLoader = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Main Weather Card Skeleton */}
      <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 h-64">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex-1 space-y-4">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:w-80">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-300 dark:bg-gray-700 rounded-lg h-24"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Two Column Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 sm:p-6 h-64">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="flex gap-3 overflow-hidden">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex-shrink-0 w-20 h-32 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
        <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 sm:p-6 h-64">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="flex justify-center items-center h-40">
            <div className="w-32 h-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Daily Forecast Skeleton */}
      <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 sm:p-6">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="h-16 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SkeletonLoader
