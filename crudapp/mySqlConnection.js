var express = require('express'); // Web Framework
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser')
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "meeting" 
});


var server = app.listen(8082, function () {
    var host = server.address().date
    var port = server.address().port

    console.log("app listening at http://%s:%s", host, port)
});


con.connect(function(error){
    if(!!error)console.log('error');
    else console.log('Connected');
})

app.get('/meeting', function (req, res) {
    con.query("select * from meeting", function(error, rows, fields) {
        if(!!error) console.log('error');
        else{
            console.log(rows)
            res.send(rows);
        }
    });
})

app.get('/meeting/:id', function (req, res) {
    console.log(req.params.id);
    con.query("select * from meeting where id =?", req.params.id , function(error, rows, fields) {
        if(!!error) console.log('error');
        else{
            console.log(rows)
            res.send(rows);
        }
    });
})

app.post('/meeting', function (req, res) {
    // console.log(req.body.name);
    // console.log(req.body.date);
    con.query("insert into meeting set ?", req.body, function(error, rows, fields) {
        if(!!error) console.log('error');
        else{
            console.log(rows)
            res.send(JSON.stringify(rows));
        }
    });
})

app.delete('/meeting/:id', function (req, res) {
     console.log(req.params.id);
    con.query("delete from meeting where id=?", req.params.id, function(error, rows, fields) {
        if(!!error) console.log('error');
        else{
            console.log(rows)
            res.end("Row has been deleted");
        }
    });
})

app.put('/meeting', function (req, res) {
  console.log(req.body.id);
   con.query('update meeting SET name=?, date=? where id=?', [req.body.name,req.body.date, req.body.id], function (error, rows, fields) {
   if (error) throw error;
   res.end(JSON.stringify(rows));
 });
});

// Below is sample code for into same data used by me into database

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "INSERT INTO meeting (name, date) VALUES ?";
//   var values = [
//     ['John', 'Highway 71'],
//     ['Peter', 'Lowstreet 4'],
//     ['Amy', 'Apple st 652'],
//     ['Hannah', 'Mountain 21'],
//     ['Michael', 'Valley 345'],
//     ['Sandy', 'Ocean blvd 2'],
//     ['Betty', 'Green Grass 1'],
//     ['Richard', 'Sky st 331'],
//     ['Susan', 'One way 98'],
//     ['Vicky', 'Yellow Garden 2'],
//     ['Ben', 'Park Lane 38'],
//     ['William', 'Central st 954'],
//     ['Chuck', 'Main Road 989'],
//     ['Viola', 'Sideway 1633']
//   ];
// //   con.query(sql, [values], function (err, result) {
// //     if (err) throw err;
// //     console.log("Number of records inserted: " + result.affectedRows);
// //   });

//   con.query("select * from meeting", function (err, result) {
//     if (err) throw err;
//     console.log(result);
//   });
// });
