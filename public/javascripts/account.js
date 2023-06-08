
// Dimos - GET first name
var firstnameShow1 = new Vue({
    el: "#firstname1",
    data: {
        firstname: ""
    }
});

var firstnameShow2 = new Vue({
    el: "#firstname2",
    data: {
        firstname: ""
    }
});

function getFirstName() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            console.log("we back");
            console.log(JSON.parse(req.responseText));
            let firstname = JSON.parse(req.responseText);
            firstnameShow1.firstname = firstname;
            firstnameShow2.firstname = firstname;
        }
    };
    req.open('GET', '/users/getFirstName');
    req.send();
}

// Dimos - GET last name
var lastnameShow = new Vue({
    el: "#lastname",
    data: {
        lastname: ""
    }
});

function getLastName() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            console.log("we back");
            console.log(JSON.parse(req.responseText));
            let lastname = JSON.parse(req.responseText);
            lastnameShow.lastname = lastname;
        }
    };
    req.open('GET', '/users/getLastName');
    req.send();
}
// Dimos - GET last name
var userNameShow = new Vue({
    el: "#username",
    data: {
        username: ""
    }
});
function getUserName() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            console.log("we back");
            console.log(JSON.parse(req.responseText));
            let username = JSON.parse(req.responseText);
            userNameShow.username = username;
        }
    };
    req.open('GET', '/users/getUserName');
    req.send();
}

// Dimos - GET last name
var emailShow = new Vue({
    el: "#email",
    data: {
        email: ""
    }
});

function getEmail() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            console.log("we back");
            console.log(JSON.parse(req.responseText));
            let email = JSON.parse(req.responseText);
            emailShow.email = email;
        }
    };
    req.open('GET', '/users/getEmail');
    req.send();
}

/*function getBirthday() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            console.log("we back");
            console.log(JSON.parse(req.responseText));
            let lastname = JSON.parse(req.responseText);
            lastnameShow.lastname = lastname;
        }
    };
    req.open('GET', '/users/getLastName');
    req.send();
}*/

function displayInfo(){
    getUserName();
    getFirstName();
    getLastName();
    getEmail();
}

function changeInfoBoxAppear(){
    console.log('this will do stuff');
}
