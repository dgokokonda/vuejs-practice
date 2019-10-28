<template>
    <div class="todo-global-status">
        <span class="todos-left">{{todosLeft}}</span>
        <span 
            v-for="(item, idx) in status" 
            :key="`item-${idx}`"
            @click="$emit('set-filter', item)">
            {{item}}
        </span>
        <span @click="clearDone">Clear completed</span>
    </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
    name: 'CompletedTodos',
    data() {
        return {
            status: ['all', 'active', 'done'],
        }
    },
    props: {
        todos: Array
    },
    methods: {
        ...mapActions([
            'clearDone'
        ])
    },
    computed: {
        todosLeft() {
            let itemsLeft = this.todos.filter((item) => !item.done).length || 0;
            let skl = itemsLeft === 1 ? 'item' : 'items';
            return `${itemsLeft} ${skl} left`
        }
    },
}
</script>
<style lang="sass">
    span
        margin: 0 15px
        cursor: pointer
</style>