<template>
  <div id="app">
    <Header></Header>
    <router-view :set-id="setId"/>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'app',
  components: {
    Header
  },
  methods: {
    setId() {
      return String(Date.now()).slice(6);
    },
  },
}
</script>

<style lang="sass">
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px

.btn
  background-color: $primary

</style>
