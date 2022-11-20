//User List
//var users: Users[];
var users = {};
//Const Globals
var loginForm = document.getElementById("login-form");
var loginButton = document.getElementById("login-form-submit");
var createButton = document.getElementById("create-form-submit");
var cookieButton = document.getElementById("cookie-form-submit");
var cookieMakeButton = document.getElementById("cookieMake-form-submit");
var clearStorageButton = document.getElementById("clearStorage-form-submit");
var loginErrorMsg = document.getElementById("login-error-msg");
function updateUsers() {
    window.localStorage.setItem("userList", JSON.stringify(users));
}
function login(username) {
    document.cookie = "username=" + username + ";";
    console.log("cookie: " + document.cookie);
    window.location.href = "main.html";
}
//Functionality
window.addEventListener('load', function () {
    //Load users (not fucntional, making empty object for now)
    if (window.localStorage.userList != "undefined" && typeof window.localStorage.userList !== 'undefined' && window.localStorage.userList != null) {
        console.log("users: ");
        users = JSON.parse(window.localStorage.userList);
        console.log(users);
    }
    //Login Button Listener
    if (loginButton != null) {
        loginButton.addEventListener("click", function (e) {
            e.preventDefault();
            var inputUsername = loginForm.username.value;
            var inputPassword = loginForm.password.value;
            //Check if account exists
            var accountFound = false;
            for (var user in users) {
                if (inputUsername == users[user].username) {
                    login(inputUsername);
                    accountFound = true;
                }
            }
            //Failed to log in
            if (!accountFound) {
                alert("Invalid credentials.");
            }
        });
    }
    //Create account button listener
    if (createButton != null) {
        createButton.addEventListener("click", function (e) {
            e.preventDefault();
            var inputUsername = loginForm.username.value;
            var inputPassword = loginForm.password.value;
            //Check if account exists
            for (var user in users) {
                if (inputUsername == users[user].username) {
                    alert("Account already exists");
                    return;
                }
            }
            //Create Account
            users[inputUsername] = {
                username: inputUsername,
                password: inputPassword
            };
            updateUsers();
            login(inputUsername);
            //console.log(users);
        });
    }
    //Clear Local Storage button listener
    if (clearStorageButton != null) {
        clearStorageButton.addEventListener("click", function (e) {
            e.preventDefault();
            window.localStorage.clear();
        });
    }
});
