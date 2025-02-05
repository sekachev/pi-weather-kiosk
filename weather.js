function updateCurrentWeather(data) {
  const current = data.current;
  const tempElement = document.getElementById('temperature');
  if (tempElement) {
    tempElement.textContent = `${Math.round(current.temperature_2m)}°`;
  }
  
  // Update weather icon
  if (window.updateWeatherIcon) {
    window.updateWeatherIcon(data);
  }
}

function fetchWeather() {
  const apiURL =
    "https://api.open-meteo.com/v1/forecast?" +
    "latitude=59.4165&longitude=24.7994" +
    "&current=temperature_2m,is_day,weather_code" +
    "&hourly=temperature_2m" +
    "&daily=sunrise,sunset" +
    "&timezone=Europe/Tallinn";

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      updateCurrentWeather(data);
      updateChart(data);
    })
    .catch(console.error);
}

// Initial fetch and refresh every 15 minutes
fetchWeather();
setInterval(fetchWeather, 900000);

// Update the current time display every second
setInterval(() => {
  const timeElement = document.getElementById('current-time');
  if (timeElement) {
    timeElement.textContent = moment().format('HH:mm');
  }
}, 1000);