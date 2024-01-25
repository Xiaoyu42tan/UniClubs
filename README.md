# Our University Club Website!

-------------------------------------------------------HOW TO USE----------------------------------------------

When running our webapp, there are a few steps you must take in the terminal to ensure that it works as desired:

npm install

npm install google-auth-library

npm install express-server

npm install argon2

service mysql start

mysql < db/the_database.sql

mysql --database the_database < db/queries.sql

npm start

------------------------------------ SOME GENERAL LOG IN'S ---------------------------------------------------

                                        DETAILS FOR BASE USER
                                    User name: Bob Password: .Foo

There is a user you can log in as with general user permissions.

As a user, you can: Register to be apart of clubs, RSVP to events, and modify your user information


                                DETAILS FOR ARCHERY CLUB (CLUB 1) CLUB MANAGER
                                    User name: Archer Password: bow&arrow1

This is a club manager for the Archery Club so you can try out the club manager features

As a club manager, you can: create events for the club you are manager of, delete events, create updates, delete updates, remove memebers from events they are rsvp'd to, upgrade a member into a club manager for their club and remove members from the club.



                                        DETAILS FOR SYSTEM ADMIN
                                    User name: Sys Password: Admin123

There is a System Admin, to try system admin features

These features are: manage site users by removing or promoting to admin or club manager (through club page), and then the same functionality as the club managers too.

