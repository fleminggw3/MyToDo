//Object Type Definition
type Users = {
    text: string;
    dateCreated: string;
}

//User List
//var users: Users[];
var users = {};

//Const Globals
const loginForm: HTMLFormElement = document.getElementById("login-form") as HTMLFormElement;
const loginButton: HTMLElement | null = document.getElementById("login-form-submit");
const createButton: HTMLElement | null = document.getElementById("create-form-submit");
const cookieButton: HTMLElement | null = document.getElementById("cookie-form-submit");
const cookieMakeButton: HTMLElement | null = document.getElementById("cookieMake-form-submit");
const clearStorageButton: HTMLElement | null = document.getElementById("clearStorage-form-submit");
const loginErrorMsg: HTMLElement | null = document.getElementById("login-error-msg");

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
    if(window.localStorage.userList != "undefined" && typeof window.localStorage.userList !== 'undefined' && window.localStorage.userList != null){
        console.log("users: ");
        users = JSON.parse(window.localStorage.userList);
        console.log(users);
    }
    

    //Login Button Listener
    if (loginButton != null) {
        loginButton.addEventListener("click", (e) => {
            e.preventDefault();
            var inputUsername = loginForm.username.value;
            var inputPassword = loginForm.password.value;
    
            //Check if account exists
            let accountFound = false;
            for (let user in users) {
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
    }
    

    //Create account button listener
    if (createButton != null) {
        createButton.addEventListener("click", (e) => {
            e.preventDefault();
            const inputUsername = loginForm.username.value;
            const inputPassword = loginForm.password.value;

            //Check if account exists
            for (let user in users) {
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
    }

    //Clear Local Storage button listener
    if (clearStorageButton != null) {
        clearStorageButton.addEventListener("click", (e) => {
            e.preventDefault();
            window.localStorage.clear();
        })
    }
})