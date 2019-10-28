<template>
    <div class="todo" v-show="setVisible">
        <input 
            type="checkbox" 
            @change="setDone(todo)" 
            :checked="todo.done">
        <label @dblclick="setEditMode">{{todo.name}}</label>
        <input 
            type="text" 
            v-if="editable" 
            v-model="editedTodo" 
            @keydown.enter="editTodo"
            ref="afterClick">
        <span><i 
            @click="setEditMode" 
            class="fa fa-pencil" 
            aria-hidden="true"
        ></i></span>
        <span><i 
            @click="removeTodo(todo)" 
            class="fa fa-trash-o" 
            aria-hidden="true"
        ></i></span>
    </div>
</template>

<script>
import '../assets/css/font-awesome.min.css';
import { mapActions } from 'vuex'

export default {
    name: 'TodoItem',
    props: {
        todo: Object,
        filter: String
    },
    data() {
        return {
            editable: false,
            editedTodo: '',
        }
    },
    methods: {
        ...mapActions([
           'removeTodo',
           'setDone'
        ]),
        setEditMode() {
            this.editable = !this.editable;
            if (this.editable) {
                this.$nextTick(function(){
                    this.$refs.afterClick.focus();
                });
            }
        },
        editTodo() {
            if (this.editedTodo.trim()) {            
                this.$store.dispatch('editTodo', {
                    ...this.todo, 
                    name: this.editedTodo
                });
                this.editable = false;
                this.editedTodo = '';
            }
        }
    },
    computed: {
        setVisible() {
            return this.filter === 'all'
                || (this.filter === 'active' && !this.todo.done)
                || (this.filter === 'done' && this.todo.done)
        }
    }
}
</script>

<style scoped>

</style>