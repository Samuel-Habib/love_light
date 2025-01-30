// the purpose of this page is to be a READ ONLY page 
// for the partner
export function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

export function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

export function clearAllCookies() {
    document.cookie.split(";").forEach((cookie) => {
        document.cookie = cookie
            .replace(/^ +/, "") // Remove leading spaces
            .replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/"); // Expire the cookie
    });
}


let status = 0
const nickname = getCookie("nickname");
let partner = ''

export function changeColor(red, green, yellow, newR, newG, newY){
    red.style.backgroundColor = newR
    green.style.backgroundColor = newG
    yellow.style.backgroundColor = newY
}



const red = document.getElementById("red");
const yellow = document.getElementById("yellow");
const green = document.getElementById("green");


const bG = `rgb(96,217, 55)`;
const bR = `rgb(237,34,13)`;
const bY = `rgb(254,174,0)`;

const dG = `rgb(50,108,30)`;
const dR = `rgb(129,19, 10)`;
const dY = `rgb(127,87, 11)`;


try {
    const response = await fetch(`/person/${nickname}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log(data.partner);
    partner = data.partner;
    console.log(partner, "partner")
} catch (error) {
    console.error('Error:', error);
}

// get the status from partner
// 
console.log(partner, "partner")

try {
    const response = await fetch(`/person/getStatus/${partner}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log(data, "partner");
    status = data.status;
} catch (error) {
    console.error('Error:', error);
}


if(status == 1){
    changeColor(red, green, yellow, bR, dG, dY)
}
if(status == 2){
    changeColor(red, green, yellow, dR, dG, bY)
}
if(status == 3){
    changeColor(red, green, yellow, dR, bG, dY)
}

