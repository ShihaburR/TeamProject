/*To create staff need - staff, stafftype, travelagency*/
INSERT INTO StaffType(`staffTypeID`,`staffType`) VALUES (1,'advisor');
INSERT INTO StaffType(`staffTypeID`,`staffType`) VALUES (2,'admin');
INSERT INTO StaffType(`staffTypeID`,`staffType`) VALUES (3,'office manager');

INSERT INTO TravelAgency(`name`,`address`) VALUES ('Logicaly','Northampton Square, Clerkenwell EC1V 0HB');

INSERT INTO Staff(`name`,`surname`,`address`,`staffTypeID`,`email`,`password`,`agencyID`,`active`)
VALUES ('Jeff','Bozos','54 Calbrook Ave IG2 4EG',1,'a','b',1,'yes');
INSERT INTO Staff(`name`,`surname`,`address`,`staffTypeID`,`email`,`password`,`agencyID`,`active`)
VALUES ('Marc','Guggenheim','42 Westbrook Ave NG2 7YG',2,'mg@live.com','marc',1,'yes');
INSERT INTO Staff(`name`,`surname`,`address`,`staffTypeID`,`email`,`password`,`agencyID`,`active`)
VALUES ('Dave','Santos','12 Kalandin Ave FH3 C32',3,'ds@live.com','dave',1,'yes');

/* adding many advisors */
INSERT INTO Staff(`name`,`surname`,`address`,`staffTypeID`,`email`,`password`,`agencyID`,`active`)
VALUES ('S','R','54 East Side Ave E1 3G4',1,'S','R',1,'yes'), ('John','Travolta','54 Eastbrook Ave NY 1154',1,'J','T',1,'yes'),
('Mike','Walzowski','54 Bishop Ave NY 2254 IL',1,'M','W',1,'yes');
------------------------------------------------------------------------------------
INSERT INTO ExchangeRate(`exchangeRateCode`, `exchangeRate`,`currencyName`) VALUES ('ABC', '10.25' ,'test');
INSERT INTO ExchangeRate(`exchangeRateCode`, `exchangeRate`,`currencyName`) VALUES ('GBR', '33' ,'Great Britain');
INSERT INTO ExchangeRate(`exchangeRateCode`, `exchangeRate`,`currencyName`) VALUES ('POL', '66' ,'Poland');
INSERT INTO ExchangeRate(`exchangeRateCode`, `exchangeRate`,`currencyName`) VALUES ('SWE', '399' ,'Sweden');
INSERT INTO ExchangeRate(`exchangeRateCode`, `exchangeRate`,`currencyName`) VALUES ('USD', '1.54' ,'USA');
------------------------------------------------------------------------------------------------
INSERT INTO CustomerType(`customerTypeId`,`customerType`) VALUES ('1','valued');
INSERT INTO CustomerType(`customerTypeId`,`customerType`) VALUES ('2','non-valued');
INSERT INTO CustomerType(`customerTypeId`,`customerType`) VALUES ('3','casual');

INSERT INTO `DiscountType` VALUES (1,'Fixed');
INSERT INTO `DiscountType` VALUES (2,'Flexible');

INSERT INTO Customer(`name`, `surname`, `address`, `email`, `customerTypeId`, `discountAmount` , `discountType`, `active`)
VALUES ('jordan', 'burroughs', '28 briset street, islington, london', 'jordan.burroughs@gmail.com', 1, NULL, NULL, 'yes');
INSERT INTO Customer(`name`, `surname`, `address`, `email`, `customerTypeId`, `discountAmount` , `discountType`, `active`)
VALUES ('charles', 'ross', '32 park street, chingford', 'charles.r@gmail.com', 2, NULL, NULL, 'yes');
INSERT INTO Customer(`name`, `surname`, `address`, `email`, `customerTypeId`, `discountAmount` , `discountType`, `active`)
VALUES ('ross', 'gillian', '56 northbrook ave, illnois', 'ross_g@gmail.com', 1, NULL, NULL, 'yes');


INSERT INTO TypeOfPayment(`paymentTypeID`,`paymentType`) VALUES ('1','credit card');
INSERT INTO TypeOfPayment(`paymentTypeID`,`paymentType`) VALUES ('2','cash');
INSERT INTO TypeOfPayment(`paymentTypeID`, `paymentType`) VALUES ('3','valued');

INSERT INTO Sales(`staffID`,`customerID`,`blankNumber`,`amount`,`amountUSD`,`localTax`,`otherTax`,`isRefunded`,`payByDate`,`paymentTypeID`,`isPaid`,`commisionRate`,`exchangeRateCode`, `transactionDate`, `cardDetails`)
VALUES ('2','2','444',640,680,10,12,'no','2020-03-24',1,'yes',4,'GBR', '2021-03-04', NULL);
INSERT INTO Sales(`staffID`,`customerID`,`blankNumber`,`amount`,`amountUSD`,`localTax`,`otherTax`,`isRefunded`,`payByDate`,`paymentTypeID`,`isPaid`,`commisionRate`,`exchangeRateCode`, `transactionDate`, `cardDetails`)
VALUES ('2','2','414',400,420,10,12,'no','2020-03-24',1,'yes',4,'POL', '2021-03-04', NULL);
INSERT INTO Sales(`staffID`,`customerID`,`blankNumber`,`amount`,`amountUSD`,`localTax`,`otherTax`,`isRefunded`,`payByDate`,`paymentTypeID`,`isPaid`,`commisionRate`,`exchangeRateCode`, `transactionDate`, `cardDetails`)
VALUES ('3','2','404',640,654,10,12,'no','2020-03-24',1,'yes',4,'SWE', '2021-03-04', NULL);
INSERT INTO Sales(`staffID`,`customerID`,`blankNumber`,`amount`,`amountUSD`,`localTax`,`otherTax`,`isRefunded`,`payByDate`,`paymentTypeID`,`isPaid`,`commisionRate`,`exchangeRateCode`, `transactionDate`, `cardDetails`)
VALUES ('4','2','204',115,130,10,12,'no','2020-03-24',1,'yes',4,'GBR','2021-03-04', NULL);

-----------------------------------------------------------------------------------------------
INSERT INTO Status(`statusID`,`status`) VALUES (1,'used'), (2,'assigned'), (3, 'recieved'), (4, 'void'), (5, 'returned');
INSERT INTO BlankType(`blankTypeID`,`blankType`, `blankArea`)
VALUES (1, 444, "International"), (2, 440, "International"), (3, 420, "International"), (4, 201, "Domestic"), (5,101, "Domestic"), (6, 451, "MCO"), (7, 452, "MCO");
INSERT INTO discountamount(`discountPercent`) VALUES (0),(1),(2);
