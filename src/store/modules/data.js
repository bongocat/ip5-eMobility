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
}

const getters = {
    upcomingInvoices: state => {
        return state.upInvoices
    }
}

const actions = {}
const mutations = {}

export default {
    state,
    getters,
    actions,
    mutations
}