const state = {
    upInvoices: [
        {
            ID: 11,
            Liegenschaft: "L1",
            Betrag: 125,
            Rechnungsart: "Serviceabo",
            Mieter: "Mietermann",
            Immobilienverwaltung: "Verwaltung 1",
            ['Fällig Am']: "31.12.2020"
        },
        {
            ID: 10,
            Liegenschaft: "L2",
            Betrag: 144,
            Rechnungsart: "Serviceabo",
            Mieter: "Mietermann",
            Immobilienverwaltung: "Verwaltung 1",
            ['Fällig Am']: "31.12.2020"
        },
        {
            ID: 9,
            Liegenschaft: "L3",
            Betrag: 172,
            Rechnungsart: "Serviceabo",
            Mieter: "Mietermann",
            Immobilienverwaltung: "Verwaltung 1",
            ['Fällig Am']: "31.12.2020"
        },
        {
            ID: 8,
            Liegenschaft: "L1",
            Betrag: 125,
            Rechnungsart: "Serviceabo",
            Mieter: "Mietermann",
            Immobilienverwaltung: "Verwaltung 1",
            ['Fällig Am']: "31.12.2020"
        },
        {
            ID: 7,
            Liegenschaft: "L2",
            Betrag: 144,
            Rechnungsart: "Serviceabo",
            Mieter: "Mietermann",
            Immobilienverwaltung: "Verwaltung 1",
            ['Fällig Am']: "31.12.2020"
        },
        {
            ID: 6,
            Liegenschaft: "L3",
            Betrag: 172,
            Rechnungsart: "Serviceabo",
            Mieter: "Mietermann",
            Immobilienverwaltung: "Verwaltung 1",
            ['Fällig Am']: "31.12.2020"
        },
        {
            ID: 5,
            Liegenschaft: "L1",
            Betrag: 125,
            Rechnungsart: "Serviceabo",
            Mieter: "Mietermann",
            Immobilienverwaltung: "Verwaltung 1",
            ['Fällig Am']: "31.12.2020"
        },
        {
            ID: 4,
            Liegenschaft: "L2",
            Betrag: 144,
            Rechnungsart: "Serviceabo",
            Mieter: "Mietermann",
            Immobilienverwaltung: "Verwaltung 1",
            ['Fällig Am']: "31.12.2020"
        },
        {
            ID: 3,
            Liegenschaft: "L3",
            Betrag: 172,
            Rechnungsart: "Serviceabo",
            Mieter: "Mietermann",
            Immobilienverwaltung: "Verwaltung 1",
            ['Fällig Am']: "31.12.2020"
        },
        {
            ID: 2,
            Liegenschaft: "L1",
            Betrag: 125,
            Rechnungsart: "Serviceabo",
            Mieter: "Mietermann",
            Immobilienverwaltung: "Verwaltung 1",
            ['Fällig Am']: "31.12.2020"
        },
        {
            ID: 1,
            Liegenschaft: "L2",
            Betrag: 144,
            Rechnungsart: "Serviceabo",
            Mieter: "Mietermann",
            Immobilienverwaltung: "Verwaltung 1",
            ['Fällig Am']: "31.12.2020"
        }]
    users: [
        {
            NutzerID: "001",
            Vorname: "John",
            Nachname: "Snow",
            NutzerTyp: "Mieter",
            Firma: "",
            Anrede: "Herr",
            Strasse: "Musterweg",
            Hausnummer: "42",
            PLZ: "2077",
            Ort: "Night-City",
            Land: "Boletaria",
            Mietet: "",
            Vermietet: "",
            Aktiv: "Ja",
            Kommentar: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        },
        {
            NutzerID: "002",
            Vorname: "Maria",
            Nachname: "Winter",
            NutzerTyp: "Mieter",
            Firma: "",
            Anrede: "Herr",
            Strasse: "Musterweg",
            Hausnummer: "42",
            PLZ: "2077",
            Ort: "Day-Forrest",
            Land: "Schweiz",
            Mietet: "",
            Vermietet: "",
            Aktiv: "Ja",
            Kommentar: "ebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        },
        {
            NutzerID: "003",
            Vorname: "Maurus",
            Nachname: "Kona",
            NutzerTyp: "Vermieter",
            Firma: "",
            Anrede: "Herr",
            Strasse: "Musterweg",
            Hausnummer: "42",
            PLZ: "2077",
            Ort: "Day-Forrest",
            Land: "Schweiz",
            Mietet: "",
            Vermietet: "",
            Aktiv: "Ja",
            Kommentar: "ebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        },
    ]
}

const getters = {
    upcomingInvoices: state => {
        return state.upInvoices
    }
}

const actions = {}


const mutations = {
    addInvoice(state, invoice) {
        store.upInvoices.push(invoice)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
