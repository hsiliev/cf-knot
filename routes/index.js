const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const getConnectionInfo = () => {
  const services = JSON.parse(process.env.VCAP_SERVICES);
  const serviceConfig = services[0];
  const instance = serviceConfig[0];
  return {
    host: instance.credentials.hostname,
    port: instance.credentials.port,
    user: instance.credentials.username,
    password: instance.credentials.password,
    database: instance.credentials.name
  };
};

const getData = (cb) => {
  const connection = mysql.createConnection(getConnectionInfo());
  connection.connect();

  connection.query('SELECT * FROM `data`', function (error, results, fields) {
    if (error) throw error;
    cb(results);
  });

  connection.end();
};

/* GET home page. */
router.get('/', function(req, res, next) {
  getData((data) => {
    res.render('index', {
      title: 'cf-knot',
      data: data
    });
  })
});

module.exports = router;
