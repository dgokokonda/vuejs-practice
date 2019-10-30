<template>
  <ul>
    <li 
        v-for="item in menuItems" 
        :key="item.name" 
        @click="selectOption(item)"
    >{{item.name}}</li>
  </ul>
</template>
<script>
    export default {
        props: {
        menuItems: Array
        },
        methods: {
            selectOption(item) {
                this.$emit('select-option', item)
            }
        }
    }
</script>
