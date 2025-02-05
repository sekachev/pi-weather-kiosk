function updateCalendar() {
    const calendarElement = document.getElementById('calendar');
    if (!calendarElement) return;
  
    const now = moment();
    const date = {
        day: now.format('DD'), // Using DD to ensure two digits
        dayName: now.format('ddd').toUpperCase(),
        isToday: true
    };
  
    // Clear existing content
    calendarElement.innerHTML = '';
  
    // Create date element
    const dateWrapper = document.createElement('div');
    dateWrapper.className = 'calendar-date';
    
    // Add day number
    const dayNumber = document.createElement('div');
    dayNumber.className = 'day-number';
    dayNumber.textContent = date.day;
    
    // Add day name
    const dayName = document.createElement('div');
    dayName.className = 'day-name';
    dayName.textContent = date.dayName;
    
    dateWrapper.appendChild(dayNumber);
    dateWrapper.appendChild(dayName);
    calendarElement.appendChild(dateWrapper);
}
  
// Initial update
updateCalendar();
  
// Update calendar daily at midnight
setInterval(() => {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) {
        updateCalendar();
    }
}, 60000); // Check every minute