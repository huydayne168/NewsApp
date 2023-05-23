"use strict";

//////////////////////////////////
//////// Declare variables:
const settingNav = document.querySelector(".navigation .setting-nav");
const newsPerPageInput = document.querySelector("#news-per-page");
const categoryInput = document.querySelector("#category");
const saveSettingBtn = document.querySelector(".setting-form button");

const currentUser = parseUser(JSON.parse(localStorage.getItem("currentUser")));
const currentUserData = getData("currentUser");

//////////////////////////////////
//////// Functions:
// active setting navigator:
settingNav.classList.add("active");

// update setting inputs:
newsPerPageInput.value = currentUserData.newsPerPage ?? 5;
categoryInput.value = currentUserData.category ?? "";

// When user click save setting btn:
saveSettingBtn.addEventListener("click", function (e) {
    e.preventDefault();
    currentUserData.newsPerPage = newsPerPageInput.value;
    currentUserData.category = categoryInput.value;
    console.log(currentUserData);
    storeData("currentUser", currentUserData);
});

// update currentUser to localStorage:
