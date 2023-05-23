"use strict";

//////////////////////////////////
//////// Declare variables:
const todoInput = document.querySelector(".todo-input input");
const addBtn = document.querySelector(".todo-input button");
const todoListWrapper = document.querySelector(".todo-list__wrapper");

const currentUserData = parseUser(
    JSON.parse(localStorage.getItem("currentUser"))
).data;

const todoArr = getData("todoList") ?? [];
// const currentUserTodoArr = todoArr.filter(
//     (item) => item.owner === currentUserData.username
// );
//////////////////////////////////
//////// Functions:

// Render todo items:
function renderTodoItems() {
    todoListWrapper.innerHTML = "";
    todoArr.forEach((item, index) => {
        if (item.owner === currentUserData.username) {
            todoListWrapper.insertAdjacentHTML(
                "beforeend",
                `<div class="todo-items ${
                    item.isDone ? "done" : ""
                }" data-index= ${index}>
                    <i class="fa-solid fa-circle-check"></i>
                    <p>${item.task}</p>
                    <i class="fa-solid fa-trash"></i>
                </div>`
            );
        }
    });
}
renderTodoItems();

// tick done for todo items
// function updateTodoList(todoItem) {
//     todoArr.forEach((item) => {
//         if(item.)
//     });
// }

// User interact with todo items:
const todoItems = document.querySelectorAll(".todo-list__wrapper .todo-items");
// todoItems.forEach((item) => {
todoListWrapper.addEventListener("click", (e) => {
    // if (e.target.classList.contains("todo-items")) {
    //     const thisItemIndex = Number(e.target.dataset.index);
    // }
    // User click done btn:
    const thisItemIndex = Number(e.target.closest(".todo-items").dataset.index);
    if (
        e.target.classList.contains("fa-circle-check") &&
        !e.target.closest(".todo-items").classList.contains("done")
    ) {
        e.target.closest(".todo-items").classList.add("done");
        todoArr[thisItemIndex].isDone = true;
        storeData("todoList", todoArr);
    } else if (
        e.target.classList.contains("fa-circle-check") &&
        e.target.closest(".todo-items").classList.contains("done")
    ) {
        e.target.closest(".todo-items").classList.remove("done");
        todoArr[thisItemIndex].isDone = false;
        storeData("todoList", todoArr);
    }

    // User click delete btn
    if (e.target.classList.contains("fa-trash")) {
        todoArr.splice(thisItemIndex, 1);
        console.log(thisItemIndex);
        storeData("todoList", todoArr);
        renderTodoItems();
    }
});
// });

// When user click addBtn:
addBtn.addEventListener("click", (e) => {
    if (todoInput.value === "") return;
    e.preventDefault();
    const newTask = new Task(todoInput.value, currentUserData.username, false);
    console.log(newTask);
    todoArr.push(newTask);
    console.log(todoArr);
    storeData("todoList", todoArr);
    renderTodoItems();
    todoInput.value = "";
});
