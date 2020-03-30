/*To create staff need - staff, stafftype, travelagency*/
INSERT INTO stafftype(`staffTypeID`,`staffType`) VALUES (1,'advisor');
INSERT INTO stafftype(`staffTypeID`,`staffType`) VALUES (2,'admin');
INSERT INTO stafftype(`staffTypeID`,`staffType`) VALUES (3,'office manager');

INSERT INTO travelagency(`name`,`address`) VALUES ('Logicaly','Northampton Square, Clerkenwell EC1V 0HB');

INSERT INTO staff(`name`,`surname`,`address`,`staffTypeID`,`email`,`password`,`agencyID`,`active`)
VALUES ('Jeff','Bozos','54 Calbrook Ave IG2 4EG',1,'a','b',1,'yes');
INSERT INTO staff(`name`,`surname`,`address`,`staffTypeID`,`email`,`password`,`agencyID`,`active`)
VALUES ('Marc','Guggenheim','42 Westbrook Ave NG2 7YG',2,'mg@live.com','marc',1,'yes');
INSERT INTO staff(`name`,`surname`,`address`,`staffTypeID`,`email`,`password`,`agencyID`,`active`)
VALUES ('Dave','Santos','12 Kalandin Ave FH3 C32',3,'ds@live.com','dave',1,'yes');

/* adding many advisors */
INSERT INTO staff(`name`,`surname`,`address`,`staffTypeID`,`email`,`password`,`agencyID`,`active`)
VALUES ('S','R','54 East Side Ave E1 3G4',1,'S','R',1,'yes'), ('John','Travolta','54 Eastbrook Ave NY 1154',1,'J','T',1,'yes'),
('Mike','Walzowski','54 Bishop Ave NY 2254 IL',1,'M','W',1,'yes');
------------------------------------------------------------------------------------
INSERT INTO exchangerate(`exchangeRateCode`, `exchangeRate`,`currencyName`) VALUES ('ABC', '10.25' ,'test');
INSERT INTO exchangerate(`exchangeRateCode`, `exchangeRate`,`currencyName`) VALUES ('GBR', '33' ,'Great Britain');
INSERT INTO exchangerate(`exchangeRateCode`, `exchangeRate`,`currencyName`) VALUES ('POL', '66' ,'Poland');
INSERT INTO exchangerate(`exchangeRateCode`, `exchangeRate`,`currencyName`) VALUES ('SWE', '399' ,'Sweden');
------------------------------------------------------------------------------------------------
INSERT INTO customertype(`customerTypeId`,`customerType`) VALUES ('1','valued');
INSERT INTO customertype(`customerTypeId`,`customerType`) VALUES ('2','non-valued');

INSERT INTO customer(`name`, `surname`, `address`, `email`, `customerTypeId`, `discountAmount` , `discountType`)
VALUES ('jordan', 'burroughs', '28 briset street, islington, london', 'jordan.burroughs@gmail.com', 1, NULL, NULL );
INSERT INTO customer(`name`, `surname`, `address`, `email`, `customerTypeId`, `discountAmount` , `discountType`)
VALUES ('charles', 'ross', '32 park street, chingford', 'charles.r@gmail.com', 2, NULL, NULL );
INSERT INTO customer(`name`, `surname`, `address`, `email`, `customerTypeId`, `discountAmount` , `discountType`)
VALUES ('ross', 'gillian', '56 northbrook ave, illnois', 'ross_g@gmail.com', 1, NULL, NULL );

INSERT INTO typeofpayment(`paymentTypeID`,`paymentType`) VALUES ('1','credit card');
INSERT INTO typeofpayment(`paymentTypeID`,`paymentType`) VALUES ('2','cash');
INSERT INTO typeofpayment(`paymentTypeID`, `paymentType`) VALUES ('3','valued');

INSERT INTO typeofflight(`typeOfFlightID`,`typeOfFlight`) VALUES (1,'international');
INSERT INTO typeofflight(`typeOfFlightID`,`typeOfFlight`) VALUES (2,'domestic');

INSERT INTO sales(`staffID`,`customerID`,`blankNumber`,`amount`,`amountUSD`,`localTax`,`otherTax`,`isRefunded`,`payByDate`,`paymentTypeID`,`typeofFlightID`,`isPaid`,`commisionRate`,`exchangeRateCode`, `transactionDate`)
VALUES ('2','2','444',640,680,10,12,'no','2020-03-24',1,1,'yes',4,'GBR', '2021-03-04');
INSERT INTO sales(`staffID`,`customerID`,`blankNumber`,`amount`,`amountUSD`,`localTax`,`otherTax`,`isRefunded`,`payByDate`,`paymentTypeID`,`typeofFlightID`,`isPaid`,`commisionRate`,`exchangeRateCode`, `transactionDate`)
VALUES ('2','2','414',400,420,10,12,'no','2020-03-24',1,1,'yes',4,'POL', '2021-03-04');
INSERT INTO sales(`staffID`,`customerID`,`blankNumber`,`amount`,`amountUSD`,`localTax`,`otherTax`,`isRefunded`,`payByDate`,`paymentTypeID`,`typeofFlightID`,`isPaid`,`commisionRate`,`exchangeRateCode`, `transactionDate`)
VALUES ('3','2','404',640,654,10,12,'no','2020-03-24',1,1,'yes',4,'SWE', '2021-03-04');
INSERT INTO sales(`staffID`,`customerID`,`blankNumber`,`amount`,`amountUSD`,`localTax`,`otherTax`,`isRefunded`,`payByDate`,`paymentTypeID`,`typeofFlightID`,`isPaid`,`commisionRate`,`exchangeRateCode`, `transactionDate`)
VALUES ('4','2','204',115,130,10,12,'no','2020-03-24',1,1,'yes',4,'GBR', '2021-03-04');

-----------------------------------------------------------------------------------------------
INSERT INTO status(`statusID`,`status`) VALUES (1,'new');
INSERT INTO blanktype(`blankTypeID`,`blankType`)
VALUES (1, 444), (2, 440), (3, 420), (4, 201), (5,101)
