import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import data from "@/store/modules/data";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export function regularInvoiceToPDF(invoice, invoicePositions) {

    var date = new Date(invoice.invoiceDate)

    const invoiceType = data.state.invoiceTypes.filter(invoiceType => invoiceType.invoiceTypeID === invoice.invoiceTypeID)[0]

    if (invoicePositions[0].loadID !== undefined){
        var load = data.state.loads.filter(load => load.loadID === invoicePositions[0].loadID)[0]
        var facility = data.state.facilities.filter(facility => facility.facilityID === load.facilityID)[0]
    }

    var street = (invoice.invoiceToShippingAdress === 0) ? invoice.street : invoice.shippingStreet
    var streetNumber = (invoice.invoiceToShippingAdress === 0) ? invoice.streetNumber : invoice.shippingStreetNumber
    var areaCode = (invoice.invoiceToShippingAdress === 0) ? invoice.areaCode : invoice.shippingAreaCode
    var city = (invoice.invoiceToShippingAdress === 0) ? invoice.city : invoice.shippingCity
    var body = tableBody()

    function tableBody() {
        var body = []
        var bruttoTotal = 0.0
        var nettoTotal = 0.0
        var difference = 0.0

        body.push(['Pos. ', 'Beschreibung ', 'Stk. ', 'Preis/Stk. ', 'Bruttopreis'])
        invoicePositions.forEach((invoicePosition, index) => {
            body.push([index + 1, (invoicePosition.loadID ? invoicePosition.loadID : "") + " (" + invoicePosition.positionName + ")", invoicePosition.amount, invoicePosition.price, invoicePosition.brutto])
            bruttoTotal += invoicePosition.brutto
            nettoTotal += invoicePosition.netto
        })
        difference = nettoTotal - bruttoTotal
        body.push(['', {text: 'Total exkl. MwSt', bold: true}, '', '', {text: bruttoTotal.toFixed(2) + " CHF", bold: true}],)
        body.push(['', Number((invoicePositions[0].vat)*100).toFixed(2) + " %", '', '', difference.toFixed(2) + " CHF"],)
        body.push(['', {
            text: 'Total inkl. MwSt, zahlbar innert ' + (inDays(invoice.invoiceDate, new Date(invoice.toPayUntil)).toString()) + " Tagen",
            bold: true
        }, '', '', {
            text: Number(nettoTotal).toFixed(2) + " CHF",
            bold: true
        }])
        return body
    }

    function inDays(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2 - t1) / (24 * 3600 * 1000));
    }

    var dd = {
        content: [
            {
                columns: [{
                    text: date.toLocaleDateString(),
                    alignment: 'left'
                }, {text: 'Rechnungsnummer: ' + invoice.invoiceNumber, alignment: 'right', fontSize: 8}],
            },

            {text: invoice.company, alignment: 'left', margin: [380, 0, 0, 0]},
            {text: invoice.name + " " + invoice.familyName, alignment: 'left',margin: [380, 0, 0, 0]},
            {text: street + ' ' + streetNumber, alignment: 'left', margin: [380, 0, 0, 0]},
            {text: areaCode + " " + city, alignment: 'left', margin: [380, 0, 0, 0]},


            {
                text: 'Rechnung für ' + invoiceType.designation + ' der Ladeinfrastruktur ',
                style: 'header',
                margin: [0, 30]
            },

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

export function exceptionalInvoiceToPDF(invoice, invoicePositions) {

    var date = new Date(invoice.invoiceDate)

    const invoiceType = data.state.invoiceTypes.filter(invoiceType => invoiceType.invoiceTypeID === invoice.invoiceTypeID)[0]

    var street = (invoice.invoiceToShippingAdress === 0) ? invoice.street : invoice.shippingStreet
    var streetNumber = (invoice.invoiceToShippingAdress === 0) ? invoice.streetNumber : invoice.shippingStreetNumber
    var areaCode = (invoice.invoiceToShippingAdress === 0) ? invoice.areaCode : invoice.shippingAreaCode
    var city = (invoice.invoiceToShippingAdress === 0) ? invoice.city : invoice.shippingCity
    var body = tableBody()

    function tableBody() {
        var body = []
        var bruttoTotal = 0.0
        var nettoTotal = 0.0
        var difference = 0.0

        body.push(['Pos. ', 'Beschreibung ', 'Stk. ', 'Preis/Stk. ', 'Bruttopreis'])
        invoicePositions.forEach((invoicePosition, index) => {
            body.push([index + 1, invoicePosition.positionName, invoicePosition.amount, invoicePosition.price, invoicePosition.brutto])
            bruttoTotal += invoicePosition.brutto
            nettoTotal += invoicePosition.netto
        })
        difference = nettoTotal - bruttoTotal
        body.push(['', {text: 'Total exkl. MwSt', bold: true}, '', '', {text: bruttoTotal.toFixed(2) + " CHF", bold: true}],)
        body.push(['', (invoicePositions[0].vat).toFixed(2) + " %", '', '', difference + " CHF"],)
        body.push(['', {
            text: 'Total inkl. MwSt, zahlbar innert ' + (inDays(new Date(), new Date(invoice.toPayUntil)).toString() + " Tagen"),
            bold: true
        }, '', '', {
            text: Number(nettoTotal).toFixed(2) + " CHF",
            bold: true
        }])
        return body
    }

    function inDays(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2 - t1) / (24 * 3600 * 1000));
    }

    var dd = {
        content: [
            {
                columns: [{
                    text: date.toLocaleDateString(),
                    alignment: 'left'
                }, {text: 'Rechnungsnummer: ' + invoice.invoiceNumber, alignment: 'right', fontSize: 8}],
            },
            {text: invoice.company, alignment: 'left', margin: [380, 0, 0, 0]},
            {text: invoice.name + " " + invoice.familyName, alignment: 'left',margin: [380, 0, 0, 0]},
            {text: street + ' ' + streetNumber, alignment: 'left', margin: [380, 0, 0, 0]},
            {text: areaCode + " " + city, alignment: 'left', margin: [380, 0, 0, 0]},


            {
                text: 'Rechnung für ' + invoiceType.designation + ' der Ladeinfrastruktur ',
                style: 'header',
                margin: [0, 30]
            },

            {
                style: 'tableExample',
                table: {
                    widths: ['*', '*', '*'],
                    heights: [30, 30, 30],
                    body: [
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
