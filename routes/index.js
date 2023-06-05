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

//login
router.post('/login', async function(req, res, next){
  if('client_id' in req.body){
    const ticket = await client.verifyIdToken({
        idToken: req.body.credential,
        audience: CLIENT_ID,// Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    console.log(payload['email']);
    res.send();
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
  }else if(req.body.username in users && req.body.password === users[req.body.username].password){
    req.session.username = req.body.username;
    res.end();
  }else{
    res.sendStatus(401);
  }
  req.session.username = req.body.username;
  console.log(JSON.stringify(req.body));
  res.end();
});

//signup
router.post('/signup', function(req, res, next){
  if(req.body.username in users){
    res.sendStatus(401);
  }else{
    req.session.username = req.body.username;
    users[req.body.username] = {password: req.body.password};
    res.end();
  }
  req.session.username = req.body.username;
  console.log(JSON.stringify(req.body));
  res.end();
});

//log out
router.post('/logout', function(req, res, next){
  if(username in req.session){
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
  // If request specified a G Suite domain:
  // const domain = payload['hd'];

  // Redirect the user to the desired page after login. e.g. user's profile page.
  res.redirect('/index.html');

});

module.exports = router;
