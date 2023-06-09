function logIn(){
    console.log("log in running");
    //console.log(document.getElementById("username").value);
    let loginData = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    let req = new XMLHttpRequest();

    req.onreadystatechange = function(){
        if(req.readyState == 4 && req.status == 200){
            alert('Successful log in');
            console.log('your details are: ' + req.responseText); // debug
            // redirect user to webpage
            // ADITYA - TAKE USER TO USER DASHBOARD AFTER LOGIN
            window.location.href = 'user.html';

        } else if(req.readyState == 4 && req.status == 401){
            alert('Unsuccessful log in');
        }
    };

    req.open('POST', '/login');
    req.setRequestHeader('Content-Type', 'application/json');
    console.log(JSON.stringify(loginData));
    req.send(JSON.stringify(loginData));
}

function signUp(){
    console.log("signup running");
    // console.log(document.getElementById("username").value);

    // XIAOYU CHANGES- added all register details to the request body
    let loginData = {
        username: document.getElementById("new-username").value,
        firstname: document.getElementById("firstname").value,
        lastname: document.getElementById("lastname").value,
        email: document.getElementById("email").value,
        password: document.getElementById("new-password").value,
        phonenumber: document.getElementById("phonenumber").value
    };

    if(document.getElementById('new-password').value !== document.getElementById('repeat-password').value){
        alert("Passwords are not equivelant");
        return;
    }
    let req = new XMLHttpRequest();

    req.onreadystatechange = function(){
        if(req.readyState == 4 && req.status == 200){
            alert('Successful sign up');
            console.log('your details are: ' + req.responseText); // debug
            console.log("ABOUT TO RUN LOG IN: " + document.getElementById("new-username").value); // debug
            let newloginData = {
                username: document.getElementById("new-username").value,
                password: document.getElementById("new-password").value
            };
            req.open('POST', '/login');
            req.setRequestHeader('Content-Type', 'application/json');
            console.log(JSON.stringify(newloginData));
            req.send(JSON.stringify(newloginData));
            window.location.href = 'user.html';
            // redirect user to webpage
        } else if(req.readyState == 4 && req.status == 401){
            alert('Unsuccessful signup');
        }
    };

    req.open('POST', '/signup');
    req.setRequestHeader('Content-Type', 'application/json');
    console.log(JSON.stringify(loginData));
    req.send(JSON.stringify(loginData));
}

function logOut(){
    console.log("log out running");

    let req = new XMLHttpRequest();

    req.onreadystatechange = function(){
        if(req.readyState == 4 && req.status == 200){
            alert('Successful logout');
            //redirect user to webpage
        } else if(req.readyState == 4 && req.status == 401){
            alert('Unsuccessful logout');
        }
    };

    req.open('POST', '/logout');
    req.send();
}

function google_login(response){
    //console.log(response);
    console.log("google log in running");

    let req = new XMLHttpRequest();

    req.onreadystatechange = function(){
        if(req.readyState == 4 && req.status == 200){
            alert('Successful google log in');
            //redirect user to webpage
            window.location.href = 'user.html';
        } else if(req.readyState == 4 && req.status == 401){
            alert('Unsuccessful google log in');
        }
    };

    req.open('POST', '/login');
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(response));
}

