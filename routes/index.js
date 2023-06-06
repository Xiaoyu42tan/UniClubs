var express = require('express');
var router = express.Router();

const CLIENT_ID = '521244062266-prh5adjbtjmgk7vga4g1t8j515u0kt9l.apps.googleusercontent.com';
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

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

    req.pool.getConnection(function(err, connection){
      // if serverside error
      if(err){
        console.log("err"); // debug
        console.log(err); // debug

        res.sendStatus(500);
        return;
      }

      let query = "SELECT user_id, user_type, user_name, first_name, last_name, email FROM users WHERE user_name = ? AND password = ?";
      connection.query(query, [req.body.username, req.body.password], function(qerr, rows, fields) {
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
          // user is present
          res.json(rows);
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

  req.pool.getConnection(function(err, connection){
    if(err){
      console.log("err");
      console.log(err);
      res.sendStatus(500);
      return;
    }
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
        req.body.email,req.body.password,req.body.phonenumber],
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

//log out
router.post('/logout', function(req, res, next){
  if('username' in req.session){
    delete req.session.username;
    res.end();
  }else if(req.readyState == 4 && req.status == 403){
    alert('Not logged in');
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

module.exports = router;
