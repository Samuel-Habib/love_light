// import { $where } from "../../models/personModel";
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


const red = document.getElementById("red")
const yellow = document.getElementById("yellow")
const green = document.getElementById("green")
const bG =`rgb(96,217, 55)`
const bR = `rgb(237,34,13)`
const bY = `rgb(254,174,0)`

const dG = `rgb(50,108,30)`
const dR = `rgb(129,19, 10)`
const dY = `rgb(127,87, 11)`




//when you first enter the page

const nickname  = getCookie("nickname")
fetch('/person', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        nickname: `${nickname}`
    })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

// when you click
green.addEventListener("click", (e)=>{
    e.preventDefault()
    colorClick(red, green, yellow, dR, bG, dY, 3)

})

red.addEventListener("click", (e)=>{
    e.preventDefault()
    colorClick(red, green, yellow, bR, dG, dY, 1)
})
yellow.addEventListener("click", (e)=>{
    e.preventDefault()
    console.log("yellow has been hit")
    colorClick(red, green, yellow, dR, dG, bY, 2)
})


function colorClick(prevR, prevG, prevY, newR, newG, newY, color)
{
    prevR.style.backgroundColor = newR
    prevG.style.backgroundColor = newG
    prevY.style.backgroundColor = newY

    fetch(`/person/status`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            // pass in the nickname, and updateStatusByNickname
            nickname: `${nickname}`,
            status: `${color}`
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}
