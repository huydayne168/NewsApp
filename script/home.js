"use strict";

////////////////////////////////////
// Declare variables:
const notLoginContainer = document.querySelector(".container.not-login");
const LoginContainer = document.querySelector(".container.login");
const sideBar = document.querySelector(".side-bar");
const greet = document.querySelector(".status-desc.greet");
const homeLink = document.querySelector(".navigation .home");
const loginBtn = document.querySelector(".login");
const registerBtn = document.querySelector(".register");
const logoutBtn = document.querySelector(".logout");

/////////////////////////////////////
// Functions:

//Active home navigation
homeLink.classList.add("active");

// When user click register button:
registerBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "pages/register.html";
});

// When user click login button:
loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "pages/login.html";
});

// Check user have logan or not?:
const currentUser = getData("currentUser");
if (currentUser) {
    sideBar.classList.remove("hidden");
    notLoginContainer.classList.add("hidden");
    LoginContainer.classList.remove("hidden");
    greet.textContent = `Hello ${currentUser.lastName} ${currentUser.firstName}`;
}

// User choose to logout:
logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    deleteData("currentUser");
    window.location.href = "pages/login.html";
});
