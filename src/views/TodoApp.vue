<template>
    <div class="todo-app">
        <h1>ToDoList</h1>
        <AddTodo
        :todos="todos"
        @add-todo="addTodo"
        />
        <Todos
        :todos="todos"
        :filter="filter"
        />
        <CompletedTodos
        :todos="todos"
        @set-filter="setFilter"
        />
    </div>
</template>
<script>
import { store } from '../store'
import Todos from '../components/Todos.vue'
import AddTodo from '../components/AddTodo.vue'
import CompletedTodos from '../components/CompletedTodos.vue'

export default {
    name: 'TodoApp',
    store,
    data() {
        return {
            filter: 'all'
        }
    },
    props: ['setId'],
    components: {
        Todos,
        AddTodo,
        CompletedTodos
    },
    methods: {
        addTodo(name) {
            this.$store.dispatch('addTodo', {
                id: this.setId(),
                name,
                done: false
            });
        },
        setFilter(filter) {
            /*// eslint-disable-next-line no-console*/
            this.filter = filter;
        },
    },
    computed: {
        todos() {
            return this.$store.getters.todos;
        }
    },
}
</script>