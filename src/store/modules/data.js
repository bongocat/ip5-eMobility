const state = {
    upInvoices: [
        {
            ID: 12,
            Liegenschaft: "L1",
            Betrag: 125,
            Rechnungsart: "Serviceabo",
            Mieter: "Mietermann",
            Immobilienverwaltung: "Verwaltung 1",
            ['Fällig Am']: new Date('2011-01-31')
        },
        {
            ID: 11,
            Liegenschaft: "L1",
            Betrag: 125,
            Rechnungsart: "Serviceabo",
            Mieter: "Mietermann",
            Immobilienverwaltung: "Verwaltung 1",
            ['Fällig Am']: new Date('2021-01-31')
        },
        {
            ID: 10,
            Liegenschaft: "L2",
            Betrag: 144,
            Rechnungsart: "Serviceabo",
            Mieter: "Mietermann",
            Immobilienverwaltung: "Verwaltung 1",
            ['Fällig Am']: new Date('2021-01-31')
        },
        {
            ID: 9,
            Liegenschaft: "L3",
            Betrag: 172,
            Rechnungsart: "Serviceabo",
            Mieter: "Mietermann",
            Immobilienverwaltung: "Verwaltung 1",
            ['Fällig Am']: new Date('2020-12-31')
        },
        {
            ID: 8,
            Liegenschaft: "L1",
            Betrag: 125,
            Rechnungsart: "Serviceabo",
            Mieter: "Mietermann",
            Immobilienverwaltung: "Verwaltung 1",
            ['Fällig Am']: new Date('2020-12-31')
        },
        {
            ID: 7,
            Liegenschaft: "L2",
            Betrag: 144,
            Rechnungsart: "Serviceabo",
            Mieter: "Mietermann",
            Immobilienverwaltung: "Verwaltung 1",
            ['Fällig Am']: new Date('2020-12-31')
        },
        {
            ID: 6,
            Liegenschaft: "L3",
            Betrag: 172,
            Rechnungsart: "Serviceabo",
            Mieter: "Mietermann",
            Immobilienverwaltung: "Verwaltung 1",
            ['Fällig Am']: new Date('2020-12-27')
        },
        {
            ID: 5,
            Liegenschaft: "L1",
            Betrag: 125,
            Rechnungsart: "Serviceabo",
            Mieter: "Mietermann",
            Immobilienverwaltung: "Verwaltung 1",
            ['Fällig Am']: new Date('2020-12-27')
        },
        {
            ID: 4,
            Liegenschaft: "L2",
            Betrag: 144,
            Rechnungsart: "Serviceabo",
            Mieter: "Mietermann",
            Immobilienverwaltung: "Verwaltung 1",
            ['Fällig Am']: new Date('2020-12-27')
        },
        {
            ID: 3,
            Liegenschaft: "L3",
            Betrag: 172,
            Rechnungsart: "Serviceabo",
            Mieter: "Mietermann",
            Immobilienverwaltung: "Verwaltung 1",
            ['Fällig Am']: new Date('2020-12-20')
        },
        {
            ID: 2,
            Liegenschaft: "L1",
            Betrag: 125,
            Rechnungsart: "Serviceabo",
            Mieter: "Mietermann",
            Immobilienverwaltung: "Verwaltung 1",
            ['Fällig Am']: new Date('2020-12-20')
        },
        {
            ID: 1,
            Liegenschaft: "L2",
            Betrag: 144,
            Rechnungsart: "Serviceabo",
            Mieter: "Mietermann",
            Immobilienverwaltung: "Verwaltung 1",
            ['Fällig Am']: new Date('2020-12-20')
        }
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
        return state.upInvoices.filter(invoice => {
            let inThirtyDays = new Date();
            inThirtyDays.setDate(inThirtyDays.getDate() + 30);
            return invoice["Fällig Am"] >= Date.now() && invoice["Fällig Am"] <= inThirtyDays;
        })
    },

    /**
     * Get all invoices
     * @param state
     * @returns invoives
     */
    allInvoices: state => {
        return state.upInvoices
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
        state.upInvoices.push(invoice)
    },

    addNewUser (state, user){
        state.users.push(user)
    },

    addNewFacility (state, facility){
        state.facilities.push(facility)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
