const fs = require('fs');
const cors = require('cors');
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const port = 5000;
const app = express();
//global variables to be accessed in other pages
var username = "", staffType = "", staffID = "", email="";
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
    database: 'airticketsales',
    multipleStatements: true
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

// these gets send staff info to designate home pages
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
//set this up
app.post('/createStaff', function(request, response) {
    //issue if discount id is the same it breaks.
    var firstname = request.body.firstname;
    var lastname = request.body.lastname;
    var address = request.body.address;
    var email = request.body.email;
    var staffType = request.body.valued;
    var insert = "INSERT INTO staff(`name`, `surname`, `address`, `email`,`customerTypeId`," +
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

app.post('/removeStaff', function(request, response) {
  var staffID = request.body.id
  var del = "UPDATE staff SET active = 'no' WHERE staffID = ? "
  db.query(del, [staffID], (error, result) => {
      var string = JSON.stringify(result);
      if(string.length > 3){
        response.sendStatus(200);
        response.end();
      }
  });
});

app.post('/reactivateStaff', function(request, response) {
  var staffID = request.body.id
  var add = "UPDATE staff SET active = 'yes' WHERE staffID = ? "
  db.query(add, [staffID], (error, result) => {
      var string = JSON.stringify(result);
      if(string.length > 3){
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
    var getAmount = "SELECT discountId FROM discountamount WHERE discountPercent = ?";
    var fixedInsert = "INSERT INTO customer(`name`, `surname`, `address`, `email`,`customerTypeId`," +
    "`discountAmount` , `discountType`,`active`) VALUES (?, ?, ?, ?, ?, ?, 1, 'yes')";

    //discount values in a seperate sql command
    var drate = parseInt(request.body.discountrate);
    var dtype = parseInt(request.body.discounttype);
    var min = parseInt(request.body.min);
    var max = parseInt(request.body.max);
    var r1 = parseInt(request.body.d1);
    var r2 = parseInt(request.body.d2);
    var r3 = parseInt(request.body.d3);

    var flexibleInsert = "INSERT INTO customer(`name`, `surname`, `address`, `email`,`customerTypeId`," +
    "`discountAmount` , `discountType`,`flexibleDiscount`,`active`) VALUES (?, ?, ?, ?, ?, ?, 2, ?, 'yes')";
    var addFlexible = "INSERT INTO flexiblediscount(`range1`,`range2`,`discount1`,`discount2`,`discount3`)" +
    " VALUES (?,?,?,?,?)";
    var getFlexibleID = "SELECT discountID FROM flexiblediscount WHERE range1 = ? AND range2 = ?";

    console.log("Discount Type: " + dtype);
    if(dtype == 1){
      //get discountAmount
      db.query(getAmount, [drate], (error, result) => {
        var packet = JSON.parse(JSON.stringify(result));
        var drateID = packet[0].discountId;
        console.log("DiscountId: " + drateID);
        //insert into customer
        db.query(fixedInsert, [firstname,lastname,address,email,valued,drateID],
        (error,result) => {
          var string = JSON.stringify(result);
          //console.log(string);
          if(string.includes('"affectedRows":1')){
            console.log("Customer created");
            response.sendStatus(200);
          } else {response.sendStatus(401);}
        });
      });
    } else if(dtype == 2) {
      db.query(getAmount, [r3], (error, result) => {
        console.log(error);
        var packet = JSON.parse(JSON.stringify(result));
        var maxID = packet[0].discountId;
        console.log("DiscountId: " + maxID);
        //add details into flexibleDiscount table
        db.query(addFlexible, [min,max,r1,r2,r3], (error, result) => {
          var string = JSON.stringify(result);
          if(string.length > 3){
            console.log("Flexible Discount data added to DB");
            //get flexible data's primary key
            db.query(getFlexibleID, [min,max], (error,result) => {
              var packet = JSON.parse(JSON.stringify(result));
              var flexibleID = packet[0].discountID;
              console.log("Flexible Discount ID: " + flexibleID);
              //add customer to db with flexibleID included
              db.query(flexibleInsert, [firstname,lastname,address,email,
              valued,maxID,flexibleID], (error,result) => {
                  var string = JSON.stringify(result);
                  console.log("Flexible Insert Error: " + error);
                  if(string.includes('"affectedRows":1')){
                    console.log("Customer created");
                    response.sendStatus(200);
                  } else {response.sendStatus(401);}
              });
            });
          } else {response.sendStatus(401);}
        });
      });
    } else {response.sendStatus(401);}
});

app.get('/customers', function(request, response) {
  var get = "SELECT * FROM customer"
    db.query(get, (error,result) => {
      response.status(200).send(result);
      response.end();
    });
});

app.post('/removeCustomer', function(request, response) {
  var customerID = request.body.id
  var del = "UPDATE customer SET active = 'no' WHERE customerID = ? "
  db.query(del, [customerID], (error, result) => {
      var string = JSON.stringify(result);
      if(string.length > 3){
        response.sendStatus(200);
        response.end();
      }
  });
});

app.post('/reactivateCustomer', function(request, response) {
  var customerID = request.body.id
  var add = "UPDATE customer SET active = 'yes' WHERE customerID = ? "
  db.query(add, [customerID], (error, result) => {
      var string = JSON.stringify(result);
      if(string.length > 3){
        response.sendStatus(200);
        response.end();
      }
  });
});

//blanks
app.post('/addBlank', function(request, response) {
    var date = request.body.bDate;
    var type = request.body.bType;
    var n = request.body.bNumber.padStart(8,'0');
    var num = parseInt(type.toString() + n );
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
  var blanks = []
  var strType = type.toString();
  //sort out checkBulk
  var checkBulk = "SELECT blankNumber FROM blank WHERE blankNumber in (?)"
  var insert = "INSERT INTO blank(`blankNumber`,`statusID`,`recievedDate`," +
  "`blankTypeID`) VALUES ?";
  var checkType = "SELECT blankTypeID FROM blanktype WHERE blankType = ?";
  db.query(checkType, [type], (error, result) => {
    var packet = JSON.parse(JSON.stringify(result));
    var bTypeID = packet[0].blankTypeID;
    //creating the bulk to push to database
    for(let n = 0; n < range; n++){
      strN = min.toString();
      values.push([parseInt(strType + strN.padStart(9,'0')), 3, date, bTypeID]);
      blanks.push([parseInt(strType + strN.padStart(9,'0'))]);
      parseInt(min);
      min++;
    }
    db.query(checkBulk, [blanks], (error, result) => {
      var packet = JSON.parse(JSON.stringify(result));
      var length = Object.keys(packet).length;
      if(length > 0){
         response.sendStatus(401);
      } else {
        db.query(insert, [values], (error, result) => {
          var string = JSON.stringify(result);
          var packet = JSON.parse(string);
          console.log("Blanks inserted");
          response.sendStatus(200);
        });
      }
    });
  });
});

app.post('/removeBlank', function(request, response) {
  var number = request.body.bNumber;
  var check = "SELECT statusID FROM blank WHERE blankNumber = ?"
  var del = "UPDATE blank SET statusID = 5 WHERE blankNumber = ?"
  db.query(check, [number], (error,result) => {
    var packet = JSON.parse(JSON.stringify(result));
    var status = packet[0].statusID;
    if(status === 2){
      response.sendStatus(401);
    } else {
      db.query(del, [number], (error, result) => {
        response.sendStatus(200);
      });
    }
  });
});

app.get('/blanks', function(request, response) {
  var get = "SELECT * FROM blank WHERE statusID < 4";
    db.query(get, (error,result) => {
      response.status(200).send(result);
      response.end();
    });
});

app.get('/refunds', function(request, response) {
  var get = "SELECT * FROM blank WHERE statusID = 5";
    db.query(get, (error,result) => {
      response.status(200).send(result);
      response.end();
    });
});

//display blanks
app.get('/advisorBlanks', function(request, response){
  var get = "SELECT * FROM blankallocation WHERE staffID = ?";
  db.query(get,[staffID] ,(error,result) => {
    response.status(200).send(result);
    response.end();
  });
})

app.get('/advisorDBlanks', function(request, response) {
  var get = "SELECT blankNumber FROM blankallocation WHERE staffID = ?";
  var getSpecifics = "SELECT * FROM blank WHERE blankNumber in (?) AND blankTypeID in ?";
  var blanks = [];
  var conditions = [[4,5]];
  db.query(get,[staffID] ,(error,result) => {
    var packet = JSON.parse(JSON.stringify(result));
    //gets the JSON object's total length - since we're getting multiple rows from a single column
    var length = Object.keys(packet).length;
    console.log("DBlanks Packet length: " + length);
    for(var n = 0; n < length; n++) {
      blanks.push(packet[n].blankNumber);
    }
    db.query(getSpecifics, [blanks,conditions], (error, result) => {
      console.log("DBlanks getSpecifics Error: " + error);
      response.status(200).send(result);
      response.end();
    })
  });
})

app.get('/advisorIBlanks', function(request, response) {
  var get = "SELECT blankNumber FROM blankallocation WHERE staffID = ?";
  var getSpecifics = "SELECT * FROM blank WHERE blankNumber in (?) AND blankTypeID in ?";
  var blanks = [];
  var conditions = [[1,2,3]];
  db.query(get,[staffID] ,(error,result) => {
    var packet = JSON.parse(JSON.stringify(result));
    var length = Object.keys(packet).length;
    console.log("IBlanks Packet length: " + length);
    for(var n = 0; n < length; n++) {
      blanks.push(packet[n].blankNumber);
    }
    db.query(getSpecifics, [blanks, conditions], (error, result) => {
      console.log("IBlanks getSpecifics Error: " + error);
      response.status(200).send(result);
      response.end();
    })
  });
})

app.get('/advisorLateBlanks', function(request, response) {
  var get = "SELECT * FROM sales WHERE staffID = ? AND paymentTypeID = 3";
  db.query(get,[staffID],(error,result) => {
    response.status(200).send(result);
    response.end();
  });
});

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
  var check = "SELECT blankAllocationId FROM blankallocation WHERE blankNumber in (?)"
  var assign = "INSERT INTO blankallocation(`staffID`,`blankNumber`) VALUES ?";
  var update = "UPDATE blank SET ? WHERE blankNumber = ?";
  //bulk creation
  for(let n = 0; n < range; n++){
      strN = min.toString();
      assigns.push([id , parseInt(strType + strN.padStart(9,'0'))]);
      blanks.push([parseInt(strType + strN.padStart(9,'0'))]);
      parseInt(min);
      min++;
  }

  //checks the bulk if it has been assigned already
  db.query(check, [blanks], (error, result) => {
    var string = JSON.stringify(result);
    var packet = JSON.parse(JSON.stringify(result));
    var length = Object.keys(packet).length;
    if(length > 0){
       response.sendStatus(401);
    } else {
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
  let date = request.body.sdate;
  console.log("Date: " + date);
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
  var insert = "INSERT INTO sales(`staffID`,`customerID`,`blankNumber`,`amount`," +
  "`amountUSD`,`localTax`,`otherTax`,`isRefunded`,`payByDate`,`paymentTypeID`," +
  "`isPaid`,`commisionRate`,`exchangeRateCode`, `transactionDate`)" +
  "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  var getcustomerID = "SELECT * FROM customer WHERE name = ? AND surname = ?";
  var insertJourney = "UPDATE blank SET arrivalDestination = ?, departureDestination = ? " +
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
        let newDate = new Date(date.slice(0,4), parseInt(date.slice(-5,-3)), date.slice(-2)).toISOString().slice(0,10);
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
  let date = request.body.sdate;
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
  var insert = "INSERT INTO sales(`staffID`,`customerID`,`blankNumber`,`amount`," +
  "`amountUSD`,`localTax`,`otherTax`,`isRefunded`,`payByDate`,`paymentTypeID`," +
  "`isPaid`,`commisionRate`,`exchangeRateCode`, `transactionDate`)" +
  "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  var getcustomerID = "SELECT * FROM customer WHERE name = ? AND surname = ?";
  var insertJourney = "UPDATE blank SET arrivalDestination = ?, departureDestination = ?" +
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
        console.log("Month: " + (parseInt(date.slice(-5,-3)) + 1));
        let newDate = new Date(date.slice(0,4), parseInt(date.slice(-5,-3)), date.slice(-2)).toISOString().slice(0,10);
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

app.post('/refund', function(request, response) {
  var num = request.body.num;
  var data = "";
  var updateBlank = "UPDATE blank set statusID = 5 WHERE blankNumber = ?";
  var updateSale = "UPDATE sales set isRefunded = 'yes' WHERE blankNumber = ?";
  console.log("------Refund------");
  db.query(updateBlank, [num], (error,result) => {
    var string = JSON.stringify(result);
    if(string.length > 3){
      console.log("Blank updated");
      db.query(updateSale, [num], (error,result) => {
        if(string.length > 3){
          console.log("Sale updated");
          response.redirect('/logRefund');
        } else{response.sendStatus(401);}
      });
    } else{response.sendStatus(401);}
  });
});

app.post('/lateAmount', function(request, response) {
  var num = request.body.num;
  var get = "SELECT amountUSD FROM sales WHERE blankNumber = ?";
  db.query(get, [num], (error,result) => {
    response.send(result).status(200);
    response.end();
  });
});

app.post('/latepayment', function(request, response) {
  var blank = request.body.blank;
  var update = "UPDATE sales SET isPaid = 'yes' WHERE blankNumber = ?";
  var checkBlank = "SELECT * FROM sales WHERE blankNumber = ? AND isPaid = 'yes'";
  var cardNum = request.body.cardNum;
  var cdate = request.body.date;
  var ccv = request.body.ccv;
  var cardinsert = "INSERT INTO carddetails(`cardNumber`,`expiryDate`,`securityCode`)" +
  "VALUES (?,?,?)";
  var getCardID = "SELECT CardID FROM carddetails WHERE cardNumber = ?";
  var cardupdate = "UPDATE sales SET isPaid = 'yes', cardDetails = ? WHERE blankNumber = ?";
  db.query(checkBlank, [blank], (error, result) => {
    var string = JSON.stringify(result);
    if(string.length < 3){
      if(cardNum.length > 1){
        db.query(cardinsert, [cardNum,cdate,ccv], (error, result) => {
          var string = JSON.stringify(result);
          var packet = JSON.parse(string);
          if(string.length > 3){
            console.log("Card added to DB");
            db.query(getCardID, [cardNum], (error, result) => {
              var packet = JSON.parse(JSON.stringify(result));
              var cardID = packet[0].CardID;
              db.query(cardupdate, [cardID, blank], (error,result) => {
                var string = JSON.stringify(result);
                if(string.length > 3){
                  console.log("Sales updated");
                  response.sendStatus(200);
                } else {response.sendStatus(401);}
              });
            });
          } else {response.sendStatus(401);}
        });
      } else {
        db.query(update, [blank], (error,result) => {
          var string = JSON.stringify(result);
          if(string.length > 3){
            console.log("Late payment accepted");
            response.sendStatus(200);
          } else {response.sendStatus(401);}
        });
      }
    } else {
      console.log("Blank already paid");
      response.sendStatus(400);
    }
  });
});

//for refund log
function checkPaymentType(type) {
    switch (type) {
      case 1:
        return 'Cash';
        break;
      case 2:
        return 'Card';
        break;
      case 3:
        return 'Valued';
        break;
      default:
        return 'null';
    }
}

app.post('/logRefund', function(request, response) {
  var logData = "";
  var num = request.body.num;
  const nameBegin = 'logs/blank_';
  const nameEnd =  '_Refund.txt';
  var filename = nameBegin.concat(num, nameEnd);
  console.log(filename);
  var dataCollection = "SELECT B.blankNumber, departureDestination," +
  "arrivalDestination, B.statusID, S.staffID, S.amount, S.amountUSD," +
  "S.localTax,S.otherTax ,S.paymentTypeID, S.commisionRate, S.exchangeRateCode," +
  "S.transactionDate FROM blank B, sales S WHERE B.blankNumber = ? " +
  " AND B.blankNumber = S.blankNumber";
  if (fs.existsSync(filename)) {
    console.log("This blank has already been logged");
    response.sendStatus(401);
  } else {
      db.query(dataCollection, [num], (error, result) => {
      console.log(error);
      console.log(result);
      var packet = JSON.parse(JSON.stringify(result));
      logData += "--------------Refund Details for Blank Number: "
      + packet[0].blankNumber + '--------------' + '\n';
      logData += "Origin: " + packet[0].departureDestination + '\n';
      logData += "Destination: " + packet[0].arrivalDestination + '\n';
      logData += "StaffID: " + packet[0].staffID + '\n';
      logData += "Amount: " + packet[0].amount + '\n';
      logData += "USD Amount: " + packet[0].amountUSD + '\n';
      logData += "Local Tax: " + packet[0].localTax + '\n';
      logData += "Other Tax: " + packet[0].otherTax + '\n';
      logData += "Payment Type: " + checkPaymentType(packet[0].paymentTypeID) + '\n';
      logData += "Commission Rate: " + packet[0].commisionRate + '\n';
      logData += "Exchange Code: " + packet[0].exchangeRateCode + '\n';
      logData += "Transaction Date: " + packet[0].transactionDate.toString().slice(0,10)
      + '\n' + '\n';

      fs.writeFile(filename, logData, 'utf8', function (err) {
        if (err) throw err;
        console.log('Refund Details saved in logs as: Blank:_' +num+ '_Refund.txt');
        response.sendStatus(200);
    });
  });
  }
});

app.get('/alertLatePayment', function(request, response) {
  var get = "SELECT payByDate FROM sales WHERE paymentTypeID = 3";
  db.query(get, (error,result) => {
    var packet = JSON.parse(JSON.stringify(result));
    var today = parseInt(new Date());
    console.log(today);
    /*
    for(var i in packet){
      var date = parseInt(packet[i].payByDate);
      console.log("Date: " + date);
    }
    */
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

//searches
app.post('/searchBlanks', function(request, response) {
  var num = parseInt(request.body.num);
  var search = "SELECT * FROM blank WHERE blankNumber LIKE ?";
  db.query(search, ['%' + num + '%'], (error, result) => {
    response.status(200).send(result);
    response.end();
  });
});

app.post('/searchCustomers', function(request,response) {
  var details = request.body.details;
  var search = "SELECT * FROM customer WHERE name LIKE ? or surname LIKE ? " +
  "or customerID LIKE ?"
  db.query(search,['%'+details+'%','%'+details+'%','%'+details+'%','%'+details+'%',
  '%'+details+'%'], (error,result) => {
      response.status(200).send(result);
      response.end();
  });
});

app.get('/test', function(request, response) {
  var get = "SELECT * FROM sales";
  db.query(get, (error,result) => {
    response.status(200).send(result);
  });
});

//------------------------------------------------------------------------------------------------------------------------
// individual Report
app.post('/individualReport', (request, response) => {
   let individualReport = 'select distinct (Sales.saleID) AS saleID, (Sales.amount) AS amount, ' +
       '(Sales.amountUSD) AS amountUSD, (SELECT Sales.amount+Sales.localTax where Sales.paymentTypeID=1) AS cash, ' +
       '(SELECT ((Sales.amount+Sales.localTax)/ExchangeRate.exchangeRate) where ' +
       'Sales.paymentTypeID=2) AS usd, (SELECT Sales.amount+Sales.localTax where ' +
       'Sales.paymentTypeID=2) AS bgl, (Sales.localTax) AS localTax, (SELECT Sales.amount+Sales.localTax) AS ' +
       'totalAmountPaid, (SELECT Sales.amount) AS commissionable, (sales.commisionRate) AS commissionRate ' +
       'from Sales inner join ExchangeRate, Blank, BlankType, CardDetails, TypeOfPayment where ' +
       'Sales.exchangeRateCode=ExchangeRate.exchangeRateCode and (Sales.transactionDate ' +
       'BETWEEN ? AND ? and Sales.blankNumber=Blank.blankNumber and ' +
       'Blank.blankTypeID=BlankType.blankTypeID and BlankType.blankArea="domestic" and ' +
       'Sales.paymentTypeID=TypeOfPayment.paymentTypeID) order by saleID;';
   var begin = request.body.start;
   var end = request.body.end;
   console.log("Begin Date: " + begin);
   console.log("End Date: " + end);
   db.query(individualReport,[begin, end] ,(error, results) => {
      if (error) throw error;
      console.log(results);
      response.status(200).send(results);
      response.end();
   });
});

// global domestic
app.post('/domesticReport', (request, response) => {
    let finalResults = [];
    //let tempArray = [];
    //let ids = [];
    let length2 = 0;
    let domesticReportID = 'select distinct (Sales.staffID) AS staffID from Sales inner join Blank,BlankType where ' +
        '(Sales.transactionDate BETWEEN ? AND ? and ' +
        'Sales.blankNumber=Blank.blankNumber and Blank.blankTypeID=BlankType.blankTypeID ' +
        'and BlankType.blankArea="domestic") order by Sales.staffID asc;';
    let begin = request.body.start;
    let end = request.body.end;
    db.query(domesticReportID,[begin, end],(error, results) => {
        if (error) throw error;
        console.log(results);
        let packet = JSON.parse(JSON.stringify(results));
        let length1 = Object.keys(packet).length;
        console.log(packet[0].staffID);
        for (let i = 0; i < length1; i++) {
            //ids.push(packet[i].staffID);
            // ------------------------------------------------------------------------------
            console.log("IDs: " + packet[i].staffID);
            let amount = 0;
            let amountUSD = 0;
            let tax = 0;
            let totalDocumentAmount = 0;
            let cash = 0;
            let usd = 0;
            let bgl = 0;
            let totalAmountPaid = 0;
            let commissionable = 0;
            let nonAssessAmounts = 0;
            let commission = 0;
            let domesticReportByID = 'select distinct (Sales.amount) AS amount, (Sales.amountUSD) AS amountUSD, ' +
                '(Sales.localTax + Sales.otherTax) AS tax, (SELECT ' +
                'Sales.amount + Sales.localTax + Sales.otherTax) AS totalDocumentAmount, (SELECT ' +
                'Sales.amount + Sales.localTax + Sales.otherTax where Sales.paymentTypeID=1) AS CASH, ' +
                '(SELECT ((Sales.amount + Sales.localTax + sales.otherTax)/ExchangeRate.exchangeRate) ' +
                'where Sales.paymentTypeID=2) AS USD, (SELECT ' +
                'Sales.amount + Sales.localTax + Sales.otherTax where Sales.paymentTypeID=2) AS BGL, ' +
                '(SELECT Sales.amount + Sales.localTax + Sales.otherTax) AS totalPaidAmount, (SELECT ' +
                'Sales.amount) AS commissionable, (SELECT Sales.localTax + Sales.otherTax) AS ' +
                'nonAssessAmounts, (Sales.commisionRate) AS commissionRate ' +
                'from Sales inner join ExchangeRate, Blank, BlankType, CardDetails, TypeOfPayment where ' +
                'Sales.exchangeRateCode=ExchangeRate.exchangeRateCode and (Sales.transactionDate ' +
                'BETWEEN ? AND ?) and Sales.blankNumber=Blank.blankNumber and ' +
                'Blank.blankTypeID=BlankType.blankTypeID and BlankType.blankArea="international" and ' +
                'Sales.paymentTypeID=TypeOfPayment.paymentTypeID and Sales.staffID= ? order by saleID';
            db.query(domesticReportByID, [begin, end, packet[i].staffID], (error, tempResults) => {
                if (error) throw error;
                //console.log(tempResults);
                let packet2 = JSON.parse(JSON.stringify(tempResults));
                length2 = Object.keys(packet2).length;

                for (let j = 0; j < length2; j++) {
                    amount = amount + packet2[j].amount;
                    amountUSD = amountUSD + packet2[j].amountUSD;
                    tax = tax + packet2[j].tax;
                    totalDocumentAmount = totalDocumentAmount + packet2[j].totalDocumentAmount;
                    cash = cash + packet2[j].CASH;
                    usd = usd + packet2[j].USD;
                    bgl = bgl + packet2[j].BGL;
                    totalAmountPaid = totalAmountPaid + packet2[j].totalAmountPaid;
                    commissionable = commissionable + packet2[j].commissionable;
                    nonAssessAmounts = nonAssessAmounts + packet2[j].nonAssessAmounts;
                    commission = commission + (packet2[j].commissionable * packet2[j].commissionRate / 100);
                }
            });
            finalResults.push({
                agntNumber: packet[i].staffID,
                ticketsSold: length2,
                fareBaseUSD: amountUSD,
                fareBaseLocal: amount,
                tax: tax,
                cash: cash,
                cardUSD: usd,
                cardLocal: bgl,
                totalAmountPaid: totalAmountPaid,
                commissionableAmount: commissionable,
                commission: commission
            });
            console.log("Final after push " + i + ": " + JSON.stringify(finalResults))
        }
        console.log("Final: " + JSON.stringify(finalResults));
        response.status(200).send(JSON.stringify(finalResults));
        response.end();
        });
});

// interline individual
app.post('/interlineReport', (request, response) => {
    let interlineReport = 'select distinct ' +
        '(Sales.saleID) AS saleID, (Sales.amountUSD) AS amountUSD, (ExchangeRate.exchangeRate) AS exchangeRate, ' +
        '(Sales.amount) AS amount, (Sales.localTax) AS localTax, ' +
        '(Sales.otherTax) AS otherTax, (SELECT Sales.amount+Sales.localTax + Sales.otherTax) AS ' +
        'totalDocumentAmount, (SELECT Sales.amount + Sales.localTax + Sales.otherTax where ' +
        'Sales.paymentTypeID=1) AS cash, (SELECT CardDetails.cardNumber from CardDetails where ' +
        'Sales.cardDetails=CardDetails.CardID) AS cc, (SELECT ' +
        '((Sales.amount + Sales.localTax + sales.otherTax)/ExchangeRate.exchangeRate) where ' +
        'Sales.paymentTypeID=2) AS usd, (SELECT Sales.amount + Sales.localTax + Sales.otherTax ' +
        'where Sales.paymentTypeID=2) AS bgl, (SELECT ' +
        'Sales.amount + Sales.localTax + Sales.otherTax) AS totalPaidAmount, (SELECT Sales.amount) ' +
        'AS commissionable, (sales.commisionRate) AS commissionRate, (SELECT Sales.localTax + Sales.otherTax) AS ' +
        'nonAssessAmounts ' +
        'from Sales inner join ExchangeRate, Blank, BlankType, CardDetails, TypeOfPayment where ' +
        'Sales.exchangeRateCode=ExchangeRate.exchangeRateCode and (Sales.transactionDate ' +
        'BETWEEN ? AND ?) and Sales.blankNumber=Blank.blankNumber and ' +
        'Blank.blankTypeID=BlankType.blankTypeID and BlankType.blankArea="international" and ' +
        'Sales.paymentTypeID=TypeOfPayment.paymentTypeID order by saleID asc;';
    var begin = request.body.start;
    var end = request.body.end;
    db.query(interlineReport, [begin, end], (error, results) => {
        if (error) throw error;
        console.log(results);
        response.status(200).send(results);
        response.end();
    });
});

// interline global
app.post('/advisorReport', (request, response) => {
    let finalResults = [];
    let tempArray = [];
    let ids = []
    let advisorReportID = 'select distinct (Sales.staffID) AS staffID from Sales inner join Blank,BlankType where ' +
        '(Sales.transactionDate BETWEEN ? AND ? and ' +
        'Sales.blankNumber=Blank.blankNumber and Blank.blankTypeID=BlankType.blankTypeID ' +
        'and BlankType.blankArea="international") order by Sales.staffID asc;';
    var begin = request.body.start;
    var end = request.body.end;
    console.log("Begin " + begin);
    console.log("End " + end);
    db.query(advisorReportID, [begin,end] ,(error, results) => {
        if (error) throw error;
        var packet = JSON.parse(JSON.stringify(results));
        var length = Object.keys(packet).length;
        console.log("Staff ID:" + packet[0].staffID);
        console.log("Length: " + length);
        for(var i = 0; i < length; i++) {
            let id = packet[i].staffID;
            ids.push([id]);
          }
          console.log("IDs: " + ids);
            let docNumACPNS = 0;
            let fareAmount = 0;
            let lz = 0;
            let oths = 0;
            let totalDocumentAmount = 0;
            let cash = 0;
            let cardUSD = 0;
            let cardLocal = 0;
            let totalAmountPaid = 0;
            let commissionableAmount = 0;
            let commission = 0;
            let nonAssessableAmounts = 0;

            let advisorReportByID = 'select distinct (Sales.staffID) AS staffID, (Sales.amount) AS amount, ' +
                '(Sales.localTax) AS localTax, (Sales.otherTax) AS otherTax, (SELECT ' +
                'Sales.amount + Sales.localTax + Sales.otherTax) AS totalDocumentAmount, (SELECT ' +
                'Sales.amount + Sales.localTax + Sales.otherTax where Sales.paymentTypeID=1) AS cash, ' +
                '(SELECT (Sales.amount+Sales.localTax+Sales.otherTax)/ExchangeRate.exchangeRate where ' +
                'Sales.paymentTypeID=1) AS usd, (SELECT Sales.amount + Sales.localTax + Sales.otherTax ' +
                'where Sales.paymentTypeID=1) AS bgl, (SELECT Sales.amount + Sales.localTax + Sales.otherTax) AS totalPaidAmount, ' +
                '(SELECT Sales.amount) AS commissionable, (SELECT Sales.localTax + Sales.otherTax) AS nonAssessAmounts, ' +
                '(Sales.commisionRate) AS commissionRate from Sales inner join ExchangeRate, Blank, BlankType, CardDetails, ' +
                'TypeOfPayment where Sales.exchangeRateCode=ExchangeRate.exchangeRateCode and ' +
                'Sales.blankNumber=Blank.blankNumber and Blank.blankTypeID=BlankType.blankTypeID ' +
                'and BlankType.blankArea="international" and Sales.paymentTypeID=TypeOfPayment.paymentTypeID and Sales.staffID IN (?) and ' +
                '(Sales.transactionDate BETWEEN ? AND ?) order by saleID ;';
            db.query(advisorReportByID,[ids,begin, end] ,(error, tempResults) => {
                if (error) throw error;
                console.log(tempResults);
                var packet = JSON.parse(JSON.stringify(tempResults));
                var length = Object.keys(packet).length;
                for (let i = 0; i < length; i++) {
                    docNumACPNS = docNumACPNS + 1;
                    fareAmount = fareAmount + packet[i].amount;
                    lz = lz + packet[i].localTax;
                    oths = oths + packet[i].otherTax;
                    totalDocumentAmount = totalDocumentAmount + packet[i].totalDocumentAmount;
                    cash = cash + packet[i].cash;
                    cardUSD = cardUSD + packet[i].usd;
                    cardLocal = cardLocal + packet[i].bgl;
                    totalAmountPaid = totalAmountPaid + packet[i].totalPaidAmount;
                    commissionableAmount = commissionableAmount + packet[i].commissionable;
                    commission = commission + (packet[i].commissionableAmount * packet[i].commissionRate/100);
                    nonAssessableAmounts = nonAssessableAmounts + packet[i].nonAssessAmount;
                }
                tempArray = [{
                    advisorNum: packet[i].staffID,
                    docNumACPNS: packet[i].docNumACPNS,
                    fareAmount: packet[i].fareAmount,
                    lz: packet[i].lz,
                    oths: packet[i].oths,
                    totalDocumentAmount: packet[i].totalDocumentAmount,
                    cardUSD: packet[i].cardUSD,
                    cardLocal: packet[i].cardLocal,
                    totalAmountPaid: packet[i].totalAmountPaid,
                    commissionableAmount: packet[i].commissionableAmount,
                    commission: packet[i].commission,
                    nonAssessableAmounts: packet[i].nonAssessableAmounts
                }];
                finalResults.push(finalResults.concat(tempArray));
                console.log("Final Results: " + finalResults);
                response.status(200).send(JSON.stringify(finalResults));
                response.end();
            });
    });
});

// stock turnover report
/*app.post('/stockTurnoverReport', (request, response) => {
    var begin = request.body.start;
    var end = request.body.end;
    var finalData = [];

    let agntNewRBlanksSQL = 'select (Blank.blankNumber) AS blank ' +
        'FROM Blank where (Blank.recievedDate BETWEEN ? AND ?) order BY Blank.blankNumber asc;';
    db.query(agntNewRBlanksSQL,[begin, end], (error, results) => {
        if (error) throw error;
        //console.log(results);
        let agntNewRBlanksResult = results;
        console.log("Array: " + agntNewRBlanksResult);
        finalData.push({agntNewRBlanks: agntNewRBlanksResult});

    });
    let subAgntNewABlanksSQL = 'select  (BlankAllocation.staffID) AS code, (Blank.blankNumber ) AS blank ' +
        'FROM   Blank inner join BlankAllocation where Blank.blankNumber=BlankAllocation.blankNumber and ' +
        '(Blank.recievedDate BETWEEN ? AND ?) and Blank.statusID=2 order by Blank.blankNumber asc;';
    db.query(subAgntNewABlanksSQL, [begin, end], (error, results) => {
        if (error) throw error;
        console.log(results);
        let subAgntNewABlanksResults = results;
        console.log("Array: " + subAgntNewABlanksResults);
        finalData.push({subAgntNewABlanks: subAgntNewABlanksResults});
    });
    let subAgntABlanksSQL = 'select (BlankAllocation.staffID) AS code, (Blank.blankNumber) AS blank ' +
        'FROM Blank inner join BlankAllocation where Blank.blankNumber=BlankAllocation.blankNumber and ' +
        'blank.statusID=2 and (Blank.assignedDate BETWEEN ? AND ?) order by Blank.blankNumber asc;';
    db.query(subAgntABlanksSQL, [begin, end], (error, results) => {
        if (error) throw error;
        console.log(results);
        let subAgntABlanksResults = results;
        console.log("Array: " + subAgntABlanksResults);
        finalData.push({subAgntABlanks: subAgntABlanksResults});
    });
    let subAgntUBlanksSQL = 'select (Blank.blankNumber) AS blank FROM Blank inner join Sales  where ' +
        '(Sales.transactionDate BETWEEN ? AND ?) and Blank.statusID=1 and ' +
        'Blank.blankNumber=Sales.blankNumber order by Blank.blankNumber asc;';
    db.query(subAgntUBlanksSQL, [begin, end], (error, results) => {
        if (error) throw error;
        console.log(results);
        let subAgntUBlanksResults = results;
        console.log("Array: " + subAgntUBlanksResults);

    });
    let agentsAmountsSQL = 'select (Blank.blankNumber) AS blank ' +
        'FROM Blank where (Blank.recievedDate > ?)  and Blank.statusID=2 or ' +
        'Blank.statusID=3 order BY Blank.blankNumber asc;';
    db.query(agentsAmountsSQL, [begin], (error, results) => {
        if (error) throw error;
        console.log(results);
        let agentsAmountsResults = results;
        console.log("Array: " + agentsAmountsResults);
        finalData.push({agentsAmounts: agentsAmountsResults});
    });
    let subAgentsAmountsSQL = 'select  distinct (BlankAllocation.staffID) AS code, (Blank.blankNumber) AS blank ' +
        'FROM Blank inner join BlankAllocation, Sales where Blank.blankNumber=BlankAllocation.blankNumber and ' +
        '(Blank.assignedDate < ?) and  Blank.statusID=2 order by Blank.blankNumber asc;';
    db.query(subAgentsAmountsSQL, [end], (error, results) => {
        if (error) throw error;
        console.log(results);
        let subAgentsAmountsResults = results;
        console.log("Array: " + subAgentsAmountsResults);
    });
    console.log("Final: " + finalData);
    response.status(200).send(finalData);
    response.end();
});*/

app.post('/stockTurnoverReport', (request, response) => {
    var begin = request.body.start;
    var end = request.body.end;
    let statement = '(select (Blank.blankNumber) AS blank ' +
        'FROM Blank where (Blank.recievedDate BETWEEN ? AND ?) order BY Blank.blankNumber asc) AS agntNewRBlanks, ' +
        '(select  (BlankAllocation.staffID) AS code, (Blank.blankNumber ) AS blank, ' +
        'FROM   Blank inner join BlankAllocation where Blank.blankNumber=BlankAllocation.blankNumber and ' +
        '(Blank.recievedDate BETWEEN ? AND ?) and Blank.statusID=2 order by Blank.blankNumber asc;) AS subAgntNewABlanks, ' +
        '(select (BlankAllocation.staffID) AS code, (Blank.blankNumber) AS blank, ' +
        'FROM Blank inner join BlankAllocation where Blank.blankNumber=BlankAllocation.blankNumber and ' +
        'blank.statusID=2 and (Blank.assignedDate BETWEEN ? AND ?) order by Blank.blankNumber asc) AS subAgntABlanks, ' +
        '(select (Blank.blankNumber) AS blank FROM Blank inner join Sales  where ' +
        '(Sales.transactionDate BETWEEN ? AND ?) and Blank.statusID=1 and ' +
        'Blank.blankNumber=Sales.blankNumber order by Blank.blankNumber asc) AS subAgntUBlanks, ' +
        '(select (Blank.blankNumber) AS blank, ' +
        'FROM Blank where (Blank.recievedDate > ?) and Blank.statusID=2 or ' +
        'Blank.statusID=3 order BY Blank.blankNumber asc;) AS agentsAmounts, ' +
        '(select  distinct (BlankAllocation.staffID) AS code, (Blank.blankNumber) AS blank, ' +
        'FROM Blank inner join BlankAllocation, Sales where Blank.blankNumber=BlankAllocation.blankNumber and ' +
        '(Blank.assignedDate < ?) and  Blank.statusID=2 order by Blank.blankNumber asc) AS subAgentsAmounts';
    db.query(statement, [begin, end, begin, end, begin, end, begin, end, begin, end], (error, results) => {
        if (error) throw error;
        console.log(results);
        response.status(200).send(results);
        response.end();
    });
})
//-------------------------------------------------------------------------------------------------------------------------


app.listen(port, () => console.log(`Backend app started on port ${port}!`));
