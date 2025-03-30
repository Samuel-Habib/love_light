import { getCookie, setCookie } from './Cookie.js';
const form = document.getElementById('nickname-form');
form.addEventListener('submit', async (event) => {
    
    event.preventDefault(); 
    
    const nickname = document.getElementById("nick").value;
    setCookie("nickname", nickname, "1");
    console.log(getCookie("nickname")+ "MY COOKIE");
    
    try {
        const response = await fetch('/person', {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nickname }),  
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.text();
        console.log('First request Success:', responseData);

        // const onboardingResponse = await fetch('/resend/sendOnboarding', {
        //     method: 'POST',
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         email: getCookie("email"),
        //         nickname: nickname 
        //     })
        // });

        if (!onboardingResponse.ok) {
            throw new Error(`Onboarding HTTP error! status: ${onboardingResponse.status}`);
        }
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        window.location.href = "./gender.html";
    }
    
});

// form.addEventListener('submit', async (event) => {
//     // for now this is a workaround to allow the page to go to the next page
//     // there is some issues with the fetch request that is preventing the page from going to the next page
//     // this seems to be a promise based error

//     // robust error handling needs to be in place in case the nickname doesn't get saved
//     // however, because the nickname is required for gender, the user will be stuck on this page

//     event.preventDefault()

//     setTimeout(() => {
//         window.location.href = "./gender.html";
//     }, 100);

// });