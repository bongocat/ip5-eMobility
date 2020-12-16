const state = {
    invoices: [
        {
            Betrag: 100,
            RechnungsID: "1",
            RechnungsNr: "1",
            RechnungsArt: "Installation",
            MieterReferenz: "1",
            VermieterReferenz: "3",
            RechnungAn: "Mieter",
            Anlagename: "Anlagé",
            AnlageID: "1",
            LoadID: "001",
            ['Fällig Am']: new Date(Date.now() + (20) * 24*60*60*1000),
            ['Zu Zahlen Bis']: new Date(Date.now() + (30) * 24*60*60*1000),
            Bezahlt: "Nein",
            BezahltAm: new Date(Date.now()),
            Vorname: "John",
            Nachname: "Snow",
            Firma: "",
            Generiert: "Nein",
            Kommentar: "",
            Versendet: "false",
            positions: [],
        },
        {
            Betrag: 200,
            RechnungsID: "2",
            RechnungsNr: "2",
            RechnungsArt: "Abo",
            MieterReferenz: "1",
            VermieterReferenz: "3",
            RechnungAn: "Vermieter",
            Anlagename: "Anlagé",
            AnlageID: "1",
            LoadID: "001",
            ['Fällig Am']: new Date(Date.now() + (20) * 24*60*60*1000),
            ['Zu Zahlen Bis']: new Date('2020-11-30'),
            Bezahlt: "Nein",
            BezahltAm: new Date(),
            Vorname: "John",
            Nachname: "Snow",
            Firma: "",
            Generiert: "Nein",
            Kommentar: "",
            Versendet: "false",
            positions: [],
        },
        {
            Betrag: 300,
            RechnungsID: "3",
            RechnungsNr: "3",
            RechnungsArt: "Strom",
            MieterReferenz: "1",
            VermieterReferenz: "3",
            RechnungAn: "Mieter",
            Anlagename: "Anlagé",
            AnlageID: "1",
            LoadID: "001",
            ['Fällig Am']: new Date(Date.now() + (20) * 24*60*60*1000),
            ['Zu Zahlen Bis']: new Date('2020-12-31'),
            Bezahlt: "Nein",
            BezahltAm: new Date(),
            Vorname: "John",
            Nachname: "Snow",
            Firma: "",
            Generiert: "Nein",
            Kommentar: "",
            Versendet: "false",
            positions: [],
        },
        {
            Betrag: 444,
            RechnungsID: "4",
            RechnungsNr: "4",
            RechnungsArt: "Installation",
            MieterReferenz: "2",
            VermieterReferenz: "4",
            RechnungAn: "Vermieter",
            Anlagename: "Mega Anlage",
            AnlageID: "2",
            LoadID: "003",
            ['Fällig Am']: new Date(Date.now() + (20) * 24*60*60*1000),
            ['Zu Zahlen Bis']: new Date('2020-12-31'),
            Bezahlt: "Nein",
            BezahltAm: new Date(),
            Vorname: "Maria",
            Nachname: "Winter",
            Firma: "",
            Generiert: "Nein",
            Kommentar: "",
            Versendet: "false",
            positions: [],
        },
        {
            Betrag: 521,
            RechnungsID: "5",
            RechnungsNr: "5",
            RechnungsArt: "Abo",
            MieterReferenz: "2",
            VermieterReferenz: "4",
            RechnungAn: "Vermieter",
            Anlagename: "Mega Anlage",
            AnlageID: "2",
            LoadID: "003",
            ['Fällig Am']: new Date(Date.now() + (20) * 24*60*60*1000),
            ['Zu Zahlen Bis']: new Date('2020-12-31'),
            Bezahlt: "Nein",
            BezahltAm: new Date(),
            Vorname: "Maria",
            Nachname: "Winter",
            Firma: "",
            ZählerstandAlt: "",
            ['Datum Zählerstand Alt']: new Date('2020-01-1'),
            ZählerstandNeu: "",
            ['Datum Zählerstand Neu']: new Date('2020-12-31'),
            Generiert: "Nein",
            Kommentar: "",
            Versendet: "false",
            positions: [],
        },
        {
            Betrag: 521,
            RechnungsID: "6",
            RechnungsNr: "6",
            RechnungsArt: "Strom",
            MieterReferenz: "2",
            VermieterReferenz: "4",
            RechnungAn: "Vermieter",
            Anlagename: "Mega Anlage",
            AnlageID: "2",
            LoadID: "003",
            ['Fällig Am']: new Date(Date.now() + (20) * 24*60*60*1000),
            ['Zu Zahlen Bis']: new Date('2020-12-31'),
            Bezahlt: "Nein",
            BezahltAm: new Date(),
            Vorname: "Maria",
            Nachname: "Winter",
            Firma: "",
            ZählerstandAlt: "",
            ['Datum Zählerstand Alt']: new Date('2020-01-1'),
            ZählerstandNeu: "",
            ['Datum Zählerstand Neu']: new Date('2020-12-31'),
            Generiert: "Ja",
            Kommentar: "",
            Versendet: "false",
            positions: [],
        },
    ],
    users: [
        {
            NutzerID: "1",
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
            NutzerID: "2",
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
            NutzerID: "3",
            Vorname: "Maurus",
            Nachname: "Kona",
            NutzerTyp: "Vermieter",
            Firma: "",
            Anrede: "Herr",
            Strasse: "Musterweg",
            Hausnummer: "42",
            PLZ: "4090",
            Ort: "Imma",
            Land: "Österreich",
            Mietet: "",
            Vermietet: "",
            Aktiv: "Nein",
            Kommentar: "ebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. \n sdsdsdsdsdsdsdsd",
        },
        {
            NutzerID: "4",
            Vorname: "Maurus",
            Nachname: "Kona",
            NutzerTyp: "Vermieter",
            Firma: "",
            Anrede: "Herr",
            Strasse: "Musterweg",
            Hausnummer: "96",
            PLZ: "3334",
            Ort: "Lörrach",
            Land: "Deutschland",
            Mietet: "",
            Vermietet: "",
            Aktiv: "Nein",
            Kommentar: "Is this the real Life, or iks this just Fantasy.",
        },
    ],
    facilities: [
        {
            AnlageID: "1",
            Anlage: "ABCD",
            Immobilienverwaltung: "3",
            Strasse: "Döbeligut",
            Hausnummer: "69",
            PLZ: "4665",
            Ort: "Oftringen",
            Land: "Schweiz",
            Count: "0",
        },
        {
            AnlageID: "2",
            Anlage: "XXXX",
            Immobilienverwaltung: "3",
            Strasse: "Chrischonaweg",
            Hausnummer: "42",
            PLZ: "4058",
            Ort: "Basel",
            Land: "Schweiz",
            Count: "0",
        },
    ],
    loads: [
        {
            LoadID: "001",
            Anlage: "ABCD",
            AnlageID: "1",
            Mieter: "1",
            Vermieter: "3",
            ['Rechnung an']: "Mieter",
        },
        {
            LoadID: "002",
            Anlage: "ABCD",
            AnlageID: "1",
            Mieter: "",
            Vermieter: "4",
            ['Rechnung an']: "Mieter",
        },
        {
            LoadID: "003",
            Anlage: "XXXX",
            AnlageID: "2",
            Mieter: "2",
            Vermieter: "4",
            ['Rechnung an']: "Vermieter",
        },
    ],
}

