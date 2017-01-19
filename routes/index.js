const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const debug = require('debug')('cf-knot:index');

const service = require('../lib/service');

const getData = (cb) => {
  const info = service.getConnectionInfo();

  debug('Connecting to DB with %o...', info);
  const connection = mysql.createConnection(info);
  connection.connect((error) => {
    if (error) {
      debug('Failed to connect with %o', error);
      cb(error);
      return;
    }
    debug('Connection established');

    debug('Selecting data ...');
    try {
      connection.query('SELECT * FROM `data`', function (error, results, fields) {
        debug('Selected data %o', results);
        cb(error, results);
      });
    } catch (e) {
      cb(e);
    }

    debug('Closing connection ...');
    connection.end();
  });

};

/* GET home page. */
router.get('/', function(req, res, next) {
  getData((error, data) => {
    if (error) {
      res.locals.message = error.message;
      res.locals.error = error;

      // render the error page
      res.status(error.status || 500);
      res.render('error');

      return;
    }

    res.render('index', {
      title: 'cf-knot',
      data: data
    });
  });
});

module.exports = router;
