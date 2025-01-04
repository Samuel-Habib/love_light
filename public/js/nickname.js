// const button = document.getElementById('nickname-submit');
// const form = document.getElementById('nickname-form');



// const nickname = document.querySelector('input[type="text"]').value;

// console.log(nickname + "thi sis ")
// setCookie("nickname", nickname, 1)
// console.log(getCookie("nickname")+ "thi sis a cookie")
// console.log(document.getElementById("nick").value + "helloGOTYA")



// form.addEventListener('submit', (event) => {
    // event.preventDefault();

    // const nickname = document.querySelector('input[type="text"]').value;

    // fetch('/person', {  // Ensure URL matches backend route
        // method: 'POST',
        // headers: {
            // 'Content-Type': 'application/json',
        // },
        // body: JSON.stringify({ nickname }),  // Send the nickname
    // })
        // .then((response) => {
            // if (!response.ok) {
                // throw new Error('Network response was not ok');
            // }
            // return response.json(); // Or JSON if API responds with JSON
        // })
        // .then((data) => {
            // console.log('Success:', data);
        // })
        // .catch((error) => {
            // console.error('Error:', error);
        // });

        // window.location.href = "/gender.html"
// });

import { getCookie, setCookie } from './Cookie.js';

const form = document.getElementById('nickname-form');
form.addEventListener('submit', (event) => {
    
    event.preventDefault(); // Prevent form from navigating to /person

    const nickname = document.getElementById("nick").value
    setCookie("nickname", nickname, "1")
    console.log(getCookie("nickname")+ "MY COOKIE")
    
    // Send the nickname to the server using fetch
    fetch('/person', {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname }),  
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); // Change this if your backend returns JSON
    })
    .then((data) => {
        console.log('Success:', data);

        // After the fetch request succeeds, redirect to the next page
        window.location.href = "/gender.html";
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});