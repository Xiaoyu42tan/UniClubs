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

// login
// XIAOYU: may need to change this to a get request idk
// cos i thought post requests only for changing data in the database
router.post('/login', async function(req, res, next){
  req.session.username = req.body.username;
  if('client_id' in req.body){
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
          [req.session.user] = rows;
          res.json(req.session.user);
        }else{
          // no user
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
  console.log(req.body);
    //check if there is a username
    let temp_username = req.body.username;
    temp_username = temp_username.trim();
    if(temp_username !== ''){
      console.log("do we get here");
      //connection for username
      req.pool.getConnection(function(err, connection){
        if(err){
          console.log("err");
          console.log(err);
          res.sendStatus(500);
          return;
        }
      console.log("current username: " + req.session.username);
      console.log("new username: " + req.body.username);
      //query meaning: update the user table to have the inputted username on the row where
      //we have the current session username
      let query = `UPDATE users SET user_name = ? WHERE user_id = ?`;
      connection.query(query, [req.body.username, req.session.user.user_id], function(qerr, rows, fields) {
        //update the session username
        req.session.username = req.body.username;
        console.log("After Change, current user: " + req.session.username);
        connection.release();
        // if serverside error
        if(qerr){
          console.log("qerr:");
          console.log(qerr);
          res.sendStatus(500);
          return;
         }
      });
    });
  }
  //check if there is a firstname
  let temp_firstname = req.body.firstname;
  temp_firstname = temp_firstname.trim();
  if(temp_firstname !== ''){
       //connection for the firstname
    req.pool.getConnection(function(err, connection){
    if(err){
      console.log("err");
      console.log(err);
      res.sendStatus(500);
      return;
    }
      console.log("current firstname: " + req.session.user.first_name);
      console.log("new firstname: " + req.body.firstname);
      //query meaning: update the user table to have the inputted username on the row where
      //we have the current session username
      let query = `UPDATE users SET first_name = ? WHERE user_id = ?`;
      connection.query(query, [req.body.firstname, req.session.user.user_id], function(qerr, rows, fields) {
        //update the session username
        req.session.user.first_name = req.body.firstname;
        console.log("After Change, current firstname: " + req.session.user.first_name);
        connection.release();
        // if serverside error
        if(qerr){
          console.log("qerr:");
          console.log(qerr);
          res.sendStatus(500);
          return;
          }
      });
    });
  }

  //check if there is a lastname
  let temp_lastname = req.body.lastname;
  temp_lastname = temp_lastname.trim();
  if(temp_lastname !== ''){
    //connection for lastname
  req.pool.getConnection(function(err, connection){
  if(err){
    console.log("err");
    console.log(err);
    res.sendStatus(500);
    return;
  }
    console.log("current lastname: " + req.session.user.lastname);
    console.log("new lastname: " + req.body.lastname);
    //query meaning: update the user table to have the inputted username on the row where
    //we have the current session username
    let query = `UPDATE users SET last_name = ? WHERE user_id = ?`;
    connection.query(query, [req.body.lastname, req.session.user.user_id], function(qerr, rows, fields) {
      //update the session username
      req.session.user.last_name = req.body.lastname;
      console.log("After Change, current lastname: " + req.session.user.last_name);
      connection.release();
      // if serverside error
      if(qerr){
        console.log("qerr:");
        console.log(qerr);
        res.sendStatus(500);
        return;
        }
    });
  });
}
  //check if there is an email
  let temp_email = req.body.email;
  temp_email = temp_email.trim();
  console.log(temp_email);
  if(temp_email !== ''){
    //console.log('get to here');
    //connection for email
  req.pool.getConnection(function(err, connection){
  if(err){
    console.log("err");
    console.log(err);
    res.sendStatus(500);
    return;
  }
    console.log("current email: " + req.session.user.email);
    console.log("new email: " + req.body.email);
    //query meaning: update the user table to have the inputted username on the row where
    //we have the current session username
    let query = `UPDATE users SET email = ? WHERE user_id = ?`;
    connection.query(query, [req.body.email, req.session.user.user_id], function(qerr, rows, fields) {
      //update the session username
      req.session.user.email = req.body.email;
      console.log("After Change, current email: " + req.session.user.email);
      connection.release();
      // if serverside error
      if(qerr){
        console.log("qerr:");
        console.log(qerr);
        res.sendStatus(500);
        return;
        }
    });
  });
}
  //check if there is a password
  let temp_password = req.body.password;
  temp_password = temp_password.trim();
  console.log(temp_password);
  if(temp_password !== ''){
    //console.log('get to here');
    //connection for password
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
    //query meaning: update the user table to have the inputted username on the row where
    //we have the current session username
    let query = `UPDATE users SET password = ? WHERE user_id = ?`;
    connection.query(query, [hash, req.session.user.user_id], function(qerr, rows, fields) {
      //update the session username
      req.session.user.password = req.body.password;
      console.log("After Change, current password: " + req.session.user.password);
      connection.release();
      // if serverside error
      if(qerr){
        console.log("qerr:");
        console.log(qerr);
        res.sendStatus(500);
        return;
        }
    });
  });
}
  res.redirect('/logout');
});

router.post('/checkIfManager', function(req, res, next){
  // check if logged in
  if (req.session.user === undefined) {
    res.sendStatus(401);
    return;
  }

  // check if manager of club
  req.pool.getConnection(function(err, connection){
    if(err){
      console.log("err");
      console.log(err);
      res.sendStatus(500);
      return;
    }
    let query = `SELECT * FROM club_managers WHERE user_id = ? AND club_id = ?;`;
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
        // user is manager
        res.end();
      } else if (rows.length === 0) {
        // user isnt manager
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