const getters = {
    /**
     * Invoice getters
     */

    /**
     * Get invoices from the next 30 days
     * @param state
     * @returns filtered invoices
     * */
    upcomingInvoices: state => {
        return state.invoices.filter(invoice => {
            let inThirtyDays = new Date();
            inThirtyDays.setDate(inThirtyDays.getDate() + 30);
            return invoice["Fällig Am"] >= Date.now() && invoice["Fällig Am"] <= inThirtyDays && invoice.Generiert == "Nein";
        })
    },

    paidInvoices: state => {
        return state.invoices.filter(invoice => {
            let beforeThirtyDays = new Date();
            beforeThirtyDays.setDate(beforeThirtyDays.getDate() - 30);
            return invoice.BezahltAm <= Date.now() && invoice.BezahltAm >= beforeThirtyDays && invoice.Bezahlt == "Ja";
        })
    },

    openInvoices: state => {
        return state.invoices.filter(invoice => {
            let inThirtyDays = new Date();
            inThirtyDays.setDate(inThirtyDays.getDate() + 30);
            return invoice["Fällig Am"] >= Date.now() && invoice["Fällig Am"] <= inThirtyDays && invoice.Generiert == "Ja" && invoice.Bezahlt == "Nein" && invoice.Versendet == "false";
        })
    },

    sentInvoices: state => {
        return state.invoices.filter(invoice => {
            let inThirtyDays = new Date();
            inThirtyDays.setDate(inThirtyDays.getDate() + 30);
            return invoice["Fällig Am"] >= Date.now() && invoice["Fällig Am"] <= inThirtyDays && invoice.Generiert == "Ja" && invoice.Bezahlt == "Nein" && invoice.Versendet == "true";
        })
    },

    /**
     * Get all invoices
     * @param state
     * @returns invoives
     */
    allInvoices: state => {
        return state.invoices
    },

    /**
     * User getters
     */

    /**
     * Get all active users
     * @param state
     * @returns active users
     */
    activeUsers: state => {
        return state.users.filter(user => user.Aktiv == "Ja")
    },

    /**
     * Get all inactive users
     * @param state
     * @returns inactive users
     * */
    inactiveUsers: state => {
        return state.users.filter(user => user.Aktiv == "Nein")
    },

    /**
     * Get all users
     * @param state
     * @returns users
     */
    allUsers: state => {
        return state.users
    },

    /**
     * Facility getters
     */

    /**
     * Get all facilities
     * @param state
     * @returns all facilities
     */
    allFacilities: state => {
        return state.facilities
    },

    /**
     * Load getters
     */

    /**
     * Get all loads
     * @param state
     * @returns all loads
     */
    allLoads: state => {
        return state.loads
    },
}

const actions = {}

const mutations = {
    addNewInvoice(state, invoice) {
        state.invoices.push(invoice)
    },

    addNewUser (state, user){
        state.users.push(user)
    },

    addNewFacility (state, facility){
        state.facilities.push(facility)
    },

    addNewLoad (state, load){
        state.loads.push(load)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
