"use strict";

// store to local storage:
function storeData(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
}

// get data:
function getData(name) {
    return JSON.parse(localStorage.getItem(name));
}

// delete from local storage:
function deleteData(name) {
    localStorage.removeItem(name);
}
