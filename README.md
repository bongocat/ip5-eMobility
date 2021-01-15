### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# ip5-eMobility

## Table Of Contents
1. [General Info](#general-info)
2. [Technologies](#technologies)
3. [Installation](#installation)
4. [About Us](#about-us)
5. [FAQs](#faqs)

## General Info
IP5 eMobility: Nutzerportal

## Technologies

- Frontend: HTML / CSS / View.js
- Database: MariaDB / MySQL

## Installation

## Project setup
```
Um die Applikation lokal laufen zu lassen, wird eine Installation von node.js benötigt. 
Auf https://nodejs.org/de/ kann die neuste Version heruntergeladen werden.

1) Wenn Sie das Projekt heruntergeladen und entpack haben, 
öffnen Sie eine Kommandozeile (unter Windows nach "cmd" suchen, 
unter macOS nach "terminal") und navigieren Sie in das Grundverzeichnis 
(cd "Hier/Dateipfad/einfügen/ip5-eMobility"). 
Hier führen Sie zunächst den Befehl "npm install" aus. 
Sobald die nötigen Abhängigkeiten installiert sind können Sie mit dem Befehl 
"npm run serve" die Applikation starten.

2) Dann benötigen Sie eine zweite Kommandozeile, die sie analog zu 1) ins 
ip5-eMobility-Verzeichnis navigieren. Dort können Sie mit dem Befehl 
"npm run api" den API-Server starten. 

3) Für die Datenbank benötigen Sie einen MySQL-Server. Hier bietet sich XAMPP an, 
welches Sie unter https://www.apachefriends.org/index.html herunterladen können. 
Wenn Sie XAMPP installiert und gestartet haben, starten Sie im XAMPP-Control Panel 
den Apache-Server und den MySQL-Server. Über den Button "Admin" des MySQL-Servers 
gelangen Sie auf die phpMyAdmin-Seite. Wählen Sie hier auf der linken Seit "Neu" an. 
Danach klicken Sie in der oberen Menüleiste auf "Importieren". 
Nun wählen Sie "Datei auswählen" an und navigieren Sie im Projektordner in 
den Unterordner src -> sqlscripts und wählen dort das emobility_version 07.sql-Script aus. 
Anschliessend bestätigen Sie ganz unten rechts mit "OK".

4) Nun sollte die Applikation lauffähig sein. 
Navigieren Sie in ihrem Browser zur URL http://localhost:8080/ um die Applikation zu verwenden.

```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```


## About Us
[@Bongocat](https://github.com/bongocat) & [@Rhiyeszeros](https://github.com/Rhiyeszeros)

## FAQs
