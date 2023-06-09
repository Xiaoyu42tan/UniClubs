// Dimos - GET user type
var usertypeShow = new Vue({
    el: "#usertype",
    data: {
        usertype: ""
    }
});

function getUserType() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            console.log("we back");
            console.log(JSON.parse(req.responseText));
            let usertype = JSON.parse(req.responseText);
            usertypeShow.usertype = usertype;
            console.log(usertype);
            console.log(usertypeShow.usertype);
        }
    };
    req.open('GET', '/users/getUserType');
    req.send();
}
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
            alert('Changes succesful: You will now be logged out');
            console.log('your details are: ' + req.responseText); // debug
            window.location.href = 'login.html';
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
    getUserType();
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

// ADITYA - added functionality to remove users from the website (modfified from Kian)
// ** only available to site admins
var clubMembers = new Vue({
  el: "#clubMembers",
  data: {
    users: [],
    selectedUser: null,
    userId: null,
  },
  methods: {
    updateSelectedUser() {
      if (this.selectedUser) {
        this.userId = this.selectedUser.user_id;
        console.log("Selected User ID:", this.userId);
      }
    },

    removeClubMembers() {
        if (this.userId === null) {
          alert('Please select a user');
          return; // Stop further execution
        }

        let removeMember = {
          user_id: this.userId,
        };

        fetch('/admin/removeUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(removeMember),
        })
        .then(response => {
          if (response.ok) {
            alert('User removed successfully');
          } else if (response.status === 401) {
            alert('Not logged in');
          } else if (response.status === 403) {
            alert('Not authorized');
          } else if (response.status === 500) {
            alert('Server-side error');
          }
        })
        .catch(error => {
          console.error('Error:', error.message);
        });
      },
    },
  });
  var siteUsers = new Vue({
    el: "#siteUsers",
    data: {
        users: [],
        selectedUser: null,
        userId: null,
    },
    methods: {
        updateSelectedUser() {
            if (this.selectedUser) {
                this.userId = this.selectedUser.user_id;
                console.log("Selected User ID:", this.userId);
            }
        },

        removeSiteUser() {
            if (this.userId === null) {
                alert('Please fill in all the required fields');
                return; // Stop further execution
            }

            let removesiteuser = {
                user_id: this.userId
            };

            let req = new XMLHttpRequest();

            req.onreadystatechange = function(){
                if(req.readyState === 4 && req.status === 200){
                    alert('Deleted successfully');
                } else if(req.readyState === 4 && req.status === 401){
                    alert('Not logged in');
                } else if(req.readyState === 4 && req.status === 403){
                    alert('Not authorised');
                } else if(req.readyState === 4 && req.status === 500){
                    alert('serverside error');
                }
            };

            req.open('POST','/users/removeSiteUser');
            req.setRequestHeader('Content-Type','application/json');
            req.send(JSON.stringify(removesiteuser));
        },

        promoteUser() {
            if (this.userId === null) {
                alert('Please fill in all the required fields');
                return; // Stop further execution
            }

            let promoteuser = {
                user_id: this.userId
            };

            let req = new XMLHttpRequest();

            req.onreadystatechange = function(){
                if(req.readyState === 4 && req.status === 200){
                    alert('Promoted successfully');
                } else if(req.readyState === 4 && req.status === 401){
                    alert('Not logged in');
                } else if(req.readyState === 4 && req.status === 403){
                    alert('Not authorised');
                } else if(req.readyState === 4 && req.status === 409) {
                    alert('User already admin');
                } else if(req.readyState === 4 && req.status === 500){
                    alert('serverside error');
                }
            };

            req.open('POST','/users/promoteUser');
            req.setRequestHeader('Content-Type','application/json');
            req.send(JSON.stringify(promoteuser));
        }
    }
});

function getSiteUsers() {
    let req = new XMLHttpRequest();

    req.onreadystatechange = function(){
        if(req.readyState === 4 && req.status === 200){
            let users = JSON.parse(req.responseText);
            siteUsers.users = users;
        }
    };

    req.open('GET',`/users/getSiteUsers`);
    req.send();
}

  function showClubManagerElements() {
    // Show the desired elements specific to club managers
    const postUpdateDiv = document.getElementById('postUpdate');
    postUpdateDiv.style.display = 'block';

    const deleteUpdateDiv = document.getElementById('deleteUpdate');
    deleteUpdateDiv.style.display = 'block';

    const createEventDiv = document.getElementById('createEvent');
    createEventDiv.style.display = 'block';

    const updateEventDiv = document.getElementById('updateEvent');
    updateEventDiv.style.display = 'block';

    const deleteEventDiv = document.getElementById('deleteEvent');
    deleteEventDiv.style.display = 'block';

    const membersAttendingDiv = document.getElementById('membersAttending');
    membersAttendingDiv.style.display = 'block';

    const clubMembersDiv = document.getElementById('clubMembers');
    clubMembersDiv.style.display = 'block';

}

function showAdminElements() {
    // Hide or disable elements not applicable to club managers
    const siteUsersDiv = document.getElementById('siteUsers');
    siteUsersDiv.style.display = 'block';
}

function hideAdminElements() {
    // Hide or disable elements not applicable to club managers
    const siteUsersDiv = document.getElementById('siteUsers');
    siteUsersDiv.style.display = 'none';
}
function checkifAdmin() {

    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            showAdminElements();
        } else if (req.readyState === 4 && req.status === 403) {
            hideAdminElements();
        } else if (req.readyState === 4 && req.status === 500) {
            alert("serverside error");
        }
    };

    req.open('POST','/checkIfAdmin');
    req.setRequestHeader('Content-Type', 'application/json');
    req.send();
}
// end ADITYA update - please verify this work with the added div on user.html