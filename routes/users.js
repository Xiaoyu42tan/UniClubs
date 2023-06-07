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
      let query = `SELECT update_title, update_description FROM updates
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
      let query = `SELECT event_name, event_description, event_date, event_time FROM events
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

// Sends the array in JSON format
router.get('/getFirstName', function (req, res, next) {
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
  });


module.exports = router;
