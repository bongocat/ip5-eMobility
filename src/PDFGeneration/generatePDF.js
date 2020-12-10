import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export function toPDF(invoice, users, facilities) {



    var date = new Date()

    console.log(date.toDateString())

    console.log(invoice, users, facilities)

    const facility = facilities.filter(facility => facility.AnlageID === invoice.AnlageID)
    console.log(facility)
    //var tenant = users.filter(this.NutzerID === invoice.MieterReferenz)
    var landlord = users.filter(user => user.NutzerID === invoice.VermieterReferenz)
    console.log(landlord)

    var dd = {
        content: [
            {
                columns: [{text: date.toString(), alignment: 'left'}, {text: 'Rechnungsnummer: ' + invoice.RechnungsNr, alignment: 'right', fontSize: 8}],
            },
            {text: landlord[0].Nachname, alignment: 'left'},
            {text: facility[0].Strasse + ' ' + facility[0].Hausnummer, alignment: 'left'},
            {text: facility[0].PLZ, alignment: 'left'},


            {text: 'Rechnung für ' + invoice.RechnungsArt + ' der Ladeinfrastruktur ', style: 'header', margin: [0, 30]},

            {
                style: 'tableExample',
                table: {
                    widths: ['*', '*', '*'],
                    heights: [30, 30, 30],
                    body: [
                        ['Objekt', 'Column 2', '-'],
                        ['Projekt', 'Projektname', '-'],
                        ['Abrechnungsperiode', '-', '-']
                    ]
                }
            },


            {text: 'Total aktive Berechnungseinheiten (1BE = 1x16A / 230V):15 BE -> 8.50 / BE '},

            {
                style: 'tableExample', width: '*',
                table: {
                    widths: ['auto', '*', 'auto', 'auto', 'auto'],
                    heights: ['auto', 'auto', 'auto', 'auto', 'auto'],
                    body: [
                        ['Pos. ', 'Beschreibung ', 'Stk. ', 'Preis/Stk. ', 'Gesamtpreis'],
                        ['1', 'Powerbox Gateway (3-phasig) \n PP8 (Name Nutzer)', '1x3 ', '8.50 ', '25.50 '],
                        ['2', 'Powerbox Gateway (3-phasig) \n PP14 + PP16 (Name Nutzer) ', '2x3 ', '8.50 ', '51.00 '],
                        ['3', 'Powerbox Gateway (3-phasig) \n PP20 (Name Nutzer)', '1x3 ', '8.50 ', '25.50 '],
                        ['4', 'Powerbox Gateway (3-phasig) \n PP32 (Name Nutzer) ', '1x3 ', '8.50 ', '25.50 '],
                        ['', {text: 'Total exkl. MwSt', bold: true}, '', '', {text: '127.50 ', bold: true}],
                        ['', '7.7% MwSt ', '', '', '9.80 '],
                        ['', {text: 'Total inkl. MwSt, zahlbar innert 10 Tagen ', bold: true}, '', '', {
                            text: '137.80 ',
                            bold: true
                        }]
                    ]
                }
            },

            {text: 'Freundliche Grüsse', alignment: 'left', margin: [0, 15]},

            {text: 'megalog AG \n Markus Bossert', alignment: 'left'},

            {text: 'Bankverbindung', alignment: 'left', bold: true, margin: [0, 15, 0, 0], fontSize: 11,},
            {
                text: 'Bank: Postfinance  |  KontoNr: CH51 0900 0000 1526 2931 0  |  Kontoinhaber: megalog AG, Luzern ',
                alignment: 'left', width: 'auto', fontSize: 10,
            },
            {text: 'Vermerk: ' + invoice.Kommentar, alignment: 'left', fontSize: 11, margin: [0, 15]},

        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            subheader: {
                fontSize: 12,
                bold: true,
                margin: [0, 10, 0, 5]
            },
            tableExample: {
                margin: [0, 5, 0, 15]
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            }
        },
        defaultStyle: {
            // alignment: 'justify'
        }

    }

    pdfMake.createPdf(dd).download();
}