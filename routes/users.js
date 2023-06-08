var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/postUpdate', function (req, res, next) {
  if ('club_id' in req.body && 'title' in req.body && 'description' in req.body) {

      req.pool.getConnection(function (cerr, connection) {
          if (cerr) {
              res.sendStatus(500);
              return;
          }
          let query = `INSERT INTO updates (club_id, update_title, update_description)
                      VALUES (?, ?, ?);`;
          connection.query(
              query,
              [req.body.club_id,
              req.body.title,
              req.body.description],
              function (qerr, rows, fields) {
                  connection.release();
                  if (qerr) {
                      res.sendStatus(500);
                      return;
                  }
                  res.end();
              });
      });
  }
});

router.post('/createEvent', function (req, res, next) {
  if ('name' in req.body && 'club_id' in req.body && 'description' in req.body && 'date' in req.body && 'time' in req.body) {

      req.pool.getConnection(function (cerr, connection) {
          if (cerr) {
              res.sendStatus(500);
              return;
          }
          let query = `INSERT INTO events (event_name, club_id, event_description, event_date, event_time)
                      VALUES (?, ?, ?, ?, ?);`;
          connection.query(
              query,
              [req.body.name,
              req.body.club_id,
              req.body.description,
              req.body.date,
              req.body.time],
              function (qerr, rows, fields) {
                  connection.release();
                  if (qerr) {
                      res.sendStatus(500);
                      return;
                  }
                  res.end();
            });
      });
  }
});

// Sends the array in JSON format
router.get('/getUpdates', function (req, res, next) {
  req.pool.getConnection(function (cerr, connection) {
      if (cerr) {
          res.sendStatus(500);
          return;
      }
      let query = `SELECT * FROM updates
                  WHERE club_id = ?
                  ORDER BY update_id DESC;`;
      connection.query(query, [req.query.club_id], function (qerr, rows, fields) {
          connection.release();
          if (qerr) {
              res.sendStatus(500);
              return;
          }
          console.log(JSON.stringify(rows));
          res.json(rows);
      });
  });
});

// Sends the array in JSON format
router.get('/getEvents', function (req, res, next) {
  req.pool.getConnection(function (cerr, connection) {
      if (cerr) {
          res.sendStatus(500);
          return;
      }
      let query = `SELECT * FROM events
                  WHERE club_id = ?
                  ORDER BY event_id DESC;`;
      connection.query(query, [req.query.club_id], function (qerr, rows, fields) {
          connection.release();
          if (qerr) {
              res.sendStatus(500);
              return;
          }
          console.log(JSON.stringify(rows));
          res.json(rows);
      });
  });
});

// Update Events
router.post('/updateEvent', function (req, res, next) {
  if ('event_id' in req.body && 'name' in req.body && 'club_id' in req.body && 'description' in req.body && 'date' in req.body && 'time' in req.body) {

      req.pool.getConnection(function (cerr, connection) {
          if (cerr) {
              res.sendStatus(500);
              return;
          }
          let query = `UPDATE events
                      SET event_name = ?,
                          club_id = ?,
                          event_description = ?,
                          event_date = ?,
                          event_time = ?
                      WHERE event_id = ?`;
          connection.query(
              query,
              [req.body.name,
              req.body.club_id,
              req.body.description,
              req.body.date,
              req.body.time,
              req.body.event_id],
              function (qerr, rows, fields) {
                  connection.release();
                  if (qerr) {
                      res.sendStatus(500);
                      return;
                  }
                  res.end();
            });
      });
  }
});


// Sends the array in JSON format
// XIAOYU WEDNESDAY NIGHT : simplified session data retrieval
router.get('/getFirstName', function (req, res, next) {
    /*
    req.pool.getConnection(function (cerr, connection) {
        if (cerr) {
            res.sendStatus(500);
            return;
        }
        let query = `SELECT first_name FROM users WHERE user_name = ?`;
        console.log("got to server side for getFirstName");
        console.log(req.session.username);
        connection.query(query, [req.session.username], function (qerr, rows, fields) {
            connection.release();
            if (qerr) {
                res.sendStatus(500);
                console.log(qerr);
                return;
            }
            const first_name = rows[0].first_name; //destructor ruins it
            console.log(first_name); // "Didier"
            res.json(first_name);
        });
    });
    */
    if (req.session.user) {
        res.json(req.session.user.first_name);
    } else {
        res.sendStatus(500);
    }
});

// XIAOYU WEDNESDAY NIGHT : getUser will return the entire user object,
// which holds information about:
// user_id, user_type, user_name, first_name, last_name, email
// in the front-end javascript you can do: let user = JSON.parse(req.responseText)
// and access information with: user.user_id, user.user_type, etc...
router.get('/getUser', function (req, res, next) {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.sendStatus(401);
    }
});


module.exports = router;
