CREATE TABLE IF NOT EXISTS `TypeOfPayment` (
	`paymentTypeID`	integer ( 1 ) NOT NULL UNIQUE,
	`paymentType`	varchar ( 255 ) NOT NULL,
	PRIMARY KEY(`paymentTypeID`)
);
CREATE TABLE IF NOT EXISTS `TravelAgency` (
	`agencyID`	INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
	`name`	varchar ( 255 ) NOT NULL,
	`address`	varchar ( 255 ) NOT NULL
);
CREATE TABLE IF NOT EXISTS `Status` (
	`statusID`	integer ( 1 ) NOT NULL UNIQUE,
	`status`	varchar ( 255 ) NOT NULL,
	PRIMARY KEY(`statusID`)
);
CREATE TABLE IF NOT EXISTS `StaffType` (
	`staffTypeID`	INTEGER NOT NULL UNIQUE,
	`staffType`	varchar ( 255 ) NOT NULL,
	PRIMARY KEY(`staffTypeID`)
);
CREATE TABLE IF NOT EXISTS `Staff` (
	`staffID`	INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
	`name`	varchar ( 255 ) NOT NULL,
	`surname`	varchar ( 255 ) NOT NULL,
	`address`	varchar ( 255 ) NOT NULL,
	`staffTypeID`	integer ( 1 ) NOT NULL,
	`email`	varchar ( 255 ) NOT NULL UNIQUE,
	`password`	varchar ( 255 ) NOT NULL,
	`agencyID`	integer ( 10 ) NOT NULL,
	`active`	varchar ( 3 ),
	FOREIGN KEY(`staffTypeID`) REFERENCES `StaffType`(`staffTypeID`) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(`agencyID`) REFERENCES `TravelAgency`(`agencyID`) ON UPDATE RESTRICT ON DELETE RESTRICT
);
CREATE TABLE IF NOT EXISTS `FlexibleDiscount` (
	`discountID`	INTEGER PRIMARY KEY AUTO_INCREMENT,
	`range1`	INTEGER,
	`range2`	INTEGER,
	`discount1`	INTEGER,
	`discount2`	INTEGER,
	`discount3`	INTEGER
);
CREATE TABLE IF NOT EXISTS `ExchangeRate` (
	`exchangeRateCode`	varchar ( 3 ) NOT NULL UNIQUE,
	`exchangeRate`	double ( 10 , 4 ) NOT NULL,
	`currencyName`	varchar ( 255 ) NOT NULL,
	PRIMARY KEY(`exchangeRateCode`)
);
CREATE TABLE IF NOT EXISTS `CustomerType` (
	`customerTypeID`	integer ( 1 ) NOT NULL,
	`customerType`	varchar ( 255 ) NOT NULL,
	PRIMARY KEY(`customerTypeID`)
);
CREATE TABLE IF NOT EXISTS `DiscountAmount` (
	`discountId`	INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
	`discountPercent`	float ( 10 ) NOT NULL
);
CREATE TABLE IF NOT EXISTS `DiscountType` (
	`discountTypeID`	integer ( 1 ),
	`discountType`	varchar ( 255 ) NOT NULL,
	PRIMARY KEY(`discountTypeID`)
);
CREATE TABLE IF NOT EXISTS `Customer` (
	`customerID`	INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
	`name`	varchar ( 255 ) NOT NULL,
	`surname`	varchar ( 255 ) NOT NULL,
	`address`	varchar ( 255 ) NOT NULL,
	`email`	varchar ( 255 ) NOT NULL UNIQUE,
	`customerTypeID`	integer ( 1 ) NOT NULL,
	`discountAmount`	integer ( 10 ),
	`discountType`	integer ( 1 ),
	`flexibleDiscount`	INTEGER ( 10 ),
	`active`	varchar ( 3 ) NOT NULL,
	FOREIGN KEY(`discountAmount`) REFERENCES `DiscountAmount`(`discountId`),
	FOREIGN KEY(`customerTypeID`) REFERENCES `CustomerType`(`customerTypeID`),
	FOREIGN KEY(`flexibleDiscount`) REFERENCES `FlexibleDiscount`(`discountID`),
	FOREIGN KEY(`discountType`) REFERENCES `DiscountType`(`discountTypeID`)
);
CREATE TABLE IF NOT EXISTS `CardDetails` (
	`CardID`	INTEGER PRIMARY KEY AUTO_INCREMENT,
	`cardNumber`	varchar ( 16 ) NOT NULL UNIQUE,
	`expiryDate`	date NOT NULL,
	`securityCode`	integer ( 3 ) NOT NULL
);
CREATE TABLE IF NOT EXISTS `Sales` (
	`saleID`	INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
	`staffID`	integer ( 10 ) NOT NULL,
	`customerID`	integer ( 10 ) NOT NULL,
	`blankNumber` BIGINT NOT NULL UNIQUE,
	`amount`	double ( 10 , 2 ) NOT NULL,
	`amountUSD`	double ( 10 , 2 ) NOT NULL,
	`localTax`	float ( 10 , 2 ),
	`otherTax`	double ( 10 , 2 ),
	`isRefunded`	varchar ( 5 ) NOT NULL,
	`payByDate`	date,
	`paymentTypeID`	integer ( 1 ) NOT NULL,
	`isPaid`	varchar ( 3 ) NOT NULL,
	`commisionRate`	double ( 10 , 2 ) NOT NULL,
	`exchangeRateCode`	varchar ( 3 ) NOT NULL,
	`transactionDate`	DATE NOT NULL,
	`cardDetails`	INTEGER,
	FOREIGN KEY(`staffID`) REFERENCES `Staff`(`staffID`) ON UPDATE RESTRICT ON DELETE RESTRICT,
	FOREIGN KEY(`exchangeRateCode`) REFERENCES `ExchangeRate`(`exchangeRateCode`),
	FOREIGN KEY(`customerID`) REFERENCES `Customer`(`customerID`) ON UPDATE RESTRICT ON DELETE RESTRICT,
	FOREIGN KEY(`cardDetails`) REFERENCES `CardDetails`(`CardID`) ON UPDATE RESTRICT ON DELETE RESTRICT,
	FOREIGN KEY(`paymentTypeID`) REFERENCES `TypeOfPayment`(`paymentTypeID`)
);
CREATE TABLE IF NOT EXISTS `BlankType` (
	`blankTypeID`	integer ( 1 ) NOT NULL UNIQUE,
	`blankType`	integer ( 4 ) NOT NULL,
	`blankArea`	varchar(255),
	PRIMARY KEY(`blankTypeID`)
);
CREATE TABLE IF NOT EXISTS `Blank` (
	`blankNumber` BIGINT NOT NULL UNIQUE,
	`statusID`	integer ( 1 ) NOT NULL,
	`recievedDate`	DATE NOT NULL,
	`blankTypeID`	integer ( 1 ) NOT NULL,
	`assignedDate`	DATE,
	`departureDestination`	varchar(255),
	`arrivalDestination`	varchar(255),
	FOREIGN KEY(`statusID`) REFERENCES `Status`(`statusID`) ON UPDATE RESTRICT ON DELETE RESTRICT,
	FOREIGN KEY(`blankTypeID`) REFERENCES `BlankType`(`blankTypeID`) ON UPDATE RESTRICT ON DELETE RESTRICT,
	PRIMARY KEY(`blankNumber`)
);
CREATE TABLE IF NOT EXISTS `BlankAllocation` (
	`blankAllocationId`	INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
	`staffID`	integer ( 10 ),
	`blankNumber`	BIGINT NOT NULL UNIQUE,
	FOREIGN KEY(`blankNumber`) REFERENCES `Blank`(`blankNumber`),
	FOREIGN KEY(`staffID`) REFERENCES `Staff`(`staffID`)
);
