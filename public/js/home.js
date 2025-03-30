function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

// Wrap everything in a DOMContentLoaded event
document.addEventListener('DOMContentLoaded', async () => {
    console.log("DOM fully loaded, now running script");
    console.log("All cookies:", document.cookie);
    
    // Get cookies right after DOM is loaded
    let nickname = getCookie("nickname");
    let email = getCookie("email");
    
    console.log("Reading cookies - nickname:", nickname);
    console.log("Reading cookies - email:", email);
    
    // Check if elements exist before accessing them
    const red = document.getElementById("red");
    const yellow = document.getElementById("yellow");
    const green = document.getElementById("green");
    const userButton = document.getElementById("user-avatar");
    
    if (!red || !yellow || !green) {
        console.error("Traffic light elements not found on page!");
        return; // Exit if elements aren't found
    }
    
    const bG = `rgb(96,217, 55)`;
    const bR = `rgb(237,34,13)`;
    const bY = `rgb(254,174,0)`;
    const dG = `rgb(50,108,30)`;
    const dR = `rgb(129,19, 10)`;
    const dY = `rgb(127,87, 11)`;
    
    let status = 0;
    
    // Add click listeners after confirming elements exist
    green.addEventListener("click", (e) => {
        e.preventDefault();
        colorClick(red, green, yellow, dR, bG, dY, 3);
    });
    
    red.addEventListener("click", (e) => {
        e.preventDefault();
        colorClick(red, green, yellow, bR, dG, dY, 1);
    });
    
    yellow.addEventListener("click", (e) => {
        e.preventDefault();
        colorClick(red, green, yellow, dR, dG, bY, 2);
    });
    
    // Fetch status only if email is available
    if (email) {
        try {
            console.log("Fetching status for email:", email);
            const response = await fetch(`/person/statusByEmail/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            // Check if response is ok
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log("Status data received:", data);
            
            if (data == 1) {
                console.log("Setting status 1");
                changeColor(red, green, yellow, bR, dG, dY);
                status = 1;
            } else if (data == 2) {
                console.log("Setting status 2");
                changeColor(red, green, yellow, dR, dG, bY);
                status = 2;
            } else if (data == 3) {
                console.log("Setting status 3");
                changeColor(red, green, yellow, dR, bG, dY);
                status = 3;
            }
        } catch (error) {
            console.error('Error fetching status (check server logs/network tab):', error);
        }
    } else {
        console.warn("No email cookie found, can't fetch status");
    }
    
    // Add user button event listener after confirming it exists
    if (userButton && nickname) {
        userButton.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("User button clicked, fetching for nickname:", nickname);
            
            fetch(`/person/${nickname}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Person data received:", data);
                
                if (data.status == 1) {
                    changeColor(red, green, yellow, bR, dG, dY);
                } else if (data.status == 2) {
                    changeColor(red, green, yellow, dR, dG, bY);
                } else if (data.status == 3) {
                    changeColor(red, green, yellow, dR, bG, dY);
                }
            })
            .catch(error => console.error('Error fetching person data (verify endpoint):', error));
        });
    }
});

function colorClick(prevR, prevG, prevY, newR, newG, newY, status) {
    // Get the current nickname to ensure it's the latest value
    const nickname = getCookie("nickname");
    
    if (!nickname) {
        console.error("Cannot update status: No nickname cookie found");
        return;
    }
    
    // Update UI immediately for responsiveness
    prevR.style.backgroundColor = newR;
    prevG.style.backgroundColor = newG;
    prevY.style.backgroundColor = newY;
       
    fetch(`/person/status`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            // pass in the nickname, and updateStatusByNickname
            nickname: `${nickname}`,
            status: `${status}`
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error)); 
}

// reconnection handler
window.addEventListener('online', function() {
    console.log("Connection restored, syncing pending updates");
    const status = localStorage.getItem('trafficLightStatus');
    const nickname = getCookie("nickname");
    
    if (status && nickname) {
        // Try to sync the status when we're back online
        fetch("/person/status", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nickname: nickname,
                status: status
            })
        })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => console.log("Status synced after reconnection:", data))
        .catch(error => console.error("Failed to sync status after reconnection:", error));
    }
});

function changeColor(red, green, yellow, newR, newG, newY) {
    red.style.backgroundColor = newR;
    green.style.backgroundColor = newG;
    yellow.style.backgroundColor = newY;
}