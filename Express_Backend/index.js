const cors = require('cors');
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const port = 5000;
const app = express();
//global variables to be accessed in other pages
var username = "", staffType = ""; staffID = ""; email=""
//compile JSON (in our case mySQL data) to string to be used for our use
app.use(bodyParser.json());
//cors allows http requests from front-end to back-end
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));

//Create the connection to MySQL
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: 'admin',
    database: 'airticketsales'
});

//connect to database and check for errors
db.connect((err) => {
  if(err){
    throw err;
  }
  console.log('Database connected');
});

//unused Express-Sessions code
/*var session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));*/

//check if user's login information is correct
app.post('/login', function(request, response) {
  username = request.body.username;
  var password = request.body.password;
  console.log("Request recieved to server");
  var sql = "SELECT * FROM staff WHERE email = ? AND password = ?"
	if (username && password) {
		db.query(sql, [username, password], (error, result) => {
    //console.log(result);
    var string = JSON.stringify(result);
    //console.log(string + string.length);
		if (string.length > 2) {
			/*request.session.loggedin = true;
	    request.session.username = username;*/
      var packet = JSON.parse(string);
      username = packet[0].name + " " + packet[0].surname;
      staffID = packet[0].staffID;
      email = packet[0].email;
      //console.log(username);
      //console.log(staffID);
			response.redirect('/auth');
	  } else {response.sendStatus(404);}
    });
  }
});
//check what type of user we have
app.get('/auth', function(request, response) {
  console.log(email);
  var sql = "(SELECT staffType FROM staff S, staffType ST WHERE " +
  "S.staffTypeID = ST.staffTypeID AND email = ?)"
  console.log("Authenticating");
	db.query(sql, [email], (error, result) => {
  //console.log(result);
  var string = JSON.stringify(result);
  //console.log(string + string.length);
  //console.log(staffType);
	if (string.includes("advisor")) {
    staffType = "Advisor";
    console.log(staffType + " accessing system");
    response.redirect('/advisor');

  } else if (string.includes("admin")) {
    staffType = "Admin";
    console.log(staffType + " accessing system");
    response.redirect('/admin');

  } else if (string.includes("office manager")) {
    staffType = "Office Manager";
    console.log(staffType + " accessing system");
    response.redirect('/manager');
  }
  });
});

// these gets will load the designated home pages
app.get('/advisor', function(request, response) {
  console.log("Welcome " + username + " Title: " + staffType);
  response.status(200).send({username: username,
  staffID: staffID, staffType: staffType})
	response.end();
});

app.get('/admin', function(request, response) {
  console.log("Welcome " + username + " Title: " + staffType);
  response.status(200).send({username: username,
  staffID: staffID, staffType: staffType})
	response.end();
});

app.get('/manager', function(request, response) {
  console.log("Welcome " + username + " Title: " + staffType);
  response.status(200).send({username: username,
  staffID: staffID, staffType: staffType})
	response.end();
});

exports.getUserInfo = function() {
    return {
      username: username,
      staffID: staffID,
      staffType: staffType
    };
};

//rates section
app.post('/commissions', function(request, response) {
  var saleID = request.body.salesID;
  var cRate = request.body.cRate;
  var update = "UPDATE sales SET ? WHERE ?";
  db.query(update, [{commisionRate: cRate}, {saleID: saleID}], (error, result) => {
    var string = JSON.stringify(result);
    console.log("String results: " + string);
    if(string.includes('"affectedRows":0')){
      console.log("Rate not found");
      response.sendStatus(404);
    } else {
        console.log("Rate has changed");
        response.sendStatus(200);
    }
  });
});


app.post('/updateExchangeRate', function(request, response) {
  var exchangeCode = request.body.eCode;
  var exchangeRate = request.body.eRate;
  var exchangeName = request.body.eName;
  var check = "SELECT * FROM exchangerate WHERE exchangeRateCode = ?";
  var update = "UPDATE exchangerate SET ? WHERE ?";
  db.query(check, [exchangeCode], (error, result) => {
    var string = JSON.stringify(result);
    console.log(string);
    if(string.length < 3){
      flag = false;
      console.log("ExchangeCode not in database");
      response.sendStatus(401);
    } else {
      db.query(update, [{exchangerate: exchangeRate, currencyName: exchangeName}, {exchangeRateCode: exchangeCode}], (error, result) => {
        var string = JSON.stringify(result);
        console.log("String results: " + string);
        console.log("exchangeCode updated");
        response.sendStatus(200);
      });
    }
  });
});

app.post('/addExchangeRate', function(request, response) {
  var exchangeCode = request.body.eCode;
  var exchangeRate = request.body.eRate;
  var exchangeName = request.body.eName;
  var check = "SELECT * FROM exchangerate WHERE exchangeRateCode = ?";
  var insert = "INSERT INTO exchangerate(`exchangeRateCode`, `exchangeRate`,`currencyName`)"
    + "VALUES (?, ?, ?)";
  //console.log(exchangeCode);
  //console.log(exchangeRate);
  //console.log(exchangeName);
  db.query(check, [exchangeCode], (error, result) => {
    var string = JSON.stringify(result);
    console.log(string);
    if(string.length > 3){
      console.log("ExchangeCode exists");
      response.sendStatus(401);
    } else {
        db.query(insert, [exchangeCode, exchangeRate, exchangeName],(error, result) => {
          console.log(result);
          console.log("ExchangeRate added to database");
          response.sendStatus(200);
        });
      }
  });
});

app.post('/removeExchangeRate', function(request, response) {
  var exchangeCode = request.body.eCode;
  var check = "SELECT * FROM exchangerate";
  var remove = "DELETE FROM exchangerate WHERE exchangeRateCode = ?";
  db.query(check, (error, result) => {
    var packet = JSON.parse(JSON.stringify(result));
    //console.log(packet.length);
    if(packet.length < 4){
      console.log("Failed: trying to delete below threshold");
      response.sendStatus(401);
    } else {
      db.query(remove, [exchangeCode], (error, result) => {
        var string = JSON.stringify(result);
        var packet = JSON.parse(string);
        if(string.includes('"affectedRows":0')){
            console.log("ExchangeRate does not exist");
            response.sendStatus(404);
        } else {
          response.sendStatus(200);
          console.log("ExchangeRate removed from database");
        }
      });
    }
  });
});

app.listen(port, () => console.log(`Backend app started on port ${port}!`));
