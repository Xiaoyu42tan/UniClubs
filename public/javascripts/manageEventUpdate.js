function postUpdate() {
    let title = document.getElementById('form2Example5').value;
    let description = document.getElementById('form2Example5').value;

    let clubIdInput = document.getElementById("club-id");
    let club_id = clubIdInput.value;

    // Check if any of the required fields are empty
    if (title === '' || description === '') {
        alert('Please fill in all the required fields');
        return; // Stop further execution
    }

    let postupdate = {
        club_id: club_id,
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

    let clubIdInput = document.getElementById("club-id");
    let club_id = clubIdInput.value;

    // Check if any of the required fields are empty
    if (name === '' || description === '' || date === '' || time === '') {
        alert('Please fill in all the required fields');
        return; // Stop further execution
    }

    let createevent = {
        name: name,
        club_id: club_id,
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

// KIAN - GET UPDATES

var updatesData = new Vue({
    el: "#updates",
    data: {
        updates: []
    }
});

function getUpdates() {

    let clubIdInput = document.getElementById("club-id");
    let club_id = clubIdInput.value;

    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
        let updates = JSON.parse(req.responseText);
        updatesData.updates = updates;
        }
    };
    req.open('GET', `/users/getUpdates?club_id=${club_id}`);
    req.send();
}

// KIAN - GET EVENTS

var eventsData = new Vue({
    el: "#events",
    data: {
        events: []
    }
});

function getEvents() {

    let clubIdInput = document.getElementById("club-id");
    let club_id = clubIdInput.value;

    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
        let events = JSON.parse(req.responseText);
        eventsData.events = events;
        }
    };
    req.open('GET', `/users/getEvents?club_id=${club_id}`);
    req.send();
}

// ADITYA - ADDED FUNCTIONALITY TO OBTAIN USER TYPE (ADMIN, CLUB MANAGER, GENERAL USER)

function getUserRole() {
  const userIdInput = document.getElementById('user_type');

  const userId = userTypeInput.value;

  fetch(`/api/checkUserRole?user_id=${userType}`)
    .then(response => response.json())
    .then(data => {
      const userRole = data.role;
      // Perform actions based on user role
      if (userRole === 'club-manager') {
        // Show elements specific to club managers
        showClubManagerElements();
      } else {
        // Hide club manager specific elements
        hideNonClubManagerElements();
      }
    })
    // error message incase something messes up
    .catch(error => {
      console.error('Error:', error);
    });
}

function showClubManagerElements() {
  // Show the desired elements specific to club managers
  const createEventDiv = document.getElementById('createEvent');
  createEventDiv.style.display = 'block';

  const postUpdateDiv = document.getElementById('postUpdate');
  postUpdateDiv.style.display = 'block';
}

function hideNonClubManagerElements() {
  // Hide or disable elements not applicable to club managers
  const createEventDiv = document.getElementById('createEvent');
  createEventDiv.style.display = 'none';

  const postUpdateDiv = document.getElementById('postUpdate');
  postUpdateDiv.style.display = 'none';
}

// function getUserRole called automatically when the page is loaded
window.addEventListener('DOMContentLoaded', getUserRole);