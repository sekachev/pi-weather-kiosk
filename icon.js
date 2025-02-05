// Mapping WMO codes to weather-icons classes
const wmoToWeatherIcon = {
    day: {
      0: 'wi-day-sunny',
      1: 'wi-day-sunny-overcast',
      2: 'wi-day-cloudy',
      3: 'wi-cloudy',
      45: 'wi-day-fog',
      48: 'wi-day-fog',
      51: 'wi-day-sprinkle',
      53: 'wi-day-rain-mix',
      55: 'wi-day-rain',
      56: 'wi-day-rain-mix',
      57: 'wi-day-rain',
      61: 'wi-day-rain',
      63: 'wi-day-rain',
      65: 'wi-day-rain',
      66: 'wi-day-rain',
      67: 'wi-day-rain',
      71: 'wi-day-snow',
      73: 'wi-day-snow',
      75: 'wi-day-snow',
      77: 'wi-day-snow',
      80: 'wi-day-showers',
      81: 'wi-day-showers',
      82: 'wi-day-rain',
      85: 'wi-day-snow',
      86: 'wi-day-snow',
      95: 'wi-day-thunderstorm',
      96: 'wi-day-thunderstorm',
      99: 'wi-day-thunderstorm'
    },
    night: {
      0: 'wi-night-clear',
      1: 'wi-night-alt-cloudy',
      2: 'wi-night-alt-cloudy',
      3: 'wi-cloudy',
      45: 'wi-night-fog',
      48: 'wi-night-fog',
      51: 'wi-night-alt-sprinkle',
      53: 'wi-night-alt-rain-mix',
      55: 'wi-night-alt-rain',
      56: 'wi-night-alt-rain-mix',
      57: 'wi-night-alt-rain',
      61: 'wi-night-alt-rain',
      63: 'wi-night-alt-rain',
      65: 'wi-night-alt-rain',
      66: 'wi-night-alt-rain',
      67: 'wi-night-alt-rain',
      71: 'wi-night-alt-snow',
      73: 'wi-night-alt-snow',
      75: 'wi-night-alt-snow',
      77: 'wi-night-alt-snow',
      80: 'wi-night-alt-showers',
      81: 'wi-night-alt-showers',
      82: 'wi-night-alt-rain',
      85: 'wi-night-alt-snow',
      86: 'wi-night-alt-snow',
      95: 'wi-night-alt-thunderstorm',
      96: 'wi-night-alt-thunderstorm',
      99: 'wi-night-alt-thunderstorm'
    }
  };
  
  function getWeatherIcon(weatherCode, isDay) {
    const timeOfDay = isDay ? 'day' : 'night';
    return wmoToWeatherIcon[timeOfDay][weatherCode] || 'wi-na';
  }
  
  function updateWeatherIcon(data) {
    const weatherIconElement = document.getElementById('weather-icon');
    if (!weatherIconElement) return;
  
    const weatherCode = data.current.weather_code;
    const isDay = data.current.is_day === 1;
    const iconClass = getWeatherIcon(weatherCode, isDay);
    
    // Remove all existing weather icons classes
    weatherIconElement.className = '';
    // Add the wi base class and the specific weather icon class
    weatherIconElement.classList.add('wi', iconClass);
  }
  
  // Export the function to make it available to other modules
  window.updateWeatherIcon = updateWeatherIcon;