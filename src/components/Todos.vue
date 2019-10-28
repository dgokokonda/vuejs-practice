<template>
    <div class="todoList">
      <TodoItem v-for="todo in todos"
        :key="todo.id"
        :id="todo.id"
        :todo="todo"
        :filter="filter"
      />
    </div>
</template>
<script>
import TodoItem from './TodoItem.vue';

export default {
    name: 'Todos',
    props: {
        todos: Array,
        filter: String
    },
    components: {
        TodoItem
    },
}
</script>
<style lang="">
    
</style>