// AQI Calculation based on US EPA standards
// Reference: https://www.airnow.gov/aqi/aqi-calculator-concentration/

const PM25_BREAKPOINTS = [
  { cLow: 0.0, cHigh: 12.0, iLow: 0, iHigh: 50 },
  { cLow: 12.1, cHigh: 35.4, iLow: 51, iHigh: 100 },
  { cLow: 35.5, cHigh: 55.4, iLow: 101, iHigh: 150 },
  { cLow: 55.5, cHigh: 150.4, iLow: 151, iHigh: 200 },
  { cLow: 150.5, cHigh: 250.4, iLow: 201, iHigh: 300 },
  { cLow: 250.5, cHigh: 350.4, iLow: 301, iHigh: 400 },
  { cLow: 350.5, cHigh: 500.4, iLow: 401, iHigh: 500 }
]

const PM10_BREAKPOINTS = [
  { cLow: 0, cHigh: 54, iLow: 0, iHigh: 50 },
  { cLow: 55, cHigh: 154, iLow: 51, iHigh: 100 },
  { cLow: 155, cHigh: 254, iLow: 101, iHigh: 150 },
  { cLow: 255, cHigh: 354, iLow: 151, iHigh: 200 },
  { cLow: 355, cHigh: 424, iLow: 201, iHigh: 300 },
  { cLow: 425, cHigh: 504, iLow: 301, iHigh: 400 },
  { cLow: 505, cHigh: 604, iLow: 401, iHigh: 500 }
]

function calculateAQI(concentration, breakpoints) {
  if (!concentration || concentration < 0) return 0
  
  for (const bp of breakpoints) {
    if (concentration >= bp.cLow && concentration <= bp.cHigh) {
      const { cLow, cHigh, iLow, iHigh } = bp
      const aqi = ((iHigh - iLow) / (cHigh - cLow)) * (concentration - cLow) + iLow
      return Math.round(aqi)
    }
  }
  
  // If concentration is higher than the highest breakpoint
  return 500
}

export function calculateAQIFromPollutants(airQuality) {
  if (!airQuality) return 0
  
  const pm25AQI = calculateAQI(airQuality.pm2_5, PM25_BREAKPOINTS)
  const pm10AQI = calculateAQI(airQuality.pm10, PM10_BREAKPOINTS)
  
  // Return the highest AQI value (most restrictive)
  return Math.max(pm25AQI, pm10AQI)
}

export function getAQICategory(aqi) {
  if (aqi <= 50) return { level: 'Good', color: '#00E400', bgColor: 'bg-green-500' }
  if (aqi <= 100) return { level: 'Moderate', color: '#FFFF00', bgColor: 'bg-yellow-400' }
  if (aqi <= 150) return { level: 'Unhealthy for Sensitive Groups', color: '#FF7E00', bgColor: 'bg-orange-500' }
  if (aqi <= 200) return { level: 'Unhealthy', color: '#FF0000', bgColor: 'bg-red-500' }
  if (aqi <= 300) return { level: 'Very Unhealthy', color: '#8F3F97', bgColor: 'bg-purple-600' }
  return { level: 'Hazardous', color: '#7E0023', bgColor: 'bg-red-900' }
}

export function getAQIRecommendation(aqi) {
  if (aqi <= 50) {
    return 'Air quality is satisfactory, and air pollution poses little or no risk.'
  }
  if (aqi <= 100) {
    return 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.'
  }
  if (aqi <= 150) {
    return 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.'
  }
  if (aqi <= 200) {
    return 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.'
  }
  if (aqi <= 300) {
    return 'Health alert: The risk of health effects is increased for everyone.'
  }
  return 'Health warning of emergency conditions: everyone is more likely to be affected.'
}
