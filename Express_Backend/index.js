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
  var sql = "SELECT * FROM staff WHERE email = ? AND password = ? AND Active = 'yes'";
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
//clears staff info and logouts user
app.get('/logout', function(request, response) {
  console.log("Logout initiatied for User: " + username + "- redirecting to login");
  username = ""; staffType = ""; staffID = ""; email="";
  response.sendStatus(200);
});

// these gets will send the staff info to designate home pages
app.get('/advisor', function(request, response) {
  response.status(200).send({username: username,
  staffID: staffID, staffType: staffType})
	response.end();
});

app.get('/admin', function(request, response) {
  response.status(200).send({username: username,
  staffID: staffID, staffType: staffType})
	response.end();
});

app.get('/manager', function(request, response) {
  response.status(200).send({username: username,
  staffID: staffID, staffType: staffType})
	response.end();
});

app.get('/advisors', function(request, response) {
  var get = "SELECT * FROM staff where staffTypeID = 1";
  db.query(get, (error,result) => {
    response.status(200).send(result);
    response.end();
  });
});

//Staff
app.get('/staff', function(request, response) {
  var get = "SELECT * FROM staff"
    db.query(get, (error,result) => {
      response.status(200).send(result);
      response.end();
    });
});

app.post('/removeStaff', function(request, response) {
  var staffID = request.body.ID
  var del = "UPDATE staff SET active = 'no' WHERE staffID = ? "
  db.query(del, [staffID], (error, result) => {
      var string = JSON.stringify(result);
      if(string.includes('"affectedRows: 1"')){
        response.sendStatus(200);
        response.end();
      }
  });
});

//Customers
app.post('/createCustomer', function(request, response) {
    //issue if discount id is the same it breaks.
    var firstname = request.body.firstname;
    var lastname = request.body.lastname;
    var address = request.body.address;
    var email = request.body.email;
    var valued = request.body.valued;
    var insert = "INSERT INTO customer(`name`, `surname`, `address`, `email`,`customerTypeId`," +
    "`discountAmount` , `discountType`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    //discount values in a seperate sql command
    var drate = request.body.discountrate;
    var dtype = request.body.discounttype;
    var drateID = request.body.drateID;
    var dtypeID = request.body.dtypeID;
    var createDiscountType = "INSERT INTO discounttype(`discountTypeID`,`discountType`) VALUES (?,?)";
    var createDiscountAmount = "INSERT INTO discountamount(`discountId`,`discountPercent`) VALUES (?,?)";

    db.query(createDiscountType, [dtypeID, dtype], (error, result) => {
        var string = JSON.stringify(result);
        //console.log(string);
        db.query(createDiscountAmount, [drateID, drate], (error, result) => {
          var string = JSON.stringify(result);
          //console.log(string);
          db.query(insert, [firstname,lastname,address,email,valued,drateID,dtypeID], (error,result) => {
             var string = JSON.stringify(result);
             //console.log(string);
             if(string.includes('"affectedRows":1')){
               console.log("Customer created");
               response.sendStatus(200);
             }
          })
        });
    });
});

app.get('/customers', function(request, response) {
  var get = "SELECT * FROM customer"
    db.query(get, (error,result) => {
      response.status(200).send(result);
      response.end();
    });
});

app.post('/removeCustomer', function(request, response) {
  var customerID = request.body.ID
  var del = "UPDATE customer SET active = 'no' WHERE customerID = ? "
  db.query(del, [customerID], (error, result) => {
      var string = JSON.stringify(result);
      if(string.includes('"affectedRows: 1"')){
        response.sendStatus(200);
        response.end();
      }
  });
});

//blanks
app.post('/addBlank', function(request, response) {
    var date = request.body.bDate;
    var type = request.body.bType;
    var n = request.body.bNumber;
    var s = type.toString() + n
    var num = parseInt(s);

    var insert = "INSERT INTO blank(`blankNumber`,`statusID`,`recievedDate`," +
    "`blankTypeID`)" +
    "VALUES (?,3,?,?)"
    //console.log("Date: " + date);
    //console.log("Type: " + type);
    //console.log("Num: " + num);
    var checkType = "SELECT blankTypeID FROM blanktype WHERE blankType = ?";
    var exists = "SELECT * FROM blank WHERE blankNumber = ?"
    db.query(checkType, [type], (error, result) => {
      var packet = JSON.parse(JSON.stringify(result));
      var bTypeID = packet[0].blankTypeID;

      if(bTypeID > 0){
        db.query(exists, [num], (error, result) => {
          var string = JSON.stringify(result);
          //console.log(string);
          if(string.length < 3){
            db.query(insert, [num,date,bTypeID], (error, result) => {
              var string = JSON.stringify(result);
              //console.log(error);
              //console.log(result);
              if(string.includes('"affectedRows":1')){
                console.log("Blank inserted");
                response.sendStatus(200);
              }
            });
          } else {
            console.log("Blank already exists");
            response.sendStatus(401);
          }
        });
      }
    });
  });

