var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/postUpdate', function (req, res, next) {
  if ('title' in req.body && 'description' in req.body) {

      req.pool.getConnection(function (cerr, connection) {
          if (cerr) {
              res.sendStatus(500);
              return;
          }
          let query = `INSERT INTO updates (update_title, update_description)
                      VALUES (?, ?);`;
          connection.query(
              query,
              [req.body.title,
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
  if ('name' in req.body && 'description' in req.body && 'date' in req.body && 'time' in req.body) {

      req.pool.getConnection(function (cerr, connection) {
          if (cerr) {
              res.sendStatus(500);
              return;
          }
          let query = `INSERT INTO events (event_name, event_description, event_date, event_time)
                      VALUES (?, ?, ?, ?);`;
          connection.query(
              query,
              [req.body.name,
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


module.exports = router;
