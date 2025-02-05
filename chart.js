// Make weatherChart accessible globally
window.weatherChart = null;

// Expose updateChart to global scope
function updateChart(data) {
  // Extract sunrise and sunset times for the current day
  const today = moment().format('YYYY-MM-DD');
  const todayIndex = data.daily.time.indexOf(today);
  const sunrise = moment(data.daily.sunrise[todayIndex]);
  const sunset = moment(data.daily.sunset[todayIndex]);

  // For the next day if we're showing it
  const nextDay = moment().add(1, 'day').format('YYYY-MM-DD');
  const nextDayIndex = data.daily.time.indexOf(nextDay);
  const nextSunrise = nextDayIndex !== -1 ? moment(data.daily.sunrise[nextDayIndex]) : null;
  const nextSunset = nextDayIndex !== -1 ? moment(data.daily.sunset[nextDayIndex]) : null;
  const ctx = document.getElementById('tempChart').getContext('2d');
  
  // Calculate T+2 and T+24 timestamps
  const currentTime = moment();
  const tPlus2 = moment(currentTime).add(0, 'hours');
  const tPlus24 = moment(currentTime).add(24, 'hours');
  
  // Find indices for our time window
  const hourlyTimes = data.hourly.time.map(time => moment(time));
  const startIndex = hourlyTimes.findIndex(time => time.isSameOrAfter(tPlus2));
  const endIndex = hourlyTimes.findIndex(time => time.isAfter(tPlus24));
  
  // Slice the data for our time window (T+2 to T+24)
  const times = data.hourly.time.slice(startIndex, endIndex);
  const temps = data.hourly.temperature_2m.slice(startIndex, endIndex);
  const currentTemp = data.current.temperature_2m;
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  
  // Add padding to the scale range
  const yMin = minTemp - 0.5;
  const yMax = maxTemp + 0.5;

  if (window.weatherChart) window.weatherChart.destroy();

  // Create a horizontal gradient based on temperature trend
  const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
  const isRising = temps[temps.length - 1] > temps[0];
  
  if (isRising) {
    gradient.addColorStop(0, '#007aff');  // Blue
    gradient.addColorStop(1, '#ff3b30');  // Red
  } else {
    gradient.addColorStop(0, '#ff3b30');  // Red
    gradient.addColorStop(1, '#007aff');  // Blue
  }

  // Configure annotations for min, max
  const annotations = {
    min: {
      type: 'point',
      xValue: times[temps.indexOf(Math.min(...temps))],
      yValue: Math.min(...temps),
      radius: 4,
      backgroundColor: '#fff',
      borderColor: '#fff',
      borderWidth: 2,
      label: {
        enabled: true,
        content: `${Math.min(...temps).toFixed(1)}°`,
        position: 'bottom',
        yAdjust: 25,
        color: '#fff',
        font: { 
          family: 'Comfortaa',
          size: 24,
          weight: 900
        }
      }
    },
    max: {
      type: 'point',
      xValue: times[temps.indexOf(Math.max(...temps))],
      yValue: Math.max(...temps),
      radius: 4,
      backgroundColor: '#fff',
      borderColor: '#fff',
      borderWidth: 2,
      label: {
        enabled: true,
        content: `${Math.max(...temps).toFixed(1)}°`,
        position: 'top',
        yAdjust: -25,
        color: '#12f',
        font: {
          family: 'Comfortaa',
          size: 24,
          weight: 900
        }
      }
    }
  };

  const config = {
    type: 'line',
    data: {
      labels: times,
      datasets: [{
        data: temps,
        borderColor: gradient,
        borderWidth: 5,
        tension: 0.4,
        fill: false,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        annotation: { 
          annotations: {
            ...annotations,
            daytime1: {
              type: 'box',
              xMin: sunrise,
              xMax: sunset,
              backgroundColor: 'rgba(128, 128, 128, 0.4)',
              borderWidth: 0,
              drawTime: 'beforeDatasetsDraw'
            },
            ...(nextSunrise && nextSunset ? {
              daytime2: {
                type: 'box',
                xMin: nextSunrise,
                xMax: nextSunset,
                backgroundColor: 'rgba(128, 128, 128, 0.4)',
                borderWidth: 0,
                drawTime: 'beforeDatasetsDraw'
              }
            } : {})
          },
          clip: false 
        }
      },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'hour',
            displayFormats: { hour: 'HH' },
            stepSize: 6
          },
          min: tPlus2.toISOString(),
          max: tPlus24.toISOString(),
          grid: { color: '#333' },
          ticks: {
            color: '#666',
            maxRotation: 0,
            autoSkip: false,
            maxTicksLimit: 8,
            font: {
              family: 'Comfortaa',
              size: 24,
              weight: 900
            }
          }
        },
        y: {
          min: yMin,
          max: yMax,
          grid: {
            color: (context) => {
              return context.tick.value === 0 ? '#fff' : '#333';
            },
            lineWidth: 1,
            stepSize: 1
          },
          ticks: {
            color: '#666',
            callback: function(value) {
              return value.toFixed(1) + '°';  // Format to 1 decimal place
            },
            stepSize: 1,  // Show ticks every 0.5 degrees
            font: {
              family: 'Comfortaa',
              size: 24,
              weight: 900
            }
          }
        }
      }
    }
  };

  // Clear the canvas background
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  window.weatherChart = new Chart(ctx, config);
}