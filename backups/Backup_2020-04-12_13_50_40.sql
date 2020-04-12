/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: exchangerate
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `exchangerate` (
  `exchangeRateCode` varchar(3) NOT NULL,
  `exchangeRate` double(10, 4) NOT NULL,
  `currencyName` varchar(255) NOT NULL,
  PRIMARY KEY (`exchangeRateCode`),
  UNIQUE KEY `exchangeRateCode` (`exchangeRateCode`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: blank
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `blank` (
  `blankNumber` bigint NOT NULL,
  `statusID` int NOT NULL,
  `recievedDate` date NOT NULL,
  `blankTypeID` int NOT NULL,
  `assignedDate` date DEFAULT NULL,
  `departureDestination` varchar(255) DEFAULT NULL,
  `arrivalDestination` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`blankNumber`),
  UNIQUE KEY `blankNumber` (`blankNumber`),
  KEY `statusID` (`statusID`),
  KEY `blankTypeID` (`blankTypeID`),
  CONSTRAINT `blank_ibfk_1` FOREIGN KEY (`statusID`) REFERENCES `status` (`statusID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `blank_ibfk_2` FOREIGN KEY (`blankTypeID`) REFERENCES `blanktype` (`blankTypeID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: blanktype
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `blanktype` (
  `blankTypeID` int NOT NULL,
  `blankType` int NOT NULL,
  `blankArea` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`blankTypeID`),
  UNIQUE KEY `blankTypeID` (`blankTypeID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: carddetails
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `carddetails` (
  `CardID` int NOT NULL AUTO_INCREMENT,
  `cardNumber` varchar(16) NOT NULL,
  `expiryDate` date NOT NULL,
  `securityCode` int NOT NULL,
  PRIMARY KEY (`CardID`),
  UNIQUE KEY `cardNumber` (`cardNumber`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: customer
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `customer` (
  `customerID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `customerTypeID` int NOT NULL,
  `discountAmount` int DEFAULT NULL,
  `discountType` int DEFAULT NULL,
  `flexibleDiscount` int DEFAULT NULL,
  `active` varchar(3) NOT NULL,
  PRIMARY KEY (`customerID`),
  UNIQUE KEY `customerID` (`customerID`),
  UNIQUE KEY `email` (`email`),
  KEY `discountAmount` (`discountAmount`),
  KEY `customerTypeID` (`customerTypeID`),
  KEY `flexibleDiscount` (`flexibleDiscount`),
  KEY `discountType` (`discountType`),
  CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`discountAmount`) REFERENCES `discountamount` (`discountId`),
  CONSTRAINT `customer_ibfk_2` FOREIGN KEY (`customerTypeID`) REFERENCES `customertype` (`customerTypeID`),
  CONSTRAINT `customer_ibfk_3` FOREIGN KEY (`flexibleDiscount`) REFERENCES `flexiblediscount` (`discountID`),
  CONSTRAINT `customer_ibfk_4` FOREIGN KEY (`discountType`) REFERENCES `discounttype` (`discountTypeID`)
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: customertype
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `customertype` (
  `customerTypeID` int NOT NULL,
  `customerType` varchar(255) NOT NULL,
  PRIMARY KEY (`customerTypeID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: discountamount
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `discountamount` (
  `discountId` int NOT NULL AUTO_INCREMENT,
  `discountPercent` float NOT NULL,
  PRIMARY KEY (`discountId`),
  UNIQUE KEY `discountId` (`discountId`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: discounttype
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `discounttype` (
  `discountTypeID` int NOT NULL,
  `discountType` varchar(255) NOT NULL,
  PRIMARY KEY (`discountTypeID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: blankallocation
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `blankallocation` (
  `blankAllocationId` int NOT NULL AUTO_INCREMENT,
  `staffID` int DEFAULT NULL,
  `blankNumber` bigint NOT NULL,
  PRIMARY KEY (`blankAllocationId`),
  UNIQUE KEY `blankAllocationId` (`blankAllocationId`),
  UNIQUE KEY `blankNumber` (`blankNumber`),
  KEY `staffID` (`staffID`),
  CONSTRAINT `blankallocation_ibfk_1` FOREIGN KEY (`blankNumber`) REFERENCES `blank` (`blankNumber`),
  CONSTRAINT `blankallocation_ibfk_2` FOREIGN KEY (`staffID`) REFERENCES `staff` (`staffID`)
) ENGINE = InnoDB AUTO_INCREMENT = 73 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: flexiblediscount
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `flexiblediscount` (
  `discountID` int NOT NULL AUTO_INCREMENT,
  `range1` int DEFAULT NULL,
  `range2` int DEFAULT NULL,
  `discount1` int DEFAULT NULL,
  `discount2` int DEFAULT NULL,
  `discount3` int DEFAULT NULL,
  PRIMARY KEY (`discountID`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sales
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `sales` (
  `saleID` int NOT NULL AUTO_INCREMENT,
  `staffID` int NOT NULL,
  `customerID` int NOT NULL,
  `blankNumber` bigint NOT NULL,
  `amount` double(10, 2) NOT NULL,
  `amountUSD` double(10, 2) NOT NULL,
  `localTax` float(10, 2) DEFAULT NULL,
  `otherTax` double(10, 2) DEFAULT NULL,
  `isRefunded` varchar(5) NOT NULL,
  `payByDate` date DEFAULT NULL,
  `paymentTypeID` int NOT NULL,
  `isPaid` varchar(3) NOT NULL,
  `commisionRate` double(10, 2) NOT NULL,
  `exchangeRateCode` varchar(3) NOT NULL,
  `transactionDate` date NOT NULL,
  `cardDetails` int DEFAULT NULL,
  PRIMARY KEY (`saleID`),
  UNIQUE KEY `saleID` (`saleID`),
  UNIQUE KEY `blankNumber` (`blankNumber`),
  KEY `staffID` (`staffID`),
  KEY `exchangeRateCode` (`exchangeRateCode`),
  KEY `customerID` (`customerID`),
  KEY `cardDetails` (`cardDetails`),
  KEY `paymentTypeID` (`paymentTypeID`),
  CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`staffID`) REFERENCES `staff` (`staffID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `sales_ibfk_2` FOREIGN KEY (`exchangeRateCode`) REFERENCES `exchangerate` (`exchangeRateCode`),
  CONSTRAINT `sales_ibfk_3` FOREIGN KEY (`customerID`) REFERENCES `customer` (`customerID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `sales_ibfk_4` FOREIGN KEY (`cardDetails`) REFERENCES `carddetails` (`CardID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `sales_ibfk_5` FOREIGN KEY (`paymentTypeID`) REFERENCES `typeofpayment` (`paymentTypeID`)
) ENGINE = InnoDB AUTO_INCREMENT = 37 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: staff
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `staff` (
  `staffID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `staffTypeID` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `agencyID` int NOT NULL,
  `active` varchar(3) DEFAULT NULL,
  PRIMARY KEY (`staffID`),
  UNIQUE KEY `staffID` (`staffID`),
  UNIQUE KEY `email` (`email`),
  KEY `staffTypeID` (`staffTypeID`),
  KEY `agencyID` (`agencyID`),
  CONSTRAINT `staff_ibfk_1` FOREIGN KEY (`staffTypeID`) REFERENCES `stafftype` (`staffTypeID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `staff_ibfk_2` FOREIGN KEY (`agencyID`) REFERENCES `travelagency` (`agencyID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 321 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: stafftype
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `stafftype` (
  `staffTypeID` int NOT NULL,
  `staffType` varchar(255) NOT NULL,
  PRIMARY KEY (`staffTypeID`),
  UNIQUE KEY `staffTypeID` (`staffTypeID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: status
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `status` (
  `statusID` int NOT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`statusID`),
  UNIQUE KEY `statusID` (`statusID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: travelagency
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `travelagency` (
  `agencyID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  PRIMARY KEY (`agencyID`),
  UNIQUE KEY `agencyID` (`agencyID`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: typeofpayment
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `typeofpayment` (
  `paymentTypeID` int NOT NULL,
  `paymentType` varchar(255) NOT NULL,
  PRIMARY KEY (`paymentTypeID`),
  UNIQUE KEY `paymentTypeID` (`paymentTypeID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: exchangerate
# ------------------------------------------------------------

INSERT INTO
  `exchangerate` (`exchangeRateCode`, `exchangeRate`, `currencyName`)
VALUES
  ('ABC', 10.2500, 'test');
INSERT INTO
  `exchangerate` (`exchangeRateCode`, `exchangeRate`, `currencyName`)
VALUES
  ('GBR', 33.0000, 'Great Britain');
INSERT INTO
  `exchangerate` (`exchangeRateCode`, `exchangeRate`, `currencyName`)
VALUES
  ('POL', 66.0000, 'Poland');
INSERT INTO
  `exchangerate` (`exchangeRateCode`, `exchangeRate`, `currencyName`)
VALUES
  ('SWE', 399.0000, 'Sweden');
INSERT INTO
  `exchangerate` (`exchangeRateCode`, `exchangeRate`, `currencyName`)
VALUES
  ('USD', 1.5400, 'USA');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: blank
# ------------------------------------------------------------

INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (44400000200, 3, '2019-10-11', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000001, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000002, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000003, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000004, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000005, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000006, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000007, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000008, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000009, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000010, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000011, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000012, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000013, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000014, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000015, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000016, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000017, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000018, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000019, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000020, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000021, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000022, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000023, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000024, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000025, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000026, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000027, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000028, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000029, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000030, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000031, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000032, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000033, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000034, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000035, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000036, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000037, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000038, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000039, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000040, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000041, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000042, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000043, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000044, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000045, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000046, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000047, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000048, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000049, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (101000000050, 3, '2019-07-09', 5, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    201000000001,
    1,
    '2019-06-03',
    4,
    '2020-04-07',
    'Ohio',
    'New Orleans'
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    201000000002,
    1,
    '2019-06-03',
    4,
    '2020-04-07',
    'test',
    'testdate'
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    201000000003,
    1,
    '2019-06-03',
    4,
    '2020-04-07',
    'adsad',
    'asdasdasd'
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    201000000004,
    1,
    '2019-06-03',
    4,
    '2020-04-07',
    'asdasd',
    'asdasdasd'
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    201000000005,
    1,
    '2019-06-03',
    4,
    '2020-04-07',
    'asdasd',
    'asdasdasd'
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    201000000006,
    1,
    '2019-06-03',
    4,
    '2020-04-07',
    'asdasd',
    'asdasdasd'
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    201000000007,
    2,
    '2019-06-03',
    4,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    201000000008,
    2,
    '2019-06-03',
    4,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    201000000009,
    2,
    '2019-06-03',
    4,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    201000000010,
    2,
    '2019-06-03',
    4,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000011, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000012, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000013, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000014, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000015, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000016, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000017, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000018, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000019, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000020, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000021, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000022, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000023, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000024, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000025, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000026, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000027, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000028, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000029, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000030, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000031, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000032, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000033, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000034, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000035, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000036, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000037, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000038, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000039, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000040, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000041, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000042, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000043, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000044, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000045, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000046, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000047, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000048, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000049, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000050, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000051, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000052, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000053, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000054, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000055, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000056, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000057, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000058, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000059, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000060, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000061, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000062, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000063, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000064, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000065, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000066, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000067, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000068, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000069, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000070, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000071, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000072, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000073, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000074, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000075, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000076, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000077, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000078, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000079, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000080, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000081, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000082, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000083, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000084, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000085, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000086, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000087, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000088, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000089, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000090, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000091, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000092, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000093, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000094, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000095, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000096, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000097, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000098, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000099, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (201000000100, 3, '2019-06-03', 4, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    420000000001,
    2,
    '2019-04-01',
    3,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    420000000002,
    2,
    '2019-04-01',
    3,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    420000000003,
    2,
    '2019-04-01',
    3,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    420000000004,
    2,
    '2019-04-01',
    3,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    420000000005,
    2,
    '2019-04-01',
    3,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    420000000006,
    2,
    '2019-04-01',
    3,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    420000000007,
    1,
    '2019-04-01',
    3,
    '2020-04-07',
    'asdasd',
    'asdasdasd'
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    420000000008,
    2,
    '2019-04-01',
    3,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    420000000009,
    1,
    '2019-04-01',
    3,
    '2020-04-07',
    'asdasd',
    'asdasdasd'
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    420000000010,
    1,
    '2019-04-01',
    3,
    '2020-04-07',
    'asdasd',
    'asdasdasd'
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    420000000011,
    2,
    '2019-04-01',
    3,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    420000000012,
    2,
    '2019-04-01',
    3,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    420000000013,
    2,
    '2019-04-01',
    3,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    420000000014,
    2,
    '2019-04-01',
    3,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    420000000015,
    2,
    '2019-04-01',
    3,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    420000000016,
    2,
    '2019-04-01',
    3,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    420000000017,
    2,
    '2019-04-01',
    3,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    420000000018,
    2,
    '2019-04-01',
    3,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    420000000019,
    2,
    '2019-04-01',
    3,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    420000000020,
    2,
    '2019-04-01',
    3,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    420000000021,
    2,
    '2019-04-01',
    3,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    420000000022,
    2,
    '2019-04-01',
    3,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    420000000023,
    2,
    '2019-04-01',
    3,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    420000000024,
    2,
    '2019-04-01',
    3,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    420000000025,
    2,
    '2019-04-01',
    3,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    420000000026,
    2,
    '2019-04-01',
    3,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    420000000027,
    2,
    '2019-04-01',
    3,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    420000000028,
    2,
    '2019-04-01',
    3,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    420000000029,
    2,
    '2019-04-01',
    3,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    420000000030,
    2,
    '2019-04-01',
    3,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000031, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000032, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000033, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000034, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000035, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000036, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000037, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000038, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000039, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000040, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000041, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000042, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000043, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000044, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000045, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000046, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000047, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000048, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000049, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000050, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000051, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000052, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000053, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000054, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000055, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000056, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000057, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000058, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000059, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000060, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000061, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000062, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000063, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000064, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000065, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000066, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000067, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000068, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000069, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000070, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000071, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000072, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000073, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000074, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000075, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000076, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000077, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000078, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000079, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000080, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000081, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000082, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000083, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000084, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000085, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000086, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000087, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000088, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000089, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000090, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000091, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000092, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000093, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000094, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000095, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000096, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000097, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000098, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000099, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (420000000100, 3, '2019-04-01', 3, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    444000000001,
    1,
    '2019-04-01',
    1,
    '2020-04-07',
    'Germany',
    'Washington'
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    444000000002,
    1,
    '2019-04-01',
    1,
    '2020-04-07',
    'Germany',
    'Washington'
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    444000000003,
    1,
    '2019-04-01',
    1,
    '2020-04-07',
    'Ohio',
    'New Orleans'
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    444000000004,
    2,
    '2019-04-01',
    1,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    444000000005,
    2,
    '2019-04-01',
    1,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    444000000006,
    2,
    '2019-04-01',
    1,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    444000000007,
    2,
    '2019-04-01',
    1,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    444000000008,
    2,
    '2019-04-01',
    1,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    444000000009,
    2,
    '2019-04-01',
    1,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    444000000010,
    2,
    '2019-04-01',
    1,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    444000000011,
    2,
    '2019-04-01',
    1,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    444000000012,
    2,
    '2019-04-01',
    1,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    444000000013,
    2,
    '2019-04-01',
    1,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    444000000014,
    2,
    '2019-04-01',
    1,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    444000000015,
    2,
    '2019-04-01',
    1,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    444000000016,
    2,
    '2019-04-01',
    1,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    444000000017,
    2,
    '2019-04-01',
    1,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    444000000018,
    2,
    '2019-04-01',
    1,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    444000000019,
    2,
    '2019-04-01',
    1,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (
    444000000020,
    2,
    '2019-04-01',
    1,
    '2020-04-07',
    NULL,
    NULL
  );
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000021, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000022, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000023, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000024, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000025, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000026, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000027, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000028, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000029, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000030, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000031, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000032, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000033, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000034, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000035, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000036, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000037, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000038, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000039, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000040, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000041, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000042, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000043, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000044, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000045, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000046, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000047, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000048, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000049, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000050, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000051, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000052, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000053, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000054, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000055, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000056, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000057, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000058, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000059, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000060, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000061, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000062, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000063, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000064, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000065, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000066, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000067, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000068, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000069, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000070, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000071, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000072, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000073, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000074, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000075, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000076, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000077, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000078, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000079, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000080, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000081, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000082, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000083, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000084, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000085, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000086, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000087, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000088, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000089, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000090, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000091, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000092, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000093, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000094, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000095, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000096, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000097, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000098, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000099, 3, '2019-04-01', 1, NULL, NULL, NULL);
INSERT INTO
  `blank` (
    `blankNumber`,
    `statusID`,
    `recievedDate`,
    `blankTypeID`,
    `assignedDate`,
    `departureDestination`,
    `arrivalDestination`
  )
VALUES
  (444000000100, 3, '2019-04-01', 1, NULL, NULL, NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: blanktype
# ------------------------------------------------------------

INSERT INTO
  `blanktype` (`blankTypeID`, `blankType`, `blankArea`)
VALUES
  (1, 444, 'International');
INSERT INTO
  `blanktype` (`blankTypeID`, `blankType`, `blankArea`)
VALUES
  (2, 440, 'International');
INSERT INTO
  `blanktype` (`blankTypeID`, `blankType`, `blankArea`)
VALUES
  (3, 420, 'International');
INSERT INTO
  `blanktype` (`blankTypeID`, `blankType`, `blankArea`)
VALUES
  (4, 201, 'Domestic');
INSERT INTO
  `blanktype` (`blankTypeID`, `blankType`, `blankArea`)
VALUES
  (5, 101, 'Domestic');
INSERT INTO
  `blanktype` (`blankTypeID`, `blankType`, `blankArea`)
VALUES
  (6, 451, 'MCO');
INSERT INTO
  `blanktype` (`blankTypeID`, `blankType`, `blankArea`)
VALUES
  (7, 452, 'MCO');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: carddetails
# ------------------------------------------------------------

INSERT INTO
  `carddetails` (
    `CardID`,
    `cardNumber`,
    `expiryDate`,
    `securityCode`
  )
VALUES
  (3, '490100223453456', '2020-04-26', 313);
INSERT INTO
  `carddetails` (
    `CardID`,
    `cardNumber`,
    `expiryDate`,
    `securityCode`
  )
VALUES
  (4, '1234487566987555', '2020-08-16', 113);
INSERT INTO
  `carddetails` (
    `CardID`,
    `cardNumber`,
    `expiryDate`,
    `securityCode`
  )
VALUES
  (5, '3333444411112222', '2020-05-10', 123);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: customer
# ------------------------------------------------------------

INSERT INTO
  `customer` (
    `customerID`,
    `name`,
    `surname`,
    `address`,
    `email`,
    `customerTypeID`,
    `discountAmount`,
    `discountType`,
    `flexibleDiscount`,
    `active`
  )
VALUES
  (
    1,
    'jordan',
    'burroughs',
    '28 briset street, islington, london',
    'jordan.burroughs@gmail.com',
    1,
    NULL,
    NULL,
    NULL,
    'yes'
  );
INSERT INTO
  `customer` (
    `customerID`,
    `name`,
    `surname`,
    `address`,
    `email`,
    `customerTypeID`,
    `discountAmount`,
    `discountType`,
    `flexibleDiscount`,
    `active`
  )
VALUES
  (
    2,
    'charles',
    'ross',
    '32 park street, chingford',
    'charles.r@gmail.com',
    2,
    NULL,
    NULL,
    NULL,
    'yes'
  );
INSERT INTO
  `customer` (
    `customerID`,
    `name`,
    `surname`,
    `address`,
    `email`,
    `customerTypeID`,
    `discountAmount`,
    `discountType`,
    `flexibleDiscount`,
    `active`
  )
VALUES
  (
    3,
    'ross',
    'gillian',
    '56 northbrook ave, illnois',
    'ross_g@gmail.com',
    1,
    NULL,
    NULL,
    NULL,
    'yes'
  );
INSERT INTO
  `customer` (
    `customerID`,
    `name`,
    `surname`,
    `address`,
    `email`,
    `customerTypeID`,
    `discountAmount`,
    `discountType`,
    `flexibleDiscount`,
    `active`
  )
VALUES
  (
    4,
    'David',
    'Blaine',
    '32 West Virginia Ave, IL, NY 332202',
    'davidB@live.com',
    2,
    1,
    1,
    NULL,
    'yes'
  );
INSERT INTO
  `customer` (
    `customerID`,
    `name`,
    `surname`,
    `address`,
    `email`,
    `customerTypeID`,
    `discountAmount`,
    `discountType`,
    `flexibleDiscount`,
    `active`
  )
VALUES
  (
    5,
    'adsasdads',
    'asdasads',
    'asdasdasd',
    'asddas',
    1,
    3,
    2,
    3,
    'yes'
  );
INSERT INTO
  `customer` (
    `customerID`,
    `name`,
    `surname`,
    `address`,
    `email`,
    `customerTypeID`,
    `discountAmount`,
    `discountType`,
    `flexibleDiscount`,
    `active`
  )
VALUES
  (
    6,
    'Chris',
    'Smart',
    '32 Lavandar Ave, London, E3 G13',
    'chris@live.com',
    1,
    2,
    1,
    NULL,
    'yes'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: customertype
# ------------------------------------------------------------

INSERT INTO
  `customertype` (`customerTypeID`, `customerType`)
VALUES
  (1, 'valued');
INSERT INTO
  `customertype` (`customerTypeID`, `customerType`)
VALUES
  (2, 'non-valued');
INSERT INTO
  `customertype` (`customerTypeID`, `customerType`)
VALUES
  (3, 'casual');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: discountamount
# ------------------------------------------------------------

INSERT INTO
  `discountamount` (`discountId`, `discountPercent`)
VALUES
  (1, 0);
INSERT INTO
  `discountamount` (`discountId`, `discountPercent`)
VALUES
  (2, 1);
INSERT INTO
  `discountamount` (`discountId`, `discountPercent`)
VALUES
  (3, 2);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: discounttype
# ------------------------------------------------------------

INSERT INTO
  `discounttype` (`discountTypeID`, `discountType`)
VALUES
  (1, 'Fixed');
INSERT INTO
  `discounttype` (`discountTypeID`, `discountType`)
VALUES
  (2, 'Flexible');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: blankallocation
# ------------------------------------------------------------

INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (13, 1, 444000000001);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (14, 1, 444000000002);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (15, 1, 444000000003);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (16, 1, 444000000004);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (17, 1, 444000000005);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (18, 1, 444000000006);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (19, 1, 444000000007);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (20, 1, 444000000008);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (21, 1, 444000000009);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (22, 1, 444000000010);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (23, 1, 444000000011);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (24, 1, 444000000012);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (25, 1, 444000000013);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (26, 1, 444000000014);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (27, 1, 444000000015);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (28, 1, 444000000016);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (29, 1, 444000000017);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (30, 1, 444000000018);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (31, 1, 444000000019);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (32, 1, 444000000020);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (33, 1, 420000000001);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (34, 1, 420000000002);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (35, 1, 420000000003);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (36, 1, 420000000004);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (37, 1, 420000000005);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (38, 1, 420000000006);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (39, 1, 420000000007);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (40, 1, 420000000008);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (41, 1, 420000000009);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (42, 1, 420000000010);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (43, 1, 420000000011);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (44, 1, 420000000012);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (45, 1, 420000000013);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (46, 1, 420000000014);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (47, 1, 420000000015);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (48, 1, 420000000016);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (49, 1, 420000000017);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (50, 1, 420000000018);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (51, 1, 420000000019);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (52, 1, 420000000020);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (53, 1, 420000000021);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (54, 1, 420000000022);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (55, 1, 420000000023);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (56, 1, 420000000024);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (57, 1, 420000000025);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (58, 1, 420000000026);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (59, 1, 420000000027);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (60, 1, 420000000028);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (61, 1, 420000000029);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (62, 1, 420000000030);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (63, 1, 201000000001);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (64, 1, 201000000002);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (65, 1, 201000000003);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (66, 1, 201000000004);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (67, 1, 201000000005);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (68, 1, 201000000006);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (69, 1, 201000000007);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (70, 1, 201000000008);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (71, 1, 201000000009);
INSERT INTO
  `blankallocation` (`blankAllocationId`, `staffID`, `blankNumber`)
VALUES
  (72, 1, 201000000010);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: flexiblediscount
# ------------------------------------------------------------

INSERT INTO
  `flexiblediscount` (
    `discountID`,
    `range1`,
    `range2`,
    `discount1`,
    `discount2`,
    `discount3`
  )
VALUES
  (3, 1000, 2000, 0, 1, 2);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sales
# ------------------------------------------------------------

INSERT INTO
  `sales` (
    `saleID`,
    `staffID`,
    `customerID`,
    `blankNumber`,
    `amount`,
    `amountUSD`,
    `localTax`,
    `otherTax`,
    `isRefunded`,
    `payByDate`,
    `paymentTypeID`,
    `isPaid`,
    `commisionRate`,
    `exchangeRateCode`,
    `transactionDate`,
    `cardDetails`
  )
VALUES
  (
    15,
    1,
    6,
    444000000001,
    220.00,
    118.80,
    23.00,
    35.00,
    'no',
    '2020-01-01',
    1,
    'yes',
    9.00,
    'POL',
    '2020-01-01',
    NULL
  );
INSERT INTO
  `sales` (
    `saleID`,
    `staffID`,
    `customerID`,
    `blankNumber`,
    `amount`,
    `amountUSD`,
    `localTax`,
    `otherTax`,
    `isRefunded`,
    `payByDate`,
    `paymentTypeID`,
    `isPaid`,
    `commisionRate`,
    `exchangeRateCode`,
    `transactionDate`,
    `cardDetails`
  )
VALUES
  (
    16,
    1,
    6,
    444000000002,
    230.00,
    124.20,
    43.00,
    55.00,
    'no',
    '2020-01-01',
    2,
    'yes',
    9.00,
    'POL',
    '2020-01-01',
    3
  );
INSERT INTO
  `sales` (
    `saleID`,
    `staffID`,
    `customerID`,
    `blankNumber`,
    `amount`,
    `amountUSD`,
    `localTax`,
    `otherTax`,
    `isRefunded`,
    `payByDate`,
    `paymentTypeID`,
    `isPaid`,
    `commisionRate`,
    `exchangeRateCode`,
    `transactionDate`,
    `cardDetails`
  )
VALUES
  (
    17,
    1,
    1,
    444000000003,
    220.00,
    94.60,
    63.00,
    75.00,
    'no',
    '2020-02-01',
    3,
    'no',
    9.00,
    'SWE',
    '2020-04-01',
    NULL
  );
INSERT INTO
  `sales` (
    `saleID`,
    `staffID`,
    `customerID`,
    `blankNumber`,
    `amount`,
    `amountUSD`,
    `localTax`,
    `otherTax`,
    `isRefunded`,
    `payByDate`,
    `paymentTypeID`,
    `isPaid`,
    `commisionRate`,
    `exchangeRateCode`,
    `transactionDate`,
    `cardDetails`
  )
VALUES
  (
    18,
    1,
    1,
    201000000001,
    94.60,
    94.60,
    63.00,
    0.00,
    'no',
    '2021-10-01',
    3,
    'yes',
    9.00,
    'USD',
    '2021-10-01',
    4
  );
INSERT INTO
  `sales` (
    `saleID`,
    `staffID`,
    `customerID`,
    `blankNumber`,
    `amount`,
    `amountUSD`,
    `localTax`,
    `otherTax`,
    `isRefunded`,
    `payByDate`,
    `paymentTypeID`,
    `isPaid`,
    `commisionRate`,
    `exchangeRateCode`,
    `transactionDate`,
    `cardDetails`
  )
VALUES
  (
    19,
    1,
    1,
    201000000002,
    321.00,
    321.00,
    12.00,
    0.00,
    'no',
    '2020-05-05',
    3,
    'yes',
    12.00,
    'USD',
    '2020-05-05',
    5
  );
INSERT INTO
  `sales` (
    `saleID`,
    `staffID`,
    `customerID`,
    `blankNumber`,
    `amount`,
    `amountUSD`,
    `localTax`,
    `otherTax`,
    `isRefunded`,
    `payByDate`,
    `paymentTypeID`,
    `isPaid`,
    `commisionRate`,
    `exchangeRateCode`,
    `transactionDate`,
    `cardDetails`
  )
VALUES
  (
    30,
    1,
    1,
    201000000003,
    122.00,
    122.00,
    8.00,
    0.00,
    'no',
    '2020-02-21',
    1,
    'yes',
    12.00,
    'USD',
    '2020-02-21',
    NULL
  );
INSERT INTO
  `sales` (
    `saleID`,
    `staffID`,
    `customerID`,
    `blankNumber`,
    `amount`,
    `amountUSD`,
    `localTax`,
    `otherTax`,
    `isRefunded`,
    `payByDate`,
    `paymentTypeID`,
    `isPaid`,
    `commisionRate`,
    `exchangeRateCode`,
    `transactionDate`,
    `cardDetails`
  )
VALUES
  (
    31,
    1,
    1,
    201000000004,
    376.00,
    376.00,
    5.00,
    0.00,
    'no',
    '2020-02-06',
    1,
    'yes',
    7.00,
    'USD',
    '2020-02-06',
    NULL
  );
INSERT INTO
  `sales` (
    `saleID`,
    `staffID`,
    `customerID`,
    `blankNumber`,
    `amount`,
    `amountUSD`,
    `localTax`,
    `otherTax`,
    `isRefunded`,
    `payByDate`,
    `paymentTypeID`,
    `isPaid`,
    `commisionRate`,
    `exchangeRateCode`,
    `transactionDate`,
    `cardDetails`
  )
VALUES
  (
    32,
    1,
    1,
    201000000005,
    688.00,
    376.00,
    5.00,
    0.00,
    'no',
    '2020-02-06',
    2,
    'yes',
    7.00,
    'USD',
    '2020-02-06',
    4
  );
INSERT INTO
  `sales` (
    `saleID`,
    `staffID`,
    `customerID`,
    `blankNumber`,
    `amount`,
    `amountUSD`,
    `localTax`,
    `otherTax`,
    `isRefunded`,
    `payByDate`,
    `paymentTypeID`,
    `isPaid`,
    `commisionRate`,
    `exchangeRateCode`,
    `transactionDate`,
    `cardDetails`
  )
VALUES
  (
    33,
    1,
    1,
    201000000006,
    0.00,
    688.00,
    9.00,
    0.00,
    'no',
    '2020-02-06',
    1,
    'yes',
    12.00,
    'USD',
    '2020-02-06',
    NULL
  );
INSERT INTO
  `sales` (
    `saleID`,
    `staffID`,
    `customerID`,
    `blankNumber`,
    `amount`,
    `amountUSD`,
    `localTax`,
    `otherTax`,
    `isRefunded`,
    `payByDate`,
    `paymentTypeID`,
    `isPaid`,
    `commisionRate`,
    `exchangeRateCode`,
    `transactionDate`,
    `cardDetails`
  )
VALUES
  (
    34,
    1,
    1,
    420000000007,
    663.00,
    358.02,
    12.00,
    4.00,
    'no',
    '2020-02-06',
    1,
    'yes',
    12.00,
    'GBR',
    '2020-02-06',
    NULL
  );
INSERT INTO
  `sales` (
    `saleID`,
    `staffID`,
    `customerID`,
    `blankNumber`,
    `amount`,
    `amountUSD`,
    `localTax`,
    `otherTax`,
    `isRefunded`,
    `payByDate`,
    `paymentTypeID`,
    `isPaid`,
    `commisionRate`,
    `exchangeRateCode`,
    `transactionDate`,
    `cardDetails`
  )
VALUES
  (
    35,
    1,
    1,
    420000000009,
    1000.00,
    540.00,
    15.00,
    8.00,
    'no',
    '2020-02-06',
    1,
    'yes',
    8.00,
    'GBR',
    '2020-02-06',
    NULL
  );
INSERT INTO
  `sales` (
    `saleID`,
    `staffID`,
    `customerID`,
    `blankNumber`,
    `amount`,
    `amountUSD`,
    `localTax`,
    `otherTax`,
    `isRefunded`,
    `payByDate`,
    `paymentTypeID`,
    `isPaid`,
    `commisionRate`,
    `exchangeRateCode`,
    `transactionDate`,
    `cardDetails`
  )
VALUES
  (
    36,
    1,
    1,
    420000000010,
    887.00,
    478.98,
    8.00,
    5.00,
    'no',
    '2020-02-06',
    1,
    'yes',
    12.00,
    'GBR',
    '2020-02-06',
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: staff
# ------------------------------------------------------------

INSERT INTO
  `staff` (
    `staffID`,
    `name`,
    `surname`,
    `address`,
    `staffTypeID`,
    `email`,
    `password`,
    `agencyID`,
    `active`
  )
VALUES
  (
    1,
    'Jeff',
    'Bozos',
    '54 Calbrook Ave IG2 4EG',
    1,
    'a',
    'b',
    1,
    'yes'
  );
INSERT INTO
  `staff` (
    `staffID`,
    `name`,
    `surname`,
    `address`,
    `staffTypeID`,
    `email`,
    `password`,
    `agencyID`,
    `active`
  )
VALUES
  (
    2,
    'Marc',
    'Guggenheim',
    '42 Westbrook Ave NG2 7YG',
    2,
    'mg@live.com',
    'marc',
    1,
    'yes'
  );
INSERT INTO
  `staff` (
    `staffID`,
    `name`,
    `surname`,
    `address`,
    `staffTypeID`,
    `email`,
    `password`,
    `agencyID`,
    `active`
  )
VALUES
  (
    3,
    'Dave',
    'Santos',
    '12 Kalandin Ave FH3 C32',
    3,
    'ds@live.com',
    'dave',
    1,
    'yes'
  );
INSERT INTO
  `staff` (
    `staffID`,
    `name`,
    `surname`,
    `address`,
    `staffTypeID`,
    `email`,
    `password`,
    `agencyID`,
    `active`
  )
VALUES
  (
    4,
    'S',
    'R',
    '54 East Side Ave E1 3G4',
    1,
    'S',
    'R',
    1,
    'yes'
  );
INSERT INTO
  `staff` (
    `staffID`,
    `name`,
    `surname`,
    `address`,
    `staffTypeID`,
    `email`,
    `password`,
    `agencyID`,
    `active`
  )
VALUES
  (
    5,
    'John',
    'Travolta',
    '54 Eastbrook Ave NY 1154',
    1,
    'J',
    'T',
    1,
    'yes'
  );
INSERT INTO
  `staff` (
    `staffID`,
    `name`,
    `surname`,
    `address`,
    `staffTypeID`,
    `email`,
    `password`,
    `agencyID`,
    `active`
  )
VALUES
  (
    6,
    'Mike',
    'Walzowski',
    '54 Bishop Ave NY 2254 IL',
    1,
    'M',
    'W',
    1,
    'yes'
  );
INSERT INTO
  `staff` (
    `staffID`,
    `name`,
    `surname`,
    `address`,
    `staffTypeID`,
    `email`,
    `password`,
    `agencyID`,
    `active`
  )
VALUES
  (
    211,
    'Dennis',
    'Menace',
    '21 Calbrook Ave IG2 4EG',
    1,
    'Dennis',
    'Gnasher',
    1,
    'yes'
  );
INSERT INTO
  `staff` (
    `staffID`,
    `name`,
    `surname`,
    `address`,
    `staffTypeID`,
    `email`,
    `password`,
    `agencyID`,
    `active`
  )
VALUES
  (
    220,
    'Minnie',
    'Minx',
    '22 Calbrook Ave IG2 4EG',
    3,
    'Minnie',
    'NotiGirl',
    1,
    'yes'
  );
INSERT INTO
  `staff` (
    `staffID`,
    `name`,
    `surname`,
    `address`,
    `staffTypeID`,
    `email`,
    `password`,
    `agencyID`,
    `active`
  )
VALUES
  (
    250,
    'Penelope',
    'Pitstop',
    '54 Calbrook Ave IG2 4EG',
    1,
    'Penelope',
    'PinkMobile',
    1,
    'yes'
  );
INSERT INTO
  `staff` (
    `staffID`,
    `name`,
    `surname`,
    `address`,
    `staffTypeID`,
    `email`,
    `password`,
    `agencyID`,
    `active`
  )
VALUES
  (
    320,
    'Arthur',
    'Daley',
    '43 Calbrook Ave IG2 4EG',
    2,
    'Arthur',
    'LiesaLot',
    1,
    'yes'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: stafftype
# ------------------------------------------------------------

INSERT INTO
  `stafftype` (`staffTypeID`, `staffType`)
VALUES
  (1, 'advisor');
INSERT INTO
  `stafftype` (`staffTypeID`, `staffType`)
VALUES
  (2, 'admin');
INSERT INTO
  `stafftype` (`staffTypeID`, `staffType`)
VALUES
  (3, 'office manager');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: status
# ------------------------------------------------------------

INSERT INTO
  `status` (`statusID`, `status`)
VALUES
  (1, 'used');
INSERT INTO
  `status` (`statusID`, `status`)
VALUES
  (2, 'assigned');
INSERT INTO
  `status` (`statusID`, `status`)
VALUES
  (3, 'recieved');
INSERT INTO
  `status` (`statusID`, `status`)
VALUES
  (4, 'void');
INSERT INTO
  `status` (`statusID`, `status`)
VALUES
  (5, 'returned');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: travelagency
# ------------------------------------------------------------

INSERT INTO
  `travelagency` (`agencyID`, `name`, `address`)
VALUES
  (
    1,
    'Logicaly',
    'Northampton Square, Clerkenwell EC1V 0HB'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: typeofpayment
# ------------------------------------------------------------

INSERT INTO
  `typeofpayment` (`paymentTypeID`, `paymentType`)
VALUES
  (1, 'credit card');
INSERT INTO
  `typeofpayment` (`paymentTypeID`, `paymentType`)
VALUES
  (2, 'cash');
INSERT INTO
  `typeofpayment` (`paymentTypeID`, `paymentType`)
VALUES
  (3, 'valued');

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
