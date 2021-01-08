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
  `intervalElectricity` varchar(20) DEFAULT NULL,
  `intervalService` varchar(20) DEFAULT NULL,
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
  `standardPriceWhenActive` double NOT NULL,
  `standardPriceWhenInactive` double NOT NULL DEFAULT 1.0,
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
  `payedOn` date NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
	ADD FOREIGN KEY (`tenantID`) REFERENCES `users` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
	ADD FOREIGN KEY (`invoiceTo`) REFERENCES `usertypes` (`userTypeID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
  
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
	
	
--
-- Daten für Tabelle `invoicetypes`
--
		
INSERT INTO `invoicetypes` (`invoiceTypeID`, `designation`, `created`, `lastUpdated`, `active`, `comment`) VALUES
(1, 'Installation', '2021-01-01 00:00:00', '2021-01-01 00:00:00', 1, 'Installation costs for a load Load'),
(2, 'Service', '2021-01-01 00:00:00', '2021-01-01 00:00:00', 1, 'Service costs for a load Load'),
(3, 'Electricity', '2021-01-01 00:00:00', '2021-01-01 00:00:00', 1, 'Electricity for a load Load'),
(4, 'Miscellaneous', '2021-01-01 00:00:00', '2021-01-01 00:00:00', 1, 'Miscellaneous costs for a load Load');


--
-- Daten für Tabelle `usertypes`
--

INSERT INTO `usertypes` (`userTypeID`, `designation`, `created`, `lastUpdated`, `active`, `comment`) VALUES
(1, 'Administrator', '2021-01-01 00:00:00', '2021-01-01 00:00:00', 1, 'An administrator uses aquired loads from megalog to make it possible for tenants to charge their vehicles / devices. An administrator can also be a tenant.'),
(2, 'Tenant', '2021-01-01 00:00:00', '2021-01-01 00:00:00', 1, 'A tenant uses a load to charge his vehicles / devices');

--
-- Daten für Tabelle `invoicestatus`
--

INSERT INTO `invoicestatus` (`invoiceStatusID`, `designation`, `created`, `lastUpdated`, `active`, `comment`) VALUES
(1, 'Upcoming', '2021-01-01 00:00:00', '2021-01-01 00:00:00', 1, 'An upcoming invoice'),
(2, 'Generated', '2021-01-01 00:00:00', '2021-01-01 00:00:00', 1, 'An invoice which was generated'),
(3, 'Sent', '2021-01-01 00:00:00', '2021-01-01 00:00:00', 1, 'An invoice which was sent to the respective administrator / administration or tenant'),
(4, 'Payed', '2021-01-01 00:00:00', '2021-01-01 00:00:00', 1, 'An invoice which was payed by the respective administrator / administration or tenant');

--
-- Daten für Tabelle `loadtypes`
--

INSERT INTO `loadtypes` (`loadTypeID`, `designation`, `standardPriceWhenActive`, `standardPriceWhenInactive`, `created`, `lastUpdated`, `active`, `comment`) VALUES
(1, 'Ladestation A', 100, 0, '2021-01-01 00:00:00', '2021-01-01 00:00:00', 1, 'This is a load type for testing purposes'),
(2, 'Ladestation B', 150, 1, '2021-01-01 00:00:00', '2021-01-01 00:00:00', 1, 'This is a load type for testing purposes'),
(3, 'Ladestation C', 149.99, 1.5, '2021-01-01 00:00:00', '2021-01-01 00:00:00', 1, 'This is a load type for testing purposes'),
(4, 'Ladestation D', 100, 0, '2021-01-01 00:00:00', '2021-01-01 00:00:00', 0, 'This is a load type for testing purposes'),
(5, 'Ladestation E', 150, 1, '2021-01-01 00:00:00', '2021-01-01 00:00:00', 0, 'This is a load type for testing purposes'),
(6, 'Ladestation F', 149.99, 1.5, '2021-01-01 00:00:00', '2021-01-01 00:00:00', 0, 'This is a load type for testing purposes');

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`userID`, `userTypeID`, `name`, `familyName`, `salutation`, `company`, `phone`, `mobile`, `email`, `street`, `streetNumber`, `areaCode`, `city`, `country`, `invoiceToShippingAdress`, `shippingStreet`, `shippingStreetNumber`, `shippingAreaCode`, `shippingCity`, `shippingCountry`, `created`, `lastUpdated`, `active`, `comment`) VALUES
(1, 1, 'René', 'Achterberg', 'Herr', '', '+41 (0)61 12 12', '+41 (0)79 12 23', 'rene.achterberg@students.fhnw.ch', 'Musterstrasse', '01', '43', 'Bern', 'Schweiz', 0, NULL, NULL, NULL, NULL, NULL, '2021-01-01 00:00:00', '2021-01-01 00:00:00', 1, 'This is a test administrator'),
(2, 1, 'Samuel', 'Keller', 'Herr', 'Sample AG', '+41 (0)63 23 44', '+41 (0)76 23 34', 'samuel.keller@fhnw.ch', 'Denverstrasse', '02', '43', 'Basel', 'Schweiz', 1, 'Denuvoweg', '01', '42', 'Brugg', 'Schweiz', '2021-01-01 00:00:00', '2021-01-01 00:00:00', 1, 'This is a test administrator'),
(3, 2, 'Anna', 'Musterfrau', 'Frau', 'Verein Claramatte', '+41 (0)67 55 34', '+41 (0)78 34 45', 'anna@gmx.ch', 'Kohlgasse', '03', '43', 'Luzern', 'Schweiz', 0, NULL, NULL, NULL, NULL, NULL, '2021-01-01 00:00:00', '2021-01-01 00:00:00', 1, 'This is a test tenant'),
(4, 2, 'Silvia', 'Nissan', 'Frau', '', '+41 (0)64 01 01', '+41 (0)79 45 56', 'silvia@gmail.com', 'Langstrasse', '04', '43', 'Zürich', 'Schweiz', 1, 'Agavenstrasse', '03', '41', 'Willisau', 'Schweiz', '2021-01-01 00:00:00', '2021-01-01 00:00:00', 1, 'This is a test tenant');

--
-- Daten für Tabelle `facilities`
--

INSERT INTO `facilities` (`facilityID`, `administrationID`, `designation`, `street`, `streetNumber`, `areaCode`, `city`, `country`, `created`, `lastUpdated`, `active`, `comment`) VALUES
(1, 1, 'Facility 1', 'Musterstrasse', '34', '38', 'Basel', 'Schweiz', '2021-01-01 00:00:00', '2021-01-01 00:00:00', 1, 'This is a test facility'),
(2, 2, 'Facility 2', 'Musterweg', '2', '1337', 'Zürich', 'Schweiz', '2021-01-01 00:00:00', '2021-01-01 00:00:00', 1, 'This is a test facility'),
(3, 2, 'Facility 3', 'Birkenweg', '45', '2448', 'Olten', 'Schweiz', '2021-01-01 00:00:00', '2021-01-01 00:00:00', 0, 'This is a test facility'),
(4, 1, 'Facility 4', 'Birkenstrasse', '17', '3', 'Pratteln', 'Schweiz', '2021-01-01 00:00:00', '2021-01-01 00:00:00', 0, 'This is a test facility');

--
-- Daten für Tabelle `loads`
--

INSERT INTO `loads` (`loadID`, `loadTypeID`, `facilityID`, `tenantID`, `invoiceTo`, `firstInvoice`, `intervalElectricity`, `intervalService`, `counterOld`, `counterOldDate`, `counterNew`, `counterNewDate`, `created`, `lastUpdated`, `active`, `comment`) VALUES
(1, 1, 1, 3, 1, '2021-01-31', 30, 30, 0, NULL, 0, NULL, '2021-01-01 00:00:00', '2021-01-01 00:00:00', 1, 'This is a test load'),
(2, 2, 2, 4, 2, '2021-01-31', 30, 30, 0, NULL, 0, NULL, '2021-01-01 00:00:00', '2021-01-01 00:00:00', 1, 'This is a test load');

--
-- Daten für Tabelle `invoices`
--

INSERT INTO `invoices` (`invoiceID`, `invoiceNumber`, `invoiceTypeID`, `customerRefID`, `invoiceToRefID`, `invoiceDate`, `toPayUntil`, `payedOn`, `name`, `familyName`, `salutation`, `company`, `phone`, `mobile`, `email`, `street`, `streetNumber`, `areaCode`, `city`, `country`, `invoiceToShippingAdress`, `shippingStreet`, `shippingStreetNumber`, `shippingAreaCode`, `shippingCity`, `shippingCountry`, `invoiceStatusID`, `created`, `lastUpdated`, `active`, `comment`) VALUES
(1, '0101010101', 4, 3, 3, '2021-01-08', '2021-02-08', NULL, 'Anna', 'Musterfrau', 'Frau', 'Verein Claramatte', '+41 (0)67 55 34', '+41 (0)78 34 45', 'anna@gmx.ch', 'Kohlgasse', '03', '43', 'Luzern', 'Schweiz', 0, NULL, NULL, NULL, NULL, NULL, 2, '2020-12-31 23:00:00', '2021-01-08 15:33:43', 1, 'This is a miscelanious invoice for test purposes');
