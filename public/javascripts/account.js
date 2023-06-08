
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

function changeDetails(){
    console.log("changeDetails() running");
    // console.log(document.getElementById("username").value);

    let changeUserData = {
        username: document.getElementById("new_username").value,
        firstname: document.getElementById("new_firstname").value,
        lastname: document.getElementById("new_lastname").value,
        email: document.getElementById("new_email").value,
        password: document.getElementById("new_password").value
    };

    if(document.getElementById('new_password').value !== document.getElementById('new_password_repeated').value){
        alert("Passwords are not equivelant");
        return;
    }
    let req = new XMLHttpRequest();

    req.onreadystatechange = function(){
        if(req.readyState == 4 && req.status == 200){
            alert('Changes succesful');
            console.log('your details are: ' + req.responseText); // debug
            location.reload();
            // redirect user to webpage
        } else if(req.readyState == 4 && req.status == 401){
            alert('Changes unsuccessful');
        }
    };

    req.open('POST', '/changeDetails');
    req.setRequestHeader('Content-Type', 'application/json');
    console.log(JSON.stringify(changeUserData));
    req.send(JSON.stringify(changeUserData));
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

function showChangeInfoPopup(){
    let overlay = document.getElementById("overlay");
    let changes_popup = document.getElementById("edit-user-info-pop-up");
    changes_popup.style.display = 'block';
    overlay.style.display = 'block';
}

function hideChangeInfoPopup(){
    let overlay = document.getElementById("overlay");
    let changes_popup = document.getElementById("edit-user-info-pop-up");
    changes_popup.style.display = 'none';
    overlay.style.display = 'none';
}
