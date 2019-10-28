<template>
    <div class="menu">
      <button class="btn" @click="showMenu = !showMenu">Click me</button>
      <span v-if="selectedOption">{{selectedOption.name}}</span>
      <DropdownMenu 
        v-if="showMenu" 
        :menu-items="menuItems" 
        @select-option="onOptionSelected"/>
        <router-view></router-view>
    </div>
</template>

<script>
import DropdownMenu from '../components/DropdownMenu.vue'

export default {
    name: 'Menu',
    data() {
        return {
            menuItems: [{name:'menu 1'}, {name:'menu 2'}, {name:'menu 3'}],
            selectedOption: null,
            showMenu: false
        }
    },
    methods: {
        onOptionSelected(option) {
            this.selectedOption = option
            this.showMenu = false;
        }
    },
    components: {
        DropdownMenu
    }
}
</script>