import storage from "../storage";

const STORAGE_KEY = 'global-form-vuejs';

const state = {
    fields: storage.get(STORAGE_KEY) || {}
}

const getters = {
    fields: state => state.fields
}

const mutations = {
    ADD_FIELD: ({fields}, [key, val]) => {
        fields[key] = val
        storage.set(STORAGE_KEY, fields)
    }
}

const actions = {
    addField: ({ commit }, field) => {
        commit('ADD_FIELD', field)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}