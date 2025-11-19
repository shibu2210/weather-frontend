export const AQI_LEVELS = {
  GOOD: { min: 0, max: 50, label: 'Good', color: '#00E400', bgColor: 'bg-green-500' },
  MODERATE: { min: 51, max: 100, label: 'Moderate', color: '#FFFF00', bgColor: 'bg-yellow-400' },
  UNHEALTHY_SENSITIVE: { min: 101, max: 150, label: 'Unhealthy for Sensitive Groups', color: '#FF7E00', bgColor: 'bg-orange-500' },
  UNHEALTHY: { min: 151, max: 200, label: 'Unhealthy', color: '#FF0000', bgColor: 'bg-red-500' },
  VERY_UNHEALTHY: { min: 201, max: 300, label: 'Very Unhealthy', color: '#8F3F97', bgColor: 'bg-purple-600' },
  HAZARDOUS: { min: 301, max: 500, label: 'Hazardous', color: '#7E0023', bgColor: 'bg-red-900' }
}

export const AQI_RECOMMENDATIONS = {
  GOOD: 'Air quality is satisfactory, and air pollution poses little or no risk.',
  MODERATE: 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.',
  UNHEALTHY_SENSITIVE: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.',
  UNHEALTHY: 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.',
  VERY_UNHEALTHY: 'Health alert: The risk of health effects is increased for everyone.',
  HAZARDOUS: 'Health warning of emergency conditions: everyone is more likely to be affected.'
}

export const WIND_DIRECTIONS = {
  N: 'North',
  NNE: 'North-Northeast',
  NE: 'Northeast',
  ENE: 'East-Northeast',
  E: 'East',
  ESE: 'East-Southeast',
  SE: 'Southeast',
  SSE: 'South-Southeast',
  S: 'South',
  SSW: 'South-Southwest',
  SW: 'Southwest',
  WSW: 'West-Southwest',
  W: 'West',
  WNW: 'West-Northwest',
  NW: 'Northwest',
  NNW: 'North-Northwest'
}

export const UV_INDEX_LEVELS = {
  LOW: { min: 0, max: 2, label: 'Low', color: 'text-green-600' },
  MODERATE: { min: 3, max: 5, label: 'Moderate', color: 'text-yellow-600' },
  HIGH: { min: 6, max: 7, label: 'High', color: 'text-orange-600' },
  VERY_HIGH: { min: 8, max: 10, label: 'Very High', color: 'text-red-600' },
  EXTREME: { min: 11, max: 20, label: 'Extreme', color: 'text-purple-600' }
}

export const DEFAULT_LOCATION = 'London'
