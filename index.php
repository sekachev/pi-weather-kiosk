<!DOCTYPE html>
<html lang="en">
<head> <!-- Existing meta tags and title -->
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Digital Clock with Weather</title>
  
  <!-- Weather Icons CSS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.12/css/weather-icons.min.css">
  
  <!-- Existing scripts -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@1.1.0"></script>
  <script src="https://cdn.jsdelivr.net/npm/moment@2.29.4/moment.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-moment@1.0.0"></script>
  
  <!-- Existing styles -->
  <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;500&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css?v=<?php echo filemtime('styles.css'); ?>">
  <link rel="stylesheet" href="weather.css?v=<?php echo filemtime('weather.css'); ?>">
  
  <!-- Chart scripts -->
  <script src="chart.js?v=<?php echo filemtime('chart.js'); ?>"></script>
</head>
<body>
  <!-- Weather Containers -->
  <div class="corner-square top-left">

  <div class="current-temp">
      <div class="temp-wrapper">
        <div class="temp-display" id="temperature"></div>
        <div class="feels-like" id="feels-like"></div>
      </div>
    </div>

    </div>
  </div>
  <div class="corner-square top-right">
    <div class="weather-icon-container">
      <i id="weather-icon" class="wi"></i>
    </div>
  </div>
  <div class="corner-square bottom-left">
    <div class="chart-container">
      <canvas id="tempChart"></canvas>
    </div>
  </div>
  <div class="corner-square bottom-right">
    <div id="calendar"></div>
  </div>

  <!-- Clock Container: restricts the clock face to a fixed size and centers it -->
  <div class="clock-container">
    <div class="fill">
      <div class="clock hour-style-pill hour-text-style-large hour-display-style-all 
                  minute-style-line minute-display-style-fine-2 minute-text-style-outside 
                  hand-style-hollow" id="utility-clock">
        <div class="centre">
          <div class="dynamic"></div>
          <div class="expand round circle-1"></div>
          <div class="anchor hour">
            <div class="element thin-hand"></div>
            <div class="element fat-hand"></div>
          </div>
          <div class="anchor minute">
            <div class="element thin-hand"></div>
            <div class="element fat-hand minute-hand"></div>
          </div>
          <div class="anchor second">
            <div class="element second-hand second-hand-front"></div>
            <div class="element second-hand second-hand-back"></div>
          </div>
          <div class="expand round circle-2"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Existing clock functionality -->
  <script src="script.js?v=<?php echo filemtime('script.js'); ?>"></script>
  <script src="icon.js?v=<?php echo filemtime('icon.js'); ?>"></script>
  <script src="weather.js?v=<?php echo filemtime('weather.js'); ?>"></script>
  <script src="calendar.js?v=<?php echo filemtime('calendar.js'); ?>"></script>
</body>
</html>
