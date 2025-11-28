const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");
const formError = document.getElementById("formError");

// user object in local database
const user1 = {
    username: "Bomby",
    password: "Bumba123",
}

// validate the form on submit
loginForm.onsubmit = () => {
    clearErrors();
    let username = usernameInput.value;
    let password = passwordInput.value;
    let isUsernameValid = validateValue(username, "username");
    let isPasswordValid = validateValue(password, "password");
    if(!isUsernameValid || !isPasswordValid) {
        return false;
    }
    let doesUserExist = checkUser(username, password);
    if(doesUserExist === true) {
        return true;
    } else {
        let errorMessage = "User is not registered";
        updateErrors(formError, errorMessage);
        return false;
    }
}

function validateValue(value, field) {
    value = value.trim();
    if(value === "") {
        let errorMessage = "value cannot be empty";
        checkErrorLocation(field, errorMessage);
        return false;
    } else if(value.includes(" ")) {
        let errorMessage = "value cannot contain spaces";
        checkErrorLocation(field, errorMessage);
        return false;
    } 
    value = value.split("");
    if(value.length <= 4) {
        let errorMessage = "value must be longer than 4 characters";
        checkErrorLocation(field, errorMessage);
        return false;
    } else if(value.length >= 20) {
        let errorMessage = "value must be shorter than 20 characters";
        checkErrorLocation(field, errorMessage);
        return false;
    }
    return true;
}

function checkUser(username, password) {
    if(username === user1["username"] && password === user1["password"]) {
        return true;
    }
    return false;
}

function checkErrorLocation(field, errorMessage) {
    if(field === "username") {
        updateErrors(usernameError, errorMessage);
        usernameInput.style.border = "1px solid red";
    } else if(field === "password") {
        updateErrors(passwordError, errorMessage);
        passwordInput.style.border = "1px solid red";
    }
}

function updateErrors(errorField, errorMessage) {
    errorField.innerHTML = `${errorMessage}`;
}

function clearErrors() {
    document.querySelectorAll('.errorMessage').forEach(errorField => errorField.innerHTML = "");
    document.querySelectorAll('.inputField').forEach(inputFeld => inputFeld.style.border = "none");
}