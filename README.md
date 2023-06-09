# Group Repository for COMP SCI 2207/7207 Web & Database Computing Web Application Project (2023 Semester 1)

Your group's shared repository for the WDC 2023 Web App Project.

Auto commit/push/sync to Github is disabled by default in this repository.
- Enable the GitDoc extension to use this fucntionality (either in your VSCode settings, or in the Dev Container settings)

See [HERE](https://myuni.adelaide.edu.au/courses/85266/pages/2023-web-application-group-project-specification) for the project specification.

We recommend using the 'Shared Repository Model (Branch & Pull)' to collaborate on your work in this single repostory.
- You can read more about collaborating on GitHub repositories [HERE](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests)
- When working on the same file at the same time, the 'Live Share' feature in VSCode can also help.

-------------------------------------------------------HOW TO USE----------------------------------------------

When running our webapp, there are a few steps you must take in the terminal to enusre that it works as desired:

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

There is a user you can log in as with general user permissions with Details: User name: Bob Password: .Foo

                                    DETAILS FOR ARCHERY CLUB (CLUB 1) CLUB MANAGER
                                        User name: Archer Password: bow&arrow1

There is a club manager for the archery club so you can try out the club manager features, such as creating events for the club they are manager of, creating updates, delete updates, delete events, remove memebers from events they are rsvp'd to, upgrade a member into a club manager for their club and remove members from the club.

                                        DETAILS FOR SYSTEM ADMIN
                                    User name: Sys Password: Admin123

There is a System Admin, to try system admin features such as: manage site users by removing or promoting to admin or club manager (through club page), post and delete updates, create updates and delete events, they can also see member attending events and choose to remove them, and remove members from the clubs.

EXPLAINING EACH MAIN FEATURE BREIFLY