app.post('/addBulk', function(request, response) {
  var date = request.body.bDate;
  var type = request.body.bType;
  var min = request.body.bMin;
  var max = request.body.bMax;
  var range = (max - min) + 1;
  var values = []
  var strType = type.toString();
  var insert = "INSERT INTO blank(`blankNumber`,`statusID`,`recievedDate`," +
  "`blankTypeID`) VALUES ?";
  var checkType = "SELECT blankTypeID FROM blanktype WHERE blankType = ?";
  db.query(checkType, [type], (error, result) => {
    var packet = JSON.parse(JSON.stringify(result));
    var bTypeID = packet[0].blankTypeID;
    //creating the bulk to push to database
    for(let n = 0; n < range; n++){
      strN = min.toString();
      values.push([parseInt(strType + strN.padStart(6,'0')), 3, date, bTypeID])
      parseInt(min);
      min++;
    }
    db.query(insert, [values], (error, result) => {
      var string = JSON.stringify(result);
      var packet = JSON.parse(string);
      console.log("Blanks inserted");
      response.sendStatus(200);
    });
    //console.log(values);
  });
});

app.post('/removeBlank', function(request, response) {
  var number = request.body.bNumber;
  var del = "UPDATE blank SET statusID = 5 WHERE blankNumber = ?"
  db.query(del, [number], (error,result) => {
    //console.log("Error: " + error);
    //console.log("Result: " + result);
    response.sendStatus(200);
  });
});

app.get('/blanks', function(request, response) {
  var get = "SELECT * FROM blank WHERE statusID < 4";
    db.query(get, (error,result) => {
      response.status(200).send(result);
      response.end();
    });
});

app.get('/advisorBlanks', function(request, response){
  var get = "SELECT * FROM blankallocation WHERE staffID = ?";
  db.query(get,[staffID] ,(error,result) => {
    response.status(200).send(result);
    response.end();
  });
})

//Look into a way of display if a blank has been sold
app.post('/isSold', function(request, response) {
  var num = request.body.num;
  var get = "SELECT * FROM sales WHERE blankNumber = ?"
})

app.post('/assignBlank', function(request, response) {
  var id = request.body.id;
  var number = request.body.bNumber;
  //current date
  let date = new Date().toISOString().slice(0, 10);

  var assign = "INSERT INTO blankallocation(`staffID`,`blankNumber`) VALUES (?,?)";
  var check = "SELECT * FROM blankallocation WHERE blankNumber = ?"
  var update = "UPDATE blank SET ? WHERE ?"
  db.query(check, [number], (error, result) => {
    var string = JSON.stringify(result);
    if(string.length < 3){
      db.query(assign, [id,number], (error,result) => {
        var string = JSON.stringify(result);
        if(string.includes('"affectedRows":1')){
          console.log("Blank assigned");
          db.query(update, [{statusID: 2 , assignedDate : date}, {blankNumber: number}],
          (error, result) => {
            var string = JSON.stringify(result);
            if(string.includes('"affectedRows":1')){
              response.sendStatus(200);
            }
          });
        }
      });
    } else {
      console.log("Blank already assigned");
      response.sendStatus(401);
    }
  });
});

app.post('/assignBulk', function(request, response) {
  var id = request.body.id;
  var type = request.body.type;
  var min = request.body.min;
  var max = request.body.max;
  var range = (max - min) + 1;
  var assigns = [];
  var blanks = [];
  let date = new Date().toISOString().slice(0, 10);
  var strType = type.toString();

  var assign = "INSERT INTO blankallocation(`staffID`,`blankNumber`) VALUES ?";
  var update = "UPDATE blank SET ? WHERE blankNumber = ?";
  //bulk creation
  for(let n = 0; n < range; n++){
      strN = min.toString();
      assigns.push([id , parseInt(strType + strN.padStart(6,'0'))]);
      blanks.push([parseInt(strType + strN.padStart(6,'0'))]);
      parseInt(min);
      min++;
  }
  db.query(assign, [assigns], (error, result) => {
    console.log(error);
    var string = JSON.stringify(result);
    console.log("String: " + string);
    if(string.length > 3){
      for(let r = 0; r < range; r++){
        db.query(update,[{statusID: 2, assignedDate: date},blanks[r]], (error, result) => {
          var string = JSON.stringify(result);
        });
      }
      response.sendStatus(200);
    }
  });
});

