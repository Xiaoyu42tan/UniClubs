const nav = new Vue ({
    el: "#nav",
    data: {
        top_menu: [
            { title: 'Home', url: '/index.html' },
            { title: 'Clubs', url: '/club.html' },
            { title: 'Help', url: '#' },
            { title: 'Login', url: '#' }
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
            { name: 'Club 2', url: '/club2.html' },
            { name: 'Club 3', url: '/club3.html' },
            { name: 'Club 4', url: '/club4.html' },
            { name: 'Club 5', url: '/club5.html' },
            { name: 'Club 6', url: '/club6.html' },
            { name: 'Club 7', url: '/club7.html' },
            { name: 'Club 8', url: '/club8.html' },
            { name: 'Club 9', url: '/club9.html' },
            { name: 'Club 10', url: '/club10.html' }
        ]
    },
    computed: {
        filteredClubs() {
            return this.clubs.filter(club => club.name.toLowerCase().includes(this.search.toLowerCase()));
        }
    }
});

const clubEvens = new Vue ({
    el: "#upcoming-club-events",
    data: {
        events: [
            { content: 'This div will include all the upcoming events' },
            { content: 'By using vue.js content can be updated in the javascript file to update content seen on client screen' }
        ]
    }
});