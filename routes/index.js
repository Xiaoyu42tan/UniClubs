var express = require('express');
var router = express.Router();

const CLIENT_ID = '521244062266-prh5adjbtjmgk7vga4g1t8j515u0kt9l.apps.googleusercontent.com';
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

const argon2 = require('argon2');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* store users page. */
let users = {
  user1: {password: 'password'},
  user2: {password: 'password2'}
};

// XIAOYU FRIDAY FIRST PUSH
router.get('/getClubs', function(req,res,next) {

  req.pool.getConnection(function(err, connection){
    if(err){
      console.log("err");
      console.log(err);
      res.sendStatus(500);
      return;
    }
    let query = `SELECT club_name, club_url FROM clubs;`;
    connection.query(query, function(qerr, rows, fields) {
      connection.release();
      // if serverside error
      if(qerr){
        console.log("qerr:");
        console.log(qerr);
        res.sendStatus(500);
        return;
      }

      console.log(JSON.stringify(rows));

      // send back club name, club url
      res.json(rows);
    }
    );
  });

});

// XIAOYU - FRIDAY FIRST PUSH
router.get('/getClubPage', function(req, res, next){

  req.pool.getConnection(function(err3, connection3){
    if(err3){
      console.log("err");
      console.log(err3);
      res.sendStatus(500);
      return;
    }
    let query3 = `SELECT club_name, club_description FROM clubs WHERE club_id = ?;`;
    connection3.query(
      query3,
      [req.query.club_id],
      function(qerr3, rows3, fields3) {
      connection3.release();
      // if serverside error
      if(qerr3){
        console.log("qerrFIRST:");
        console.log(qerr3);
        res.sendStatus(500);
        return;
      }

      console.log(JSON.stringify(rows3));
      res.json(rows3[0]);
    }
    );
  });

});

// login
// XIAOYU: may need to change this to a get request idk
// cos i thought post requests only for changing data in the database
// Dimos: Log in working nice with argon2 encryption
router.post('/login', async function(req, res, next){
  req.session.username = req.body.username;
  if('client_id' in req.body && 'credential' in req.body){
    console.log('-------------google login start--------------');
    const ticket = await client.verifyIdToken({
        idToken: req.body.credential,
        audience: CLIENT_ID// Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
    });
    const payload = ticket.getPayload();
    console.log(payload['email']);
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
    req.pool.getConnection(function(err, connection){
      if(err){
        console.log("err");
        console.log(err);
        res.sendStatus(500);
        return;
      }
      console.log('-------------google query--------------');
      let query = "SELECT user_id, user_type, user_name, first_name, last_name, email FROM users WHERE email = ?";
      connection.query(query, payload['email'], function(qerr, rows, fields) {
        connection.release();
        if(qerr){
          console.log("qerr:");
          console.log(qerr);
          res.sendStatus(500);
          return;
        }
        console.log(JSON.stringify(rows));
        if (rows.length > 0){
          // user is present
          console.log('user present');
          [req.session.user] = rows;
          res.json(req.session.user);
        }else{
          // no user
          console.log('no user');
          res.sendStatus(401);
        }
      });
    });
  }else if('username' in req.body && 'password' in req.body){
    console.log("username and password are in the body");
    console.log("------------------------IMPORTANT-----------------------");
    req.pool.getConnection(function(err, connection){
      // if serverside error
      if(err){
        console.log("err"); // debug
        console.log(err); // debug

        res.sendStatus(500);
        return;
      }

      let query = "SELECT user_id, user_type, user_name, password, first_name, last_name, email FROM users WHERE user_name = ?" // AND password = ?";
      connection.query(query, [req.body.username], async function(qerr, rows, fields) {
        connection.release();
        // if serverside error
        if(qerr){
          console.log("qerr:");
          console.log(qerr);
          res.sendStatus(500);
          return;
        }

        console.log(JSON.stringify(rows)); // debug

        if (rows.length === 1){
          console.log("rows.length==1");
          console.log(rows[0]);
          if(await argon2.verify(rows[0].password,req.body.password)){
             //get rid of details which we dont want users to see
            let [user_deets] = rows;
            console.log(user_deets.password);
            delete user_deets.password;

            //when there is a user
            req.session.user = user_deets;
            res.json(rows);
          } else{
            //wrong pw
            res.sendStatus(401);
          }
        } else if (rows.length === 0) {
          // no user
          res.sendStatus(401);
        } else {
          // somehow, usernames are not unique
          console.log("somehow, usernames are not unique");
          res.sendStatus(401);
        }
      });
    });

  }else{
    console.log("wrong username or password");
    res.sendStatus(401);
  }
});



