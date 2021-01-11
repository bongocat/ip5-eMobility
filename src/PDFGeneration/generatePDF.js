import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import data from "@/store/modules/data";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export function regularInvoiceToPDF(invoice, invoicePositions, users, facilities) {

    var date = new Date()

    console.log(date.toDateString())

    console.log(invoice, invoicePositions, users, facilities)

    const invoiceType = data.state.invoiceTypes.filter(invoiceType => invoiceType.invoiceTypeID === invoice.invoiceTypeID)[0]
    const facility = facilities.filter(facility => facility.administrationID === invoice.customerRefID)[0]

    var street = (invoice.invoiceToShippingAdress === 0) ? invoice.street : invoice.shippingStreet
    var streetNumber = (invoice.invoiceToShippingAdress === 0) ? invoice.streetNumber : invoice.shippingStreetNumber
    var areaCode = (invoice.invoiceToShippingAdress === 0) ? invoice.areaCode : invoice.shippingAreaCode
    var city = (invoice.invoiceToShippingAdress === 0) ? invoice.city : invoice.shippingCity
    var body = tableBody()

    function tableBody () {
        var body = []
        var bruttoTotal = 0.0
        var nettoTotal = 0.0
        var difference = 0.0

        body.push(['Pos. ', 'Beschreibung ', 'Stk. ', 'Preis/Stk. ',  'Bruttopreis'])
        invoicePositions.forEach((invoicePosition, index) => {
            body.push([index + 1, invoicePosition.positionName, invoicePosition.amount, invoicePosition.price, invoicePosition.brutto])
            bruttoTotal += invoicePosition.brutto
            nettoTotal += invoicePosition.netto
        })
        difference = nettoTotal - bruttoTotal
        body.push(['', {text: 'Total exkl. MwSt', bold: true}, '', '', {text: bruttoTotal + " CHF", bold: true}],)
        body.push(['', (invoicePositions[0].vat * 100).toFixed(2) + " %", '', '', difference + " CHF"],)
        body.push(['', {text: 'Total inkl. MwSt, zahlbar innert ' + (inDays(new Date(), new Date(invoice.toPayUntil)).toString() + " Tagen"), bold: true}, '', '', {
            text: nettoTotal + " CHF",
            bold: true
        }])
        return body
    }

    function inDays (d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2-t1)/(24*3600*1000));
    }

    var dd = {
        content: [
            {
                columns: [{text: date.toString(), alignment: 'left'}, {text: 'Rechnungsnummer: ' + invoice.invoiceNumber, alignment: 'right', fontSize: 8}],
            },
            {text: invoice.company, alignment: 'left'},
            {text: invoice.name + " " + invoice.familyName, alignment: 'left'},
            {text: street + ' ' + streetNumber, alignment: 'left'},
            {text: areaCode + " " + city, alignment: 'left'},


            {text: 'Rechnung für ' + invoiceType.designation + ' der Ladeinfrastruktur ', style: 'header', margin: [0, 30]},

            {
                style: 'tableExample',
                table: {
                    widths: ['*', '*', '*'],
                    heights: [30, 30, 30],
                    body: [
                        ['Objekt', facility.designation, '-'],
                        ['Projekt', 'Projektname', '-'],
                        ['Abrechnungsperiode', '-', '-']
                    ]
                }
            },

            {
                style: 'tableExample', width: '*',
                table: {
                    widths: ['auto', '*', 'auto', 'auto', 'auto'],
                    heights: ['auto', 'auto', 'auto', 'auto', 'auto'],
                    body: body
                }
            },

            {text: 'Freundliche Grüsse', alignment: 'left', margin: [0, 15]},

            {text: 'megalog AG \n Markus Bossert', alignment: 'left'},

            {text: 'Bankverbindung', alignment: 'left', bold: true, margin: [0, 15, 0, 0], fontSize: 11,},

            {
                text: 'Bank: Postfinance  |  KontoNr: CH51 0900 0000 1526 2931 0  |  Kontoinhaber: megalog AG, Luzern ',
                alignment: 'left', width: 'auto', fontSize: 10,
            },
            {text: 'Vermerk: ' + invoice.comment, alignment: 'left', fontSize: 11, margin: [0, 15]},

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

export function exceptionalInvoiceToPDF(invoice, users, facilities) {

    var date = new Date()

    console.log(date.toDateString())

    console.log(invoice, users, facilities)

    const facility = facilities.filter(facility => facility.AnlageID === invoice.AnlageID)
    console.log(facility)
    //var tenant = users.filter(this.NutzerID === invoice.MieterReferenz)
    var landlord = users.filter(user => user.NutzerID === invoice.VermieterReferenz)
    console.log(landlord)

    function inDays (d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2-t1)/(24*3600*1000));
    }

    var dd = {
        content: [
            {
                columns: [{text: date.toString(), alignment: 'left'}, {text: 'Rechnungsnummer: ' + invoice.invoiceNumber, alignment: 'right', fontSize: 8}],
            },
            {text: invoice.name + " " + invoice.familyName, alignment: 'left'},
            {text: invoice.ShippingStreet + ' ' + invoice.ShippingStreetNumber, alignment: 'left'},
            {text: invoice.ShippingAreaCode + " " + invoice.ShippingCity, alignment: 'left'},


            {text: 'Rechnung für die Ladeinfrastruktur ', style: 'header', margin: [0, 30]},

            {
                style: 'tableExample',
                table: {
                    widths: ['*', '*', '*'],
                    heights: [30, 30, 30],
                    body: [
                        ['Objekt', '-', '-'],
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
                        ['', {text: 'Total inkl. MwSt, zahlbar innert ' + (inDays(new Date(), new Date(invoice.toPayUntil)).toString() + " Tagen"), bold: true}, '', '', {
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
            {text: 'Vermerk: ' + invoice.comment, alignment: 'left', fontSize: 11, margin: [0, 15]},

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

export function invoiceFromDatabase(invoice) {

    const invoiceType = data.state.invoiceTypes.filter(invoiceType => invoiceType.RechnungsTypID === invoice.RechnungsTypID)

    console.log(invoiceType)
    var date = new Date()

    console.log(date.toDateString())
    const users = data.state.users
    const facilities = data.state.facilities
    const load = data.state.loads.filter(load => load.LoadID === invoice.LoadID)

    console.log(load)
    console.log(facilities)

    const facility = facilities.filter(facility => facility.AnlageID === load[0].AnlageNr)

    console.log(facility)


    function inDays (d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2-t1)/(24*3600*1000));
    }

    var dd = {
        content: [
            {
                columns: [{text: date.toString(), alignment: 'left'}, {text: 'Rechnungsnummer: ' + invoice.RechnungsNummer, alignment: 'right', fontSize: 8}],
            },
            {text: invoice.Vorname + " " + invoice.Nachname, alignment: 'left'},
            {text: invoice.RStrasse + ' ' + invoice.RStrassenNr, alignment: 'left'},
            {text: invoice.RPLZ + " " + invoice.ROrt, alignment: 'left'},


            {text: 'Rechnung für ' + invoiceType.Bezeichnung + ' der Ladeinfrastruktur ', style: 'header', margin: [0, 30]},

            {
                style: 'tableExample',
                table: {
                    widths: ['*', '*', '*'],
                    heights: [30, 30, 30],
                    body: [
                        ['Objekt', facility[0].Bezeichnung, '-'],
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
                        ['', {text: 'Total inkl. MwSt, zahlbar innert ' + (inDays(new Date(), new Date(invoice.ZuZahlenBis)).toString() + " Tagen"), bold: true}, '', '', {
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