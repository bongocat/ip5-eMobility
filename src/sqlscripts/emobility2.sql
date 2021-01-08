-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 28. Dez 2020 um 19:15
-- Server-Version: 10.4.16-MariaDB
-- PHP-Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `emobility`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `anlagen`
--

CREATE TABLE `anlagen` (
  `AnlageID` int(11) NOT NULL,
  `VerwalterID` int(11) NOT NULL,
  `Bezeichnung` varchar(50) NOT NULL,
  `Strasse` varchar(50) NOT NULL,
  `StrassenNr` varchar(20) NOT NULL,
  `PLZ` varchar(20) NOT NULL,
  `Ort` varchar(20) NOT NULL,
  `Land` varchar(20) NOT NULL,
  `Erfasst` timestamp NOT NULL DEFAULT current_timestamp(),
  `Aktualisiert` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Aktiv` tinyint(1) NOT NULL DEFAULT 1,
  `Kommentar` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `anlagen`
--

INSERT INTO `anlagen` (`AnlageID`, `VerwalterID`, `Bezeichnung`, `Strasse`, `StrassenNr`, `PLZ`, `Ort`, `Land`, `Erfasst`, `Aktualisiert`, `Aktiv`, `Kommentar`) VALUES
(1, 1, 'eererer', 'asdfasdf', 'asdfasdf', 'asdfasdf', 'sadfasdf', 'asdfasdf', '2020-12-26 15:07:02', '2020-12-26 15:07:02', 1, 'asfw234sdfgqr5gadfv'),
(2, 1, 'tesrtrefd', 'Teststrasse', '2', '23', 'basel', 'sdfsd', '2020-12-26 16:13:09', '2020-12-26 16:13:09', 1, 'bab'),
(5, 1, 'tesrtrefd', 'Teststrasse', '2', '23', 'basel', 'sdfsd', '2020-12-26 16:34:17', '2020-12-26 16:34:17', 1, 'bab'),
(8, 1, 'tesrtrefd', 'Teststrasse', '2', '23', 'basel', 'sdfsd', '2020-12-26 16:34:59', '2020-12-26 16:34:59', 1, 'bab'),
(9, 1, 'tesrtrefd', 'Teststrasse', '2', '23', 'basel', 'sdfsd', '2020-12-26 16:35:00', '2020-12-26 16:35:00', 1, 'bab'),
(10, 1, 'tesrtrefd', 'Teststrasse', '2', '2rr', 'Zürich', 'sdfsd', '2020-12-26 16:35:01', '2020-12-26 16:41:34', 1, 'bab'),
(11, 1, 'tesrtrefd', 'Teststsdfsdfsdfsdfrasse', '2', '2rr', 'Zürich', 'sdfsd', '2020-12-26 16:41:47', '2020-12-26 16:41:47', 1, 'bab');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `loads`
--

CREATE TABLE `loads` (
  `LoadID` int(11) NOT NULL,
  `LoadTypID` int(11) NOT NULL,
  `AnlageNr` int(11) NOT NULL,
  `MieterID` int(11) DEFAULT NULL,
  `RechnungAn` int(11) NOT NULL,
  `ErsteRechnung` date DEFAULT NULL,
  `StromIntervall` int(11) DEFAULT NULL,
  `ServiceIntervall` int(11) DEFAULT NULL,
  `Erstellt` timestamp NOT NULL DEFAULT current_timestamp(),
  `Aktualisiert` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Aktiv` tinyint(1) NOT NULL DEFAULT 1,
  `Kommentar` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `loads`
--

INSERT INTO `loads` (`LoadID`, `LoadTypID`, `AnlageNr`, `MieterID`, `RechnungAn`, `ErsteRechnung`, `StromIntervall`, `ServiceIntervall`, `Erstellt`, `Aktualisiert`, `Aktiv`, `Kommentar`) VALUES
(4, 1, 1, 1, 0, NULL, NULL, NULL, '2020-12-26 15:07:14', '2020-12-26 15:42:14', 0, 'blabla'),
(6, 1, 1, 1, 0, NULL, NULL, NULL, '2020-12-26 15:20:22', '2020-12-26 15:51:56', 0, 'wsdfdsdsdfdfdfdfdf'),
(7, 1, 1, 1, 0, NULL, NULL, NULL, '2020-12-26 15:22:18', '2020-12-26 15:37:19', 0, 'blabla'),
(8, 1, 1, 1, 0, NULL, NULL, NULL, '2020-12-26 15:22:18', '2020-12-26 15:37:18', 0, 'blabla'),
(9, 1, 1, 1, 0, NULL, NULL, NULL, '2020-12-26 15:22:19', '2020-12-26 15:33:43', 1, 'blabla'),
(10, 1, 1, 1, 0, NULL, NULL, NULL, '2020-12-26 15:22:20', '2020-12-26 15:37:21', 0, 'blabla'),
(11, 1, 1, 1, 0, NULL, NULL, NULL, '2020-12-26 15:22:20', '2020-12-26 15:33:43', 1, 'blabla'),
(12, 1, 1, 1, 0, NULL, NULL, NULL, '2020-12-26 15:25:47', '2020-12-26 15:37:23', 0, 'blabla'),
(13, 1, 1, 1, 1, '0000-00-00', 23, 23, '2020-12-28 18:14:12', '2020-12-28 18:14:12', 0, 'blabla');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `loadtyp`
--

CREATE TABLE `loadtyp` (
  `LoadTypID` int(11) NOT NULL,
  `Bezeichnung` varchar(20) NOT NULL,
  `Erfasst` timestamp NOT NULL DEFAULT current_timestamp(),
  `Aktualisiert` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Aktiv` tinyint(1) NOT NULL DEFAULT 1,
  `Kommentar` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `loadtyp`
--

INSERT INTO `loadtyp` (`LoadTypID`, `Bezeichnung`, `Erfasst`, `Aktualisiert`, `Aktiv`, `Kommentar`) VALUES
(1, 'Test', '2020-12-26 15:04:00', '2020-12-26 15:04:00', 1, 'Bla');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `nutzer`
--

CREATE TABLE `nutzer` (
  `NutzerID` int(11) NOT NULL,
  `NutzerTypID` int(11) NOT NULL,
  `Vorname` varchar(50) NOT NULL,
  `Nachname` varchar(50) NOT NULL,
  `Anrede` varchar(20) NOT NULL,
  `Firma` varchar(50) NOT NULL,
  `FestnetzNummer` varchar(50) DEFAULT NULL,
  `HandyNummer` varchar(50) DEFAULT NULL,
  `EMailAdresse` varchar(100) DEFAULT NULL,
  `WStrasse` varchar(50) NOT NULL,
  `WStrassenNr` varchar(20) NOT NULL,
  `WPLZ` varchar(20) NOT NULL,
  `WOrt` varchar(20) NOT NULL,
  `WLand` varchar(20) NOT NULL,
  `RiW` tinyint(1) NOT NULL,
  `RStrasse` varchar(50) DEFAULT NULL,
  `RStrassenNr` varchar(20) DEFAULT NULL,
  `RPLZ` varchar(20) DEFAULT NULL,
  `ROrt` varchar(20) DEFAULT NULL,
  `RLand` varchar(20) DEFAULT NULL,
  `Erstellt` timestamp NOT NULL DEFAULT current_timestamp(),
  `Aktualisiert` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Aktiv` tinyint(1) NOT NULL DEFAULT 1,
  `Kommentar` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `nutzer`
--

INSERT INTO `nutzer` (`NutzerID`, `NutzerTypID`, `Vorname`, `Nachname`, `Anrede`, `Firma`, `FestnetzNummer`, `HandyNummer`, `EMailAdresse`, `WStrasse`, `WStrassenNr`, `WPLZ`, `WOrt`, `WLand`, `RiW`, `RStrasse`, `RStrassenNr`, `RPLZ`, `ROrt`, `RLand`, `Erstellt`, `Aktualisiert`, `Aktiv`, `Kommentar`) VALUES
(1, 1, 'Pika', 'Deamon', 'Mister', 'Blue', '0611111111', '0798898989', 'metro.deamon@blue.co', 'Ponystreet', '42', '6969', 'Night-City', 'Africa', 1, 'Uwustreet', '1337', '12', 'New York', 'USA', '2020-12-26 15:06:34', '2020-12-26 18:30:57', 1, 'This is a fictional user to the the underlaying api of the megalog application created for ip5 in 2020/2021'),
(2, 1, 'Metro', 'Deamon', 'Mister', 'Blue', '0611111111', '0798898989', 'metro.deamon@blue.co', 'Ponystreet', '42', '6969', 'Night-City', 'Africa', 1, 'Uwustreet', '1337', '12', 'New York', 'USA', '2020-12-26 17:20:46', '2020-12-26 18:29:43', 1, 'This is a fictional user to the the underlaying api of the megalog application created for ip5 in 2020/2021'),
(3, 1, 'Metro', 'Deamon', 'Mister', 'Blue', '0611111111', '0798898989', 'metro.deamon@blue.co', 'Ponystreet', '42', '6969', 'Night-City', 'Africa', 1, 'Uwustreet', '1337', '12', 'New York', 'USA', '2020-12-26 17:25:14', '2020-12-26 17:25:14', 1, 'This is a fictional user to the the underlaying api of the megalog application created for ip5 in 2020/2021');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `nutzertyp`
--

CREATE TABLE `nutzertyp` (
  `NutzerTypID` int(11) NOT NULL,
  `Bezeichnung` varchar(50) NOT NULL,
  `Erfasst` timestamp NOT NULL DEFAULT current_timestamp(),
  `Aktualisiert` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Aktiv` tinyint(1) NOT NULL DEFAULT 1,
  `Kommentar` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `nutzertyp`
--

INSERT INTO `nutzertyp` (`NutzerTypID`, `Bezeichnung`, `Erfasst`, `Aktualisiert`, `Aktiv`, `Kommentar`) VALUES
(1, 'Test', '2020-11-24 08:53:28', '2020-11-24 08:53:28', 1, 'haha');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `rechnung`
--

CREATE TABLE `rechnung` (
  `RechnungID` int(11) NOT NULL,
  `RechnungsNummer` varchar(100) NOT NULL,
  `RechnungsTypID` int(11) NOT NULL,
  `KundenReferenzID` int(11) NOT NULL,
  `RechnungAnReferenzID` int(11) NOT NULL,
  `LoadID` int(11) NOT NULL,
  `RechnungGestellt` date NOT NULL,
  `ZuZahlenBis` date NOT NULL,
  `RechnungBezahlt` date NOT NULL,
  `Vorname` varchar(50) NOT NULL,
  `Nachname` varchar(50) NOT NULL,
  `Anrede` varchar(20) NOT NULL,
  `Firma` varchar(50) NOT NULL,
  `FestnetzNummer` int(50) NOT NULL,
  `HandyNummer` int(50) NOT NULL,
  `EMailAdresse` varchar(100) NOT NULL,
  `WStrasse` varchar(50) NOT NULL,
  `WStrassenNr` varchar(20) NOT NULL,
  `WPLZ` varchar(20) NOT NULL,
  `WOrt` varchar(20) NOT NULL,
  `WLand` varchar(20) NOT NULL,
  `RStrasse` varchar(50) NOT NULL,
  `RStrassenNr` varchar(20) NOT NULL,
  `RPLZ` varchar(20) NOT NULL,
  `ROrt` varchar(20) NOT NULL,
  `RLand` varchar(20) NOT NULL,
  `ZählerAlt` int(11) NOT NULL,
  `ZählerAltDatum` timestamp NULL DEFAULT NULL,
  `ZählerNeu` int(11) NOT NULL,
  `ZählerNeuDatum` timestamp NULL DEFAULT NULL,
  `Erstellt` timestamp NOT NULL DEFAULT current_timestamp(),
  `Aktualisiert` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Aktiv` tinyint(1) NOT NULL DEFAULT 1,
  `Kommentar` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `rechnung`
--

INSERT INTO `rechnung` (`RechnungID`, `RechnungsNummer`, `RechnungsTypID`, `KundenReferenzID`, `RechnungAnReferenzID`, `LoadID`, `RechnungGestellt`, `ZuZahlenBis`, `RechnungBezahlt`, `Vorname`, `Nachname`, `Anrede`, `Firma`, `FestnetzNummer`, `HandyNummer`, `EMailAdresse`, `WStrasse`, `WStrassenNr`, `WPLZ`, `WOrt`, `WLand`, `RStrasse`, `RStrassenNr`, `RPLZ`, `ROrt`, `RLand`, `ZählerAlt`, `ZählerAltDatum`, `ZählerNeu`, `ZählerNeuDatum`, `Erstellt`, `Aktualisiert`, `Aktiv`, `Kommentar`) VALUES
(7, '1', 1, 1, 1, 4, '0000-00-00', '0000-00-00', '0000-00-00', '1', '1', '1', '1', 1, 1, '1', '1', '1', '1', '1', '1', '1', '1', '1', '2', '1', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '2020-12-26 19:39:19', 1, '1'),
(8, '3', 1, 1, 1, 4, '0000-00-00', '0000-00-00', '0000-00-00', '1', '1', '1', '1', 1, 1, '1', '1', '1', '1', '1', '1', '1', '1', '1', '2', '1', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '2020-12-26 19:51:34', 1, 'Your mom is nice'),
(9, '3', 1, 1, 1, 4, '0000-00-00', '0000-00-00', '0000-00-00', '1', '1', '1', '1', 1, 1, '1', '1', '1', '1', '1', '1', '1', '1', '1', '2', '1', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '2020-12-27 21:33:13', 1, '1'),
(11, '3', 1, 1, 1, 4, '0000-00-00', '0000-00-00', '0000-00-00', '1', '1', '1', '1', 1, 1, '1', '1', '1', '1', '1', '1', '1', '1', '1', '2', '1', 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '2020-12-27 21:37:45', 1, '1');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `rechnungspositionen`
--

CREATE TABLE `rechnungspositionen` (
  `RechnungsPositionID` int(11) NOT NULL,
  `RechnungsNummer` varchar(100) NOT NULL,
  `PositionsNamen` varchar(100) NOT NULL,
  `Preis` double NOT NULL,
  `Anzahl` int(11) NOT NULL DEFAULT 1,
  `Nettopreis` double NOT NULL,
  `MwSt` double NOT NULL,
  `Bruttopreis` double NOT NULL,
  `Kommentar` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `rechnungstyp`
--

CREATE TABLE `rechnungstyp` (
  `RechnungsTypID` int(11) NOT NULL,
  `Bezeichnung` varchar(20) NOT NULL,
  `Erfasst` timestamp NOT NULL DEFAULT current_timestamp(),
  `Aktualisiert` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Kommentar` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `rechnungstyp`
--

INSERT INTO `rechnungstyp` (`RechnungsTypID`, `Bezeichnung`, `Erfasst`, `Aktualisiert`, `Kommentar`) VALUES
(1, 'ysdcdydsc', '2020-12-26 19:38:27', '2020-12-26 19:38:27', 'asdfsdfsdfsdfsdf');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `serviceabonnement`
--

CREATE TABLE `serviceabonnement` (
  `ServiceAboID` int(11) NOT NULL,
  `LoadID` int(11) NOT NULL,
  `AboStart` date NOT NULL,
  `AboEnd` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vorlage`
--

CREATE TABLE `vorlage` (
  `VorlageID` int(11) NOT NULL,
  `VorlageName` varchar(100) NOT NULL,
  `RechnungsTypID` int(11) NOT NULL,
  `Erstellt` int(11) NOT NULL DEFAULT current_timestamp(),
  `Aktualisiert` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Aktiv` tinyint(1) NOT NULL DEFAULT 1,
  `Kommentar` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vorlagepositionen`
--

CREATE TABLE `vorlagepositionen` (
  `VorlagePositionID` int(11) NOT NULL,
  `VorlageID` int(11) NOT NULL,
  `PositionsNamen` varchar(100) NOT NULL,
  `Preis` double NOT NULL,
  `Anzahl` int(11) NOT NULL DEFAULT 1,
  `Nettopreis` double NOT NULL,
  `MwSt` double NOT NULL,
  `Bruttopreis` double NOT NULL,
  `Kommentar` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `anlagen`
--
ALTER TABLE `anlagen`
  ADD PRIMARY KEY (`AnlageID`),
  ADD KEY `anlagen_ibfk_1` (`VerwalterID`);

--
-- Indizes für die Tabelle `loads`
--
ALTER TABLE `loads`
  ADD PRIMARY KEY (`LoadID`),
  ADD KEY `loads_ibfk_1` (`LoadTypID`),
  ADD KEY `loads_ibfk_2` (`AnlageNr`);

--
-- Indizes für die Tabelle `loadtyp`
--
ALTER TABLE `loadtyp`
  ADD PRIMARY KEY (`LoadTypID`);

--
-- Indizes für die Tabelle `nutzer`
--
ALTER TABLE `nutzer`
  ADD PRIMARY KEY (`NutzerID`),
  ADD KEY `nutzer_ibfk_1` (`NutzerTypID`);

--
-- Indizes für die Tabelle `nutzertyp`
--
ALTER TABLE `nutzertyp`
  ADD PRIMARY KEY (`NutzerTypID`);

--
-- Indizes für die Tabelle `rechnung`
--
ALTER TABLE `rechnung`
  ADD PRIMARY KEY (`RechnungID`),
  ADD KEY `rechnung_ibfk_1` (`RechnungsTypID`),
  ADD KEY `rechnung_ibfk_2` (`KundenReferenzID`),
  ADD KEY `rechnung_ibfk_3` (`RechnungAnReferenzID`),
  ADD KEY `rechnung_ibfk_4` (`LoadID`);

--
-- Indizes für die Tabelle `rechnungspositionen`
--
ALTER TABLE `rechnungspositionen`
  ADD PRIMARY KEY (`RechnungsPositionID`),
  ADD UNIQUE KEY `RechungsNummer` (`RechnungsNummer`);

--
-- Indizes für die Tabelle `rechnungstyp`
--
ALTER TABLE `rechnungstyp`
  ADD PRIMARY KEY (`RechnungsTypID`);

--
-- Indizes für die Tabelle `serviceabonnement`
--
ALTER TABLE `serviceabonnement`
  ADD PRIMARY KEY (`ServiceAboID`),
  ADD UNIQUE KEY `LoadID` (`LoadID`);

--
-- Indizes für die Tabelle `vorlage`
--
ALTER TABLE `vorlage`
  ADD PRIMARY KEY (`VorlageID`),
  ADD UNIQUE KEY `RechnungsTypID` (`RechnungsTypID`);

--
-- Indizes für die Tabelle `vorlagepositionen`
--
ALTER TABLE `vorlagepositionen`
  ADD PRIMARY KEY (`VorlagePositionID`),
  ADD UNIQUE KEY `VorlageID` (`VorlageID`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `anlagen`
--
ALTER TABLE `anlagen`
  MODIFY `AnlageID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT für Tabelle `loads`
--
ALTER TABLE `loads`
  MODIFY `LoadID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT für Tabelle `loadtyp`
--
ALTER TABLE `loadtyp`
  MODIFY `LoadTypID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `nutzer`
--
ALTER TABLE `nutzer`
  MODIFY `NutzerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `nutzertyp`
--
ALTER TABLE `nutzertyp`
  MODIFY `NutzerTypID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `rechnung`
--
ALTER TABLE `rechnung`
  MODIFY `RechnungID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT für Tabelle `rechnungspositionen`
--
ALTER TABLE `rechnungspositionen`
  MODIFY `RechnungsPositionID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `rechnungstyp`
--
ALTER TABLE `rechnungstyp`
  MODIFY `RechnungsTypID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `serviceabonnement`
--
ALTER TABLE `serviceabonnement`
  MODIFY `ServiceAboID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `vorlage`
--
ALTER TABLE `vorlage`
  MODIFY `VorlageID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `vorlagepositionen`
--
ALTER TABLE `vorlagepositionen`
  MODIFY `VorlagePositionID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `anlagen`
--
ALTER TABLE `anlagen`
  ADD CONSTRAINT `anlagen_ibfk_1` FOREIGN KEY (`VerwalterID`) REFERENCES `nutzer` (`NutzerID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `loads`
--
ALTER TABLE `loads`
  ADD CONSTRAINT `loads_ibfk_1` FOREIGN KEY (`LoadTypID`) REFERENCES `loadtyp` (`LoadTypID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `loads_ibfk_2` FOREIGN KEY (`AnlageNr`) REFERENCES `anlagen` (`AnlageID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `nutzer`
--
ALTER TABLE `nutzer`
  ADD CONSTRAINT `nutzer_ibfk_1` FOREIGN KEY (`NutzerTypID`) REFERENCES `nutzertyp` (`NutzerTypID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `rechnung`
--
ALTER TABLE `rechnung`
  ADD CONSTRAINT `rechnung_ibfk_1` FOREIGN KEY (`RechnungsTypID`) REFERENCES `rechnungstyp` (`RechnungsTypID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `rechnung_ibfk_2` FOREIGN KEY (`KundenReferenzID`) REFERENCES `nutzer` (`NutzerID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `rechnung_ibfk_3` FOREIGN KEY (`RechnungAnReferenzID`) REFERENCES `nutzer` (`NutzerID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `rechnung_ibfk_4` FOREIGN KEY (`LoadID`) REFERENCES `loads` (`LoadID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `serviceabonnement`
--
ALTER TABLE `serviceabonnement`
  ADD CONSTRAINT `serviceabonnement_ibfk_1` FOREIGN KEY (`LoadID`) REFERENCES `loads` (`LoadID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
