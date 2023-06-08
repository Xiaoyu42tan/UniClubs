var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// XIAOYU - edited Thursday night
router.post('/postUpdate', function (req, res, next) {
  // XIAOYU - check if logged in
  if (req.session.user === undefined) {
    res.sendStatus(401);
    return;
  }

  if ('club_id' in req.body && 'title' in req.body && 'description' in req.body) {


    // XIAOYU - check if manager of this club
    req.pool.getConnection(function(err3, connection3){
      if(err3){
        console.log("err");
        console.log(err3);
        res.sendStatus(500);
        return;
      }
      let query3 = `SELECT * FROM club_managers WHERE user_id = ? AND club_id = ?;`;
      connection3.query(
        query3,
        [req.session.user.user_id, req.body.club_id],
        function(qerr3, rows3, fields3) {
        connection3.release();
        // if serverside error
        if(qerr3){
          console.log("qerrFIRST:");
          console.log(qerr3);
          res.sendStatus(500);
          return;
        }

        if (rows3.length === 0){
          // user is not authorised
          res.sendStatus(403);
        } else if (rows3.length !== 1) {
          // something went wrong
          console.log("wtf");
          res.sendStatus(500);
        } else {


          // user is manager
          req.pool.getConnection(function (cerr2, connection2) {
            if (cerr2) {
              res.sendStatus(500);
              return;
            }
            let query2 = `INSERT INTO updates (club_id, update_title, update_description, private_update)
                        VALUES (?, ?, ?, ?);`;
            connection2.query(
              query2,
              [req.body.club_id,
              req.body.title,
              req.body.description,
              req.body.private_update],
              function (qerr2, rows2, fields2) {
                connection2.release();
                if (qerr2) {
                  console.log("qerr2:");
                  console.log(qerr2);
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



  } else {
    res.sendStatus(500);
  }


});

// XIAOYU - edited Thursday night
router.post('/createEvent', function (req, res, next) {
  // XIAOYU - check if logged in
  if (req.session.user === undefined) {
    res.sendStatus(401);
    return;
  }

  if ('name' in req.body && 'club_id' in req.body && 'description' in req.body && 'date' in req.body && 'time' in req.body) {

    // XIAOYU - check if manager of this club
    req.pool.getConnection(function(err3, connection3){
      if(err3){
        console.log("err");
        console.log(err3);
        res.sendStatus(500);
        return;
      }
      let query3 = `SELECT * FROM club_managers WHERE user_id = ? AND club_id = ?;`;
      connection3.query(
        query3,
        [req.session.user.user_id, req.body.club_id],
        function(qerr3, rows3, fields3) {
        connection3.release();
        // if serverside error
        if(qerr3){
          console.log("qerrFIRST:");
          console.log(qerr3);
          res.sendStatus(500);
          return;
        }

        if (rows3.length === 0){
          // user is not authorised
          res.sendStatus(403);
        } else if (rows3.length !== 1) {
          // something went wrong
          console.log("wtf");
          res.sendStatus(500);
        } else {


          // user is manager
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
              }
              );
          });



        }
      }
      );
    });


  } else {
    res.sendStatus(500);
  }
});

// Sends the array in JSON format
router.get('/getUpdates', function (req, res, next) {

  // XIAOYU - check if logged in
  if (req.session.user === undefined) {
    // user is not logged in
    req.pool.getConnection(function (cerr, connection) {
      if (cerr) {
          res.sendStatus(500);
          return;
      }
      let query = `SELECT * FROM updates
                  WHERE club_id = ? AND private_update = FALSE
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

    return;
  }


  // XIAOYU - check if member of this club
  req.pool.getConnection(function(err3, connection3){
    if(err3){
      console.log("err");
      console.log(err3);
      res.sendStatus(500);
      return;
    }
    let query3 = `SELECT * FROM club_enrolments WHERE user_id = ? AND club_id = ?;`;
    connection3.query(
      query3,
      [req.session.user.user_id, req.query.club_id],
      function(qerr3, rows3, fields3) {
      connection3.release();
      // if serverside error
      if(qerr3){
        console.log("qerrFIRST:");
        console.log(qerr3);
        res.sendStatus(500);
        return;
      }

      if (rows3.length === 0){


        // user is not member
        req.pool.getConnection(function (cerr, connection) {
          if (cerr) {
              res.sendStatus(500);
              return;
          }
          let query = `SELECT * FROM updates
                      WHERE club_id = ? AND private_update = FALSE
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


      } else if (rows3.length !== 1) {
        // something went wrong
        console.log("wtf");
        res.sendStatus(500);
      } else {

        // user is club member
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



      }
    }
    );
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
// XIAOYU - edited Thursday night
router.post('/updateEvent', function (req, res, next) {
  // XIAOYU - check if logged in
  if (req.session.user === undefined) {
    res.sendStatus(401);
    return;
  }

  if ('event_id' in req.body && 'name' in req.body && 'club_id' in req.body && 'description' in req.body && 'date' in req.body && 'time' in req.body) {

    // check if manager
    req.pool.getConnection(function(err3, connection3){
      if(err3){
        console.log("err");
        console.log(err3);
        res.sendStatus(500);
        return;
      }
      let query3 = `SELECT * FROM club_managers WHERE user_id = ? AND club_id = ?;`;
      connection3.query(
        query3,
        [req.session.user.user_id, req.body.club_id],
        function(qerr3, rows3, fields3) {
        connection3.release();
        // if serverside error
        if(qerr3){
          console.log("qerrFIRST:");
          console.log(qerr3);
          res.sendStatus(500);
          return;
        }

        if (rows3.length === 0){
          // user is not authorised
          res.sendStatus(403);
        } else if (rows3.length !== 1) {
          // something went wrong
          console.log("wtf");
          res.sendStatus(500);
        } else {


          // user is manager
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
              }
              );
          });



        }
      }
      );
    });


  } else {
    res.sendStatus(500);
  }
});

// Delete Event
// XIAOYU - edited Thursday night
router.post('/deleteEvent', function (req, res, next) {
  // XIAOYU - check if logged in
  if (req.session.user === undefined) {
    res.sendStatus(401);
    return;
  }


  if ('event_id' in req.body) {

    // check if manager
    req.pool.getConnection(function(err3, connection3){
      if(err3){
        console.log("err");
        console.log(err3);
        res.sendStatus(500);
        return;
      }
      let query3 = `SELECT * FROM club_managers WHERE user_id = ? AND club_id = ?;`;
      connection3.query(
        query3,
        [req.session.user.user_id, req.body.club_id],
        function(qerr3, rows3, fields3) {
        connection3.release();
        // if serverside error
        if(qerr3){
          console.log("qerrFIRST:");
          console.log(qerr3);
          res.sendStatus(500);
          return;
        }

        if (rows3.length === 0){
          // user is not authorised
          res.sendStatus(403);
        } else if (rows3.length !== 1) {
          // something went wrong
          console.log("wtf");
          res.sendStatus(500);
        } else {



          // user is manager
          req.pool.getConnection(function (cerr, connection) {
            if (cerr) {
                res.sendStatus(500);
                return;
            }
            let query = `DELETE FROM events WHERE event_id = ?`;
            connection.query(
                query,
                [req.body.event_id],
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
      }
      );
    });


  } else {
    res.sendStatus(500);
  }
});

// Delete Update
// XIAOYU - edited Thursday night
router.post('/deleteUpdate', function (req, res, next) {
  // XIAOYU - check if logged in
  if (req.session.user === undefined) {
    res.sendStatus(401);
    return;
  }



  if ('update_id' in req.body) {

    // check if manager
    req.pool.getConnection(function(err3, connection3){
      if(err3){
        console.log("err");
        console.log(err3);
        res.sendStatus(500);
        return;
      }
      let query3 = `SELECT * FROM club_managers WHERE user_id = ? AND club_id = ?;`;
      connection3.query(
        query3,
        [req.session.user.user_id, req.body.club_id],
        function(qerr3, rows3, fields3) {
        connection3.release();
        // if serverside error
        if(qerr3){
          console.log("qerrFIRST:");
          console.log(qerr3);
          res.sendStatus(500);
          return;
        }

        if (rows3.length === 0){
          // user is not authorised
          res.sendStatus(403);
        } else if (rows3.length !== 1) {
          // something went wrong
          console.log("wtf");
          res.sendStatus(500);
        } else {


          // user is manager
          req.pool.getConnection(function (cerr, connection) {
            if (cerr) {
                res.sendStatus(500);
                return;
            }
            let query = `DELETE FROM updates WHERE update_id = ?`;
            connection.query(
                query,
                [req.body.update_id],
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
      }
      );
    });


  } else {
    res.sendStatus(500);
  }
});

router.post('/joinEvent', function(req, res, next){
    console.log(JSON.stringify(req.session));

    // Check if User is Logged in
    if (req.session.user === undefined) {
      res.sendStatus(401);
      return;
    }

    // First Connection - Check if user is part of club
    req.pool.getConnection(function(cerr, connection){
      if (cerr) {
        res.sendStatus(500);
        return;
      }
      let query = `SELECT * FROM club_enrolments WHERE user_id = ? AND club_id = ?;`;
      connection.query(
        query,
        [req.session.user.user_id, req.body.club_id],
        function(qerr, rows, fields) {
        connection.release();
        if (qerr) {
          res.sendStatus(500);
          return;
        }

        if (rows.length !== 1) {
          // User is not part of club
          res.sendStatus(403);
        } else {

          // Second Connection - Check if user is already enrolled in event
          req.pool.getConnection(function(cerr2, connection2){
            if (cerr2) {
              res.sendStatus(500);
              return;
            }
            let query2 = `SELECT * FROM event_enrolments WHERE user_id = ? AND event_id = ?`;
            connection2.query(
              query2,
              [req.session.user.user_id, req.body.event_id],
              function(qerr2, rows2, fields2) {
              connection2.release();
              if (qerr2) {
                res.sendStatus(500);
                return;
              }

              if (rows2.length === 1) {
                res.sendStatus(409);
              } else {

                // Third Connection - Enrol user into event
                req.pool.getConnection(function(cerr3, connection3){
                  if (cerr3) {
                    res.sendStatus(500);
                    return;
                  }
                  let query3 = `INSERT INTO event_enrolments (user_id, event_id) VALUES (?, ?)`;
                  connection3.query(
                    query3,
                    [req.session.user.user_id, req.body.event_id],
                    function(qerr3, rows3, fields3) {
                    connection3.release();
                    if (qerr3) {
                      res.sendStatus(500);
                      return;
                    }

                    res.end();
                  });
                });
              }
            });
          });
        }
      });
    });
  });

router.post('/leaveEvent', function(req, res, next){
  console.log(JSON.stringify(req.session));

  // Check if User is Logged in
  if (req.session.user === undefined) {
    res.sendStatus(401);
    return;
  }

  // First Connection - Check if user is part of club
  req.pool.getConnection(function(cerr, connection){
    if (cerr) {
      res.sendStatus(500);
      return;
    }
    let query = `SELECT * FROM club_enrolments WHERE user_id = ? AND club_id = ?;`;
    connection.query(
      query,
      [req.session.user.user_id, req.body.club_id],
      function(qerr, rows, fields) {
      connection.release();
      if (qerr) {
        res.sendStatus(500);
        return;
      }

      if (rows.length !== 1) {
        // User is not part of club
        res.sendStatus(403);
      } else {

        // Second Connection - Check if user is already enrolled in event
        req.pool.getConnection(function(cerr2, connection2){
          if (cerr2) {
            res.sendStatus(500);
            return;
          }
          let query2 = `SELECT * FROM event_enrolments WHERE user_id = ? AND event_id = ?`;
          connection2.query(
            query2,
            [req.session.user.user_id, req.body.event_id],
            function(qerr2, rows2, fields2) {
            connection2.release();
            if (qerr2) {
              res.sendStatus(500);
              return;
            }

            if (rows2.length === 0) {
              res.sendStatus(409);
            } else {

              // Third Connection - Cancel RSVP
              req.pool.getConnection(function(cerr3, connection3){
                if (cerr3) {
                  res.sendStatus(500);
                  return;
                }
                let query3 = `DELETE FROM event_enrolments WHERE user_id = ? AND event_id = ?`;
                connection3.query(
                  query3,
                  [req.session.user.user_id, req.body.event_id],
                  function(qerr3, rows3, fields3) {
                  connection3.release();
                  if (qerr3) {
                    res.sendStatus(500);
                    return;
                  }

                  res.end();
                });
              });
            }
          });
        });
      }
    });
  });
});


// XIAOYU - edited Thursday night
router.get('/getEventUsers', function (req, res, next) {
  // XIAOYU - check if logged in
  if (req.session.user === undefined) {
    res.sendStatus(401);
    return;
  }

  // check if manager
  req.pool.getConnection(function(err3, connection3){
    if(err3){
      console.log("err");
      console.log(err3);
      res.sendStatus(500);
      return;
    }
    let query3 = `SELECT * FROM club_managers WHERE user_id = ? AND club_id = ?;`;
    connection3.query(
      query3,
      [req.session.user.user_id, req.query.club_id],
      function(qerr3, rows3, fields3) {
      connection3.release();
      // if serverside error
      if(qerr3){
        console.log("qerrFIRST:");
        console.log(qerr3);
        res.sendStatus(500);
        return;
      }

      if (rows3.length === 0){
        // user is not authorised
        res.sendStatus(403);
      } else if (rows3.length !== 1) {
        // something went wrong
        console.log("wtf");
        res.sendStatus(500);
      } else {


        // user is manager
        req.pool.getConnection(function (cerr, connection) {
          if (cerr) {
              res.sendStatus(500);
              return;
          }
          let query = `SELECT event_enrolments.user_id, users.user_name, users.first_name, users.last_name FROM event_enrolments INNER JOIN users
          WHERE users.user_id = event_enrolments.user_id
          AND event_id = ?;`;
          connection.query(query, [req.query.event_id], function (qerr, rows, fields) {
              connection.release();
              if (qerr) {
                  res.sendStatus(500);
                  return;
              }
              console.log(JSON.stringify(rows));
              res.json(rows);
          });
        });


      }
    }
    );
  });


});


// XIAOYU - edited Thursday night
router.post('/removeEventUsers', function (req, res, next) {
  // XIAOYU - check if logged in
  if (req.session.user === undefined) {
    res.sendStatus(401);
    return;
  }

  if ('user_id' in req.body && 'event_id' in req.body) {

    // check if manager
    req.pool.getConnection(function(err3, connection3){
      if(err3){
        console.log("err");
        console.log(err3);
        res.sendStatus(500);
        return;
      }
      let query3 = `SELECT * FROM club_managers WHERE user_id = ? AND club_id = ?;`;
      connection3.query(
        query3,
        [req.session.user.user_id, req.body.club_id],
        function(qerr3, rows3, fields3) {
        connection3.release();
        // if serverside error
        if(qerr3){
          console.log("qerrFIRST:");
          console.log(qerr3);
          res.sendStatus(500);
          return;
        }

        if (rows3.length === 0){
          // user is not authorised
          res.sendStatus(403);
        } else if (rows3.length !== 1) {
          // something went wrong
          console.log("wtf");
          res.sendStatus(500);
        } else {


          // user is manager
          req.pool.getConnection(function (cerr, connection) {
            if (cerr) {
                res.sendStatus(500);
                return;
            }
            let query = `DELETE FROM event_enrolments WHERE user_id = ? AND event_id = ?;`;
            connection.query(
                query,
                [req.body.user_id,
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
      }
      );
    });


  } else {
    res.sendStatus(500);
  }
});

router.get('/getClubMembers', function (req, res, next) {
  req.pool.getConnection(function (cerr, connection) {
      if (cerr) {
          res.sendStatus(500);
          return;
      }
      let query = `SELECT club_enrolments.user_id, users.user_name, users.first_name, users.last_name FROM club_enrolments INNER JOIN users
      WHERE users.user_id = club_enrolments.user_id
      AND club_id = ?;`;
      connection.query(query, [req.query.club_id], function (qerr, rows, fields) {
          connection.release();
          if (qerr) {
              console.log("qerr");
              console.log(qerr);
              res.sendStatus(500);
              return;
          }
          console.log(JSON.stringify(rows));
          res.json(rows);
      });
  });
});

router.post('/removeClubMembers', function (req, res, next) {
  // XIAOYU - check if logged in
  if (req.session.user === undefined) {
    res.sendStatus(401);
    return;
  }


  if ('user_id' in req.body) {

    // check if manager
    req.pool.getConnection(function(err3, connection3){
      if(err3){
        console.log("err");
        console.log(err3);
        res.sendStatus(500);
        return;
      }
      let query3 = `SELECT * FROM club_managers WHERE user_id = ? AND club_id = ?;`;
      connection3.query(
        query3,
        [req.session.user.user_id, req.body.club_id],
        function(qerr3, rows3, fields3) {
        connection3.release();
        // if serverside error
        if(qerr3){
          console.log("qerrFIRST:");
          console.log(qerr3);
          res.sendStatus(500);
          return;
        }

        if (rows3.length === 0){
          // user is not authorised
          res.sendStatus(403);
        } else if (rows3.length !== 1) {
          // something went wrong
          console.log("wtf");
          res.sendStatus(500);
        } else {



          // user is manager
          req.pool.getConnection(function (cerr, connection) {
            if (cerr) {
                res.sendStatus(500);
                return;
            }
            let query = `DELETE FROM club_enrolments WHERE user_id = ? AND club_id = ?;`;
            connection.query(
                query,
                [req.body.user_id,req.body.club_id],
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
      }
      );
    });


  } else {
    res.sendStatus(500);
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
        console.log(req.session.user);
        res.json(req.session.user.first_name);
    } else {
        res.sendStatus(500);
    }
});

//Dimi - making gets for everything so that we can display and modify uder information
router.get('/getLastName', function (req, res, next) {
    if (req.session.user) {
        res.json(req.session.user.last_name);
    } else {
        res.sendStatus(500);
    }
});

router.get('/getUserName', function (req, res, next) {
    if (req.session.user) {
        res.json(req.session.user.user_name);
    } else {
        res.sendStatus(500);
    }
});

router.get('/getEmail', function (req, res, next) {
    if (req.session.user) {
        res.json(req.session.user.email);
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

// ADITYA FRIDAY MORNING : this removes the user from the database upon the request of the admin
app.post('/admin/removeUser', (req, res) => {
  const { user_id } = req.body;

  connection.query('DELETE FROM users WHERE user_id = ?', [user_id], (error, results) => {
    if (error) {
      console.error('Error:', error);
      res.sendStatus(500);
      return;
    }

    res.sendStatus(200);
  });
});


module.exports = router;
