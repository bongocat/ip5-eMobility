import axios from 'axios'

const baseURL = "http://localhost:3000"

const state = {

    invoices: [],
    users: [],
    facilities: [],
    loads: [],
    loadTypes: [],
    invoiceTypes: [],
    invoicePositionsFromLoads: [],
    invoicePositions: [],
    test: 0,

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
            return (new Date(invoice.toPayUntil)) >= Date.now() && new Date(invoice.toPayUntil) <= inThirtyDays && invoice.Status === 1
        })
    },

    paidInvoices: state => {
        return state.invoices.filter(invoice => {
            return invoice.invoiceStatusID === 4;
        })
    },

    openInvoices: state => {
        return state.invoices.filter(invoice => {
            return invoice.invoiceStatusID === 2;
        })
    },

    sentInvoices: state => {
        return state.invoices.filter(invoice => {
            return invoice.invoiceStatusID === 3;
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
        return state.users.filter(user => user.active === 1)
    },

    /**
     * Get all inactive users
     * @param state
     * @returns inactive users
     * */
    inactiveUsers: state => {
        return state.users.filter(user => user.active === 0)
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

    allLoadTypes: state => {
        return state.loadTypes
    },

    allInvoicePositions: state => {
        return state.invoicePositions
    },

    allInvoiceTypes: state => {
        return state.invoiceTypes
    }
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

    async editInvoice({commit}, invoice){
        const response = await axios.put(baseURL + '/api/megalog/invoices/', invoice);
        console.log(response.data)
        commit('editInvoice', response.data)
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
    async fetchLoads({ commit }) {
        const response = await axios.get(baseURL +  '/api/megalog/loads/')
        commit('setLoads', response.data)
    },


    async addNewLoad({commit}, load){
        const response = await axios.post(baseURL + '/api/megalog/loads/', load)
        commit('addNewLoad', response.data)
    },

    async editLoad({commit}, load){
        const response = await axios.put(baseURL + '/api/megalog/loads/', load);
        console.log(response.data)
        commit('editLoad', response.data)
    },

    async fetchLoadTypes({ commit }) {
        const response = await axios.get(baseURL +  '/api/megalog/loadtypes/')
        commit('setLoadTypes', response.data)
    },

    async fetchInvoiceTypes({ commit }) {
        const response = await axios.get(baseURL +  '/api/megalog/invoiceTypes/')
        commit('setInvoiceTypes', response.data)
    },

    async addNewLoadType({commit}, loadtype){
        const response = await axios.post(baseURL + '/api/megalog/loadtypes/', loadtype)
        commit('addNewLoadType', response.data)
    },

    async addNewInvoicePosition({commit}, invoicePosition){
        const response = await axios.post(baseURL + '/api/megalog/invoicepositions/', invoicePosition)
        commit('addNewInvoicePosition', response.data)
    },

    async fetchInvoicePositions({ commit }) {
        const response = await axios.get(baseURL +  '/api/megalog/invoicepositions/')
        commit('setInvoicePositions', response.data)
    },

    async editInvoicePosition({commit}, position){
        const response = await axios.put(baseURL + '/api/megalog/invoicepositions/', position);
        console.log(response.data)
        commit('editInvoicePosition', response.data)
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

    addNewLoadType (state, loadType){
        state.loadTypes.push(loadType)
    },

    addNewInvoicePosition (state, invoicePosition){
        state.invoicePositions.push(invoicePosition)
    },

    setUsers: (state, users) => (state.users = users),
    setInvoices: (state, invoices) => (state.invoices = invoices),
    setFacilities: (state, facilities) => (state.facilities = facilities),
    setLoads: (state, loads) => (state.loads = loads),
    setLoadTypes: (state, loadTypes) => (state.loadTypes = loadTypes),
    setInvoiceTypes: (state, invoiceTypes) => (state.invoiceTypes = invoiceTypes),
    setInvoicePositions: (state, invoicePositions) => (state.invoicePositions = invoicePositions),

    editFacility: (state, editedFacility) => {
        const index = state.facilities.findIndex(facility => facility.facilityID === editedFacility.facilityID)
        if (index !== -1){
            state.facilities.splice(index, 1 , editedFacility)
        }
    },
    editUser: (state, editedUser) => {
        const index = state.users.findIndex(user => user.userID === editedUser.userID)
        if (index !== -1){
            state.users.splice(index, 1 , editedUser)
        }
    },
    editLoad: (state, editedLoad) => {
        const index = state.loads.findIndex(load => load.loadID === editedLoad.loadID)
        if (index !== -1){
            state.loads.splice(index, 1 , editedLoad)
        }
    },

    editInvoice: (state, editedInvoice) => {
        const index = state.invoices.findIndex(invoice => invoice.invoiceID === editedInvoice.invoiceID)
        if (index !== -1){
            state.invoices.splice(index, 1 , editedInvoice)
        }
    },

    editInvoicePosition: (state, editedInvoicePosition) => {
        const index = state.invoicePositions.findIndex(position => position.invoicePositionID === editedInvoicePosition.invoicePositionID)
        if (index !== -1){
            state.facilities.splice(index, 1 , editedInvoicePosition)
        }
    },

}

export default {
    state,
    getters,
    actions,
    mutations
}