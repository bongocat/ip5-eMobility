const state = {
    invoices: [
        {
            Betrag: 100,
            RechnungsID: "1",
            RechnungsNr: "1",
            RechnungsArt: "Strom",
            MieterReferenz: "1001",
            VermieterReferenz: "2001",
            RechnungAn: "Mieter",
            Anlagename: "Anlagé",
            AnlageID: "1",
            LoadID: "2222",
            ['Fällig Am']: new Date('2021-01-31'),
            ['Zu Zahlen Bis']: new Date('2021-02-28'),
            Bezahlt: "Nein",
            BezahltAm: new Date(),
            Vorname: "Peter",
            Nachname: "Karachi",
            Firma: "",
            Generiert: "Nein"
        },
        {
            Betrag: 200,
            RechnungsID: "2",
            RechnungsNr: "2",
            RechnungsArt: "Service",
            MieterReferenz: "1001",
            VermieterReferenz: "2001",
            RechnungAn: "Mieter",
            Anlagename: "Geld Anlage",
            AnlageID: "1",
            LoadID: "2222",
            ['Fällig Am']: new Date('2020-11-27'),
            ['Zu Zahlen Bis']: new Date('2020-11-30'),
            Bezahlt: "Nein",
            BezahltAm: new Date(),
            Vorname: "Peter",
            Nachname: "Karachi",
            Firma: "",
            Generiert: "Nein"
        },
        {
            Betrag: 300,
            RechnungsID: "3",
            RechnungsNr: "3",
            RechnungsArt: "Strom",
            MieterReferenz: "1001",
            VermieterReferenz: "2001",
            RechnungAn: "Mieter",
            Anlagename: "Sound Anlage",
            AnlageID: "1",
            LoadID: "2222",
            ['Fällig Am']: new Date('2020-11-27'),
            ['Zu Zahlen Bis']: new Date('2020-11-30'),
            Bezahlt: "Nein",
            BezahltAm: new Date(),
            Vorname: "Peter",
            Nachname: "Karachi",
            Firma: "",
            Generiert: "Nein"
        },
        {
            Betrag: 444,
            RechnungsID: "4",
            RechnungsNr: "4",
            RechnungsArt: "Installation",
            MieterReferenz: "1001",
            VermieterReferenz: "2001",
            RechnungAn: "Mieter",
            Anlagename: "Mega Anlage",
            AnlageID: "1",
            LoadID: "2222",
            ['Fällig Am']: new Date('2020-11-30'),
            ['Zu Zahlen Bis']: new Date('2020-12-31'),
            Bezahlt: "Nein",
            BezahltAm: new Date(),
            Vorname: "Peter",
            Nachname: "Karachi",
            Firma: "",
            Generiert: "Nein"
        },
        {
            Betrag: 521,
            RechnungsID: "5",
            RechnungsNr: "5",
            RechnungsArt: "Strom",
            MieterReferenz: "1001",
            VermieterReferenz: "2001",
            RechnungAn: "Mieter",
            Anlagename: "Super Anlage",
            AnlageID: "1",
            LoadID: "2222",
            ['Fällig Am']: new Date('2020-11-30'),
            ['Zu Zahlen Bis']: new Date('2020-12-31'),
            Bezahlt: "Nein",
            BezahltAm: new Date(),
            Vorname: "Peter",
            Nachname: "Karachi",
            Firma: "",
            ZählerstandAlt: "",
            ['Datum Zählerstand Alt']: new Date('2020-01-1'),
            ZählerstandNeu: "",
            ['Datum Zählerstand Neu']: new Date('2020-12-31'),
            Generiert: "Nein"
        },
        {
            Betrag: 521,
            RechnungsID: "5",
            RechnungsNr: "5",
            RechnungsArt: "Strom",
            MieterReferenz: "1001",
            VermieterReferenz: "2001",
            RechnungAn: "Mieter",
            Anlagename: "Hammer Anlage",
            AnlageID: "8",
            LoadID: "2222",
            ['Fällig Am']: new Date('2020-11-30'),
            ['Zu Zahlen Bis']: new Date('2020-12-31'),
            Bezahlt: "Nein",
            BezahltAm: new Date(),
            Vorname: "Peter",
            Nachname: "Karachi",
            Firma: "",
            ZählerstandAlt: "",
            ['Datum Zählerstand Alt']: new Date('2020-01-1'),
            ZählerstandNeu: "",
            ['Datum Zählerstand Neu']: new Date('2020-12-31'),
            Generiert: "Ja"
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
            AnlageID: 1,
            Anlage: "ABCD",
            Immobilienverwaltung: "2001",
            Strasse: "Boliovenweg",
            Hausnummer: "33",
            PLZ: "1020",
            Land: "Schweiz",
            Count: "0",
        },
        {
            AnlageID: 2,
            Anlage: "XXXX",
            Immobilienverwaltung: "2001",
            Strasse: "Boliovenweg",
            Hausnummer: "33",
            PLZ: "1020",
            Land: "Schweiz",
            Count: "0",
        },
    ],
    loads: [
        {
            LoadID: "001",
            Anlage: "ABCD",
            AnlageID: "1010",
            Mieter: "1001",
            Vermieter: "2001",
            ['Rechnung an']: "Mieter",
        },
        {
            LoadID: "002",
            Anlage: "ABCD",
            AnlageID: "1010",
            Mieter: "1001",
            Vermieter: "2001",
            ['Rechnung an']: "Mieter",
        },
        {
            LoadID: "003",
            Anlage: "XXXX",
            AnlageID: "2020",
            Mieter: "1001",
            Vermieter: "2001",
            ['Rechnung an']: "Mieter",
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
            return invoice["Fällig Am"] >= Date.now() && invoice["Fällig Am"] <= inThirtyDays && invoice.Generiert == "Ja" && invoice.Bezahlt == "Nein";
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
    addInvoice(state, invoice) {
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
