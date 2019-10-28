<template>
  <div>
    <div class="addTodo">
      <input 
        type="checkbox" 
        v-model="selectedAll" 
        id="selectAll" 
        @change="setAllDone(selectedAll)" 
        :disabled="emptyTodos">
      <input 
        type="text" 
        class="todoText" 
        placeholder="Add new Todo here..." 
        @keydown.enter="addTodo" 
        v-model="newTodo">
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AddTodo',
  data: () => ({
    newTodo: '',
    selectedAll: false,
  }),
  props: {
    todos: Array
  },
  methods: {
    ...mapActions([
      'setAllDone'
    ]),
    addTodo() {
      if (this.newTodo.trim()) {
        this.$emit('add-todo', this.newTodo);
        this.newTodo = '';
      }
    },
  },
  computed: {
    emptyTodos() {
      return !Object.keys(this.todos).length;
    }
  },
}
</script>

<style scoped>

</style>
