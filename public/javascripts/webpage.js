const nav = new Vue ({
    el: "#nav",
    data: {
        top_menu: [
            { title: 'Home', url: '/index.html' },
            { title: 'Clubs', url: '/club.html' }
        ]
    }
});

const events = new Vue ({
    el: "#upcoming-events",
    data: {
        events: [
            { content: 'This div will include all the upcoming events' },
            { content: 'By using vue.js content can be updated in the javascript file to update content seen on client screen' }
        ]
    }
});

const updates = new Vue ({
    el: "#recent-updates",
    data: {
        updates: [
            { content: 'This div will include all the recent updates' },
            { content: 'By using vue.js content can be updated in the javascript file to update content seen on client screen', }
        ]
    }
});

// Search Query
const search = new Vue ({
    el: "#club-search",
    data: {
        search: "",
        clubs: []
    },
    computed: {
        filteredClubs() {
            return this.clubs.filter(club => club.club_name.toLowerCase().includes(this.search.toLowerCase()));
        }
    }
});

// XIAOYU - FRIDAY FIRST PUSH
const clubPageName = new Vue ({
    el: "#club-title",
    data: {
        clubName: ""
    }
});

const clubPageDesc = new Vue ({
    el: "#description",
    data: {
        clubDesc: ""
    }
});

// XIAOYU - FRIDAY FIRST PUSH
function loadClubsInfo() {
    let req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            // load clubs into vue
            search.clubs = JSON.parse(req.responseText);
        } else if (req.readyState === 4 && req.status === 500) {
            // serverside error
            alert("serverside error!");
        }
    };

    req.open('GET', '/getClubs');
    req.send();
}

// XIAOYU - FRIDAY FIRST PUSH
function loadClubPageInfo() {
    let req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            // load clubs into vue

            let clubInfo = JSON.parse(req.responseText);
            clubPageName.clubName = clubInfo.club_name;
            clubPageDesc.clubDesc = clubInfo.club_description;
        } else if (req.readyState === 4 && req.status === 500) {
            // serverside error
            alert("serverside error!");
        }
    };

    req.open('GET', `/getClubPage?club_id=${document.getElementById("club-id").value}`);
    req.send();
}

// Application Seach Query
const appsearch = new Vue ({
    el: "#club-app-search",
    data: {
        search: "",
        clubsapp: [
            { name: 'Example Application 1', url: '/clubapplication1.html' }
        ]
    },
    computed: {
        filteredClubsApps() {
            return this.clubsapp.filter(clubs => clubs.name.toLowerCase().includes(this.search.toLowerCase()));
        }
    }
});

// XIAOYU THURSDAY MORNING
function logout() {
    let req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 401) {
            alert("Not logged in!");
        }
    };

    req.open('GET', '/logout');
    req.send();
}

// XIAOYU - THURSDAY MORNING
function checkIfLoggedIn() {
    let req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            // Logged in
            nav.top_menu = [
                { title: 'Home', url: '/index.html' },
                { title: 'Clubs', url: '/club.html' },
                { title: 'Account', url: '/user.html' },
                { title: 'Log Out', url: '/index.html', onClick: logout() }
            ];

            // hide the quick login for index.html
            let quick_login = document.getElementById("outer-form");
            if (quick_login !== null) {
                quick_login.style.display = "none";
            }

            // show the RSVP to event div for club1.html
            let RSVPdiv = document.getElementById("rsvp");
            if (RSVPdiv !== null) {
                RSVPdiv.style.display = "block";
            }

        } else if (req.readyState === 4 && req.status === 401) {
            // Not logged in
            nav.top_menu = [
                { title: 'Home', url: '/index.html' },
                { title: 'Clubs', url: '/club.html' },
                { title: 'Login', url: '/login.html' }
            ];

            // show the quick login for index.html
            let quick_login = document.getElementById("outer-form");
            if (quick_login !== null) {
                quick_login.style.display = "flex";
            }

            // hide the RSVP to event div for club1.html
            let RSVPdiv = document.getElementById("rsvp");
            if (RSVPdiv !== null) {
                RSVPdiv.style.display = "none";
            }
        }
    };

    req.open('GET', '/users/getUser');
    req.send();
}

// show/hide table
function revealElement() {
    var x = document.getElementById("users-table");
    if (x.style.display == "none"){
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

// XIAOYU WEDNESDAY NIGHT  - ENROL INTO CLUB
function enrolClub() {

    let clubInfo = { club_id: document.getElementById("club-id").value };

    // ajax request
    let req = new XMLHttpRequest();

    req.onreadystatechange = function () {

        // if logged in, then add user to the club
        if (req.readyState === 4 && req.status === 200) {
            alert("Success!");
        } else if (req.readyState === 4 && req.status === 401) {
            alert("Not logged in!");
        } else if (req.readyState === 4 && req.status === 409) {
            alert("Already enrolled!");
        } else if (req.readyState === 4 && req.status === 500) {
            alert("Oops serverside error!");
        }

    };

    req.open('POST', '/enrolClub');
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(clubInfo));
}

const clubEvents = new Vue ({
    el: "#upcoming-club-events",
    data: {
        events: [
            { content: 'This div will include all the upcoming events' },
            { content: 'By using vue.js content can be updated in the javascript file to update content seen on client screen' }
        ]
    }
});