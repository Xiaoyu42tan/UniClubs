-- Password: .Foo
Insert INTO users(
    user_type,
    user_name,
    first_name,
    last_name,
    email,
    password,
    phone_number
) VALUES(
    'user',
    'Bob',
    'Bob',
    'Foo',
    'bobby@outlook.com',
    '$argon2id$v=19$m=65536,t=3,p=4$dY3Pr3MWtlGAOfvUPrIKlQ$ACLQNf66uQm0eG4YJrBKTHcqdfKSQrLQ+GaywIhN2is',
    '04123456789'
);

-- Password: bow&arrow1
Insert INTO users(
    user_type,
    user_name,
    first_name,
    last_name,
    email,
    password,
    phone_number
) VALUES(
    'user',
    'Archer',
    'Archie',
    'Bowie',
    'archer@gmail.com',
    '$argon2id$v=19$m=65536,t=3,p=4$pf192aTpW41fiLyWnrqGzg$2aCwH9JRvEbPHtGcJxc4/r41qJ2/cMPCCV5WloiT1ps',
    '04987654321'
);

-- Password: Admin123
Insert INTO users(
    user_type,
    user_name,
    first_name,
    last_name,
    email,
    password,
    phone_number
) VALUES(
    'admin',
    'Sys',
    'Sysi',
    'admino',
    'systemad@hotmail.com',
    '$argon2id$v=19$m=65536,t=3,p=4$D5yog416Q0ij0sh9DWgeCA$3G+yjrZChWNvDCJbzUP1+C3MfX3djDoyI9yxDLIHPSw',
    '04987654321'
);

Insert INTO clubs(
    club_url,
    club_name,
    club_description
) VALUES (
    'club1.html',
    'Archery Club',
    'The Archery Club is for all those passionate about the old bow and arrow!
    We accept those of all skill levels, regardless of culture or background!
    Register to join our club so you can RSVP to events!'
);

Insert INTO clubs(
    club_url,
    club_name,
    club_description
) VALUES (
    'club2.html',
    'Computer Science Club',
    'A club dedicated to Computer Science!
    We talk all things comp sci, we do workshops, competitive programming, games nights and more!
    You dont even have to be a comp sci student to join!
    Press register to club to be able to RSVP for events!'
);

Insert INTO clubs(
    club_url,
    club_name,
    club_description
) VALUES (
    'club3.html',
    'Tech Innovators Club',
    'Explore technologys frontiers and collaborate on coding, robotics, AI, and VR projects. Unleash your inner innovator and shape the future of tech!'
);

Insert INTO clubs(
    club_url,
    club_name,
    club_description
) VALUES (
    'club4.html',
    'Outdoor Adventure Society',
    'Embrace natures beauty with hiking, camping, and rock climbing. Join fellow adventurers for thrilling outdoor experiences and unforgettable memories!'
);

Insert INTO clubs(
    club_url,
    club_name,
    club_description
) VALUES (
    'club5.html',
    'Artistic Expressions Society',
    'Celebrate art in all its forms! Join artists of all levels for workshops, exhibitions, open mic nights, and collaborative projects. Unleash your imagination!'
);

Insert INTO clubs(
    club_url,
    club_name,
    club_description
) VALUES (
    'club6.html',
    'Sustainable Living Coalition',
    'Promote eco-consciousness through educational initiatives, workshops, and projects. Be a steward of the planet and contribute to a greener future!'
);

Insert INTO clubs(
    club_url,
    club_name,
    club_description
) VALUES (
    'club7.html',
    'Language Club',
    'Embrace diversity, learn languages, and immerse in different cultures. Join us for language workshops, cultural events, and international film screenings.'
);

Insert INTO clubs(
    club_url,
    club_name,
    club_description
) VALUES (
    'club8.html',
    'Health and Wellness Society',
    'Prioritize holistic well-being through fitness challenges, mindfulness sessions, nutrition workshops, and mental health awareness campaigns.'
);

Insert INTO clubs(
    club_url,
    club_name,
    club_description
) VALUES (
    'club9.html',
    'Music Appreciation Club',
    'Celebrate the power of music! Jam sessions, open mics, and music trivia nights. Join us to discover new sounds and connect through melodies!'
);

Insert INTO clubs(
    club_url,
    club_name,
    club_description
) VALUES (
    'club10.html',
    'Social Impact Collective',
    'Drive positive change! Volunteer, fundraise, and advocate for social issues. Empower marginalized communities and make a lasting impact.'
);

Insert INTO club_managers(
    user_id,
    club_id
) VALUES (
    2,
    1
);