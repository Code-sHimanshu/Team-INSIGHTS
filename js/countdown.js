// Delete this entire file if it only contains countdown logic 

function initDigitalCountdown() {
    // Set the event date (March 17, 2025 at 09:00 AM)
    const eventDate = new Date('2025-03-17T09:00:00').getTime();
    
    function updateTimer() {
        // Get current date and time
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        // Check if event has started
        if (distance < 0) {
            document.querySelector('.digital-countdown').innerHTML = `
                <div class="digital-time">
                    <span>EVENT STARTED</span>
                </div>
            `;
            clearInterval(timerInterval);
            return;
        }
        
        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update the display
        if (document.getElementById('days')) {
            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        }
    }
    
    // Update immediately and then every second
    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
    
    // Cleanup when page is hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(timerInterval);
        } else {
            updateTimer();
            // Restart interval if page becomes visible
            clearInterval(timerInterval);
            setInterval(updateTimer, 1000);
        }
    });
}

// Make sure DOM is loaded before starting
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDigitalCountdown);
} else {
    initDigitalCountdown();
} 