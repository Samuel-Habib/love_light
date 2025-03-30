// Basic test script to verify JavaScript is working
console.log('✅ TEST SCRIPT: Successfully loaded and executing');

// Create visual logging system
const logContainer = document.createElement('div');
logContainer.style = 'position:fixed;bottom:10px;left:10px;width:300px;max-height:200px;overflow-y:auto;background:rgba(0,0,0,0.8);color:white;padding:10px;font-family:monospace;font-size:12px;z-index:10001;border-radius:5px;';
document.body.appendChild(logContainer);

// Function to log to our visual console instead of browser console
function visualLog(message, type = 'info') {
    const logEntry = document.createElement('div');
    logEntry.style = `margin-bottom:5px;padding:3px;border-left:3px solid ${type === 'error' ? 'red' : type === 'warn' ? 'orange' : 'green'};`;
    logEntry.textContent = `[${type.toUpperCase()}] ${message}`;
    logContainer.appendChild(logEntry);
    logContainer.scrollTop = logContainer.scrollHeight;
    
    // Also try real console with all methods
    try {
        console[type](message);
    } catch(e) {
        // Fallback to regular log if method not available
        console.log(message);
    }
}

// Test our visual logging
visualLog('✅ Visual logging system initialized');
visualLog('✅ Test message 1', 'info');
visualLog('✅ Test message 2', 'info');

// Create a visible indicator on page
const indicator = document.createElement('div');
indicator.style = 'position:fixed;top:10px;right:10px;background:blue;color:white;padding:5px;border-radius:5px;font-family:sans-serif;z-index:10000;';
indicator.textContent = 'JS Test: OK';
document.body.appendChild(indicator);

// Add a click handler to toggle logging visibility
indicator.addEventListener('click', function() {
    if (logContainer.style.display === 'none') {
        logContainer.style.display = 'block';
        visualLog('✅ Visual logging enabled');
    } else {
        logContainer.style.display = 'none';
    }
});

// Test basic DOM functionality
document.addEventListener('DOMContentLoaded', function() {
    visualLog('✅ TEST SCRIPT: DOMContentLoaded event triggered');
    indicator.textContent = 'JS DOM Events: OK';
});

// Test window.onerror to catch global errors
window.onerror = function(message, source, lineno, colno, error) {
    visualLog(`ERROR: ${message} at ${source}:${lineno}:${colno}`, 'error');
    return false;
};

// Log that we reached the end of the script
visualLog('✅ Test script completed execution');

// Make the visualLog function globally available
window.visualLog = visualLog;
