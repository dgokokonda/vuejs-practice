<template>
  <div id="app">
    <Layout
      v-show="visible"
      @toggle-display="toggleLayoutDisplay">
    </Layout>
    <Header></Header>
    <router-view
      :set-id="setId"
      :visible="visible"
      @toggle-display="toggleLayoutDisplay"/>
  </div>
</template>

<script>
import Header from './components/Header'
import Layout from './views/Layout'

export default {
  name: 'app',
  data: () => ({
    visible: false
  }),
  components: {
    Header,
    Layout
  },
  methods: {
    setId() {
      return String(Date.now()).slice(6);
    },
    toggleLayoutDisplay(bool) {
      const el = document.body;
      this.visible = bool;

      if (bool) {
        el.classList.add('no-scroll');
      } else {
        el.classList.remove('no-scroll');
      }
    },
  },
}
</script>

<style lang="sass">
@import './assets/sass/_var.sass'
</style>
