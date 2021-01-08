CREATE DATABASE IF NOT EXISTS `emobility2` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `emobility2`;

CREATE TABLE `facilities` (
  `facilityID` int(11) NOT NULL AUTO_INCREMENT,
  `administrationID` int(11) NOT NULL,
  `designation` varchar(50) NOT NULL,
  `street` varchar(50) NOT NULL,
  `streetNumber` varchar(20) NOT NULL,
  `areaCode` varchar(20) NOT NULL,
  `city` varchar(20) NOT NULL,
  `country` varchar(20) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `lastUpdated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `comment` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`facilityID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `loads` (
  `loadID` int(11) NOT NULL AUTO_INCREMENT,
  `loadTypeID` int(11) NOT NULL,
  `facilityID` int(11) NOT NULL,
  `tenantID` int(11) DEFAULT NULL,
  `invoiceTo` int(11) NOT NULL,
  `firstInvoice` date DEFAULT NULL,
  `intervalElectricity` int(11) DEFAULT NULL,
  `intervalService` int(11) DEFAULT NULL,
  `counterOld` int(11) NOT NULL,
  `counterOldDate` timestamp NULL DEFAULT NULL,
  `counterNew` int(11) NOT NULL,
  `counterNewDate` timestamp NULL DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `lastUpdated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `comment` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`loadID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `loadtypes` (
  `loadTypeID` int(11) NOT NULL AUTO_INCREMENT,
  `designation` varchar(20) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `lastUpdated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `comment` varchar(50) NOT NULL,
  PRIMARY KEY (`loadTypeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `users` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `userTypeID` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `familyName` varchar(50) NOT NULL,
  `salutation` varchar(20) NOT NULL,
  `company` varchar(50) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `mobile` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `street` varchar(50) NOT NULL,
  `streetNumber` varchar(20) NOT NULL,
  `areaCode` varchar(20) NOT NULL,
  `city` varchar(20) NOT NULL,
  `country` varchar(20) NOT NULL,
  `invoiceToShippingAdress` tinyint(1) NOT NULL,
  `shippingStreet` varchar(50) DEFAULT NULL,
  `shippingStreetNumber` varchar(20) DEFAULT NULL,
  `shippingAreaCode` varchar(20) DEFAULT NULL,
  `shippingCity` varchar(20) DEFAULT NULL,
  `shippingCountry` varchar(20) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `lastUpdated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `comment` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `usertypes` (
  `userTypeID` int(11) NOT NULL AUTO_INCREMENT,
  `designation` varchar(50) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `lastUpdated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `comment` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`userTypeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `invoices` (
  `invoiceID` int(11) NOT NULL AUTO_INCREMENT,
  `invoiceNumber` varchar(100) NOT NULL,
  `invoiceTypeID` int(11) NOT NULL,
  `customerRefID` int(11) NOT NULL,
  `invoiceToRefID` int(11) NOT NULL,
  `invoiceDate` date NOT NULL,
  `toPayUntil` date NOT NULL,
  `payedOn` date NOT NULL,
  `name` varchar(50) NOT NULL,
  `familyName` varchar(50) NOT NULL,
  `salutation` varchar(20) NOT NULL,
  `company` varchar(50) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `mobile` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `street` varchar(50) NOT NULL,
  `streetNumber` varchar(20) NOT NULL,
  `areaCode` varchar(20) NOT NULL,
  `city` varchar(20) NOT NULL,
  `country` varchar(20) NOT NULL,
  `invoiceToShippingAdress` tinyint(1) NOT NULL,
  `shippingStreet` varchar(50) DEFAULT NULL,
  `shippingStreetNumber` varchar(20) DEFAULT NULL,
  `shippingAreaCode` varchar(20) DEFAULT NULL,
  `shippingCity` varchar(20) DEFAULT NULL,
  `shippingCountry` varchar(20) DEFAULT NULL,
  `invoiceStatusID` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `lastUpdated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `comment` varchar(1000) NOT NULL,
  PRIMARY KEY (`invoiceID`),
  UNIQUE (`invoiceNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `invoicepositions` (
  `invoicePositionID` int(11) NOT NULL AUTO_INCREMENT,
  `invoiceNumber` varchar(100) NOT NULL,
  `positionName` varchar(100) NOT NULL,
  `loadID` int(11)NULL,
  `price` double NOT NULL,
  `amount` int(11) NOT NULL DEFAULT 1,
  `netto` double NOT NULL,
  `vat` double NOT NULL,
  `brutto` double NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `lastUpdated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `comment` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`invoicePositionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `invoicestatus` (
  `invoiceStatusID` int(11) NOT NULL AUTO_INCREMENT,
  `designation` varchar(10) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `lastUpdated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `comment` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`invoiceStatusID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `invoicetypes` (
  `invoiceTypeID` int(11) NOT NULL AUTO_INCREMENT,
  `designation` varchar(20) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `lastUpdated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `comment` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`invoiceTypeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


ALTER TABLE `facilities` 
	ADD FOREIGN KEY (`administrationID`) REFERENCES `users` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `loads` 
	ADD FOREIGN KEY (`loadTypeID`) REFERENCES `loadtypes` (`loadTypeID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
	ADD FOREIGN KEY (`facilityID`) REFERENCES `facilities` (`facilityID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
	ADD FOREIGN KEY (`tenantID`) REFERENCES `users` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
  
ALTER TABLE `users` 
	ADD FOREIGN KEY (`userTypeID`) REFERENCES `usertypes` (`userTypeID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `invoices`
  ADD FOREIGN KEY (`invoiceTypeID`) REFERENCES `invoicetypes` (`invoiceTypeID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD FOREIGN KEY (`customerRefID`) REFERENCES `users` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD FOREIGN KEY (`invoiceToRefID`) REFERENCES `users` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD FOREIGN KEY (`invoiceStatusID`) REFERENCES `invoicestatus` (`invoiceStatusID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `invoicepositions`
   ADD FOREIGN KEY (`loadID`) REFERENCES `loads` (`loadID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
   ADD FOREIGN KEY (`invoiceNumber`) REFERENCES `invoices` (`invoiceNumber`) ON DELETE NO ACTION ON UPDATE NO ACTION;
  