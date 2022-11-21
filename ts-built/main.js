//Global Vars
//Global Constants TEST COMMENT
var list_el;
var nullable = document.querySelector('#tasks');
if (nullable != null) {
    list_el = nullable;
}
else {
    console.log("NULL");
}
//Tasks Data Structure
var taskList = [];
function update() {
    saveTasks();
    redrawTasks();
    var no_tasks_message;
    var nullable = document.querySelector('#no-tasks-message');
    if (nullable != null) {
        no_tasks_message = nullable;
        if (tasksExist()) {
            no_tasks_message.setAttribute("hidden", "true");
        }
        else {
            no_tasks_message.removeAttribute("hidden");
        }
    }
    else {
        console.log("NULL");
    }
}
//Redraw Tasks on Page
function redrawTasks() {
    clearTasks();
    console.log("Redrawing...");
    for (var _i = 0, taskList_1 = taskList; _i < taskList_1.length; _i++) {
        var task = taskList_1[_i];
        console.log(task);
        drawNewTask(task);
    }
}
//Draws a new task (creates it in HTML and does all the configuration stuff)
function drawNewTask(taskObj) {
    var task_el = document.createElement("div");
    task_el.classList.add("task");
    var task_content_el = document.createElement("div");
    task_content_el.classList.add("content");
    task_el.appendChild(task_content_el);
    var task_input_el = document.createElement("input");
    task_input_el.classList.add("text");
    task_input_el.type = "text";
    task_input_el.value = taskObj.text;
    task_input_el.setAttribute("readonly", "readonly");
    task_input_el.addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter" && !(this.getAttribute("readonly"))) {
            console.log("ENTER");
            //console.log(this.parentElement.parentElement.getElementsByClassName("edit")[0].click());
        }
    });
    task_content_el.appendChild(task_input_el);
    var task_actions_el = document.createElement("div");
    task_actions_el.classList.add("actions");
    var task_more_el = document.createElement("button");
    task_more_el.classList.add("more");
    task_more_el.innerHTML = "More";
    var task_edit_el = document.createElement("button");
    task_edit_el.classList.add("edit");
    task_edit_el.innerHTML = "Edit";
    var task_delete_el = document.createElement("button");
    task_delete_el.classList.add("delete");
    task_delete_el.innerHTML = "Delete";
    task_actions_el.appendChild(task_more_el);
    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_el);
    task_el.appendChild(task_actions_el);
    list_el.appendChild(task_el);
    //More button functionality
    task_more_el.addEventListener('click', function () {
        if (task_more_el.innerText.toLowerCase() == "more") {
            //Container Div
            var task_more_container_el = document.createElement("div");
            task_more_container_el.classList.add("moreContainer");
            //Break For Task
            var task_more_break_el = document.createElement("div");
            task_more_break_el.classList.add("break");
            //Break Generic
            //let task_more_br_el = document.createElement("br");
            //Date Text
            var task_more_date_el = document.createElement("p");
            task_more_date_el.innerHTML = "Date Created: " + taskObj.dateCreated;
            //Append to container
            task_el.appendChild(task_more_break_el);
            task_more_container_el.appendChild(task_more_date_el);
            task_more_container_el.appendChild(document.createElement("br"));
            task_el.appendChild(task_more_container_el);
            task_more_container_el.appendChild(task_more_date_el);
            task_more_el.innerText = "Less";
        }
        else {
            var task_el_child = task_el.querySelector(".moreContainer");
            if (task_el_child != null) {
                task_el.removeChild(task_el_child);
            }
            //console.log(task_el.querySelector(".moreContainer"));
            task_more_el.innerText = "More";
        }
    });
    //Edit button functionality
    task_edit_el.addEventListener('click', function () {
        if (task_edit_el.innerText.toLowerCase() == "edit") {
            task_input_el.removeAttribute("readonly");
            task_input_el.focus();
            task_edit_el.innerText = "Save";
        }
        else {
            task_input_el.setAttribute("readonly", "readonly");
            taskObj.text = task_input_el.value;
            console.log(taskObj);
            task_edit_el.innerText = "Edit";
        }
    });
    //Delete button functionality
    task_delete_el.addEventListener('click', function () {
        console.log("DELETE");
        deleteTask(taskObj);
    });
}
//Get tasks
function getTasks() {
    return taskList;
}
//Save tasks
function saveTasks() {
    //var taskList: Task[] = getTasks();
    var cookie = getCookie("username");
    if (cookie != undefined) {
        window.localStorage.setItem(cookie, JSON.stringify(taskList));
    }
}
//Get Cookies
function getCookie(name) {
    var value = "; ".concat(document.cookie);
    var parts = value.split("; ".concat(name, "="));
    var popped = parts.pop();
    if (popped != undefined) {
        var results = popped.split(';').shift();
    }
    return results;
}
//Load Tasks
function loadTasks() {
    var cookie = getCookie("username");
    if (cookie != undefined) {
        var myTaskList = window.localStorage.getItem(cookie);
        console.log(myTaskList);
        console.log(typeof myTaskList !== 'undefined');
        console.log(undefined);
        if (myTaskList != "undefined" && typeof myTaskList !== 'undefined' && myTaskList != null) {
            taskList = JSON.parse(myTaskList);
        }
    }
}
//Sign Out
function signOut() {
    document.cookie = "username=";
    window.location.href = "index.html";
}
//Check if task exists
function tasksExist() {
    return taskList.length > 0;
}
//TODO
//Check if ID exists
function checkIdExists(id) {
    return false;
}
//TODO
//Create new id
function generateTaskId() {
    return "100";
}
//Create tasks
function createTask(taskText) {
    var currentDate = new Date();
    var date = currentDate.toLocaleString();
    var task = { text: taskText, dateCreated: date, id: generateTaskId() };
    //Add to data list
    taskList.push(task);
    console.log(taskList);
    update();
}
function createManyTasks() {
    for (var i = 0; i < 5; i++) {
        createTask("Spawned Task: " + i);
    }
}
//what is this again?
function taskKeyDown(obj) {
    console.log("HIT");
    console.log(obj);
}
//Delete task
function deleteTask(task) {
    taskList.splice(taskList.indexOf(task), 1);
    update();
}
//Delete all function - INCLUDES SAVE
function deleteAll() {
    taskList = [];
    //Check if there are any tasks
    update();
}
//Clear tasks
function clearTasks() {
    while (list_el.firstChild) {
        list_el.removeChild(list_el.firstChild);
    }
}
//Functionality
window.addEventListener('load', function () {
    //Hello Message
    var helloMessage = document.querySelector('#hello-message');
    if (helloMessage != null) {
        helloMessage.textContent = "Hello, " + getCookie("username");
    }
    //Load Tasks
    loadTasks();
    //Get Form
    var form = document.querySelector('#new-task-form');
    //Get input
    var input = document.querySelector('#new-task-input');
    //Update
    update();
    // on submit create 100 tasks
    //Get Spawn 100 Button
    var createManyForm = document.querySelector('#create-many-form');
    if (createManyForm != null) {
        createManyForm.addEventListener('submit', function (e) {
            //This prevents the page from reloading when you hit a submit button
            e.preventDefault();
            createManyTasks();
        });
    }
    // on submit sign out
    //Get sign out button
    var signoutForm = document.querySelector('#sign-out-form');
    if (signoutForm != null) {
        signoutForm.addEventListener('submit', function (e) {
            //This prevents the page from reloading when you hit a submit button
            e.preventDefault();
            signOut();
        });
    }
    // On submit delete all
    //Get Delete All Button
    var deleteAllForm = document.querySelector('#delete-all-form');
    if (deleteAllForm != null) {
        deleteAllForm.addEventListener('submit', function (e) {
            //This prevents the page from reloading when you hit a submit button
            e.preventDefault();
            if (tasksExist()) {
                deleteAll();
            }
            else {
                alert("No tasks to delete!");
            }
        });
    }
    // On submit new task
    if (form != null) {
        form.addEventListener('submit', function (e) {
            //This prevents the page from reloading when you hit a submit button
            e.preventDefault();
            if (input != null) {
                var taskText = input.value;
                if (!taskText) {
                    alert("Please fill out the task");
                    return;
                }
                else {
                    console.log("success");
                }
                createTask(taskText);
                //Clear the input
                input.value = "";
            }
        });
    }
});
