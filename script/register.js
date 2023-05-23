////////////////////////////
// Declare variables:
const registerBtn = document.querySelector(".register-btn");
const firstNameInput = document.querySelector("#first-name");
const lastNameInput = document.querySelector("#last-name");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");
const allInputs = document.querySelectorAll(".register-form input");

const userArr = getData("users") ?? [];
////////////////////////////
// Functions:

// Validate register form:
function validateRegister() {
    // check if there any Input is blank:
    for (let i = 0; i < allInputs.length; i++) {
        const input = allInputs[i];
        if (input.value === "") {
            alert("Vui lòng điền đầy đủ thông tin!");
            return false;
        }
    }

    // check user name:
    if (userArr.some((element) => element.username === usernameInput.value)) {
        alert("Username has already exist!");
        return false;
    }

    //check password:
    if (passwordInput.value.length < 8) {
        alert("Password must be more than 8 characters!");
        return false;
    }
    if (confirmPasswordInput.value !== passwordInput.value) {
        alert("Not the same password!");
        return false;
    }

    return true;
}

// When user click register button:
registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // check validate:
    if (validateRegister()) {
        let newUser = new User(
            firstNameInput.value,
            lastNameInput.value,
            usernameInput.value,
            passwordInput.value
        );
        userArr.push(newUser.data);
        storeData("users", userArr);
        window.location.href = "login.html";
    }
});
