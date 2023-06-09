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
    'Archer',
    'Archie',
    'Bowie',
    'archer@gmail.com',
    '$argon2id$v=19$m=65536,t=3,p=4$pf192aTpW41fiLyWnrqGzg$2aCwH9JRvEbPHtGcJxc4/r41qJ2/cMPCCV5WloiT1ps',
    '04987654321'
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