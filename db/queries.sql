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
    'user1',
    'Didier',
    'Drogba',
    'thegoat@gmail.com',
    'user1',
    '01230somethingidk'
);

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
    'user2',
    'Christian',
    'Ronaldo',
    'christian@gmail.com',
    'user2',
    '01230somethingidk'
);

Insert INTO users(
    user_type,
    user_name,
    first_name,
    last_name,
    email,
    password,
    phone_number
) VALUES(
    'club_manager',
    'manager1',
    'the',
    'manager',
    'clubmanager@gmail.com',
    '1234',
    '01230somethingidk'
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

Insert INTO club_managers(
    user_id,
    club_id
) VALUES (
    2,
    1
);

/*
SELECT event_enrolments.user_id, users.user_name, users.first_name, users.last_name FROM event_enrolments INNER JOIN users
WHERE users.user_id = event_enrolments.user_id
AND event_id = ?;
*/