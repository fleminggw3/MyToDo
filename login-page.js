const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const createButton = document.getElementById("create-form-submit");
const cookieButton = document.getElementById("cookie-form-submit");
const cookieMakeButton = document.getElementById("cookieMake-form-submit");
const clearStorageButton = document.getElementById("clearStorage-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

function updateUsers() {
    window.localStorage.setItem("userList",JSON.stringify(users));
}

function login(username) {
    document.cookie = "username=" + username+";";
    console.log("cookie: " + document.cookie);
    window.location.href = "main.html";
}

//Functionality
window.addEventListener('load', () => {

    //Load users (not fucntional, making empty object for now)
    users = {};
    if(window.localStorage.userList != "undefined" && typeof window.localStorage.userList !== 'undefined' && window.localStorage.userList != null){
        console.log("users: ");
        users = JSON.parse(window.localStorage.userList);
        console.log(users);
    }
    

    //Login Button Listener
    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        const inputUsername = loginForm.username.value;
        const inputPassword = loginForm.password.value;

        //Check if account exists
        let accountFound = false;
        for (user in users) {
            if(inputUsername == users[user].username) {
                login(inputUsername);
                accountFound = true;
            } 
        }

        //Failed to log in
        if (!accountFound) {
            alert("Invalid credentials.");
        }
    })

    //Create account button listener
    createButton.addEventListener("click", (e) => {
        e.preventDefault();
        const inputUsername = loginForm.username.value;
        const inputPassword = loginForm.password.value;

        //Check if account exists
        for (user in users) {
            if(inputUsername == users[user].username) {
                alert("Account already exists");
                return;
            }
        }

        //Create Account
        users[inputUsername] = {
            username: inputUsername,
            password: inputPassword
        }
        updateUsers();
        login(inputUsername);

        //console.log(users);
    })

    //Clear Local Storage button listener
    clearStorageButton.addEventListener("click", (e) => {
        e.preventDefault();
        window.localStorage.clear();
    })
})