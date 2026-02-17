const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");
const formError = document.getElementById("formError");

const DB = [
    {
        "username": "user0",
        "password": "testpw123",
    },
]

const errorCodes = {
    8: "Value cannot be empty",
    9: "Value cannot contain spaces",
    10: "Invalid credentials",
    11: "User not registered",
}

loginForm.onsubmit = () => {
    clearErrors();

    const username = usernameInput.value;
    const password = passwordInput.value;
    const resUsername = validateValue(username);
    const resPassword = validateValue(password);

    if(resUsername in errorCodes || resPassword in errorCodes) {
        usernameError.textContent = errorCodes[resUsername];
        passwordError.textContent = errorCodes[resPassword];
        return false;
    }

    const user = DB.find(user => user.username === username);

    if(!user) {
        formError.textContent = errorCodes[11]
        return false;
    }

    const isUserValid = checkUser(username, password, user);

    if(!isUserValid) {
        formError.textContent = errorCodes[10]
        return false;
    }

    return true;
}

function validateValue(value) {
    const trimmed = value.trim();
    if(trimmed === "" || !trimmed) return 8;
    else if(trimmed.includes(" ")) return 9;
    else return 0;
}

function checkUser(username, password, user) {
    if(
        user.username === username &&
        user.password === password
    ) return true;

    return false;
}

function clearErrors() {
    usernameError.textContent = null;
    passwordError.textContent = null;
    formError.textContent = null;
}