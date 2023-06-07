const nav = new Vue ({
    el: "#nav",
    data: {
        top_menu: [
            { title: 'Home', url: '/index.html' },
            { title: 'Clubs', url: '/club.html' },
            { title: 'Account', url: '/user.html' },
            { title: 'Login', url: '/login.html' }
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
        clubs: [
            { name: 'Club 1', url: '/club1.html' },
            { name: 'Club 2', url: '/club2.html' }
        ]
    },
    computed: {
        filteredClubs() {
            return this.clubs.filter(club => club.name.toLowerCase().includes(this.search.toLowerCase()));
        }
    }
});

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

// show/hide table
function revealElement() {
    var x = document.getElementById("users-table");
    if (x.style.display == "none"){
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
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