function postUpdate() {
    let title = document.getElementById('form2Example5').value;
    let description = document.getElementById('form2Example5').value;

    // Check if any of the required fields are empty
    if (title === '' || description === '') {
        alert('Please fill in all the required fields');
        return; // Stop further execution
    }

    let postupdate = {
        title: title,
        description: description
    };

    let req = new XMLHttpRequest();

    req.onreadystatechange = function(){
        if(req.readyState == 4 && req.status == 200){
            alert('Posted successfully');
        } else if(req.readyState == 4 && req.status == 403){
            alert('Not logged in');
        }
    };

    req.open('POST','/users/postUpdate');
    req.setRequestHeader('Content-Type','application/json');
    console.log(JSON.stringify(postupdate));
    req.send(JSON.stringify(postupdate));
}

function submitEvent() {
    let name = document.getElementById('form2Example1').value;
    let description = document.getElementById('form2Example2').value;
    let date = document.getElementById('form2Example3').value;
    let time = document.getElementById('form2Example4').value;

    // Check if any of the required fields are empty
    if (name === '' || description === '' || date === '' || time === '') {
        alert('Please fill in all the required fields');
        return; // Stop further execution
    }

    let createevent = {
        name: name,
        description: description,
        date: date,
        time: time
    };
    let req = new XMLHttpRequest();

    req.onreadystatechange = function(){
        if(req.readyState == 4 && req.status == 200){
            alert('Posted successfully');
        } else if(req.readyState == 4 && req.status == 403){
            alert('Not logged in');
        }
    };

    req.open('POST','/users/createEvent');
    req.setRequestHeader('Content-Type','application/json');
    console.log(JSON.stringify(createevent));
    req.send(JSON.stringify(createevent));
}