app.post('/reAssignBlank', function(request, response) {
  var id = request.body.id;
  var num = request.body.num;
  var newID = request.body.newID;
  let date = new Date().toISOString().slice(0, 10);

  var reAssign = "UPDATE blankallocation SET staffID = ? WHERE blankAllocationId = ?";
  var checkAssign = "SELECT blankAllocationId FROM blankallocation WHERE blankNumber = ?" +
  "AND staffID = ?";
  var updateBlank = "UPDATE blank SET ? WHERE ?";

  db.query(checkAssign, [num, id], (error, result) => {
      var string = JSON.stringify(result);
      //console.log("String: " + string);
      if(string.length < 3){
        response.sendStatus(401);
      }
      else {
        var packet = JSON.parse(string);
        //console.log("Packet: " + packet);
        var blankID = packet[0].blankAllocationId;
        //console.log("BlankID: " + blankID);
        db.query(reAssign, [newID, blankID], (error, result) => {
          //console.log(error);
          //console.log("Reassign String: " + JSON.stringify(result));
          console.log("Blank Reassigned");

          db.query(updateBlank,[{assignedDate: date}, {blankNumber: num}], (error, result) => {
            //console.log(error);
            var string = JSON.stringify(result);
            //console.log("updateBlank String: " + string);
            if(string.includes('"affectedRows":1')){
              response.sendStatus(200);
            }
          });
        });
      }
    });
});

app.get('/assigns', function(request, response) {
  var get = "SELECT * FROM blankallocation";
    db.query(get, (error,result) => {
      response.status(200).send(result);
      response.end();
    });
});

//sales section
app.post('/addInterlineSale', function(request, response) {
  //sales data & queries
  var num = request.body.num;
  var origin = request.body.origin;
  var destination= request.body.destination;
  var exchangeCode = request.body.eCode;
  var localCurrency = request.body.local;
  var usdValue = request.body.usd;
  var tax = request.body.tax;
  var otherTax = request.body.otherTax;
  var paymentType = parseInt(request.body.paymentType);
  var commission = request.body.commission;
  var name = request.body.cforename;
  var surname = request.body.csurname;
  var isPaid = "yes";
  let date = new Date().toISOString().slice(0, 10);
  var now = new Date();
  var insert = "INSERT INTO sales(`staffID`,`customerID`,`blankNumber`,`amount`," +
  "`amountUSD`,`localTax`,`otherTax`,`isRefunded`,`payByDate`,`paymentTypeID`," +
  "`isPaid`,`commisionRate`,`exchangeRateCode`, `transactionDate`)" +
  "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  var getcustomerID = "SELECT * FROM customer WHERE name = ? AND surname = ?";
  var insertJourney = "UPDATE blank SET departureDestination = ? ,arrivalDestination = ? " +
    ",statusID = 1 WHERE blankNumber = ?";

  //card data & queries
  var cardNum = request.body.cardNum;
  var cdate = request.body.date;
  var ccv = request.body.ccv;
  var cardinsert = "INSERT INTO carddetails(`cardNumber`,`expiryDate`,`securityCode`)" +
  "VALUES (?,?,?)";
  var getCardID = "SELECT CardID FROM carddetails WHERE cardNumber = ?";
  var cinsert = "INSERT INTO sales(`staffID`,`customerID`,`blankNumber`,`amount`," +
  "`amountUSD`,`localTax`,`otherTax`,`isRefunded`,`payByDate`,`paymentTypeID`," +
  "`isPaid`,`commisionRate`,`exchangeRateCode`, `transactionDate`, carddetails)" +
  "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  //getCustomerID from db
  // first get CustomerID from db
  db.query(getcustomerID, [name, surname], (error,result) => {
    console.log("Cust ID Error: " + error);
    var string = JSON.stringify(result);
    //if customer exists
    if(string.length > 3) {
      var packet = JSON.parse(JSON.stringify(result));
      console.log("Cust ID Packet: " + packet);
      var customerID = packet[0].customerID;
      console.log("Cust ID: " + customerID);
      //if valued customer
      if(paymentType === 3){
        console.log("---------Valued Payer---------");
        console.log("Current Date: " + date);
        let newDate = new Date(now.getFullYear(),now.getMonth() + 1, now.getDate()).toISOString().slice(0,10);
        console.log("New Date: " + newDate);
        isPaid = "no";
        //add sale to db
        console.log("Valued Customer sale being added");
        db.query(insert, [staffID,customerID,num,localCurrency,usdValue,tax,otherTax,
        'no',newDate,paymentType,isPaid,commission,exchangeCode,newDate], (error,result) => {
          var string = JSON.stringify(result);
          if(string.length > 3){
            console.log("Interline Sale added");
            //add destination info & update blank
            db.query(insertJourney, [destination, origin, num], (error, result) => {
              console.log("Insert Journey Error: " + error);
              var string = JSON.stringify(result);
              if(string.length > 3){
                console.log("Blank Updated and Journey Added");
                response.sendStatus(200);
              }
            });
          } else {response.sendStatus(401);}
        });
      //if paying by card
      } else if(paymentType === 2) {
        console.log("---------Card Payment---------");
        //insert card details first
        db.query(cardinsert, [cardNum,cdate,ccv], (error, result) => {
          var string = JSON.stringify(result);
          console.log("Error: " + error);
          if(string.length > 3){
            console.log("Card Details added");
            console.log("Fetching Card ID");
            //get CardID to link to sales row
            db.query(getCardID,[cardNum], (error, result) => {
              var packet = JSON.parse(JSON.stringify(result));
              var cardID = packet[0].CardID;
              //add sale to db
              console.log("cardID: " + cardID);
              console.log("Adding card payer sale to DB");
              //add sale to db
              db.query(cinsert, [staffID,customerID,num,localCurrency,usdValue,tax,otherTax,
              'no',date,paymentType,isPaid,commission,exchangeCode,date,cardID], (error,result) => {
                console.log(error);
                var string = JSON.stringify(result);
                if(string.length > 3){
                  console.log("Interline Sale added");
                  //add destination info & update blank
                  db.query(insertJourney, [destination, origin, num], (error, result) => {
                    console.log("Insert Journey Error: " + error);
                    var string = JSON.stringify(result);
                    console.log(string);
                    if(string.length > 3){
                      console.log("Blank Updated and Journey Added");
                      response.sendStatus(200);
                    }
                });
              } else {response.sendStatus(401);}
            });
            });
          }
        });
        //cash payment
      } else {
          console.log("---------Cash Payer---------");
          //add sale to db
          db.query(insert, [staffID,customerID,num,localCurrency,usdValue,tax,otherTax,
          'no',date,paymentType,isPaid,commission,exchangeCode,date], (error,result) => {
            console.log("Error: " + error);
            var string = JSON.stringify(result);
            if(string.length > 3){
              console.log("Interline Sale added");
              //add destination info & update blank
              db.query(insertJourney, [destination, origin, num], (error, result) => {
                console.log("Insert Journey Error: " + error);
                var string = JSON.stringify(result);
                if(string.length > 3){
                  console.log("Blank Updated and Journey Added");
                  response.sendStatus(200);
                }
              });
            } else {response.sendStatus(401);}
          });
      }
    }
  });
});

