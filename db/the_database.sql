CREATE DATABASE the_database;
USE the_database;

CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT,
    user_type VARCHAR(20),
    user_name VARCHAR(30) UNIQUE,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    email VARCHAR(80),
    password VARCHAR(200),
    phone_number VARCHAR(20),
    PRIMARY KEY (user_id)
);
CREATE TABLE clubs (
    club_id INT NOT NULL AUTO_INCREMENT,
    club_url VARCHAR(30) UNIQUE,
    club_name VARCHAR(30),
    club_description VARCHAR(1000),
    PRIMARY KEY (club_id)
);

CREATE TABLE events (
    event_id INT NOT NULL AUTO_INCREMENT,
    event_name VARCHAR(30),
    club_id INT,
    event_description VARCHAR(1000),
    event_date DATE,
    event_time TIME,
    PRIMARY KEY (event_id),
    FOREIGN KEY (club_id) REFERENCES clubs(club_id) ON DELETE CASCADE
);
CREATE TABLE updates (
    update_id INT NOT NULL AUTO_INCREMENT,
    club_id INT,
    private_update BOOLEAN,
    update_title VARCHAR(30),
    update_description VARCHAR(1000),
    PRIMARY KEY (update_id),
    FOREIGN KEY (club_id) REFERENCES clubs(club_id) ON DELETE CASCADE
);
CREATE TABLE club_managers (
    user_id INT,
    club_id INT,
    PRIMARY KEY (user_id,club_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (club_id) REFERENCES clubs(club_id) ON DELETE CASCADE
);
CREATE TABLE event_enrolments (
    user_id INT,
    event_id INT,
    PRIMARY KEY (user_id,event_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE
);
CREATE TABLE club_enrolments (
    user_id INT,
    club_id INT,
    notify_updates BOOLEAN,
    notify_events BOOLEAN,
    PRIMARY KEY (user_id,club_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (club_id) REFERENCES clubs(club_id) ON DELETE CASCADE
);