// signup
// DONE - XIAOYU
router.post('/signup', function(req, res, next){
  // Xiaoyu, Tuesday night, implementing signup
  console.log(req.body);

  req.pool.getConnection(function (cerrCheck, connectionCheck) {
    if (cerrCheck) {
        res.sendStatus(500);
        return;
    }
    let queryCheck = `SELECT * FROM users WHERE user_name = ?;`;
    connectionCheck.query(
        queryCheck,
        [req.body.username],
        function (qerrCheck, rowsCheck, fieldsCheck) {
            connectionCheck.release();
            if (qerrCheck) {
                res.sendStatus(500);
                return;
            }

            if (rowsCheck.length === 1) {
              // user is already manager
              res.sendStatus(409);
            } else if (rowsCheck.length !== 0) {
              // serverside error
              res.sendStatus(500);
            } else {

              // username not taken
              req.pool.getConnection(async function(err, connection){
                if(err){
                  console.log("err");
                  console.log(err);
                  res.sendStatus(500);
                  return;
                }

                const hash = await argon2.hash(req.body.password);

                let query = `Insert INTO users(
                                  user_type,
                                  user_name,
                                  first_name,
                                  last_name,
                                  email,
                                  password,
                                  phone_number
                              ) VALUES(
                                  'user',
                                  ?,
                                  ?,
                                  ?,
                                  ?,
                                  ?,
                                  ?
                              );`;
                connection.query(query,
                  [req.body.username, req.body.firstname,req.body.lastname,
                    req.body.email,hash,req.body.phonenumber],
                  function(qerr, rows, fields) {
                  connection.release();
                  // if serverside error
                  if(qerr){
                    console.log("qerr:");
                    console.log(qerr);
                    res.sendStatus(500);
                    return;
                  }

                  console.log(JSON.stringify(rows));

                  // should work, and no need to send back anything to the client
                  res.end();
                });
              });

            }
        }
    );
  });


});

// XIAOYU - THURSDAY MORNING club enrolment
router.post('/enrolClub', function(req, res, next){
  console.log(JSON.stringify(req.session)); // debug

  // check if logged in
  if (req.session.user === undefined) {
    res.sendStatus(401);
    return;
  }

  // first connection: check if user is already enrolled
  req.pool.getConnection(function(err, connection){
    if(err){
      console.log("err");
      console.log(err);
      res.sendStatus(500);
      return;
    }
    let query = `SELECT * FROM club_enrolments WHERE user_id = ? AND club_id = ?;`;
    connection.query(
      query,
      [req.session.user.user_id, req.body.club_id],
      function(qerr, rows, fields) {
      connection.release();
      // if serverside error
      if(qerr){
        console.log("qerrFIRST:");
        console.log(qerr);
        res.sendStatus(500);
        return;
      }

      if (rows.length === 1){
        // user is already present
        res.sendStatus(409);
      } else if (rows.length !== 0) {
        // something went wrong
        console.log("wtf");
        res.sendStatus(500);
      } else {


        // second connection: enrol new user
        req.pool.getConnection(function(err2, connection2){
          if(err2){
            console.log("err2");
            console.log(err2);
            res.sendStatus(500);
            return;
          }
          let query2 = `Insert INTO club_enrolments(
                            user_id,
                            club_id,
                            notify_updates,
                            notify_events
                        ) VALUES(
                            ?,
                            ?,
                            FALSE,
                            FALSE
                        );`;
          connection2.query(
            query2,
            [req.session.user.user_id, req.body.club_id],
            function(qerr2, rows2, fields2) {
            connection2.release();
            // if serverside error
            if(qerr2){
              console.log("qerrSECOND:");
              console.log(qerr2);
              res.sendStatus(500);
              return;
            }

            // should work, and no need to send back anything to the client
            res.end();

          }
          );
        });
      }
    }
    );
  });

});

// XIAOYU THURSDAY MORNING LOGOUT
router.get('/logout', function(req, res, next){
  if (req.session.user) {
    delete req.session.user;
    delete req.session.username;
    res.end();
  } else {
    res.sendStatus(401);
  }
});

// This code handles a dedicated login route that would be made through a redirect
router.post('/google_login', async function (req, res, next) {

  const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: CLIENT_ID
  });
  const payload = ticket.getPayload();
  //console.log(payload['sub']);
  console.log(payload['email']);
  console.log("hello!");
  // If request specified a G Suite domain:
  // const domain = payload['hd'];

  // Redirect the user to the desired page after login. e.g. user's profile page.
  res.redirect('/index.html');

});

