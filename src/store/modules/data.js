import axios from 'axios'

const baseURL = "http://localhost:3000"

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
    users: [],
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
            ErstesZahlungsdatum: new Date(Date.now() + (20) * 24*60*60*1000),
            RechnungsIntervallStrom: 'jährlich',
            RechnungsIntervallService: 'jährlich',
            LoadTyp: "LoadType 123"
        },
        {
            LoadID: "002",
            Anlage: "ABCD",
            AnlageID: "1",
            Mieter: "",
            Vermieter: "4",
            ['Rechnung an']: "Mieter",
            ErstesZahlungsdatum: new Date(Date.now() + (20) * 24*60*60*1000),
            RechnungsIntervallStrom: 'jährlich',
            RechnungsIntervallService: 'jährlich',
            LoadTyp: "LoadType ABC"
        },
        {
            LoadID: "003",
            Anlage: "XXXX",
            AnlageID: "2",
            Mieter: "2",
            Vermieter: "4",
            ['Rechnung an']: "Vermieter",
            ErstesZahlungsdatum: new Date(Date.now() + (20) * 24*60*60*1000),
            RechnungsIntervallStrom: 'jährlich',
            RechnungsIntervallService: 'jährlich',
            LoadTyp: "LoadType XYZ"
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
            return invoice.RechnungGestellt >= Date.now() && invoice.RechnungGestellt <= inThirtyDays;
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
        return state.users.filter(user => user.Aktiv === "Nein")
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

const actions = {
    async fetchUsers({ commit }) {
        const response = await axios.get( baseURL + '/api/megalog/users/')
        commit('setUsers', response.data)
    },

    async addNewUser({commit}, user){
        const response = await axios.post(baseURL + '/api/megalog/users/', user)
        commit('addNewUser', response.data)
    },

    async editUser({commit}, user){
        const response = await axios.put(baseURL + '/api/megalog/users/', user)
        commit('editUser', response.data)
    },

    async fetchInvoices({ commit }) {
        const response = await axios.get(baseURL + '/api/megalog/invoices/')
        commit('setInvoices', response.data)
    },

    async addNewInvoice({commit}, invoice){
        const response = await axios.post(baseURL + '/api/megalog/invoices/', invoice)
        commit('addNewInvoice', response.data)
    },

    async fetchFacilities({ commit }) {
        const response = await axios.get(baseURL +  '/api/megalog/facilities/')
        commit('setFacilities', response.data)
    },

    async addNewFacility({commit}, facility){
        const response = await axios.post(baseURL + '/api/megalog/facilities/', facility)
        commit('addNewFacility', response.data)
    },

    async editFacility({commit}, facility){
        const response = await axios.put(baseURL + '/api/megalog/facilities/', facility);
        console.log(response.data)
        commit('editFacility', response.data)
    },
}

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
    },

    setUsers: (state, users) => (state.users = users),
    setInvoices: (state, invoices) => (state.invoices = invoices),
    setFacilities: (state, facilities) => (state.facilities = facilities),
    editFacility: (state, editedFacility) => {
        const index = state.facilities.findIndex(facility => facility.AnlageID === editedFacility.AnlageID)
        if (index !== -1){
            state.facilities.splice(index, 1 , editedFacility)
        }
    },
    editUser: (state, editedUser) => {
        const index = state.users.findIndex(user => user.NutzerID === editedUser.NutzerID)
        if (index !== -1){
            state.users.splice(index, 1 , editedUser)
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
