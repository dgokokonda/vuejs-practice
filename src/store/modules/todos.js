// import Axios from 'axios'
import storage from '../storage';

const STORAGE_KEY = 'todos-vuejs';
const state = {
    todos: storage.get(STORAGE_KEY) || []
};

const getters = {
    todos: state => state.todos
};

const mutations = {
    ADD_TODO: ({todos}, todo) => {
        todos.push(todo);
        storage.set(STORAGE_KEY, todos);
    },
    REMOVE_TODO: ({todos}, todo) => {
        const idx = todos.findIndex(el => el.id === todo.id);
        todos.splice(idx, 1)
        storage.set(STORAGE_KEY, todos);
    },
    EDIT_TODO: ({todos}, todo) => {
        const idx = todos.findIndex(el => el.id === todo.id);
        todos.splice(idx, 1, todo)
        storage.set(STORAGE_KEY, todos);
    },

};

const actions = {
    // setTodo: (context, data) => {
    //     // let {data} = await Axios.get('http://yourwebsite.com/api/todo');
    //     context.commit('SET_TODO', data);
    // },

    addTodo: ({ commit }, todo) => {
        commit('ADD_TODO', todo);
    },
    removeTodo: ({ commit }, todo) => {
        commit('REMOVE_TODO', todo)
    },
    editTodo: ({ commit }, todo) => {
        commit('EDIT_TODO', todo)
    },
    setDone: ({ commit }, todo) => {
        commit('EDIT_TODO', { ...todo, done: !todo.done })
    },
    setAllDone: ({ state, commit }, done) => {
        state.todos.forEach((todo) => {
            commit('EDIT_TODO', { ...todo, done })
        })
    },
    clearDone: ({ state, commit }) => {
        state.todos.filter(todo => todo.done)
            .forEach((todo) => {
                commit('REMOVE_TODO', todo); 
            })
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
};