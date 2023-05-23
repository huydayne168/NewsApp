"use strict";

class User {
    constructor(firstName, lastName, username, password) {
        this.data = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
        };
    }
}

User.prototype.toJson = function () {
    return JSON.stringify(this.data);
};

// get back the User:
function parseUser(userData) {
    const user = new User(
        userData.firstName,
        userData.lastName,
        userData.username,
        userData.password
    );
    return user;
}