router.post('/changeDetails', function(req, res, next){
  // check if logged in
  if (req.session.user === undefined) {
    res.sendStatus(401);
    return;
  }

  req.pool.getConnection(function(err3, connection3){
    if(err3){
      console.log("err");
      console.log(err3);
      res.sendStatus(500);
      return;
    }
    let query3 = `SELECT * FROM users WHERE user_name = ?;`;
    connection3.query(
      query3,
      [req.body.username],
      function(qerr3, rows3, fields3) {
      connection3.release();
      // if serverside error
      if(qerr3){
        console.log("qerrFIRST:");
        console.log(qerr3);
        res.sendStatus(500);
        return;
      }

      if (rows3.length === 1) {
        // username already taken
        res.sendStatus(403);
      } else if (rows3.length !== 0) {
        // serverside error
        console.log("wtf");
        res.sendStatus(500);
      } else {
        req.pool.getConnection(async function(err, connection){
          if(err){
            console.log("err");
            console.log(err);
            res.sendStatus(500);
            return;
          }

            const hash = await argon2.hash(req.body.password);
            console.log("current password: " + req.session.user.password);
            console.log("new password: " + req.body.password);
            console.log("new hash password: " + hash);
            // query meaning: update the user table to have the inputted username on the row where
            // we have the current session username
            let query = `UPDATE users SET user_name = ?, first_name = ?, last_name = ?, email = ?, password = ? WHERE user_id = ?`;
            connection.query(
              query,
              [req.body.username, req.body.firstname, req.body.lastname,
                req.body.email, hash, req.session.user.user_id],
              function(qerr, rows, fields) {


                // update the session
                req.session.user.user_name = req.body.username;
                req.session.user.first_name = req.body.firstname;
                req.session.user.last_name = req.body.lastname;
                req.session.user.password = req.body.password;
                req.session.user.email = req.body.email;

                req.session.username = req.body.username;

                console.log("After Change, current password: " + req.session.user.password);
                connection.release();
                // if serverside error
                if(qerr){
                  console.log("qerr:");
                  console.log(qerr);
                  res.sendStatus(500);
                  return;
                }

                res.end();

              }
              );
          });

      }
    }
    );
  });
  // res.redirect('/logout');
});

router.post('/checkIfManager', function(req, res, next){
  // check if logged in
  if (req.session.user === undefined) {
    res.sendStatus(401);
    return;
  }

  // check if manager of club (or admin, for event updates)
  req.pool.getConnection(function(err, connection){
    if(err){
      console.log("err");
      console.log(err);
      res.sendStatus(500);
      return;
    }
    let queryManager = `SELECT * FROM club_managers WHERE user_id = ? AND club_id = ?;`;
    connection.query(
      queryManager,
      [req.session.user.user_id, req.body.club_id],
      function(qerrManager, rows, fields) {
      connection.release();
      // if serverside error
      if(qerrManager){
        console.log("qerrFIRST:");
        console.log(qerrManager);
        res.sendStatus(500);
        return;
      }

      if (rows.length === 1){
        // user is manager

        res.end();

      } else if (rows.length === 0) {
        // user isnt a manager
        // check if user is admin
        req.pool.getConnection(function(errAd, connectionAd){
          if(errAd){
            console.log("errAd");
            console.log(errAd);
            res.sendStatus(500);
            return;
          }

          let queryAdmin = `SELECT * FROM users WHERE user_id = ? AND user_type = 'admin';`;
          connectionAd.query(
            queryAdmin,
            [req.session.user.user_id],
            function(qerrAdmin, rowsAdmin, fieldsAdmin) {
              connectionAd.release();
              // if serverside error
              if(qerrAdmin){
                console.log("qerrAdmin:");
                console.log(qerrAdmin);
                res.sendStatus(500);
                return;
              }

              if (rowsAdmin.length === 1){
                // user is admin
                res.end();
              } else {
                // user is not admin or manager
                res.sendStatus(403);
              }
            }
            );
        });

      } else {
        // serverside error
        console.log("wtf");
        res.sendStatus(500);
      }
    }
    );
  });

});

router.post('/checkIfAdmin', function(req, res, next){
  // check if logged in
  if (req.session.user === undefined) {
    res.sendStatus(401);
    return;
  }

  // check if manager of club
  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    let query = `SELECT * FROM users WHERE user_id = ? AND user_type = 'admin';`;
    connection.query(
      query,
      [req.session.user.user_id],
      function(qerr, rows, fields) {
      connection.release();
      // if serverside error
      if(qerr){
        console.log("qerrFIRST:");
        console.log(qerr);
        res.sendStatus(500);
        return;
      }

      if (rows.length === 1){
        // user is admin
        res.end();
      } else if (rows.length === 0) {
        // user isnt admin
        res.sendStatus(403);
      } else {
        // serverside error
        console.log("wtf");
        res.sendStatus(500);
      }
    }
    );
  });

});


module.exports = router;
