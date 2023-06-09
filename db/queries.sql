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
    club_name,
    club_description
) VALUES (
    'CLUB111',
    'epic club number 1'
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