import { $where } from "../../models/personModel";
import {getCookie, setCookie} from "./Cookie"

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
        nickname: $(nickname)
    })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

// when you click
green.addEventListener("click", (e)=>{
    e.preventDefault()
    console.log("green has been hit")
    // 96,217,55
    green.style.backgroundColor= `rgb(96,217, 55)`
    red.style.backgroundColor= `rgb(129,19, 10)`
    yellow.style.backgroundColor= `rgb(127,87, 11)`

    fetch('/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            
        })
    })

    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
    fetch('/person/green/status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
})
red.addEventListener("click", (e)=>{
    e.preventDefault()
    console.log("red has been hit")
    // 237,34,13
    red.style.backgroundColor = `rgb(237,34,13)`
    green.style.backgroundColor= `rgb(50,108,30)`
    yellow.style.backgroundColor= `rgb(127,87, 11)`
})
yellow.addEventListener("click", (e)=>{
    e.preventDefault()
    console.log("yellow has been hit")
    red.style.backgroundColor= `rgb(129,19, 10)`
    green.style.backgroundColor= `rgb(50,108,30)`
    // 254,174,0
    yellow.style.backgroundColor= `rgb(254,174,0)`
})


function colorClick(prevR, prevG, prevY, newR, newG, newY, color)
{
    prevR.style.backgroundColor= newR
    prevG.style.backgroundColor= newG
    prevY.style.backgroundColor= newY

    fetch(`/person/${color}/status`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            // pass in the nickname, and updateStatusByNickname
            nickname: `${nickname}`

        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}
