var express = require('express');
var app = express();
var sql = require('mysql');
var bodyParser = require('body-parser')
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var con = mysql.createConnection({
    host:"",
    name:"",
    password:"",
    database:""
});