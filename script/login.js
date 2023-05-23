"use strict";

//////////////////////////////////
//////// Declare variables:
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const allInputs = document.querySelectorAll(".login-form input");
const loginBtn = document.querySelector(".login-btn");
const userArr = getData("users") ?? [];

//////////////////////////////////
//////// Functions:
// Validate Login form:
function validateLoginForm() {
    // check if there any blank input:
    for (let i = 0; i < allInputs.length; i++) {
        const input = allInputs[i];
        if (input.value === "") {
            alert("Vui lòng điền đầy đủ thông tin!");
            return false;
        }
    }
    return true;
}

// Check account?:
function checkAccount() {
    for (let i = 0; i < userArr.length; i++) {
        const user = userArr[i];
        if (
            user.username === usernameInput.value &&
            user.password === passwordInput.value
        ) {
            // store this user as current account:
            storeData("currentUser", user);
            return true;
        }
    }

    alert("Tài khoản mật khẩu không đúng!");
    return false;
}

// When user click Login button:
loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (validateLoginForm() && checkAccount()) {
        window.location.href = "../index.html";
    }
});
