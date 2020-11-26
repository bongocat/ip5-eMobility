-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 24. Nov 2020 um 09:33
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

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `loads`
--

CREATE TABLE `loads` (
  `LoadID` int(11) NOT NULL,
  `LoadTypID` int(11) NOT NULL,
  `AnlageNr` int(11) NOT NULL,
  `MieterID` int(11) DEFAULT NULL,
  `Erstellt` timestamp NOT NULL DEFAULT current_timestamp(),
  `Aktualisiert` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Aktiv` tinyint(1) NOT NULL DEFAULT 1,
  `Kommentar` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `nutzer`
--

CREATE TABLE `nutzer` (
  `NutzerID` int(11) NOT NULL,
  `NutzerTyp` int(11) NOT NULL,
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
  `RechnugGestellt` date NOT NULL,
  `ZuZahlenBis` date NOT NULL,
  `RechungBezahlt` date NOT NULL,
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
  `Erstellt` int(11) NOT NULL DEFAULT current_timestamp(),
  `Aktualisiert` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Aktiv` tinyint(1) NOT NULL DEFAULT 1,
  `Kommentar` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `rechnungspositionen`
--

CREATE TABLE `rechnungspositionen` (
  `RechnungsPositionID` int(11) NOT NULL,
  `RechungsNummer` varchar(100) NOT NULL,
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
  ADD UNIQUE KEY `VerwalterID` (`VerwalterID`);

--
-- Indizes für die Tabelle `loads`
--
ALTER TABLE `loads`
  ADD PRIMARY KEY (`LoadID`),
  ADD UNIQUE KEY `LoadTypID` (`LoadTypID`),
  ADD UNIQUE KEY `AnlageNr` (`AnlageNr`);

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
  ADD UNIQUE KEY `NutzerTyp` (`NutzerTyp`);

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
  ADD UNIQUE KEY `RechnungsTypID` (`RechnungsTypID`),
  ADD UNIQUE KEY `KundenReferenzID` (`KundenReferenzID`),
  ADD UNIQUE KEY `RechnungsNummer` (`RechnungsNummer`),
  ADD UNIQUE KEY `RechnungAnReferenzID` (`RechnungAnReferenzID`),
  ADD UNIQUE KEY `LoadID` (`LoadID`);

--
-- Indizes für die Tabelle `rechnungspositionen`
--
ALTER TABLE `rechnungspositionen`
  ADD PRIMARY KEY (`RechnungsPositionID`),
  ADD UNIQUE KEY `RechungsNummer` (`RechungsNummer`);

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
  MODIFY `AnlageID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `loads`
--
ALTER TABLE `loads`
  MODIFY `LoadID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `loadtyp`
--
ALTER TABLE `loadtyp`
  MODIFY `LoadTypID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `nutzer`
--
ALTER TABLE `nutzer`
  MODIFY `NutzerID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `nutzertyp`
--
ALTER TABLE `nutzertyp`
  MODIFY `NutzerTypID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `rechnung`
--
ALTER TABLE `rechnung`
  MODIFY `RechnungID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `rechnungspositionen`
--
ALTER TABLE `rechnungspositionen`
  MODIFY `RechnungsPositionID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `rechnungstyp`
--
ALTER TABLE `rechnungstyp`
  MODIFY `RechnungsTypID` int(11) NOT NULL AUTO_INCREMENT;

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
  ADD CONSTRAINT `nutzer_ibfk_1` FOREIGN KEY (`NutzerTyp`) REFERENCES `nutzertyp` (`NutzerTypID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `rechnung`
--
ALTER TABLE `rechnung`
  ADD CONSTRAINT `rechnung_ibfk_1` FOREIGN KEY (`RechnungsTypID`) REFERENCES `rechnungstyp` (`RechnungsTypID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `rechnung_ibfk_2` FOREIGN KEY (`KundenReferenzID`) REFERENCES `nutzer` (`NutzerID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `rechnung_ibfk_3` FOREIGN KEY (`RechnungAnReferenzID`) REFERENCES `nutzer` (`NutzerID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `rechnung_ibfk_4` FOREIGN KEY (`LoadID`) REFERENCES `loads` (`LoadID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `rechnungspositionen`
--
ALTER TABLE `rechnungspositionen`
  ADD CONSTRAINT `rechnungspositionen_ibfk_1` FOREIGN KEY (`RechungsNummer`) REFERENCES `rechnung` (`RechnungsNummer`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `serviceabonnement`
--
ALTER TABLE `serviceabonnement`
  ADD CONSTRAINT `serviceabonnement_ibfk_1` FOREIGN KEY (`LoadID`) REFERENCES `loads` (`LoadID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `vorlage`
--
ALTER TABLE `vorlage`
  ADD CONSTRAINT `vorlage_ibfk_1` FOREIGN KEY (`RechnungsTypID`) REFERENCES `rechnungstyp` (`RechnungsTypID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `vorlagepositionen`
--
ALTER TABLE `vorlagepositionen`
  ADD CONSTRAINT `vorlagepositionen_ibfk_1` FOREIGN KEY (`VorlageID`) REFERENCES `vorlage` (`VorlageID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
