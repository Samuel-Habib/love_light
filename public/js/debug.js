console.log("Debug script loaded successfully");

// Simple function to test basic functionality
function testFunction() {
    console.log("Test function executed");
    const debugElement = document.createElement('div');
    debugElement.style = 'position:fixed;top:0;left:0;right:0;background:green;color:white;padding:10px;z-index:9999;';
    debugElement.textContent = 'Debug script is working';
    document.body.appendChild(debugElement);
}

// Run on page load
window.addEventListener('DOMContentLoaded', function() {
    console.log("Debug DOMContentLoaded event fired");
    testFunction();
});

// Also run immediately in case the page is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log("Debug script running after page load");
    setTimeout(testFunction, 1000);
}
