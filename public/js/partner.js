import f from './home';

const red = document.getElementById("red");
const yellow = document.getElementById("yellow");
const green = document.getElementById("green");

export function addColorClickListeners() {
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
}
addColorClickListeners();

const nickname = f.getCookie("nickname");

const partnerReponse = fetch(`/person/${nickname}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.partner)
        return data
    })
    .catch(error => console.error('Error:', error));
partnerReponse.then(data => {
    if(data.partner != null){
        console.log("partner exists")
        document.getElementById("partner").innerHTML = data.partner
    }
    else{
        console.log("no partner")
        document.getElementById("partner").innerHTML = "No partner"
    }
})