app.post('/addDomesticSale', function(request, response) {
  //sales data
  var num = request.body.num;
  var origin = request.body.origin;
  var destination= request.body.destination;
  var usdValue = request.body.usd;
  var tax = request.body.tax;
  var paymentType = parseInt(request.body.paymentType);
  var commission = request.body.commission;
  var name = request.body.cforename;
  var surname = request.body.csurname;
  var isPaid = "yes";
  let date = new Date().toISOString().slice(0, 10);
  var now = new Date();
  var insert = "INSERT INTO sales(`staffID`,`customerID`,`blankNumber`,`amount`," +
  "`amountUSD`,`localTax`,`otherTax`,`isRefunded`,`payByDate`,`paymentTypeID`," +
  "`isPaid`,`commisionRate`,`exchangeRateCode`, `transactionDate`)" +
  "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  var getcustomerID = "SELECT * FROM customer WHERE name = ? AND surname = ?";
  var insertJourney = "UPDATE blank SET departureDestination = ? ,arrivalDestination = ? " +
  ",statusID = 1 WHERE blankNumber = ?";

  //card details
  var cardNum = request.body.cardNum;
  let cdate = request.body.date;
  var ccv = request.body.ccv;
  var cardinsert = "INSERT INTO carddetails(`cardNumber`,`expiryDate`,`securityCode`)" +
  "VALUES (?,?,?)";
  var getCardID = "SELECT CardID FROM carddetails WHERE cardNumber = ?";
  console.log("Payment Type: " + paymentType);
  var cinsert = "INSERT INTO sales(`staffID`,`customerID`,`blankNumber`,`amount`," +
  "`amountUSD`,`localTax`,`otherTax`,`isRefunded`,`payByDate`,`paymentTypeID`," +
  "`isPaid`,`commisionRate`,`exchangeRateCode`, `transactionDate`, carddetails)" +
  "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

  // first get CustomerID from db
  db.query(getcustomerID, [name, surname], (error,result) => {
    console.log("Cust ID Error: " + error);
    var string = JSON.stringify(result);
    //if customer exists
    if(string.length > 3) {
      var packet = JSON.parse(JSON.stringify(result));
      console.log("Cust ID Packet: " + packet);
      var customerID = packet[0].customerID;
      console.log("Cust ID: " + customerID);
      //if valued customer
      if(paymentType === 3){
        console.log("---------Valued Payer---------");
        console.log("Current Date: " + date);
        let newDate = new Date(now.getFullYear(),now.getMonth() + 1, now.getDate()).toISOString().slice(0,10);
        console.log("New Date: " + newDate);
        isPaid = "no";
        //add sale to db
        console.log("Valued Customer sale being added");
        db.query(insert, [staffID,customerID,num,0,usdValue,tax,0,'no',newDate,paymentType
        ,isPaid,commission,"USD",newDate], (error,result) => {
          var string = JSON.stringify(result);
          if(string.length > 3){
            console.log("Domestic Sale added");
            //add destination info & update blank
            db.query(insertJourney, [destination, origin, num], (error, result) => {
              console.log("Insert Journey Error: " + error);
              var string = JSON.stringify(result);
              if(string.length > 3){
                console.log("Blank Updated and Journey Added");
                response.sendStatus(200);
              }
            });
          } else {response.sendStatus(401);}
        });
      //if paying by card
      } else if(paymentType === 2) {
        console.log("---------Card Payment---------");
        //insert card details first
        db.query(cardinsert, [cardNum,cdate,ccv], (error, result) => {
          var string = JSON.stringify(result);
          console.log("Error: " + error);
          if(string.length > 3){
            console.log("Card Details added");
            console.log("Fetching Card ID");
            //get CardID to link to sales row
            db.query(getCardID,[cardNum], (error, result) => {
              var packet = JSON.parse(JSON.stringify(result));
              var cardID = packet[0].CardID;
              //add sale to db
              console.log("cardID: " + cardID);
              console.log("Adding card payer sale to DB");
              //add sale to db
              db.query(cinsert, [staffID,customerID,num,0,usdValue,tax,0,'no',date,paymentType
              ,isPaid,commission,"USD",date,cardID], (error,result) => {
                console.log(error);
                var string = JSON.stringify(result);
                if(string.length > 3){
                  console.log("Domestic Sale added");
                  //add destination info & update blank
                  db.query(insertJourney, [destination, origin, num], (error, result) => {
                    console.log("Insert Journey Error: " + error);
                    var string = JSON.stringify(result);
                    console.log(string);
                    if(string.length > 3){
                      console.log("Blank Updated and Journey Added");
                      response.sendStatus(200);
                    }
                });
              } else {response.sendStatus(401);}
            });
            });
          }
        });
        //cash payment
      } else {
          console.log("---------Cash Payer---------");
          //add sale to db
          db.query(insert, [staffID,customerID,num,0,usdValue,tax,0,'no',date,paymentType
          ,isPaid,commission,"USD",date], (error,result) => {
            console.log("Error: " + error);
            var string = JSON.stringify(result);
            if(string.length > 3){
              console.log("Domestic Sale added");
              //add destination info & update blank
              db.query(insertJourney, [destination, origin, num], (error, result) => {
                console.log("Insert Journey Error: " + error);
                var string = JSON.stringify(result);
                if(string.length > 3){
                  console.log("Blank Updated and Journey Added");
                  response.sendStatus(200);
                }
              });
            } else {response.sendStatus(401);}
          });
      }
    }
  });
});

//rates section
app.post('/commissions', function(request, response) {
  var saleID = request.body.salesID;
  var cRate = request.body.cRate;
  var update = "UPDATE sales SET ? WHERE ?";
  db.query(update, [{commisionRate: cRate}, {saleID: saleID}], (error, result) => {
    var string = JSON.stringify(result);
    //console.log("String results: " + string);
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
    //console.log(string);
    if(string.length > 3){
      console.log("ExchangeCode exists");
      response.sendStatus(401);
    } else {
        db.query(insert, [exchangeCode, exchangeRate, exchangeName],(error, result) => {
          //console.log(result);
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
    if(packet.length < 14){
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

app.get('/rateCodes', function(request, response) {
  var get = "SELECT * FROM exchangerate";
  db.query(get, (error,result) => {
    response.status(200).send(result);
    response.end();
  });

});


app.listen(port, () => console.log(`Backend app started on port ${port}!`));
