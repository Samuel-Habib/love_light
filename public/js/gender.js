import { getCookie, setCookie } from "./Cookie.js";

console.log(getCookie("nickname")); // Log to check the nickname cookie

const form = document.getElementById("gender-form");

// Variable to hold selected gender
let selectedGender = null;

// Add event listeners for each image input
document.getElementById("man").addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission
    selectedGender = 'male';
    submitGender();
});

document.getElementById("woman").addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission
    selectedGender = 'female';
    submitGender();
});

document.getElementById("queer").addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission
    selectedGender = 'queer';
    submitGender();
});

// Function to handle submission
function submitGender() {
    const nickname = getCookie("nickname");
    setCookie("gender", selectedGender, "1")
    console.log(getCookie("gender")+ "GENDER in gender")
    if (!nickname || !selectedGender) {
        console.error("Nickname or gender is not set");
        return;
    }

    fetch(`/person/${nickname}/gender`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname, gender: selectedGender }),
    })
    .then(response => {
        if (response.ok) {
            console.log("Gender submitted successfully");
            // Redirect or perform other actions if needed
        } else {
            console.error("Error submitting gender");
        }
    })
    .catch(error => console.error("Network error:", error));

}