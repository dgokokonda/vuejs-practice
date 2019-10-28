import Vue from 'vue';
import Vuex from 'vuex';
import 'es6-promise/auto';
import todos from './modules/todos'
import fields from './modules/document'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        todos,
        fields
    }
});