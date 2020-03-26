CREATE TABLE IF NOT EXISTS `TypeOfPayment` (
	`paymentTypeID`	integer ( 1 ) NOT NULL UNIQUE,
	`paymentType`	varchar ( 255 ) NOT NULL,
	PRIMARY KEY(`paymentTypeID`)
);
CREATE TABLE IF NOT EXISTS `TypeOfFlight` (
	`typeOfFlightID`	integer ( 1 ) NOT NULL UNIQUE,
	`typeOfFlight`	varchar ( 255 ) NOT NULL,
	PRIMARY KEY(`typeOfFlightID`)
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
	FOREIGN KEY(`agencyID`) REFERENCES `TravelAgency`(`agencyID`) ON UPDATE RESTRICT ON DELETE RESTRICT,
	FOREIGN KEY(`staffTypeID`) REFERENCES `StaffType`(`staffTypeID`) ON UPDATE RESTRICT ON DELETE RESTRICT
);
CREATE TABLE IF NOT EXISTS `ExchangeRate` (
	`exchangeRateCode`	varchar ( 3 ) NOT NULL UNIQUE,
	`exchangeRate`	double ( 10 , 00 ) NOT NULL,
	`currencyName`	varchar ( 255 ) NOT NULL,
	PRIMARY KEY(`exchangeRateCode`)
);
CREATE TABLE IF NOT EXISTS `CustomerType` (
	`customerTypeID`	integer ( 1 ) NOT NULL,
	`customerType`	varchar ( 255 ) NOT NULL,
	PRIMARY KEY(`customerTypeID`)
);
CREATE TABLE IF NOT EXISTS `DiscountAmount` (
	`discountId`	integer ( 10 ) NOT NULL UNIQUE,
	`discountPercent`	float ( 10 ) NOT NULL,
	PRIMARY KEY(`discountId`)
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
	FOREIGN KEY(`customerTypeID`) REFERENCES `CustomerType`(`customerTypeID`),
	FOREIGN KEY(`discountAmount`) REFERENCES `DiscountAmount`(`discountId`),
	FOREIGN KEY(`discountType`) REFERENCES `DiscountType`(`discountTypeID`)
);
CREATE TABLE IF NOT EXISTS `Sales` (
	`saleID`	INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
	`staffID`	integer ( 10 ) NOT NULL,
	`customerID`	integer ( 10 ) NOT NULL,
	`blankNumber`	integer ( 11 ) NOT NULL UNIQUE,
	`amount`	double ( 10 , 00 ) NOT NULL,
	`amountUSD`	double ( 10 , 00 ) NOT NULL,
	`tax`	integer ( 10 ) NOT NULL,
	`isRefunded`	varchar ( 5 ) NOT NULL,
	`payByDate`	date,
	`paymentTypeID`	integer ( 1 ) NOT NULL,
	`typeOfFlightID`	integer ( 1 ) NOT NULL,
	`isPaid`	varchar ( 3 ) NOT NULL,
	`commisionRate`	double ( 10 , 00 ) NOT NULL,
	`exchangeRateCode`	varchar ( 3 ) NOT NULL,
	FOREIGN KEY(`staffID`) REFERENCES `Staff`(`staffID`) ON UPDATE RESTRICT ON DELETE RESTRICT,
	FOREIGN KEY(`paymentTypeID`) REFERENCES `TypeOfPayment`(`paymentTypeID`),
	FOREIGN KEY(`exchangeRateCode`) REFERENCES `ExchangeRate`(`exchangeRateCode`),
	FOREIGN KEY(`customerID`) REFERENCES `Customer`(`customerID`) ON UPDATE RESTRICT ON DELETE RESTRICT,
	FOREIGN KEY(`typeOfFlightID`) REFERENCES `TypeOfFlight`(`typeOfFlightID`)
);
CREATE TABLE IF NOT EXISTS `JourneyLeg` (
	`locationId`	integer ( 10 ) NOT NULL,
	`departureDestination`	varchar ( 255 ) NOT NULL,
	`arrivalDestination`	varchar ( 255 ) NOT NULL,
	PRIMARY KEY(`locationId`)
);
CREATE TABLE IF NOT EXISTS `BlankType` (
	`blankTypeID`	integer ( 1 ) NOT NULL UNIQUE,
	`blankType`	integer ( 4 ) NOT NULL,
	PRIMARY KEY(`blankTypeID`)
);
CREATE TABLE IF NOT EXISTS `Blank` (
	`blankNumber`	integer ( 11 ) NOT NULL UNIQUE,
	`couponAmount`	integer ( 1 ) NOT NULL,
	`statusID`	integer ( 1 ) NOT NULL,
	`recievedDate`	date NOT NULL,
	`assignedDate`	date,
	`blankTypeID`	integer ( 1 ) NOT NULL,
	`isAssigned`	varchar ( 5 ) NOT NULL,
	FOREIGN KEY(`blankTypeID`) REFERENCES `BlankType`(`blankTypeID`) ON UPDATE RESTRICT ON DELETE RESTRICT,
	FOREIGN KEY(`statusID`) REFERENCES `Status`(`statusID`) ON UPDATE RESTRICT ON DELETE RESTRICT,
	PRIMARY KEY(`blankNumber`)
);
CREATE TABLE IF NOT EXISTS `BlankAllocation` (
	`blankAllocationId`	INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
	`staffID`	integer ( 10 ),
	`blankNumber`	integer ( 10 ) NOT NULL UNIQUE,
	FOREIGN KEY(`staffID`) REFERENCES `Staff`(`staffID`),
	FOREIGN KEY(`blankNumber`) REFERENCES `Blank`(`blankNumber`)
);
CREATE TABLE IF NOT EXISTS `Coupons` (
	`couponID`	INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
	`BlankNumber`	integer ( 11 ) NOT NULL,
	`departureTime`	varchar ( 255 ) NOT NULL,
	`arrivalTime`	varchar ( 255 ) NOT NULL,
	`locationId`	integer ( 10 ) NOT NULL,
	FOREIGN KEY(`BlankNumber`) REFERENCES `Blank`(`blankNumber`) ON UPDATE RESTRICT ON DELETE RESTRICT,
	FOREIGN KEY(`locationId`) REFERENCES `JourneyLeg`(`locationId`)
);
CREATE TABLE IF NOT EXISTS `CardDetails` (
	`cardNumber`	integer ( 16 ) NOT NULL UNIQUE,
	`expiryDate`	date NOT NULL,
	`securityCode`	integer ( 3 ) NOT NULL,
	`customerID`	integer ( 10 ) NOT NULL,
	FOREIGN KEY(`customerID`) REFERENCES `Customer`(`customerID`) ON UPDATE RESTRICT ON DELETE RESTRICT,
	PRIMARY KEY(`cardNumber`)
);
