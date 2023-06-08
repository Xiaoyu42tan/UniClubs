function postUpdate() {
    let title = document.getElementById('form2Example5').value;
    let description = document.getElementById('form2Example6').value;

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

// UPDATE EVENTS

var updateEventData = new Vue({
    el: "#updateEvent",
    data: {
        events: [],
        selectedEvent: null,
        eventId: null,
        clubId: null
    },
    methods: {
        updateSelectedEvent() {
            if (this.selectedEvent) {
                this.eventId = this.selectedEvent.event_id;
                this.clubId = this.selectedEvent.club_id;
                console.log("Selected Event ID:", this.eventId);
                console.log("Selected Club ID:", this.clubId);
            }
        },

        updateEvent() {
            let name = document.getElementById('form2Example7').value;
            let description = document.getElementById('form2Example8').value;
            let date = document.getElementById('form2Example9').value;
            let time = document.getElementById('form2Example10').value;

            // Check if any of the required fields are empty
            if (name === '' || description === '' || date === '' || time === '') {
                alert('Please fill in all the required fields');
                return; // Stop further execution
            }

            let updateevent = {
                event_id: this.eventId,
                name: name,
                club_id: this.clubId,
                description: description,
                date: date,
                time: time
            };
            let req = new XMLHttpRequest();

            req.onreadystatechange = function(){
                if(req.readyState == 4 && req.status == 200){
                    alert('Updated successfully');
                } else if(req.readyState == 4 && req.status == 403){
                    alert('Not logged in');
                }
            };

            req.open('POST','/users/updateEvent');
            req.setRequestHeader('Content-Type','application/json');
            console.log(JSON.stringify(updateevent));
            req.send(JSON.stringify(updateevent));
        }
    }
});

// EVENT RSVP

var eventRSVP = new Vue ({
    el: "#rsvp",
    data: {
        events: [],
        selectedEvent: null,
        eventId: null,
        clubId: null
    },
    methods: {
        updateSelectedEvent() {
            if (this.selectedEvent) {
                this.eventId = this.selectedEvent.event_id;
                this.clubId = this.selectedEvent.club_id;
                console.log("Selected Event ID:", this.eventId);
                console.log("Selected Club ID:", this.clubId);
            }
        },

        joinEvent() {
            if (this.selectedEvent == null ) {
                alert('Please select an event');
                return;
            }

            let selectedevent = {
                event_id: this.eventId,
                club_id: this.clubId
            };

            // ajax request
            let req = new XMLHttpRequest();

            req.onreadystatechange = function () {

                // if logged in, then add user to the club
                if (req.readyState === 4 && req.status === 200) {
                    alert("RSVP Success!");
                } else if (req.readyState === 4 && req.status === 401) {
                    alert("Not logged in!");
                } else if (req.readyState === 4 && req.status === 403) {
                    alert("Not a member of club!");
                } else if (req.readyState === 4 && req.status === 409) {
                    alert("Already enrolled!");
                } else if (req.readyState === 4 && req.status === 500) {
                    alert("Serverside Error!");
                }
            };

            req.open('POST', '/users/joinEvent');
            req.setRequestHeader('Content-Type', 'application/json');
            req.send(JSON.stringify(selectedevent));
        },

        leaveEvent() {
            if (this.selectedEvent == null ) {
                alert('Please select an event');
                return;
            }

            let selectedevent = {
                event_id: this.eventId,
                club_id: this.clubId
            };

            // ajax request
            let req = new XMLHttpRequest();

            req.onreadystatechange = function () {

                // if logged in, then add user to the club
                if (req.readyState === 4 && req.status === 200) {
                    alert("RSVP Cancel!");
                } else if (req.readyState === 4 && req.status === 401) {
                    alert("Not logged in!");
                } else if (req.readyState === 4 && req.status === 403) {
                    alert("Not a member of club!");
                } else if (req.readyState === 4 && req.status === 409) {
                    alert("Not Enrolled!");
                } else if (req.readyState === 4 && req.status === 500) {
                    alert("Serverside Error!");
                }
            };

            req.open('POST', '/users/leaveEvent');
            req.setRequestHeader('Content-Type', 'application/json');
            req.send(JSON.stringify(selectedevent));
        }
    }
});

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
        updateEventData.events = events;
        eventRSVP.events = events;
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