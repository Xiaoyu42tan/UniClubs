// Dimos - GET first name

var firstnameShow = new Vue({
    el: "#firstname",
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
            firstnameShow.firstname = firstname;
        }
    };
    req.open('GET', '/users/getFirstName');
    req.send();
}

// Dimos - GET last name

var usernameShow = new Vue({
    el: "#lastname",
    data: {
        username: ""
    }
});
function getLastName() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            console.log("we back");
            let username = JSON.parse(req.responseText);
            usernameShow.username = username;
        }
    };
    req.open('GET', '/users/getFirstName');
    req.send();
}

