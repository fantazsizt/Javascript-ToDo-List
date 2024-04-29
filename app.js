/*
* todo list project
*/

// *Tüm elementleri seçmek

const form = document.querySelector("#addForm");
const input1 = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const secondForm = document.getElementsByTagName("form")[1];
const clearButton = document.querySelector
    ("#todoClearButton");
const search = document.querySelector("#todoSearch");


let todos = [];


runEvent();

function runEvent() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", showStorage);
    secondForm.addEventListener("click", removeTodoToUI);
    clearButton.addEventListener("click", deleteAllTodos);
    search.addEventListener("keyup", filter);
}


function addTodo(e) {
    const inputText = input1.value.trim();
    if (inputText == null || inputText == "") {
        showAlert("warning", "Lütfen bir değer giriniz!")
    }
    else {
        //Local ekleme
        addTodoToUI(inputText);
        addTodoToStorage(inputText);
        showAlert("success", "Değer Başarıyla Eklendi");
    }


    //Storage ekleme

    e.preventDefault();
}

function addTodoToUI(newTodo) {
    // <li class="list-group-item d-flex justify-content-between align-items-center">Todo 1 <a
    // href="#"><i class="fa-solid fa-x"></i></a></li>

    const li = document.createElement("li");
    const a = document.createElement("a");
    const i = document.createElement("i");
    li.className = ("list-group-item d-flex justify-content-between align-items-center")
    li.innerHTML = newTodo;

    a.href = "#";

    i.className = "fa-solid fa-x";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);
    input1.value = "";
}

function addTodoToStorage(newTodo) {
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos))

}

function checkTodosFromStorage(newTodos) {
    if (localStorage.getItem("todos") == null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type, message) {
    // <div class="alert alert-success" role="alert">
    //     A simple success alert—check it out!
    // </div>

    const div = document.createElement("div");
    // div.className="alert alert-"+type;
    div.className = `alert alert-${type} mt-4`; //*litirel template
    div.role = "alert";
    div.innerHTML = message;

    form.appendChild(div)

    setTimeout(function () {
        div.remove();
    }, 2000);
}

function showStorage() {
    checkTodosFromStorage();
    todos.forEach(i => {
        addTodoToUI(i);
    });
}

function removeTodoToUI(e) {
    if (e.target.className == "fa-solid fa-x") {
        //ekrandan silme
        const todo = e.target.parentElement.parentElement;
        todo.remove();
        //storageden silme
        removeTodoToStorage(todo.textContent);
        showAlert("success", "Todo Başarıyla Silindi.");
    }

}

function removeTodoToStorage(value) {
    checkTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (value === todo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeAllTodoToStorage(value) {
    checkTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (value === todo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteAllTodos(e) {
    const value = Array.from(todoList.children);

    if (value.length > 0) {
        value.forEach(i => {
            i.remove();
            removeAllTodoToStorage(i.textContent);
        });
        showAlert("success", "Tüm Todolar Başarıyla Silindi...");
    }
    else {
        showAlert("danger", "Silmek İçin En Az 1 Todo Olmalıdır");
    }
    e.preventDefault();
}

function filter(e) {
    const filterValue = e.target.value.toLowerCase().trim();
    const liToDoList = document.querySelectorAll(".list-group-item");
    if (liToDoList.length > 0) {
        liToDoList.forEach(function (todo) {
            if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
                todo.setAttribute("style","display:flex !important");
            }
            else {
                todo.setAttribute("style","display:none !important;");
            }
        });
    }
    else {
        showAlert("danger", "Filtreleme Yapmak için en az 1 todo olmalı!!!");
    }
}